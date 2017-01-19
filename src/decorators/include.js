import applyTransform from '../lib/apply-transform';
import decorateMethod from '../lib/decorate-method';

function include(...fields) {
  function transformItem(item) {
    return fields.reduce((o, f) => {
      o[f] = item[f];
      return o;
    }, {});
  }

  return decorateMethod(
    (fn, ...args) => {
      const value = fn(...args);
      
      if (typeof(value.then) === 'function') {
        return value.then(v => applyTransform(v, transformItem));
      } else {
        return applyTransform(value, transformItem);
      }
    }
  )
}

export default include;
