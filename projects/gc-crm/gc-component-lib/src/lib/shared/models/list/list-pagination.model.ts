export interface GCCLIListPagination {
  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
}

export interface GCCLIListPaginationConfig {
  enabled: boolean;
  settings?: GCCLIListPagination;
}
