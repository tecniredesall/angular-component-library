import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { GCCLITableColumnSettings } from '../../../../shared/models/table/table-column.model';

@Directive({
  selector: '[gcClTableColumnMinMaxWidth]',
})
export class TableColumnMinMaxWidthDirective implements OnChanges {
  @Input() gcClTableColumnMinMaxWidth: GCCLITableColumnSettings | undefined;
  private readonly domElement: HTMLElement;
  private readonly defaultWidth = 'auto';
  private readonly defaultMinWidth = 'min-content';
  private readonly defaultMaxWidth = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gcClTableColumnMinMaxWidth) {
      this.setWidth();
      this.setMinWidth();
      this.setMaxWidth();
    }
  }

  private setWidth() {
    const width = this.gcClTableColumnMinMaxWidth?.width || this.defaultWidth;
    this.renderer.setStyle(this.domElement, 'width', width);
  }

  private setMinWidth() {
    const minWidth =
      this.gcClTableColumnMinMaxWidth?.minWidth || this.defaultMinWidth;
    this.renderer.setStyle(this.domElement, 'minWidth', minWidth);
  }

  private setMaxWidth() {
    const maxWidth =
      this.gcClTableColumnMinMaxWidth?.maxWidth || this.defaultMaxWidth;
    this.renderer.setStyle(this.domElement, 'maxWidth', maxWidth);
  }
}
