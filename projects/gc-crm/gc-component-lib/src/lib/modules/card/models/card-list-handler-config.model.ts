import { Sort } from '@angular/material/sort';
import { ComponentConfig } from '../../../core/models/config/component-config';
import { GCCLITable } from '../../../shared/models/table/table.model';
import { GCCLIListDisabledItems } from '../../../shared/models/list/list-disabled-items.model';
import { GCCLIListPaginationConfig } from '../../../shared/models/list/list-pagination.model';
import { GCCLIListSearchConfig } from '../../../shared/models/list/list-search-config.model';
import { GCCLIListStorageConfig } from '../../../shared/models/list/list-storage-config.model';
import { GCCLIListSelectionConfig } from '../../../shared/models/list/list-selection-config.model';
import { GCCLIListRequestConfig } from '../../../shared/models/list/list-request-config.model';

export interface GCCLICardListHandlerConfig<T> {
  base: ComponentConfig;
  card: GCCLITable;
  request: GCCLIListRequestConfig;
  isErrorState: boolean;
  pagination?: GCCLIListPaginationConfig;
  search?: GCCLIListSearchConfig;
  webStorage?: GCCLIListStorageConfig;
  enableFieldsOrdering?: boolean;
  cardSelection?: GCCLIListSelectionConfig;
  disabledItems?: GCCLIListDisabledItems<T>;
  defaultSelectedItems?: Array<T>;
  sort?: Sort;
  styleClasses?: {
    cardContainer: string;
  };
}
