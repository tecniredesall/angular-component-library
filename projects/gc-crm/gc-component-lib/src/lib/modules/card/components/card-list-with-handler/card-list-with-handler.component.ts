import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SentryService } from '../../../../config/sentry/sentry.service';
import { DEFAULT_PAGINATION } from '../../../../core/constants/pagination.constant';
import {
  ComponentConfig,
  ComponentConfigModel,
} from '../../../../core/models/config/component-config';
import { GCCLEListSelectionMode } from '../../../../shared/enums/list/list-selection-mode.enum';
import { GCCLIListItemActionClicked } from '../../../../shared/models/list/list-item-action-clicked.model';
import { GCCLIListItemAction } from '../../../../shared/models/list/list-item-action.model';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { GCCLListHandlerBehaviorService } from '../../../../shared/services/list-handler-behavior/list-handler-behavior.service';
import { GCCLEListItemSortDirection } from '../../../../shared/types/list/list-column-sort-direction.type';
import { GCCLEListState } from '../../../../shared/types/list/list-state.type';
import { GCCLICardListHandlerConfig } from '../../models/card-list-handler-config.model';

@Component({
  selector: 'gc-cl-card-list-with-handler',
  templateUrl: './card-list-with-handler.component.html',
  styleUrls: ['./card-list-with-handler.component.scss'],
  providers: [GCCLListHandlerBehaviorService],
})
export class GCCLCardListWithHandlerComponent<T>
  implements OnInit, OnChanges, OnDestroy
{
  @Input() configuration: GCCLICardListHandlerConfig<T>;

  @Output() actionClicked = new EventEmitter<GCCLIListItemActionClicked<T>>();
  @Output() itemsSelectionChanged = new EventEmitter<T[]>();

  @ContentChild('layoutCustomTemplate') layoutCustomTemplate: TemplateRef<any>;
  @ContentChild('extraToolsCustomTemplate')
  extraToolsCustomTemplate: TemplateRef<any>;
  @ContentChild('emptyCustomTemplate') emptyCustomTemplate: TemplateRef<any>;
  @ContentChild('noMatchesCustomTemplate')
  noMatchesCustomTemplate: TemplateRef<any>;
  @ContentChild('errorCustomTemplate') errorCustomTemplate: TemplateRef<any>;

  public isLoading = true;
  public listData: T[] = null;
  public baseConfig: ComponentConfig = null;
  public fields: GCCLITableColumn[] = [];
  public selectedItems: T[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private searchTerm$: Subject<string> = new Subject<string>();
  private isFirstDataRequest = true;

  constructor(
    private listHandlerBehaviorService: GCCLListHandlerBehaviorService<T>,
    private sentry: SentryService
  ) {
    this.subscribeToSearchTerm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (changes?.configuration?.currentValue) {
        if (!this.configuration || this.configuration?.isErrorState) {
          this.isFirstDataRequest = false;
          throw new Error('Configuration error');
        }
        this.initializeBaseConfig();
        this.setSelectedItems();
        if (!changes?.configuration?.previousValue) {
          this.initializeListConfiguration();
          this.fetchItems().finally(() => {
            this.isFirstDataRequest = false;
          });
        }
      }
    } catch (error) {
      this.configuration.isErrorState = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get isAllowedLoadMoreItems(): boolean {
    return (
      !this.isLoading &&
      this.configuration?.pagination?.enabled &&
      this.configuration?.pagination?.settings &&
      null !== this.listData &&
      this.listData?.length > 0 &&
      this.listData?.length < this.configuration?.pagination?.settings?.length
    );
  }

  get ListState(): typeof GCCLEListState {
    return GCCLEListState;
  }

  get currentListState(): GCCLEListState {
    if (this.configuration?.isErrorState) {
      return GCCLEListState.Error;
    } else if (
      !this.baseConfig ||
      !this.configuration?.card ||
      this.isFirstDataRequest
    ) {
      return GCCLEListState.Initializing;
    } else if (this.isLoading) {
      return GCCLEListState.Loading;
    } else if (this.listData?.length > 0) {
      return GCCLEListState.Filled;
    } else if (
      this.configuration?.search?.enabled &&
      this.configuration?.search?.value?.length > 0
    ) {
      return GCCLEListState.NoMatches;
    }
    return GCCLEListState.Empty;
  }

  get addActionData(): GCCLIListItemAction {
    try {
      return this.configuration.card.actions.find(
        (action) => 'create' === action.id
      );
    } catch (error) {
      return null;
    }
  }

  public refreshList(): void {
    if (
      this.configuration?.search?.enabled &&
      '' !== (this.configuration?.search?.value || '').trim()
    ) {
      this.searchTerm$.next('');
    } else {
      this.onChangeQuery();
      this.fetchItems().finally(() => {});
    }
  }

  public onAddNewItem(): void {
    this.onActionClicked({ action: { id: 'create' } });
  }

  public onActionClicked(actionData: GCCLIListItemActionClicked<T>): void {
    this.actionClicked.emit(actionData);
  }

  public onToggleItem(data: any): void {
    const { enabled, mode } = this.configuration.cardSelection;
    if (!enabled) {
      return;
    }
    const { isSelected, isDisabled, ...rest } = data;
    if (isSelected) {
      this.selectedItems = this.selectedItems.filter(
        (item: any) => item?._id !== data?._id
      );
    } else if (GCCLEListSelectionMode.Multiple === mode) {
      this.selectedItems = [...this.selectedItems, rest as T];
    } else {
      this.selectedItems = [rest as T];
    }
    this.itemsSelectionChanged.emit(this.selectedItems);
  }

  public searchValueChanged(event: any): void {
    const {
      target: { value },
    } = event;
    const query = value.trim() as string;
    this.searchTerm$.next(query);
  }

  public paginationChanged(): void {
    if (!this.isAllowedLoadMoreItems) {
      return;
    }
    const { settings } = this.configuration.pagination;
    this.configuration.pagination.settings = {
      ...settings,
      ...{ pageIndex: settings?.pageIndex + 1 },
    };
    this.fetchItems(false).finally(() => {});
  }

  public replaceFields(fields: GCCLITableColumn[]): void {
    this.fields = (fields || []).map((item) => {
      const itemFound = (this.configuration?.card?.columns || []).find(
        (data) => data.key === item.key
      );
      return {
        ...item,
        ...(itemFound?.template && { template: itemFound.template }),
      };
    });
  }

  private initializeBaseConfig(): void {
    const { base } = this.configuration || {};
    this.baseConfig = new ComponentConfigModel(base);
  }

  private initializeListConfiguration(): void {
    const {
      request: { url },
      card,
    } = this.configuration || {};
    this.listHandlerBehaviorService.baseUrl = url;
    this.fields = this.orderFields([...card.columns]);
  }

  private setSelectedItems(): void {
    this.selectedItems = [...(this.configuration?.defaultSelectedItems || [])];
  }

  private subscribeToSearchTerm(): void {
    this.searchTerm$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        tap((_) => this.onChangeQuery()),
        debounceTime(500)
      )
      .subscribe((term: string) => {
        this.configuration.search.value = term;
        this.fetchItems().finally(() => {});
      });
  }

  private onChangeQuery(): void {
    this.isLoading = true;
    if (this.configuration?.pagination?.enabled) {
      const { pageSize } = this.configuration.pagination.settings;
      if (pageSize) {
        this.configuration.pagination.settings.pageIndex = 1;
        this.configuration.pagination.settings.pageSize = pageSize;
      }
    }
    this.listHandlerBehaviorService.items = [];
    this.listHandlerBehaviorService.selectedItem = null;
    this.listData = [];
  }

  private getQueryParams(): Record<string, unknown> {
    const { request, search, pagination } = this.configuration || {};
    const { defaultParams } = request || {};
    const { filter: defaultFilter, ...restQueryParams } = defaultParams || {};
    let dataFilter = { ...((defaultFilter || {}) as any) };
    let filter: string = defaultFilter ? JSON.stringify(defaultFilter) : null;

    if (
      search?.enabled &&
      search?.settings?.filter?.query &&
      search?.value?.length > 0
    ) {
      dataFilter = {
        ...dataFilter,
        ...search?.settings.filter.query,
      };
      filter = JSON.stringify(dataFilter).replace(
        new RegExp(search.settings.filter.slugReplace, 'g'),
        search.value
      );
    }

    const sortKey = `sort[${this.configuration?.sort?.active || '_id'}]`;
    const queryParams: any = {
      ...(restQueryParams && restQueryParams),
      [sortKey]:
        this.configuration?.sort?.direction === GCCLEListItemSortDirection.Asc
          ? 1
          : -1,
      ...(filter && { filter }),
      ...(pagination?.enabled && {
        page: pagination?.settings?.pageIndex || DEFAULT_PAGINATION.pageIndex,
        limit: pagination?.settings?.pageSize || DEFAULT_PAGINATION.pageSize,
      }),
    };
    return queryParams;
  }

  private async fetchItems(resetItems = true) {
    this.isLoading = true;
    this.configuration.isErrorState = false;
    try {
      const params = this.getQueryParams();
      const {
        request: { defaultHeaders },
      } = this.configuration || {};
      let headers = { ...(defaultHeaders || {}) };

      if (this.configuration?.base?.auth) {
        headers = {
          Authorization: this.configuration.base.auth,
          ...headers,
        };
      }

      const apiResponse = await this.listHandlerBehaviorService.fetchItems(
        {
          params,
          headers,
        },
        resetItems
      );
      this.listData = this.listHandlerBehaviorService.items;
      if (this.configuration?.pagination?.enabled) {
        this.configuration.pagination.settings = {
          ...this.configuration.pagination.settings,
          ...{ length: Number(apiResponse?._meta?.total_elements) },
        };
      }
    } catch (error) {
      this.configuration.isErrorState = true;
    }

    this.isLoading = false;
  }

  private orderFields(fields: GCCLITableColumn[]): GCCLITableColumn[] {
    try {
      return fields.sort((a, b) =>
        a.order && b.order && a.order > b.order ? 1 : -1
      );
    } catch (error) {
      this.sentry.handleError(error);
    }
    return fields;
  }
}
