import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GCCLIListSearchSettings } from '../../../../shared/models/list/list-search-config.model';

@Component({
  selector: 'gc-cl-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class GCCLSearchInputComponent implements OnInit {
  @Input() searchValue = '';
  @Input() searchSettings: GCCLIListSearchSettings;
  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() inputChanged = new EventEmitter<KeyboardEvent>();

  constructor() {}

  ngOnInit(): void {}

  announceInputChange(event: KeyboardEvent): void {
    this.inputChanged.emit(event);
  }

  focusInput(): void {
    this.searchInput.nativeElement.focus();
  }

  clearInputValue(): void {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
  }
}
