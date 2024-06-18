/* eslint-disable no-empty */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ComponentConfig,
  ComponentConfigModel,
} from '../../../../core/models/config/component-config';
import { GCCLITable } from '../../../../shared/models/table/table.model';
import {
  ITablePaginationConfig,
  TablePagination,
} from '../../models/table/table-pagination.model';
import { MatSort, Sort } from '@angular/material/sort';
import { TableRowClicked } from '../../models/table/table-row-clicked.model';
import { TableRowActionClicked } from '../../models/table/table-row-action-clicked.model';
import { MatTableDataSource } from '@angular/material/table';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import * as _ from 'lodash';
import { GCCLTableBehaviorService } from '../../services/table-behavior/table-behavior.service';
import { ITableColumnCheckboxConfig } from '../../models/table/table-column-checkbox-config.model';
import { ITableDisabledItems } from '../../models/table/table-disabled-items.model';
import { ITableStorageConfig } from '../../models/table/table-storage-config.model';
import { GCCLEListState } from '../../../../shared/types/list/list-state.type';
import { GCCLIListSearchConfig } from '../../../../shared/models/list/list-search-config.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'gc-cl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class GCCLTableComponent implements OnInit, OnChanges {
  @Input() set config(value: ComponentConfig) {
    this._config = new ComponentConfigModel(value);
  }
  @Input() tableConfig: GCCLITable;
  @Input() paginationConfig: ITablePaginationConfig = { enabled: false };
  @Input() searchConfig: GCCLIListSearchConfig = { enabled: false };
  @Input() webStorage: ITableStorageConfig = { enabled: false };
  @Input() data: any[] = [];
  @Input() tableSort: Sort;
  @Input() layoutTemplate: TemplateRef<any> = null;
  @Input() extraToolsTemplate: TemplateRef<any> = null;
  @Input() emptyTemplate: TemplateRef<any> = null;
  @Input() noMatchesTemplate: TemplateRef<any> = null;
  @Input() errorTemplate: TemplateRef<any> = null;
  @Input() enableColumnOrdering = false;
  @Input() enableClickableRows = false;
  @Input() enableItemsCheckbox: ITableColumnCheckboxConfig = {
    status: false,
    position: 'first',
  };
  @Input() disabledItems: ITableDisabledItems = {
    property: '_id',
    values: [],
  };
  @Input() defaultSelectedItems: Array<any> = [];
  @Input() isLoading = false;
  @Input() isErrorState = false;
  @Input() isFirstDataRequest = false;
  @Input() isFilterApplied = false;

  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() rowClicked = new EventEmitter<TableRowClicked>();
  @Output() actionClicked = new EventEmitter<TableRowActionClicked>();
  @Output() paginationChanged = new EventEmitter<TablePagination>();
  @Output() searchChanged = new EventEmitter<KeyboardEvent>();
  @Output() itemsSelectionChanged = new EventEmitter<any[]>();
  @ViewChild(MatSort) sort: MatSort;

  _config: ComponentConfig;
  tableData: MatTableDataSource<any>;
  columns: GCCLITableColumn[] = [];
  selectedItems: any[] = [];
  currentRowClicked: TableRowClicked;
  selectedRowIndex = '';

  constructor(private GCCLTableBehaviorService: GCCLTableBehaviorService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.fillList();
    }

    if (changes.tableConfig && this.tableConfig) {
      this.GCCLTableBehaviorService.tableConfig = { ...this.tableConfig };
      this.columns = GCCLTableComponent.orderColumns([
        ...this.tableConfig.columns,
      ]);
    }

    if (
      changes?.defaultSelectedItems &&
      changes.defaultSelectedItems.previousValue !==
        changes.defaultSelectedItems.currentValue
    ) {
      this.setSelectedItems();
    }
  }

  get TableState(): typeof GCCLEListState {
    return GCCLEListState;
  }

  get currentTableState(): GCCLEListState {
    if (this.isErrorState) {
      return GCCLEListState.Error;
    } else if (!this._config || !this.tableConfig || this.isFirstDataRequest) {
      return GCCLEListState.Initializing;
    } else if (this.isLoading) {
      return GCCLEListState.Loading;
    } else if (this.data?.length > 0) {
      return GCCLEListState.Filled;
    } else if (
      (this.searchConfig?.enabled && this.searchConfig?.value?.length > 0) ||
      this.isFilterApplied
    ) {
      return GCCLEListState.NoMatches;
    }
    return GCCLEListState.Empty;
  }

  get isAllPageItemChecked(): boolean {
    return !this.data.some(
      (item) =>
        !this.selectedItems.some((itemSel) => item?._id === itemSel?._id)
    );
  }

  get isIndeterminatePageItemChecked(): boolean {
    const atLeastOneItemChecked = this.data.some((item) =>
      this.selectedItems.some((itemSel) => item?._id === itemSel?._id)
    );
    return !this.isAllPageItemChecked && atLeastOneItemChecked;
  }

  private fillList() {
    try {
      this.tableData = new MatTableDataSource(_.cloneDeep(this.data) || []);
      this.tableData.sort = this.sort;
    } catch (e) {}
  }

  replaceColumns(columns: GCCLITableColumn[]): void {
    this.columns = (columns || []).map((item) => {
      const itemFound = (this.tableConfig?.columns || []).find(
        (data) => data.key === item.key
      );
      return {
        ...item,
        ...(itemFound?.template && { template: itemFound.template }),
      };
    });
  }

  announceSortChange(sortState: Sort): void {
    this.sortChanged.emit(sortState);
  }

  announceRowClicked(rowClicked: TableRowClicked, event: any): void {
    this.selectedRowIndex = rowClicked?.data?._id;
    const {
      target: { tagName },
    } = event;
    if (tagName !== 'I' && tagName !== 'BUTTON') {
      this.currentRowClicked = _.cloneDeep(rowClicked);
      this.rowClicked.emit(rowClicked);
      if (this.enableClickableRows && !this.enableItemsCheckbox.status) {
        this.onSelectionSingle(rowClicked);
      }
    }
  }

  announcePaginationChange(event: PageEvent): void {
    this.paginationChanged.emit({
      ...event,
      ...{ pageSizeOptions: this.paginationConfig?.settings?.pageSizeOptions },
    });
  }

  announceActionClicked(actionClicked: TableRowActionClicked): void {
    this.actionClicked.emit(actionClicked);
  }

  public onSelectionToggleAll(isChecked: boolean): void {
    this.data
      .filter(
        (item) =>
          !(this.disabledItems?.values || []).some(
            (prevItem) => item?._id === prevItem?._id
          )
      )
      .filter((item) => {
        const foundItem = this.selectedItems.some(
          (prevItem) => item?._id === prevItem?._id
        );
        return isChecked ? !foundItem : foundItem;
      })
      .forEach((item) => {
        this.onSelectionToggle(item);
      });
  }

  public onSelectionToggle(item: any): void {
    if (!item) {
      return;
    }
    const indexFound = this.selectedItems.findIndex(
      (element) => element?._id === item?._id
    );
    if (-1 === indexFound) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(indexFound, 1);
    }
    this.itemsSelectionChanged.emit([...this.selectedItems]);
  }

  private setSelectedItems(): void {
    this.selectedItems = [...(this.defaultSelectedItems || [])];
  }

  private static orderColumns(columns: GCCLITableColumn[]): GCCLITableColumn[] {
    try {
      return columns.sort((a, b) =>
        a.order && b.order && a.order > b.order ? 1 : -1
      );
    } catch (e) {}
    return columns;
  }

  announceSearchChange(event: KeyboardEvent): void {
    this.searchChanged.emit(event);
  }

  public onSelectionSingle(item: any): void {
    if (!item) {
      return;
    }
    this.selectedItems = [];
    this.selectedItems.push(item);
    this.itemsSelectionChanged.emit([...this.selectedItems]);
  }
}
