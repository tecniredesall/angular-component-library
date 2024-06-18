import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ComponentConfig,
  ComponentConfigModel,
} from '../../../../core/models/config/component-config';
import { IEmptyData } from '../../../../shared/models/empty-data.model';

@Component({
  selector: 'gc-cl-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class GCCLEmptyComponent implements OnInit {
  public _config: ComponentConfig;

  @Input() emptyData: Partial<IEmptyData> = {};

  @Input() set config(value: ComponentConfig) {
    this._config = new ComponentConfigModel(value);
  }

  @Output() clicked = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.clicked.emit(true);
  }
}
