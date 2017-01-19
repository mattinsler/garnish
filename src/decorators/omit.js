import applyTransform from '../lib/apply-transform';
import decorateMethod from '../lib/decorate-method';

function omit(...fields) {
  function transformItem(item) {
    for (const f of fields) { delete item[f] }
    return item;
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

export default omit;
