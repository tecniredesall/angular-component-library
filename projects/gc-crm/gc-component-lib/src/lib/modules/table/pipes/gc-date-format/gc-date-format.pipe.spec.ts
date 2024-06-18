import { GcDateFormatPipe } from './gc-date-format.pipe';
import { ComponentConfigModel } from '../../../../core/models/config/component-config';

describe('GcDateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new GcDateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show an English formatted date', () => {
    const pipe = new GcDateFormatPipe();
    const config = new ComponentConfigModel({ lang: 'en' });
    const fDate = pipe.transform(config);
    expect(fDate).toEqual('MM/dd/yyyy');
  });

  it('should show a Spanish formatted date', () => {
    const pipe = new GcDateFormatPipe();
    const config = new ComponentConfigModel({ lang: 'es' });
    const fDate = pipe.transform(config);
    expect(fDate).toEqual('dd/MM/yyyy');
  });

  it('should show a Spanish formatted date', () => {
    const pipe = new GcDateFormatPipe();
    const config = new ComponentConfigModel({ lang: 'es-MX' });
    const fDate = pipe.transform(config);
    expect(fDate).toEqual('dd/MM/yyyy');
  });
});
