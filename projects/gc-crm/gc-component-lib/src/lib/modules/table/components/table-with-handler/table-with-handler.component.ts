import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { DEFAULT_PAGINATION } from '../../../../core/constants/pagination.constant';
import { ITableHandlerConfig } from '../../models/table/table-handler-config.model';
import { TablePagination } from '../../models/table/table-pagination.model';
import { TableRowActionClicked } from '../../models/table/table-row-action-clicked.model';
import { TableRowClicked } from '../../models/table/table-row-clicked.model';
import { GCCLTableHandlerBehaviorService } from '../../services/table-handler-behavior/table-handler-behavior.service';
import { GCCLEListItemSortDirection } from '../../../../shared/types/list/list-column-sort-direction.type';
import { GCCLTableComponent } from '../table/table.component';

@Component({
  selector: 'gc-cl-table-with-handler',
  templateUrl: './table-with-handler.component.html',
  styleUrls: ['./table-with-handler.component.scss'],
  providers: [GCCLTableHandlerBehaviorService],
})
export class GCCLTableWithHandlerComponent
  implements OnInit, OnChanges, OnDestroy
{
  @ViewChild(GCCLTableComponent) tableComponent: GCCLTableComponent;

  @Input() configuration: ITableHandlerConfig;

  @Output() rowClicked = new EventEmitter<TableRowClicked>();
  @Output() actionClicked = new EventEmitter<TableRowActionClicked>();
  @Output() itemsSelectionChanged = new EventEmitter<any[]>();

  public isLoading = true;
  public isErrorState = false;
  public data: any[];
  public isFirstDataRequest = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private searchTerm$: Subject<string> = new Subject<string>();

  constructor(
    private tableHandlerBehaviorService: GCCLTableHandlerBehaviorService
  ) {
    this.subscribeToSearchTerm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (
        !changes?.configuration?.previousValue &&
        changes?.configuration?.currentValue
      ) {
        if (!this.configuration || this.configuration?.isErrorState) {
          this.isFirstDataRequest = false;
          throw new Error('Configuration error');
        }
        this.initializeConfiguration();
        this.fetchItems().finally(() => {});
      }
    } catch (error) {
      this.isErrorState = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public refreshTable(config: ITableHandlerConfig | null = null): void {
    if (config) {
      this.isFirstDataRequest = true;
      this.isLoading = true;
      this.isErrorState = false;
      const { search: prevSearch } = this.configuration;
      this.configuration = config;
      try {
        if (!this.configuration || this.configuration?.isErrorState) {
          this.isFirstDataRequest = false;
          throw new Error('Configuration error');
        }
        this.initializeConfiguration();

        if (prevSearch?.enabled && '' !== (prevSearch?.value || '').trim()) {
          this.searchTerm$.next('');
        } else {
          this.onChangeQuery();
          this.fetchItems().finally(() => {});
        }
      } catch (error) {
        this.isErrorState = true;
      }
    } else {
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
  }

  public onRowClicked(rowData: TableRowClicked): void {
    this.rowClicked.emit(rowData);
  }

  public announceActionClicked(actionClicked: TableRowActionClicked): void {
    this.actionClicked.emit(actionClicked);
  }

  public onItemsSelectionChanged(items: any[]): void {
    this.itemsSelectionChanged.emit(items);
  }

  public searchValueChanged(event: any): void {
    const {
      target: { value },
    } = event;
    const query = value.trim();
    this.searchTerm$.next(query as string);
  }

  public paginationChanged(pagination: TablePagination): void {
    this.configuration.pagination.settings = {
      ...pagination,
      ...{ pageIndex: pagination.pageIndex + 1 },
    };
    this.fetchItems().finally(() => {});
  }

  public sortChanged(sort: Sort): void {
    this.configuration.sort = sort;
    this.fetchItems().finally(() => {});
  }

  public onSelectionToggle(item: any): void {
    if (!this.tableComponent) {
      return;
    }
    this.tableComponent.onSelectionToggle(item);
  }

  public onSelectionToggleAll(isChecked: boolean): void {
    if (!this.tableComponent) {
      return;
    }
    this.tableComponent.onSelectionToggleAll(isChecked);
  }

  private initializeConfiguration(): void {
    const { requestUrl } = this.configuration;
    this.tableHandlerBehaviorService.baseUrl = requestUrl;
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
    this.tableHandlerBehaviorService.items = [];
    this.tableHandlerBehaviorService.selectedItem = null;
  }

  private getQueryParams(): Record<string, unknown> {
    const {
      defaultFilter,
      search,
      pagination,
      languageReplaceInQuery,
      table: { columns },
    } = this.configuration || {};
    let dataFilter = { ...(defaultFilter || {}) };
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
      if (filter && languageReplaceInQuery?.slug) {
        filter = filter.replace(
          new RegExp(languageReplaceInQuery.slug, 'g'),
          languageReplaceInQuery?.useDefaultLangForSearch
            ? 'default'
            : this.configuration?.base?.lang
        );
      }
    }

    const columnKey = this.configuration?.sort?.active || '_id';
    let sortKey =
      columns.find((col) => columnKey === col.key)?.sort?.sortKey || columnKey;
    if (sortKey && languageReplaceInQuery?.slug) {
      sortKey = sortKey.replace(
        new RegExp(languageReplaceInQuery.slug, 'g'),
        languageReplaceInQuery?.useDefaultLangForSort
          ? 'default'
          : this.configuration?.base?.lang
      );
    }
    const queryParams: any = {
      [`sort[${sortKey}]`]:
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

  private async fetchItems() {
    this.isLoading = true;
    this.isErrorState = false;
    const params = this.getQueryParams();
    const { requestHeaders } = this.configuration || {};
    let headers = { ...(requestHeaders || {}) };

    if (this.configuration?.base?.auth) {
      headers = {
        Authorization: this.configuration.base.auth,
        ...headers,
      };
    }

    try {
      const apiResponse = await this.tableHandlerBehaviorService.fetchItems({
        params,
        headers,
      });
      this.data = this.tableHandlerBehaviorService.items;
      if (this.configuration?.pagination?.enabled) {
        this.configuration.pagination.settings = {
          ...this.configuration.pagination.settings,
          ...{ length: Number(apiResponse?._meta?.total_elements) },
        };
      }
    } catch (error) {
      this.isErrorState = true;
    }
    this.isLoading = false;
    this.isFirstDataRequest = false;
  }
}
