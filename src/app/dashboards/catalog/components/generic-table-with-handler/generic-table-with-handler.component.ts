import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  DEFAULT_PAGINATION,
  GCCLTableWithHandlerComponent,
  ITableHandlerConfig,
} from '@gc-crm/gc-component-lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GCCLIConfig } from 'src/app/core/models/base-confog.model';
import { GCClConfigService } from 'src/app/core/services/gc-cl-config.service';
import { GENERIC_TABLE_CONFIG } from 'src/app/shared/constants/generic-table-config/generic-table-config.constant';

@Component({
  selector: 'app-generic-table-with-handler',
  templateUrl: './generic-table-with-handler.component.html',
  styleUrls: ['./generic-table-with-handler.component.scss'],
})
export class GenericTableWithHandlerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(GCCLTableWithHandlerComponent)
  tableWithHandlerComponent: GCCLTableWithHandlerComponent;
  @ViewChild('tableLayout') tableLayout: TemplateRef<any>;
  @ViewChild('tableExtraTools') tableExtraTools: TemplateRef<any>;
  @ViewChild('emptyTable') emptyTable: TemplateRef<any>;
  @ViewChild('personTypeColumn') personTypeColumn: TemplateRef<any>;

  public configuration: ITableHandlerConfig = null;
  public emptyDataCustom = {
    imageUrl: './assets/images/empty-no-users.svg',
    title: 'gc.labels.custom-text',
    label: 'gc.labels.custom-description',
    buttonLabel: 'gc.labels.custom-text',
    emitButton: true,
  };
  private baseConfig = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private configService: GCClConfigService,
    private cdRef: ChangeDetectorRef
  ) {
    this.subscribeToBaseConfigChanges();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setConfiguration();
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onClickToolButton(): void {
    console.log('Action works!');
    this.tableWithHandlerComponent.onSelectionToggle({
      _id: '635ac41668dcd949f560ba55',
    });
  }

  public onEmptyClickAction(): void {
    console.log('Empty action works!');
  }

  private subscribeToBaseConfigChanges(): void {
    this.configService
      .getObservableConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: GCCLIConfig) => {
        this.baseConfig = { ...config };
        if (this.configuration) {
          this.configuration = {
            ...this.configuration,
            ...{ base: this.baseConfig },
          };
        }
      });
  }

  private setConfiguration(): void {
    this.configuration = {
      base: this.baseConfig,
      table: this.setTableConfig(),
      requestUrl: 'https://crm-develop.grainchain.io/api/v1/crm-people/people',
      defaultFilter: this.setDefaultFilterConfig(),
      pagination: this.setPaginationConfig(),
      search: this.setSearchConfig(),
      webStorage: this.setWebStorageConfig(),
      enableColumnOrdering: true,
      enableClickableRows: true,
      enableItemsCheckbox: { status: true, position: 'first' },
      disabledItems: null,
      defaultSelectedItems: [],
      sort: { active: 'last_name', direction: 'asc' },
      layoutTemplate: this.tableLayout,
      extraToolsTemplate: this.tableExtraTools,
      noMatchesTemplate: this.emptyTable,
    };
  }

  private setTableConfig(): any {
    let columns = [];
    const templatesByColumns = {
      person_type: this.personTypeColumn,
    };
    ({ columns = [] } = GENERIC_TABLE_CONFIG);
    columns = columns.map((item) => ({
      ...item,
      template: templatesByColumns[item?.key] ?? null,
    }));
    return { ...GENERIC_TABLE_CONFIG, columns };
  }

  private setDefaultFilterConfig(): any {
    return {
      context: 'people_role',
      _partitionKey: 'organization_id=6323a7c1c18517d9f3de8e03',
    };
  }

  private setPaginationConfig(): any {
    return {
      enabled: true,
      settings: DEFAULT_PAGINATION,
    };
  }

  private setSearchConfig(): any {
    return {
      enabled: true,
      value: '',
      settings: {
        excludeChars: '$?+.*/',
        filter: {
          query: {
            $or: [
              {
                first_name: {
                  $regex: '.*{SEARCH_TERM}',
                  $options: 'i',
                },
              },
            ],
          },
          slugReplace: '{SEARCH_TERM}',
        },
      },
    };
  }

  private setWebStorageConfig(): any {
    return {
      enabled: true,
      uniqueId: 'gth1',
    };
  }

  public onItemsSelectionChanged(items: any[]): void {}
}
