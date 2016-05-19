import 'babel-polyfill';
import view from '../../src/decorators/view';

function test(viewConfig, startData, expectedData) {
  return function() {
    class Foo {
      @view(viewConfig)
      bar() {
        return startData;
      }
    }

    const foo = new Foo();

    expect(foo.bar()).toEqual(expectedData);
  };
}

function testWithPromise(viewConfig, startData, expectedData) {
  return function(done) {
    class Foo {
      @view(viewConfig)
      bar() {
        return Promise.resolve(startData);
      }
    }

    const foo = new Foo();

    foo.bar().then(
      (data) => expect(data).toEqual(expectedData),
      (err) => done(err)
    ).then(done);
  };
}

describe('view', () => {
  describe('Promises', () => {
    it('should work without promises', test(
      {},
      { hello: 'world' },
      { hello: 'world' }
    ));

    it('should work with promises', testWithPromise(
      {},
      { hello: 'world' },
      { hello: 'world' }
    ));
  });

  describe('copy', () => {
    it('should copy top-level values', test(
      { world: 'hello' },
      { hello: 'world' },
      { hello: 'world', world: 'world' }
    ));

    it('should copy from nested values', test(
      { hello: 'foo.bar' },
      { foo: { bar: 'baz' } },
      { hello: 'baz', foo: { bar: 'baz' } }
    ));

    it('should copy to nested values - dot notation', test(
      { 'a.b.c': 'foo' },
      { foo: 'bar' },
      { a: { b: { c: 'bar' } }, foo: 'bar' }
    ));

    it('should copy to nested values', test(
      { a: { b: { c: 'foo' } } },
      { foo: 'bar' },
      { a: { b: { c: 'bar' } }, foo: 'bar' }
    ));

    it('should copy from/to nested values', test(
      { 'a.b.c': 'foo.bar' },
      { a: { c: 'c' }, foo: { bar: 'baz' } },
      { a: { b: { c: 'baz' }, c: 'c' }, foo: { bar: 'baz' } }
    ));
  });

  describe('rename', () => {
    it('should rename top-level values', test(
      { world: '!hello' },
      { hello: 'world' },
      { world: 'world' }
    ));

    it('should rename from nested values', test(
      { hello: '!foo.bar' },
      { foo: { bar: 'baz' } },
      { hello: 'baz', foo: {} }
    ));

    it('should rename to nested values - dot notation', test(
      { 'a.b.c': '!foo' },
      { foo: 'bar' },
      { a: { b: { c: 'bar' } } }
    ));

    it('should rename to nested values', test(
      { a: { b: { c: '!foo' } } },
      { foo: 'bar' },
      { a: { b: { c: 'bar' } } }
    ));

    it('should rename from/to nested values', test(
      { 'a.b.c': '!foo.bar' },
      { a: { c: 'c' }, foo: { bar: 'baz' } },
      { a: { b: { c: 'baz' }, c: 'c' }, foo: {} }
    ));
  });

  describe('delete', () => {
    it('should delete using false', test(
      { a: false },
      { a: 'foo' },
      {}
    ));

    it('should delete using 0', test(
      { a: 0 },
      { a: 'foo' },
      {}
    ));

    it('should not delete when key does not exist', test(
      { a: 0 },
      { b: 'foo' },
      { b: 'foo' }
    ));

    it('should delete nested keys - dot notation', test(
      { 'a.b.c': false },
      { a: { b: { c: 'foo' } } },
      { a: { b: {} } }
    ));

    it('should delete nested keys', test(
      { a: { b: { c: false } } },
      { a: { b: { c: 'foo' } } },
      { a: { b: {} } }
    ));
  });

  describe('compute', () => {
    it('should compute a single key', test(
      { foo: ({ a }) => `yo ${a}` },
      { a: 'hello', b: 'world' },
      { a: 'hello', b: 'world', foo: 'yo hello' }
    ));

    it('should compute a nested key - dot notation', test(
      { 'foo.bar': ({ a }) => `yo ${a}` },
      { a: 'hello', b: 'world' },
      { a: 'hello', b: 'world', foo: { bar: 'yo hello' } }
    ));

    it('should compute a nested key', test(
      { foo: { bar: ({ a }) => `yo ${a}` } },
      { a: 'hello', b: 'world' },
      { a: 'hello', b: 'world', foo: { bar: 'yo hello' } }
    ));
  });
});
