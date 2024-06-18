import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ComponentConfig } from '../../../../core/models/config/component-config';
import { APPROVAL_STATUS } from '../../../../shared/constants/approval-status/approval-status.contant';
import { IApprovalsModel } from '../../models/approvals.model';
import { EApprovalEnum } from '../../enums/approval.enum';
import { GCCLApprovalHttpService } from '../../services/approval-behavior/approval-http.service';
import { SentryService } from '../../../../config/sentry/sentry.service';
import { IRequest } from '../../../../core/models/request/request.model';

@Component({
  selector: 'gc-cl-bottom-sheet-for-approval',
  templateUrl: './bottom-sheet-for-approval.component.html',
  styleUrls: ['./bottom-sheet-for-approval.component.scss'],
  providers: [GCCLApprovalHttpService],
})
export class GCCLBottomSheetForApprovalComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('dataSection')
  dataSection: TemplateRef<any>;

  id: string;
  baseConfig: ComponentConfig = null;
  public items: IApprovalsModel[];
  public isLoading = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private _bottomSheetRef: MatBottomSheetRef<GCCLBottomSheetForApprovalComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      id: string;
      baseConfig: ComponentConfig;
    },
    private approvalHttpService: GCCLApprovalHttpService,
    private sentry: SentryService
  ) {
    const { id, baseConfig } = this.data;
    this.id = id;
    this.baseConfig = baseConfig;
    this.fetchItems().finally(() => {
      this.isLoading = false;
    });
  }

  public sections: Array<{
    label: string;
    status: string;
    template: TemplateRef<any>;
    expanded: boolean;
    counter: number;
    item: IApprovalsModel;
  }> = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  get approvalStatus(): typeof APPROVAL_STATUS {
    return APPROVAL_STATUS;
  }

  get approvalEnum(): typeof EApprovalEnum {
    return EApprovalEnum;
  }

  public close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public async sendNotifications() {
    this.isLoading = true;

    try {
      await this.approvalHttpService
        .postNotifications(this.id, this.headers)
        .toPromise()
        .finally(() => (this.isLoading = false));
    } catch (error) {
      this.sentry.handleError(error);
    }
  }

  get headers(): IRequest {
    let headers = {};
    if (this.baseConfig?.auth) {
      headers = {
        Authorization: this.baseConfig.auth,
        partitionkey: this.baseConfig.partitionKey,
      };
    }
    return headers;
  }

  private async fetchItems() {
    const headers = this.headers;
    try {
      this.items = await this.approvalHttpService
        .getApprovers(this.id, headers)
        .toPromise();
      this.items.forEach((it) => {
        this.sections.push({
          label: it.name,
          status: it.status,
          template: this.dataSection,
          expanded: false,
          counter: null,
          item: it,
        });
      });
    } catch (error) {
      this.sentry.handleError(error);
    }
  }
}
