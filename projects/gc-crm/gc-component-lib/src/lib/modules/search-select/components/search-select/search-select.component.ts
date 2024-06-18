import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gc-cl-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
})
export class GCCLSearchSelectComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  @ViewChild('inputRef') inputRef: ElementRef;
  @ContentChild('titleTemplate') titleTemplate: TemplateRef<any>;
  @ContentChild('textInputTemplate') textInputTemplate: TemplateRef<any>;
  @ContentChild('textOptionTemplate') textOptionTemplate: TemplateRef<any>;
  @ContentChild('textBadgeTemplate') textBadgeTemplate: TemplateRef<any>;

  @Input() request: any;
  @Input() service: any;
  @Input() useOtherMethod = false;
  @Input() methodOptions: any = {
    id: '',
    methodName: '',
  };
  @Input() isMultiple = false;
  @Input() propertyID = '_id';
  @Input() propertySearch = '';
  @Input() placeholder = '';
  @Input() data: any[] = [];
  @Output() itemsSelected = new EventEmitter();

  itemsData: any[] = [];
  originData: any[] = [];
  arrItemsSeleted = [];
  showSugestions = false;
  isLoading = false;
  canSearch = true;
  inputSearch = new UntypedFormControl('');
  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    void this.initConfig();
    this.onListenSearch();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async initConfig(): Promise<void> {
    if (this.data.length > 0) {
      this.itemsData = [...this.data];
      this.originData = [...this.data];
      return;
    }

    const { data } = !this.useOtherMethod
      ? await this.service.fetchItems(this.request)
      : await this.service[this.methodOptions.methodName](
          this.methodOptions.id,
          this.request
        );
    this.addSelected(data);
  }

  onFocus(): void {
    this.showSugestions = true;
  }
  onBlur(): void {
    this.showSugestions = false;
  }

  addSelected(data: any): void {
    this.itemsData = data.map((item) => ({
      ...item,
      isSelect: false,
    }));
  }

  onSeletedItem(item: any): void {
    item.isSelect = !item.isSelect;
    if (!this.isMultiple) {
      this.selectOnlyOne(item);
      return;
    }
    this.selectMultiple(item);
  }

  deSelected(seletedItem: any): void {
    this.itemsData.forEach((item: any) => {
      if (item[this.propertyID] !== seletedItem[this.propertyID]) {
        item.isSelect = false;
      }
    });
  }

  deleteItem(seletedItem: any): void {
    const index = this.arrItemsSeleted.findIndex(
      (item: any) => item[this.propertyID] === seletedItem[this.propertyID]
    );
    this.arrItemsSeleted.splice(index, 1);
  }

  selectOnlyOne(item): void {
    this.showSugestions = false;
    this.canSearch = false;
    this.deSelected(item);
    this.itemsSelected[0] = item;
    this.itemsSelected.emit(item);
    this.setInputValue();
    setTimeout(() => {
      this.canSearch = true;
    }, 500);
  }

  selectMultiple(item: any): void {
    if (!item.isSelect) {
      this.deleteItem(item);
      this.itemsSelected.emit([...this.arrItemsSeleted]);
      return;
    }
    this.arrItemsSeleted.push(item);
    this.itemsSelected.emit([...this.arrItemsSeleted]);
  }

  onListenSearch(): void {
    this.subscription = this.inputSearch.valueChanges
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        debounceTime(450)
      )
      .subscribe((value: any) => {
        this.isLoading = false;
        if (!this.canSearch) return;
        if (this.data.length > 0) {
          this.getLocalData(value as string);
          return;
        }
        void this.getDataService(value as string);
      });
  }

  checkSelected(data: any) {
    data.forEach((item) => {
      const index = this.arrItemsSeleted.findIndex(
        (itemS) => item[this.propertyID] === itemS[this.propertyID]
      );
      item.isSelect = index !== -1 ? true : false;
    });
    return data;
  }

  getLocalData(searchValue: string): void {
    try {
      const suggestion = this.originData.filter((item) =>
        this.searchPropetyInTree(item as string, this.propertySearch)
          .toUpperCase()
          .includes(searchValue.toUpperCase())
      );
      this.itemsData = this.checkSelected(suggestion);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getDataService(searchValue: string) {
    this.request.params = {
      ...this.request.params,
      [this.propertySearch]: searchValue,
      filter: JSON.stringify({ [this.propertySearch]: searchValue }),
    };
    const { data } = await this.service.fetchItems(this.request);
    this.itemsData = this.checkSelected(data);
  }

  searchPropetyInTree(item: string, columNameSearch: string): string {
    const colums = columNameSearch.split('.');
    if (colums.length === 0) return item[this.propertySearch];
    colums.forEach((colum) => {
      item = item[colum];
    });
    return item;
  }

  inputFocus(): void {
    return this.search.nativeElement.focus();
  }
  setInputValue(): void {
    setTimeout(() => {
      this.inputSearch.setValue(this.inputRef.nativeElement.innerText);
    });
  }
}
