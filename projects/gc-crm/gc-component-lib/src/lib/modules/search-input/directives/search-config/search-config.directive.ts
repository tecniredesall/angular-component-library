/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { GCCLIListSearchSettings } from '../../../../shared/models/list/list-search-config.model';

@Directive({
  selector: '[gcClSearchConfig]',
})
export class GCCLSearchConfigDirective {
  @Input() searchSettings: GCCLIListSearchSettings;
  @Output() ngModelChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent): void {
    this.checkConfig(event);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    this.checkConfig(event);
  }

  @HostListener('keyup', ['$event']) onKeUp(event: KeyboardEvent): void {
    this.checkConfig(event);
  }

  private checkConfig(event: ClipboardEvent | KeyboardEvent): void {
    const { excludeChars } = this.searchSettings || {};
    if (excludeChars) {
      this.excludeChars(event);
    } else {
      this.ngModelChange.emit(this.getWord());
    }
  }

  private excludeChars(event: ClipboardEvent | KeyboardEvent): void {
    const instance = event.constructor.name;
    const word = this.getWord(event);
    switch (instance) {
      case 'ClipboardEvent':
        setTimeout(() => {
          this.excludeWord(word);
        }, 1);
        break;
      case 'KeyboardEvent':
        this.excludeWord(word);
        break;
    }
  }

  private getWord(event?: ClipboardEvent | KeyboardEvent): string {
    if (event instanceof ClipboardEvent) {
      // @ts-ignore
      return `${this.el.nativeElement.value}${event.clipboardData.getData(
        'text'
      )}`;
    }

    if (event instanceof KeyboardEvent) {
      // @ts-ignore
      return event.target.value;
    }

    return this.el.nativeElement.value;
  }

  private excludeWord(fromWord: string): void {
    const { excludeChars } = this.searchSettings;
    // @ts-ignore
    const excludeCharsArray = excludeChars.split('');
    for (const char of excludeCharsArray) {
      // @ts-ignore
      fromWord = fromWord.replaceAll(char, '');
    }
    this.el.nativeElement.value = fromWord;
    this.ngModelChange.emit(fromWord);
  }
}
