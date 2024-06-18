export interface TablePagination {
  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
}

export interface ITablePaginationConfig {
  enabled: boolean;
  settings?: TablePagination;
}
