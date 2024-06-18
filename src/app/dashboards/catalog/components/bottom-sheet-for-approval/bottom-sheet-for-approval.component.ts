import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ComponentConfigModel } from '@gc-crm/gc-component-lib';
import {
  ComponentConfig,
  GCCLBottomSheetForApprovalComponent,
} from 'projects/gc-crm/gc-component-lib/src/public-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GCCLIConfig } from 'src/app/core/models/base-confog.model';
import { GCClConfigService } from 'src/app/core/services/gc-cl-config.service';

@Component({
  selector: 'app-bottom-sheet-for-approval',
  templateUrl: './bottom-sheet-for-approval.component.html',
  styleUrls: ['./bottom-sheet-for-approval.component.scss'],
})
export class BottomSheetForApprovalComponent implements OnInit, OnDestroy {
  public baseConfig: ComponentConfig = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private ids = [
    '6439ef66681897eae9506737',
    '643dd5fa393440ff41ff7572',
    '6439ef13681897eae950671f',
    '6439ef66681897eae9506737',
    '6439df7a9d859bea543fde3c',
    '643dd5fa393440ff41ff7572',
    '6439ef66681897eae9506737',
    '643ebc624336b89f1b3adce5',
    '643ebc624336b89f1b3adce5',
    '6439ef66681897eae9506737',
  ];

  constructor(
    private configService: GCClConfigService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.subscribeToBaseConfigChanges();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openBottomSheet(): void {
    const rndInt = this.randomIntFromInterval(0, 9);
    this._bottomSheet.open(GCCLBottomSheetForApprovalComponent, {
      disableClose: true,

      data: {
        id: '6130f9cd8592b2f045115937',
        baseConfig: this.baseConfig,
      },
    });
  }

  private subscribeToBaseConfigChanges(): void {
    this.configService
      .getObservableConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: GCCLIConfig) => {
        this.baseConfig = new ComponentConfigModel(config);
      });
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
