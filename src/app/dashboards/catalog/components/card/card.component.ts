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
  ComponentConfig,
  ComponentConfigModel,
  GCCLIListItemActionClicked,
  GCCLITable,
} from '@gc-crm/gc-component-lib';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GCCLIConfig } from 'src/app/core/models/base-confog.model';
import { GCClConfigService } from 'src/app/core/services/gc-cl-config.service';
import {
  GENERIC_CARD_CONFIG,
  GENERIC_CARD_DATA,
} from 'src/app/shared/constants/generic-card-config/generic-card-config.constant';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fullNameCustomColumn') fullNameCustomColumn: TemplateRef<any>;
  @ViewChild('emailCustomColumn') emailCustomColumn: TemplateRef<any>;
  @ViewChild('phoneNumberCustomColumn')
  phoneNumberCustomColumn: TemplateRef<any>;

  public baseConfig: ComponentConfig = null;
  public cardConfig: GCCLITable = null;
  public data: T = GENERIC_CARD_DATA;
  public isSelectable = true;
  public isSelected = false;
  public isDisabled = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private configService: GCClConfigService,
    private cdRef: ChangeDetectorRef
  ) {
    this.subscribeToBaseConfigChanges();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setCardConfig();
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onActionClicked(actionData: GCCLIListItemActionClicked<T>): void {
    console.log('onActionClicked', actionData);
  }

  public onToggleItem(data: T): void {
    console.log('onToggleItem', data);
  }

  private subscribeToBaseConfigChanges(): void {
    this.configService
      .getObservableConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: GCCLIConfig) => {
        this.baseConfig = new ComponentConfigModel(config);
      });
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
    this.cardConfig = { ...GENERIC_CARD_CONFIG, columns };
  }
}
