import { GCCLIListItemAction } from './list-item-action.model';

export interface GCCLIListItemActionClicked<T> {
  action: Partial<GCCLIListItemAction>;
  data?: Partial<T>;
}
