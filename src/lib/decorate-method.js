import decorate from './decorate';

function decorateMethod(decorateFn) {
  return decorate(function(fn) {
    return function(...args) {
      return decorateFn(fn.bind(this), ...args);
    };
  });
}

export default decorateMethod;
