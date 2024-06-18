import { TableColumnMinMaxWidthDirective } from './table-colum-min-max-width.directive';

describe('TableColumnMinMaxWidthDirective', () => {
  const renderer2Mock = jasmine.createSpyObj('renderer2Mock', [
    'destroy',
    'createElement',
    'createComment',
    'createText',
    'destroyNode',
    'appendChild',
    'insertBefore',
    'removeChild',
    'selectRootElement',
    'parentNode',
    'nextSibling',
    'setAttribute',
    'removeAttribute',
    'addClass',
    'removeClass',
    'setStyle',
    'removeStyle',
    'setProperty',
    'setValue',
    'listen',
  ]);

  const rootRendererMock = {
    renderComponent: () => {
      return renderer2Mock;
    },
  };

  const elementRefMock = {
    nativeElement: document.createElement('div'),
  };

  it('should create an instance', () => {
    const directive = new TableColumnMinMaxWidthDirective(
      renderer2Mock,
      elementRefMock
    );
    expect(directive).toBeTruthy();
  });
});
