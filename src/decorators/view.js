import applyTransform from '../lib/apply-transform';
import decorateMethod from '../lib/decorate-method';

function traverse(obj, key = [], { create = false } = {}) {
  if (key.length === 0) { throw new Error('function traverse(obj, key) requires key to be an array with length > 0'); }

  const lastKey = key.slice(-1)[0];
  if (key.length === 1) { return [obj, lastKey]; }

  for (const k of key.slice(0, -1)) {
    if (obj[k] === undefined) {
      if (create === true) {
        obj[k] = {};
      } else {
        return [undefined, undefined];
      }
    }
    obj = obj[k];
  }

  return [obj, lastKey];
}

const TYPE = {
  compute(item, key, value, args) {
    const [obj, lastKey] = traverse(item, key, { create: true });
    obj[lastKey] = value(item, ...args);

    return item;
  },

  delete(item, key) {
    const [obj, lastKey] = traverse(item, key);
    if (obj) {
      delete obj[lastKey];
    }

    return item;
  },

  copy(item, key, value) {
    const [valueObj, valueLastKey] = traverse(item, value);
    if (valueObj) {
      const [obj, lastKey] = traverse(item, key, { create: true });
      obj[lastKey] = valueObj[valueLastKey];
    }

    return item;
  }
}

const TYPE_ORDER = [TYPE.compute, TYPE.copy, TYPE.delete];

function decompose(key, value) {
  if (typeof(value) === 'function') {
    return [{ key, value, type: TYPE.compute }];
  } else if (value === 0 || value === false) {
    return [{ key, value, type: TYPE.delete }];
  } else if (typeof(value) === 'string') {
    if (value[0] === '!') {
      const v = value.slice(1).split('.');
      return [
        { key, value: v, type: TYPE.copy },
        { key: v, value: null, type: TYPE.delete }
      ];
    } else {
      return [{ key, value: value.split('.'), type: TYPE.copy }];
    }
  } else {
    throw new Error(`Unknown view type: ${value}`);
  }
}

function decomposeObject(obj = {}, prefix = []) {
  const res = [];

  for (const [k, value] of Object.entries(obj)) {
    const key = prefix.concat(k.split('.'));
    if (typeof(value) === 'object') {
      res.push(...decomposeObject(value, key));
    } else {
      res.push(...decompose(key, value));
    }
  }

  return res;
}

function view(viewProjection = {}) {
  // extract transforms
  const transforms = decomposeObject(viewProjection);
  // order transforms (computes -> copys -> deletes)
  transforms.sort((l, r) => TYPE_ORDER.indexOf(l.type) - TYPE_ORDER.indexOf(r.type));

  return decorateMethod(
    (fn, ...args) => {
      const value = fn(...args);
      const transform = (item) => {
        if (item) {
          for (const t of transforms) {
            item = t.type(item, t.key, t.value, args);
          }
        }
        return item;
      };

      if (typeof(value.then) === 'function') {
        return value.then((v) => applyTransform(v, transform));
      } else {
        return applyTransform(value, transform);
      }
    }
  )
}

// view.only = function() {
//
// };

export default view;
