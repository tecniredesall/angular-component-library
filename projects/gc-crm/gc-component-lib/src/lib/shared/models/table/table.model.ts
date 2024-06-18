import { GCCLITableColumn } from './table-column.model';
import { GCCLIListItemAction } from '../list/list-item-action.model';

export interface GCCLITable {
  columns: GCCLITableColumn[];
  settings?: any;
  actions?: GCCLIListItemAction[];
}
