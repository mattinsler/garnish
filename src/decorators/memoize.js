import decorate from '../lib/decorate';

const MEMOIZE = Symbol('memoize');

const memoize = decorate(function(fn, target, key) {
  if (fn.length > 0) {
    throw new Error('Cannot memoize functions with arguments');
  }

  return function() {
    const objectState = this[MEMOIZE] = this[MEMOIZE] || {};
    const state = objectState[key] = objectState[key] || {
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
