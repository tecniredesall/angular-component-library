import { Component, Input } from '@angular/core';
import { GCCLITableColumn } from '../../../../shared/models/table/table-column.model';
import { GCCLTableBehaviorService } from '../../services/table-behavior/table-behavior.service';

@Component({
  selector: 'gc-cl-table-column-handler',
  templateUrl: './table-column-handler.component.html',
  styleUrls: ['./table-column-handler.component.scss'],
})
export class GCCLTableColumnHandlerComponent {
  @Input() data: any;
  @Input() column: GCCLITableColumn;

  constructor(public GCCLTableBehaviorService: GCCLTableBehaviorService) {}
}
