import { GCCLINames } from '../../../shared/models/languages.model';

export interface GCCLICurrency {
  _id: string;
  slug: string;
  type: string;
  names: GCCLINames;
  active: boolean;
  created_by: string;
  created_at: string;
  _partitionKey: string;
  extras: any[];
}
