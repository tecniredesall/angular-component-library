/* eslint-disable no-empty */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ComponentConfig,
  ComponentConfigModel,
} from '../../../../core/models/config/component-config';
import { GCCLIListItemAction } from '../../../../shared/models/list/list-item-action.model';
import { TableRowActionClicked } from '../../models/table/table-row-action-clicked.model';
import * as _ from 'lodash';

@Component({
  selector: 'gc-cl-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class GCCLTableActionsComponent implements OnInit, OnChanges {
  @Input() set config(value: ComponentConfig) {
    this._config = new ComponentConfigModel(value);
  }
  @Input() actions: GCCLIListItemAction[] = [];
  @Input() rowData: any;
  @Output() actionClicked = new EventEmitter<TableRowActionClicked>();
  _config: ComponentConfig;
  tableActions: GCCLIListItemAction[] = [];
  hasMenuActions: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actions) {
      this.tableActions = _.cloneDeep(
        GCCLTableActionsComponent.orderActions(this.actions)
      );
      this.hasMenuActions = !!this.tableActions.filter(
        ({ menu }) => menu === true
      ).length;
    }
  }

  private static orderActions(
    actions: GCCLIListItemAction[]
  ): GCCLIListItemAction[] {
    try {
      return actions.sort((a, b) =>
        a.order && b.order && a.order < b.order ? 1 : -1
      );
    } catch (e) {}
    return actions;
  }

  announceActionClicked(action: GCCLIListItemAction, data: any): void {
    this.actionClicked.emit({ action, data });
  }
}
