import { Component, OnInit } from '@angular/core';
import { ComponentConfig } from '@gc-crm/gc-component-lib';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  public baseConfig: ComponentConfig = null;
  public emptyDataCustom = {
    imageUrl: './assets/images/empty-no-users.svg',
    title: 'gc.labels.custom-text',
    label: 'gc.labels.custom-description',
    buttonLabel: 'gc.labels.custom-text',
    emitButton: true,
  };

  constructor() {}

  ngOnInit(): void {
    this.setConfig();
  }

  clicked(clicked: boolean): void {
    console.log(clicked);
  }

  private setConfig(): void {
    this.baseConfig = {
      lang: 'es',
      app: '',
    };
  }
}
