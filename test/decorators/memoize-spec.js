import memoize from '../../src/decorators/memoize';

describe('memoize', () => {
  it('should only call memoized function once', () => {
    class Foo {
      @memoize
      bar() {
        this.baz();
      }
      baz() {}
    }

    const foo = new Foo();

    spyOn(foo, 'baz');

    foo.bar();
    foo.bar();
    foo.bar();

    expect(foo.baz).toHaveBeenCalledTimes(1);
  });

  it('should memoize per instance', () => {
    class Foo {
      @memoize
      bar() {
        this.baz();
      }
      baz() {}
    }

    const foo = new Foo();
    const foo2 = new Foo();

    spyOn(foo, 'baz');
    spyOn(foo2, 'baz');

    foo.bar();
    foo2.bar();
    foo.bar();
    foo2.bar();
    foo.bar();
    foo2.bar();

    expect(foo.baz).toHaveBeenCalledTimes(1);
    expect(foo2.baz).toHaveBeenCalledTimes(1);
  });
});
