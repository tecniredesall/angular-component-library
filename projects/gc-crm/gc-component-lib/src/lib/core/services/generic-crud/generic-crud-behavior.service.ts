import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GCCLGenericCrudHttpService } from './generic-crud-http.service';
import { IRequest } from '../../models/request/request.model';
import { IResponse } from '../../models/response/response.model';

@Injectable()
export class GCCLGenericCrudBehaviorService<
  T
> extends GCCLGenericCrudHttpService<T> {
  private items$ = new BehaviorSubject<Array<T>>([]);
  private selectedItem$ = new BehaviorSubject<T>(null!);
  private readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject('API_URL') public url: string, httpClient: HttpClient) {
    super(url, httpClient);
  }

  get selectedItem(): T {
    return this.selectedItem$.getValue();
  }

  set selectedItem(value: T) {
    this.selectedItem$.next(value);
  }

  get items(): Array<T> {
    return this.items$.getValue();
  }

  set items(value: Array<T>) {
    this.items$.next(value);
  }

  get loading(): boolean {
    return this.loading$.getValue();
  }

  set loading(value: boolean) {
    this.loading$.next(value);
  }

  async fetchItems(request?: IRequest, resetItems = true): Promise<IResponse> {
    try {
      this.loading = true;
      const items = await this.getItems(request).toPromise();
      if (resetItems) {
        this.items = items.data as Array<T>;
      } else {
        this.items =
          Array.isArray(this.items) && Array.isArray(items.data)
            ? [...this.items, ...items.data]
            : items.data;
      }
      this.loading = false;
      return Promise.resolve(items);
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  async fetchItem(id: string, request: IRequest): Promise<any> {
    try {
      this.loading = true;
      const item = await this.getItem(id, request).toPromise();
      this.loading = false;
      return item;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  clear(): void {
    this.selectedItem = null!;
    this.items = null!;
    this.loading = false;
  }
}
