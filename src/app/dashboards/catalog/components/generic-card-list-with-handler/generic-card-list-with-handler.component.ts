import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GENERIC_CARD_CONFIG } from 'src/app/shared/constants/generic-card-config/generic-card-config.constant';
import {
  DEFAULT_PAGINATION,
  GCCLCardListWithHandlerComponent,
  GCCLEListSelectionMode,
  GCCLICardListHandlerConfig,
  GCCLIListItemActionClicked,
  GCCLIListRequestConfig,
} from '@gc-crm/gc-component-lib';
import { GCClConfigService } from 'src/app/core/services/gc-cl-config.service';
import { GCCLIConfig } from 'src/app/core/models/base-confog.model';
@Component({
  selector: 'app-generic-card-list-with-handler',
  templateUrl: './generic-card-list-with-handler.component.html',
  styleUrls: ['./generic-card-list-with-handler.component.scss'],
})
export class GenericCardListWithHandlerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('fullNameCustomColumn') fullNameCustomColumn: TemplateRef<any>;
  @ViewChild('emailCustomColumn') emailCustomColumn: TemplateRef<any>;
  @ViewChild('phoneNumberCustomColumn')
  phoneNumberCustomColumn: TemplateRef<any>;
  @ViewChild(GCCLCardListWithHandlerComponent)
  cardListWithHandlerComponent: GCCLCardListWithHandlerComponent<any>;

  public configuration: GCCLICardListHandlerConfig<any> = null;
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

  public onClickRefreshList(): void {
    if (!this.cardListWithHandlerComponent) {
      return;
    }
    this.cardListWithHandlerComponent.refreshList();
  }

  public onActionClicked(actionData: GCCLIListItemActionClicked<any>): void {
    console.log('onActionClicked', actionData);
  }

  public onItemsSelectionChanged(items: any[]): void {
    console.log('onItemsSelectionChanged', items);
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
      card: this.setCardConfig(),
      request: this.setRequestConfig(),
      isErrorState: false,
      pagination: this.setPaginationConfig(),
      search: this.setSearchConfig(),
      webStorage: this.setWebStorageConfig(),
      enableFieldsOrdering: false,
      cardSelection: { enabled: true, mode: GCCLEListSelectionMode.Multiple },
      disabledItems: null,
      defaultSelectedItems: [],
      sort: { active: 'last_name', direction: 'asc' },
      styleClasses: { cardContainer: 'col-6 col-md-4 p-3' },
    };
  }

  private setCardConfig(): any {
    let columns = [];
    const templatesByColumns = {
      full_name: this.fullNameCustomColumn,
      email: this.emailCustomColumn,
      phone_number: this.phoneNumberCustomColumn,
    };
    ({ columns = [] } = GENERIC_CARD_CONFIG);
    columns = columns.map((item) => ({
      ...item,
      template: templatesByColumns[item?.key] ?? null,
    }));
    return { ...GENERIC_CARD_CONFIG, columns };
  }

  private setRequestConfig(): GCCLIListRequestConfig {
    return {
      url: 'https://crm-develop.grainchain.io/api/v1/crm-people/people',
      defaultParams: {
        context: 'people_role',
        _partitionKey: 'organization_id=6323a7c1c18517d9f3de8e03',
      },
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
      enabled: false,
      uniqueId: 'gclh1',
    };
  }
}
