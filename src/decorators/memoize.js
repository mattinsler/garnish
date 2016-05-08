import decorate from '../lib/decorate';

const memoize = decorate(function(fn) {
  if (fn.length > 0) {
    throw new Error('Cannot memoize functions with arguments');
  }

  let memoizedValue;

  return function() {
    if (!memoizedValue) { memoizedValue = fn.call(this) }
    return memoizedValue;
  }
});

export default memoize;
