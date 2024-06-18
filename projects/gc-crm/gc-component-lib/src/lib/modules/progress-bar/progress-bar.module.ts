import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCCLProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [GCCLProgressBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [GCCLProgressBarComponent],
})
export class GCCLProgressBarModule {}
