import { TemplateRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ComponentConfig } from '../../../../core/models/config/component-config';
import { ITableColumnCheckboxConfig } from './table-column-checkbox-config.model';
import { ITableDisabledItems } from './table-disabled-items.model';
import { ITablePaginationConfig } from './table-pagination.model';
import { ITableStorageConfig } from './table-storage-config.model';
import { GCCLITable } from '../../../../shared/models/table/table.model';
import { GCCLIListSearchConfig } from '../../../../shared/models/list/list-search-config.model';
import { GCCLILanguagueReplaceInQuery } from '../../../../shared/models/list/list-language-replace-query.model';

export interface ITableHandlerConfig {
  base: ComponentConfig;
  table: GCCLITable;
  requestUrl: string;
  requestHeaders?: { [k: string]: string };
  defaultFilter?: { [k: string]: string };
  isFilterApplied?: boolean;
  isErrorState?: boolean;
  pagination?: ITablePaginationConfig;
  languageReplaceInQuery?: GCCLILanguagueReplaceInQuery;
  search?: GCCLIListSearchConfig;
  webStorage?: ITableStorageConfig;
  enableColumnOrdering?: boolean;
  enableClickableRows?: boolean;
  enableItemsCheckbox?: ITableColumnCheckboxConfig;
  disabledItems?: ITableDisabledItems;
  defaultSelectedItems?: Array<any>;
  sort?: Sort;
  layoutTemplate?: TemplateRef<any>;
  extraToolsTemplate?: TemplateRef<any>;
  emptyTemplate?: TemplateRef<any>;
  noMatchesTemplate?: TemplateRef<any>;
  errorTemplate?: TemplateRef<any>;
}
