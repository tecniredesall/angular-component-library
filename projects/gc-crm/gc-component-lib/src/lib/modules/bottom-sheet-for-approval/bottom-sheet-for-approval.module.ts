import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLBottomSheetForApprovalComponent } from './components/bottom-sheet-for-approval/bottom-sheet-for-approval.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { GCCLSharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [GCCLBottomSheetForApprovalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    GCCLSharedModule,
  ],
  exports: [GCCLBottomSheetForApprovalComponent],
})
export class GCCLBottomSheetForApprovalModule {}
