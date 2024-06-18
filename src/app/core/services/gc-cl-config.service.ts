import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GCCLIConfig } from '../models/base-confog.model';

@Injectable()
export class GCClConfigService implements OnDestroy {
  private config$ = new BehaviorSubject<GCCLIConfig>(null);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private translateService: TranslateService) {
    this.setDefaultConfig();
    this.subscribeToLangChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get config(): GCCLIConfig {
    return this.config$.getValue();
  }

  set config(value: GCCLIConfig) {
    this.config$.next(value);
  }

  public getObservableConfig(): Observable<GCCLIConfig> {
    return this.config$.asObservable();
  }

  private subscribeToLangChanges(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lang }) => {
        if (this.config) {
          this.config = { ...this.config, ...{ lang } };
        }
      });
  }

  private setDefaultConfig(): void {
    this.config = {
      lang: 'en',
      app: 'trumodity',
      auth: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EUkJSRVUxTXpCRVF6STRNRGd6T1RCRU1EZ3hOVGRFTlROR1JUazNORU0xTnpJeE16STROZyJ9.eyJodHRwOi8vd3d3LmdyYWluY2hhaW4uaW8vcm9sZXMiOlsicGFydGljaXBhbnQiXSwiaXNzIjoiaHR0cHM6Ly9ncmFpbmNoYWluZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2M2ZlN2U3OGY4ZDY1YmY5M2FlNWQ1YmEiLCJhdWQiOiJodHRwczovL2dyYWluY2hhaW5kZXYuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2Nzg3MzY1OTgsImV4cCI6MTY4MTMyODU5OCwiYXpwIjoic1lxeHZBZzJNMkJiS3J6RGQ5RkdrdjVOdmFBTnhSWXAiLCJzY29wZSI6InJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgZGVsZXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpjdXJyZW50X3VzZXJfaWRlbnRpdGllcyIsImd0eSI6InBhc3N3b3JkIn0.Mv-ntpsIlVaAulRGRXPu8wIJQh5iJVSKwx1gaUlhDa7NtIoNZvgWmNduQfdk37Mt09sroEI3GkGI4kTFOx-6_vkX1A1U4KaFOwPb7Fj2n_jBRcorPkR725RKi-RiIhB4zmzi2jfNQBxH72-ZDe7IUkj0OFdYIaQkdSkN_nHH7OxeDNEHbJw0LAJBddCS2J8M6I1xoQvfZxLOwP6dI5VxqQoOxXXPh8kWuQzsIsbuhaHDUNhc2tCion1EUkGxq8eaV_TuSz7B6ZxGFtiV9uT6_5K7IBQubKizCKCaI8-n8e0m4GA7BYdkjuy-9Q6sf4CTer7OeIYxZ3txp-RPtrH-6Q',
      partitionKey: 'organization_id=6323a7c1c18517d9f3de8e03',
    };
  }
}
