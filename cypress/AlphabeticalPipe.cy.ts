import {AlphabeticalPipe} from "../src/app/pipe/alphabetical/alphabetical.pipe";

describe('AlphabeticalPipe.cy.ts', () => {
  let pipe: AlphabeticalPipe;

  beforeEach(() => {
    pipe = new AlphabeticalPipe();
  })

  it('is in alphabetical order', () => {
    let unsorted = [{ c: {text: 'c'}, b: {text: 'b'}, a: {text: 'a'}}]
    let expected = [{ a: {text: 'a'}, b: {text: 'b'}, c: {text: 'c'}}]
    let actual = pipe.transform(unsorted);
    expect(actual).to.deep.equal(expected);
  })
})
