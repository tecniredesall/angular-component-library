import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';

interface Bar {
  color: string;
  valuePercent: number;
  description?: string;
  sortWhenTheyReach100: number;
}

@Component({
  selector: 'gc-cl-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class GCCLProgressBarComponent implements OnInit {
  @ContentChild('titleTemplate') titleTemplate: TemplateRef<any>;
  @ContentChild('descriptionTemplate') descriptionTemplate: TemplateRef<any>;

  @Input() height = 8;
  @Input() color = '#008c25';
  @Input() isMultibar = false;
  @Input() valuePercent = 0;
  @Input() description = '';
  @Input() backgroundColorMainBar = '#d1d1d5';
  @Input() mainBarDescription = '';
  @Input() bars: Bar[];

  bar: Bar;
  mainBar: Bar;

  constructor() {}

  ngOnInit(): void {
    this.initConfig();
  }

  ngOnChanges({ bars, valuePercent }: SimpleChanges): void {
    if (bars) {
      this.bars = [...bars.currentValue];
      this.multipleBar();
    }
    if (valuePercent) {
      this.bar = {
        ...this.bar,
        valuePercent: valuePercent.currentValue,
      };
    }
  }

  setStyles(bar: Bar): string {
    if (bar.valuePercent > 100) bar.valuePercent = 100;
    return `
      background-color: ${bar.color};
      width: ${bar.valuePercent}%;
      height: ${this.height}px;
    `;
  }

  initConfig(): void {
    this.bar = {
      color: this.color,
      valuePercent: this.valuePercent,
      description: this.description,
      sortWhenTheyReach100: 0,
    };
    this.mainBar = {
      color: this.backgroundColorMainBar,
      valuePercent: 100,
      description: this.mainBarDescription,
      sortWhenTheyReach100: 0,
    };
    if (this.isMultibar) {
      this.multipleBar();
      return;
    }
  }

  multipleBar(): void {
    let barsComplete = true;
    this.bars.forEach((bar) => {
      if (bar.valuePercent !== 100) barsComplete = false;
    });
    const property = barsComplete ? 'sortWhenTheyReach100' : 'valuePercent';
    this.bars.sort((a, b) => b[property] - a[property]);
  }
}
