import $$ from '../index'

function expectValue(result) {
  return expect(result.value)
}

function describe(testCase, testFunction) {
  console.log(`-- running test ${testCase}`)
  testFunction()
}

describe('scoped-values', () => {

  it('handles null and undefined values', () => {
    const objNull = $$(null);
    const objUndefined = $$(undefined);

    expectValue(objNull.let(v => 1)).toBe(null);
    expectValue(objUndefined.let(v => 1)).toBe(undefined);
  });

  it('handles scalar values', () => {
    const objNumber = $$(42);

    expectValue(objNumber.let(v => v * 2)).toBe(84);
  });

  it('handles array operations', () => {
    const objArray = $$([1, 2, 3]);

    const mapped = objArray.map(x => x * 2).let(v => v);
    const filtered = objArray.filter(x => x > 1).let(v => v);

    expectValue(mapped).toEqual([2, 4, 6]);
    expectValue(filtered).toEqual([2, 3]);
  });

  it('handles object operations', () => {
    const obj = $$({ a: 1, b: 2 });

    expectValue(obj.a.let(v => v)).toBe(1);
  });

  it('supports chaining', () => {
    const objArray = $$([1, 2, 3]);

    const result = objArray
      .map(x => x + 1)
      .filter(x => x > 2)
      .let(v => v.join(','));

    expectValue(result).toBe('3,4');
  });

  it('tests also function', () => {
    let sideEffect = 0;
    const objNumber = $$(42);

    const result = objNumber
      .also(v => sideEffect = v)
      .let(v => v * 2);

    expectValue(result).toBe(84);
    expect(sideEffect).toBe(42);
  });

  it('only calls run when value is not null', () => {
    const objNull = $$(null);
    const objValue = $$(5);

    let result = 0;

    objNull.run(v => result = 1);
    expect(result).toBe(0);

    objValue.run(v => result = v);
    expect(result).toBe(5);
  });

  it('passes value through chain correctly', () => {
    const obj = $$(3);
    const result = obj
      .also(v => v * 2)
      .let(v => v * 3)
      .let(v => v);

    expectValue(result).toBe(9);
  });

  it('passes non-function properties of wrapped value', () => {
    const obj = $$({ prop: 'value' });
    expectValue(obj.prop.let(v => v)).toBe('value');
  });

  it('calls wrapped functions correctly', () => {
    const obj = $$({
      fn: (x) => x * 2
    });

    const result = obj.fn(3).let(v => v);
    expectValue(result).toBe(6);
  });

  it('handles exceptions in chained calls', () => {
    const obj = $$([1, 2, 3]);

    expect(() => {
      obj.map(x => {
        throw new Error('Test error');
      });
    }).toThrow('Test error');
  });

  it('handles null function in chained calls', () => {
    const obj = $$(3);
    const result = obj.let(null).let(v => v);
    expectValue(result).toBe(3);
  });

  it('allows chaining array methods', () => {
    const obj = $$([1, 2, 3]);

    const result = obj
      .map(v => v * 2)
      .filter(v => v > 4)
      .let(v => v);

    expectValue(result).toEqual([6]);
  });

  it('can access object properties', () => {
    const obj = $$({ prop: 'test' });

    const result = obj.prop.let(v => v);
    expectValue(result).toBe('test');
  });

  it('can use methods from the prototype chain', () => {
    const obj = $$(5);

    const result = obj.toString().let(v => v);
    expectValue(result).toBe('5');
  });
});
