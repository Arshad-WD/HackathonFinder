export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 *  Rate Limiter
 * @param {Function} fn - async function to execute
 * @param {Object} options
 * @param {number} options.maxRequests - max allowed calls
 * @param {number} options.windowMs - time window in ms
 */
export function createRateLimiter({ maxRequests = 1, windowMs = 5000 }) {
  let queue = [];
  let timestamps = [];

  async function processQueue() {
    if (queue.length === 0) return;

    const now = Date.now();

    // Remove expired timestamps
    timestamps = timestamps.filter(ts => now - ts < windowMs);

    if (timestamps.length >= maxRequests) {
      const waitTime = windowMs - (now - timestamps[0]);
      await sleep(waitTime);
      return processQueue();
    }

    const { fn, resolve, reject } = queue.shift();
    timestamps.push(Date.now());

    try {
      const result = await fn();
      resolve(result);
    } catch (err) {
      reject(err);
    }

    processQueue();
  }

  return function rateLimited(fn) {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      processQueue();
    });
  };
}
