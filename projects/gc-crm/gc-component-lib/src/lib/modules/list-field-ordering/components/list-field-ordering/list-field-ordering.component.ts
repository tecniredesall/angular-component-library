import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ComponentConfig,
  ComponentConfigModel,
} from '../../../../core/models/config/component-config';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { EGCCLTableColumnShow } from '../../../../shared/types/table/table-column-show.type';
import { GCCLFieldItemOrderingStorageService } from '../../services/list-field-ordering-storage/list-field-ordering-storage.service';
import { ITableStorageConfig } from '../../../table/models/table/table-storage-config.model';

@Component({
  selector: 'gc-cl-list-field-ordering',
  templateUrl: './list-field-ordering.component.html',
  styleUrls: ['./list-field-ordering.component.scss'],
  providers: [GCCLFieldItemOrderingStorageService],
})
export class GCCLListFieldOrderingComponent implements OnInit, OnChanges {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() set config(value: ComponentConfig) {
    this._config = new ComponentConfigModel(value);
  }
  @Input() columns: GCCLITableColumn[];
  columnsOrdered: GCCLITableColumn[];

  @Input() set webStorage(value: ITableStorageConfig) {
    const { enabled, uniqueId } = value || {};
    this.listFieldOrderingStorageService.uniqueId = uniqueId;
    this.listFieldOrderingStorageService.enabled = enabled;
  }

  @Output() columnsChanged = new EventEmitter<GCCLITableColumn[]>();
  columnsOriginalCopy: GCCLITableColumn[];

  _config: ComponentConfig;

  constructor(
    private listFieldOrderingStorageService: GCCLFieldItemOrderingStorageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges({ columns }: SimpleChanges): void {
    if (columns?.firstChange) {
      this.columnsOriginalCopy = [...this.columns];
      this.columnsOrdered = this.removeTemplatePropertiesOfColumns([
        ...this.columns,
      ]);
      this.checkInStorage();
    }
  }

  drop(event: CdkDragDrop<GCCLITableColumn[], any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateInStorageAndNotify();
  }

  selectUnselect(id: string): void {
    const index = this.columnsOrdered.findIndex((item) => item.key === id);
    if (index > -1) {
      this.columnsOrdered[index].show =
        this.columnsOrdered[index].show === EGCCLTableColumnShow.Default
          ? EGCCLTableColumnShow.Filters
          : EGCCLTableColumnShow.Default;
      this.updateInStorageAndNotify();
    }
  }

  resetColumnsConfig(): void {
    this.columnsOrdered = this.removeTemplatePropertiesOfColumns([
      ...this.columnsOriginalCopy,
    ]);
    this.updateInStorageAndNotify();
  }

  get TableColumnShow(): typeof EGCCLTableColumnShow {
    return EGCCLTableColumnShow;
  }

  private checkInStorage() {
    const columnsStorage = this.listFieldOrderingStorageService.fields;
    if (columnsStorage && columnsStorage.length) {
      this.columnsOrdered = columnsStorage;
      this.columnsChanged.emit(this.columnsOrdered);
    } else {
      this.updateInStorageAndNotify();
    }
  }

  private updateInStorageAndNotify() {
    this.listFieldOrderingStorageService.fields = this.columnsOrdered;
    this.columnsChanged.emit(
      this.addTemplatePropertiesOfColumns([...this.columnsOrdered])
    );
  }

  private removeTemplatePropertiesOfColumns(
    columns: GCCLITableColumn[]
  ): GCCLITableColumn[] {
    return (columns || []).map(({ template, ...rest }) => rest);
  }

  private addTemplatePropertiesOfColumns(
    columns: GCCLITableColumn[]
  ): GCCLITableColumn[] {
    return (columns || []).map((item) => {
      const { template } =
        this.columnsOriginalCopy.find((col) => col.key === item.key) || {};
      return { ...item, template };
    });
  }
}
