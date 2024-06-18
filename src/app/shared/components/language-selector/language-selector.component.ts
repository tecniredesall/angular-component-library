import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  currentLang = 'en';
  public languages: { name: string; value: string }[] = [
    { name: 'EN', value: 'en' },
    { name: 'ES', value: 'es' },
    { name: 'ES-MX', value: 'es-MX' },
    { name: 'EN-US', value: 'en-US' },
    { name: 'PT-BR', value: 'pt-BR' },
    { name: 'ES-HN', value: 'es-HN' },
  ];

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentLang = this.translateService.currentLang || 'en';
  }

  changeLang(e: any): void {
    this.currentLang = e.value;
    this.translateService.use(this.currentLang);
  }
}
