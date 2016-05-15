import decorate from '../lib/decorate';

const MEMOIZE = Symbol('memoize');

const memoize = decorate(function(fn) {
  if (fn.length > 0) {
    throw new Error('Cannot memoize functions with arguments');
  }

  return function() {
    const state = this[MEMOIZE] = this[MEMOIZE] || {
      called: false,
      value: undefined
    };

    if (!state.called) {
      state.called = true;
      state.value = fn.call(this);
    }
    return state.value;
  }
});

export default memoize;
