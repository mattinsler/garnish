import decorateMethod from '../lib/decorate-method';

function concurrent(maxConcurrentlyRunning = 1) {
  let numRunning = 0;

  return decorateMethod(
    async (fn, ...args) => {
      if (numRunning >= maxConcurrentlyRunning) {
        throw new Error(`Method can only be called ${maxConcurrentlyRunning} time(s) concurrently`);
      }

      ++numRunning;
      let value = fn(...args);
      if (typeof(value.then) === 'function') { value = await value }
      --numRunning;

      return value;
    }
  )
}

export default concurrent;
