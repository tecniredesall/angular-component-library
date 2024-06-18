export interface ComponentConfig {
  auth?: string | null;
  partitionKey?: string | null;
  app?: string | null;
  lang?: string;
}

export class ComponentConfigModel implements ComponentConfig {
  public auth?: string | null = null;
  public partitionKey?: string | null = null;
  public app?: string | null = null;
  public lang? = 'en';

  constructor(value?: ComponentConfig) {
    if (value) {
      this.auth = value?.auth ?? this.auth;
      this.partitionKey = value?.partitionKey ?? this.partitionKey;
      this.app = value?.app ?? this.app;
      this.lang = value?.lang ?? this.lang;
    }
  }

  get defaultConfig(): ComponentConfig {
    return {
      auth: this.auth,
      partitionKey: this.partitionKey,
      app: this.app,
      lang: this.lang,
    };
  }
}
