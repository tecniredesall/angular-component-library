import { TGCCLTableColumnType } from '../../types/table/table-colum.type';
import { TGCCLTableColumnShow } from '../../types/table/table-column-show.type';
import { GCCLITableColumnSort } from './table-column-sort.model';
import { GCCLIGeneralLanguage } from '../general-language/general-language.interface';
import { GCCLIFormMetadataSpecificType } from '../form-metadata/form-metadata-specific-type.interface';
import { TemplateRef } from '@angular/core';

export interface GCCLITableColumnSettings {
  [key: string]: any;
}

export interface GCCLITableColumn {
  key: string;
  show: TGCCLTableColumnShow;
  order: number;
  type?: TGCCLTableColumnType;
  specific_type?: GCCLIFormMetadataSpecificType[];
  labels: GCCLIGeneralLanguage;
  sort: GCCLITableColumnSort;
  pipe?: string;
  settings?: GCCLITableColumnSettings;
  template?: TemplateRef<any>;
}
