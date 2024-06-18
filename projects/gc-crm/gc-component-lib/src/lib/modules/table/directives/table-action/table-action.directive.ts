/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { GCCLIListItemActionConditions } from '../../../../shared/models/list/list-item-action.model';
import { CONDITION_ASSERTIONS } from '../../constants/condition-assertions/condition-assertions.constant';

@Directive({
  selector: '[gcClRowAction]',
})
export class TableActionDirective implements AfterViewInit {
  @Input() conditions: GCCLIListItemActionConditions;
  @Input() rowData: any;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.conditions && this.rowData) {
      this.checkConditions();
    }
  }

  private checkConditions() {
    const { hidden, disabled } = this.conditions;
    if (hidden) {
      // @ts-ignore
      this.elementRef.nativeElement.style.display = CONDITION_ASSERTIONS[
        hidden
      ](this.rowData)
        ? 'none'
        : 'block';
    }

    if (disabled) {
      // @ts-ignore
      this.elementRef.nativeElement.disabled = CONDITION_ASSERTIONS[disabled](
        this.rowData
      );
    }
  }
}
