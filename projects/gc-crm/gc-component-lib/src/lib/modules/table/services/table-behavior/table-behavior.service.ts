import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GCCLITable } from '../../../../shared/models/table/table.model';
type TableConfigType = GCCLITable | undefined;

@Injectable({
  providedIn: 'root',
})
export class GCCLTableBehaviorService implements OnDestroy {
  private tableConfig$ = new BehaviorSubject<TableConfigType>(undefined);

  constructor() {}

  ngOnDestroy(): void {
    this.clear();
  }

  public get tableConfig(): TableConfigType {
    return this.tableConfig$.getValue();
  }

  public set tableConfig(value: TableConfigType) {
    this.tableConfig$.next(value);
  }

  private clear() {
    this.tableConfig = undefined;
  }
}
