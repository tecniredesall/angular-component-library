import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[gcClWrapperClass]',
})
export class WrapperClassDirective implements OnChanges {
  @Input() gcClWrapperClass: string | null | undefined = '';

  @HostBinding('class')
  className = `gc-cl ${this.gcClWrapperClass}`;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.className = `gc-cl ${this.gcClWrapperClass}`;
  }
}
