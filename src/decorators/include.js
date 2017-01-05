import applyTransform from '../lib/apply-transform';
import decorateMethod from '../lib/decorate-method';

function include(...fields) {
  return decorateMethod(
    async (fn, ...args) => {
      let value = fn(...args);
      if (typeof(value.then) === 'function') { value = await value }

      return applyTransform(value, (item) => {
        return fields.reduce((o, f) => {
          o[f] = item[f];
          return o;
        }, {});
      });
    }
  )
}

export default include;
