import { GCCLIGeneralLanguage } from '../general-language/general-language.interface';
import { GCCLIFormMetadataIcon } from '../form-metadata/form-metadata-icon.interface';

export interface GCCLIListItemActionConditions {
  hidden?: string;
  disabled?: string;
}

export interface GCCLIListItemAction {
  id: string;
  order: number;
  label?: GCCLIGeneralLanguage;
  icon: GCCLIFormMetadataIcon;
  conditions?: GCCLIListItemActionConditions;
  style?: any;
  menu?: boolean;
  simple?: boolean;
}
