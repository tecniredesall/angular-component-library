import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentConfig } from '../../../../core/models/config/component-config';
import { GCCLIListItemActionClicked } from '../../../../shared/models/list/list-item-action-clicked.model';
import { GCCLIListItemAction } from '../../../../shared/models/list/list-item-action.model';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { GCCLITable } from '../../../../shared/models/table/table.model';
import { EGCCLTableColumnType } from '../../../../shared/types/table/table-colum.type';

@Component({
  selector: 'gc-cl-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class GCCLCardComponent<T> implements OnInit {
  @Input() baseConfig: ComponentConfig = null;
  @Input() cardConfig: GCCLITable = null;
  @Input() data: T = null;
  @Input() isSelectable = true;
  @Input() isSelected = false;
  @Input() isDisabled = false;

  @Output() actionClicked = new EventEmitter<GCCLIListItemActionClicked<T>>();
  @Output() toggleItem = new EventEmitter<T>();

  constructor() {}

  ngOnInit(): void {}

  onClickItem(): void {
    if (!this.isDisabled) {
      this.toggleItem.emit({
        ...this.data,
        ...{ isSelected: this.isSelected },
        ...{ isDisabled: this.isDisabled },
      });
    }
  }

  onClickAction(action: GCCLIListItemAction): void {
    this.actionClicked.emit({
      action,
      data: this.data,
    });
  }

  get headers(): GCCLITableColumn[] {
    return (this.cardConfig?.columns || []).filter(
      (item) =>
        item?.settings?.show_in_header &&
        item?.type !== EGCCLTableColumnType.Icon
    );
  }

  get body(): GCCLITableColumn[] {
    return (this.cardConfig?.columns || []).filter(
      (item) => !item?.settings?.show_in_header
    );
  }

  get avatar(): GCCLITableColumn {
    return (this.cardConfig?.columns || []).find(
      (item) =>
        item?.settings?.show_in_header &&
        item?.type === EGCCLTableColumnType.Icon
    );
  }

  get actions(): GCCLIListItemAction[] {
    return (this.cardConfig?.actions || []).filter(
      (action) => 'create' !== action.id
    );
  }
}
