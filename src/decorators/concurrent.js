import decorateMethod from '../lib/decorate-method';

function concurrent(maxConcurrentlyRunning = 1) {
  let numRunning = 0;

  return decorateMethod(
    (fn, ...args) => {
      if (numRunning >= maxConcurrentlyRunning) {
        throw new Error(`Method can only be called ${maxConcurrentlyRunning} time(s) concurrently`);
      }

      ++numRunning;
      const value = fn(...args);

      if (typeof(value.then) === 'function') {
        value.then(v => {
          --numRunning;
          return v;
        });
      } else {
        --numRunning;
        return value;
      }
    }
  )
}

export default concurrent;
