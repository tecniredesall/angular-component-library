import { GCCLSearchConfigDirective } from './search-config.directive';
import { ElementRef } from '@angular/core';

describe('GCCLSearchConfigDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = new ElementRef<any>(null);
    const directive = new GCCLSearchConfigDirective(el);
    expect(directive).toBeTruthy();
  });
});
