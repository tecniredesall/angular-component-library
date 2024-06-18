import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLListFieldOrderingComponent } from './components/list-field-ordering/list-field-ordering.component';
import { GCCLSharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [GCCLListFieldOrderingComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRippleModule,
    MatMenuModule,
    GCCLSharedModule,
  ],
  exports: [GCCLListFieldOrderingComponent],
})
export class GCCLListFieldOrderingModule {}
