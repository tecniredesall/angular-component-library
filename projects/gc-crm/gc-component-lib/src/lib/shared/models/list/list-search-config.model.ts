export interface GCCLIListSearchSettings {
  excludeChars?: string;
  filter?: {
    query: any;
    slugReplace: string;
  };
}

export interface GCCLIListSearchConfig {
  enabled: boolean;
  value?: string;
  settings?: GCCLIListSearchSettings;
}
