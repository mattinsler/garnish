function decorate(decorateFn) {
  return function(target, key, { configurable, enumerable, writable }) {
    return {
      configurable,
      enumerable,
      writable,
      value: decorateFn(target[key])
    };
  };
}

export default decorate;
