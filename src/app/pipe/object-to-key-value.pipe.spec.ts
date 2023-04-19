import { ObjectToKeyValuePipe } from './object-to-key-value.pipe';

describe('ObjectToKeyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectToKeyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
