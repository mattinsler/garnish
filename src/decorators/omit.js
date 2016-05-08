import applyTransform from '../lib/apply-transform';
import decorateMethod from '../lib/decorate-method';

function omit(...fields) {
  return decorateMethod(
    async (fn, ...args) => {
      let value = fn(...args);
      if (typeof(value.then) === 'function') { value = await value }

      return applyTransform(value, (item) => {
        for (const f of fields) { delete item[f] }
        return item;
      });
    }
  )
}

export default omit;
