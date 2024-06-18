import { TablePagination } from '../../models/table/table-pagination.model';
import { Sort, SortDirection } from '@angular/material/sort';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { GCCLITable } from '../../../../shared/models/table/table.model';

export function getQueryParams(
  pagination: TablePagination,
  sort: Sort
): string {
  try {
    const { pageIndex, pageSize } = pagination;
    return `?${getSortString(sort)}&page=${pageIndex}&limit=${pageSize}`;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return '';
}

export function getSortString(sort: Sort): string {
  const { active, direction } = sort;
  return `sort[${active}]=${direction === 'asc' ? 1 : -1}`;
}

export function getSortConfig(sort: Sort, tableConfig: GCCLITable): Sort {
  let defaultSortColumn: GCCLITableColumn | undefined =
    tableConfig.columns.find((column) => column.sort.active);
  if (!defaultSortColumn) {
    defaultSortColumn = tableConfig.columns[0];
  }

  return {
    active: defaultSortColumn.key,
    direction: defaultSortColumn.sort.direction as SortDirection,
  };
}
