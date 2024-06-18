import { FirstAndMiddleNamePipe } from './first-and-middle-name.pipe';

describe('FirstAndMiddleNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstAndMiddleNamePipe();
    expect(pipe).toBeTruthy();
  });
});
