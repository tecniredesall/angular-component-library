/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  GCCLITable,
  GCCLIListSearchConfig,
  TablePagination,
  DEFAULT_PAGINATION,
  getSortConfig,
  ComponentConfig,
  TableRowActionClicked,
  ITablePaginationConfig,
  GCCLEListItemSortDirection,
} from '@gc-crm/gc-component-lib';
import { TranslateService } from '@ngx-translate/core';
import { ITableStorageConfig } from 'dist/gc-crm/gc-component-lib/lib/modules/table/models/table/table-storage-config.model';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { GENERIC_TABLE_CONFIG } from 'src/app/shared/constants/generic-table-config/generic-table-config.constant';
import { TableBehaviorService } from '../../services/table-behavior.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('personTypeColumn') personTypeColumn: TemplateRef<any>;

  public baseConfig: ComponentConfig = null;
  public tableConfig: GCCLITable = null;
  public defaultFilter: { [k: string]: string } = {
    context: 'people_role',
    _partitionKey: 'organization_id=6323a7c1c18517d9f3de8e03',
  };
  public paginationConfig: ITablePaginationConfig = {
    enabled: true,
    settings: DEFAULT_PAGINATION,
  };
  public searchConfig: GCCLIListSearchConfig = {
    enabled: true,
    value: '',
    settings: {
      excludeChars: '$?+.*/',
      filter: {
        query: {
          $or: [
            {
              first_name: {
                $regex: '.*{SEARCH_TERM}',
                $options: 'i',
              },
            },
          ],
        },
        slugReplace: '{SEARCH_TERM}',
      },
    },
  };
  public webStorageConfig: ITableStorageConfig = {
    enabled: false,
    uniqueId: 'gt1',
  };

  public isLoading = true;
  public isErrorState = false;
  public data: any;
  public sort: Sort;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private searchTerm$: Subject<string> = new Subject<string>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private translateService: TranslateService,
    private tableBehaviorService: TableBehaviorService
  ) {
    this.subscribeToSearchTerm();
    this.subscribeLanguageChanges();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setConfig();
    this.setTableConfig();
    this.setSortConfig();
    this.setDefaultPagination();
    this.cdRef.detectChanges();
    this.fetchItems().finally(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onClickToolButton(): void {
    console.log('click me works!');
  }

  public announceActionClicked(actionClicked: TableRowActionClicked): void {}

  public itemsSelectionChanged(items: any[]): void {}

  public searchValueChanged(event: any): void {
    const {
      target: { value },
    } = event;
    const query = value.trim();
    this.searchTerm$.next(query);
  }

  public paginationChanged(pagination: TablePagination): void {
    this.paginationConfig.settings = {
      ...pagination,
      ...{ pageIndex: pagination.pageIndex + 1 },
    };
    this.fetchItems().finally(() => {});
  }

  public sortChanged(sort: Sort): void {
    this.sort = sort;
    this.fetchItems().finally(() => {});
  }

  private subscribeLanguageChanges(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lang }) => {
        this.baseConfig = { ...this.baseConfig, ...{ lang } };
      });
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
        this.searchConfig.value = term;
        this.fetchItems().finally(() => {});
      });
  }

  private onChangeQuery(): void {
    this.isLoading = true;
    const { pageSize } = this.paginationConfig?.settings;
    this.paginationConfig.settings = { ...DEFAULT_PAGINATION };
    if (pageSize) {
      this.paginationConfig.settings.pageSize = pageSize;
    }
    this.tableBehaviorService.items = [];
    this.tableBehaviorService.selectedItem = null;
  }

  private setConfig(): void {
    this.baseConfig = {
      lang: 'es',
      app: 'trumodity',
      auth: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EUkJSRVUxTXpCRVF6STRNRGd6T1RCRU1EZ3hOVGRFTlROR1JUazNORU0xTnpJeE16STROZyJ9.eyJodHRwOi8vd3d3LmdyYWluY2hhaW4uaW8vcm9sZXMiOlsiYnItYnV5ZXIiXSwiaXNzIjoiaHR0cHM6Ly9ncmFpbmNoYWluZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzFmYTZlYjg2M2JhZjJhYzAwZWMyYjkiLCJhdWQiOiJodHRwczovL2dyYWluY2hhaW5kZXYuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2NjY5MDYwNjQsImV4cCI6MTY2OTQ5ODA2NCwiYXpwIjoic1lxeHZBZzJNMkJiS3J6RGQ5RkdrdjVOdmFBTnhSWXAiLCJzY29wZSI6InJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgZGVsZXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpjdXJyZW50X3VzZXJfaWRlbnRpdGllcyIsImd0eSI6InBhc3N3b3JkIn0.ROGd8YDMaRwCGnysCGWPngocHU51QJMw2EvuroE__VZ558VZK9oB87Yriy5avtIJ5-8qw5Q0oyifno8UKnmwOvMuhZvKifRhxgiFCEZZ0EdRAShzg1HQs0Q6RyxLZyy6-DmYnDk_8nH9w9YHWGxtk_v03fiAn8UG1_qKRpEOWoAx16PV44uiX3ST6xEWAcau8lj5u1oc_3sGvWUcXmO1FrtC6n0iAX7k0ifGpChJylmt6_yc1tR5zXxOFbW-nxS_-mDoH5qWlt0zFvtZh87AjB9NGl7sQkHYmkZ0l4mpzFWAmCo8c2aRwiOYkCboIqnXifRi9eVduejv5ga_DcGSWA',
      partitionKey: 'organization_id=6323a7c1c18517d9f3de8e03',
    };
  }

  private setTableConfig(): void {
    let columns = [];
    const templatesByColumns = {
      person_type: this.personTypeColumn,
    };
    ({ columns = [] } = GENERIC_TABLE_CONFIG);
    columns = columns.map((item) => ({
      ...item,
      template: templatesByColumns[item?.key] ?? null,
    }));
    this.tableConfig = { ...GENERIC_TABLE_CONFIG, columns };
  }

  private setSortConfig(): void {
    this.sort = getSortConfig(this.sort, this.tableConfig);
  }

  private setDefaultPagination(): void {
    this.paginationConfig.settings = DEFAULT_PAGINATION;
  }

  private getQueryParams(): Record<string, unknown> {
    let dataFilter = { ...(this.defaultFilter || {}) };
    let filter: string = this.defaultFilter
      ? JSON.stringify(this.defaultFilter)
      : null;

    if (
      this.searchConfig?.enabled &&
      this.searchConfig?.settings?.filter &&
      this.searchConfig?.value?.length > 0
    ) {
      dataFilter = {
        ...dataFilter,
        ...this.searchConfig.settings.filter.query,
      };
      filter = JSON.stringify(dataFilter).replace(
        new RegExp(this.searchConfig.settings.filter.slugReplace, 'g'),
        this.searchConfig.value
      );
    }

    const sortKey = `sort[${this.sort?.active || '_id'}]`;
    const queryParams: any = {
      [sortKey]:
        this.sort?.direction === GCCLEListItemSortDirection.Asc ? 1 : -1,
      ...(filter && { filter }),
      ...(this.paginationConfig?.enabled && {
        page:
          this.paginationConfig?.settings?.pageIndex ||
          DEFAULT_PAGINATION.pageIndex,
        limit:
          this.paginationConfig?.settings?.pageSize ||
          DEFAULT_PAGINATION.pageSize,
      }),
    };
    return queryParams;
  }

  private async fetchItems() {
    this.isLoading = true;
    this.isErrorState = false;
    const params = this.getQueryParams();
    let headers = {};

    if (this.baseConfig?.auth) {
      headers = {
        Authorization: this.baseConfig.auth,
      };
    }

    try {
      const apiResponse = await this.tableBehaviorService.fetchItems({
        params,
        headers,
      });
      this.data = this.tableBehaviorService.items;
      this.paginationConfig.settings = {
        ...this.paginationConfig?.settings,
        ...{ length: Number(apiResponse?._meta?.total_elements) },
      };
    } catch (error) {
      this.isErrorState = true;
    }

    this.isLoading = false;
  }
}
