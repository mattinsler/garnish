'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function concurrent() {
  var maxConcurrentlyRunning = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var numRunning = 0;

  return (0, _decorateMethod2.default)(function (fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (numRunning >= maxConcurrentlyRunning) {
      throw new Error('Method can only be called ' + maxConcurrentlyRunning + ' time(s) concurrently');
    }

    ++numRunning;
    var value = fn.apply(undefined, args);

    if (typeof value.then === 'function') {
      value.then(function (v) {
        --numRunning;
        return v;
      });
    } else {
      --numRunning;
      return value;
    }
  });
}

exports.default = concurrent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2NvbmN1cnJlbnQuanMiXSwibmFtZXMiOlsiY29uY3VycmVudCIsIm1heENvbmN1cnJlbnRseVJ1bm5pbmciLCJudW1SdW5uaW5nIiwiZm4iLCJhcmdzIiwiRXJyb3IiLCJ2YWx1ZSIsInRoZW4iLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsU0FBU0EsVUFBVCxHQUFnRDtBQUFBLE1BQTVCQyxzQkFBNEIsdUVBQUgsQ0FBRzs7QUFDOUMsTUFBSUMsYUFBYSxDQUFqQjs7QUFFQSxTQUFPLDhCQUNMLFVBQUNDLEVBQUQsRUFBaUI7QUFBQSxzQ0FBVEMsSUFBUztBQUFUQSxVQUFTO0FBQUE7O0FBQ2YsUUFBSUYsY0FBY0Qsc0JBQWxCLEVBQTBDO0FBQ3hDLFlBQU0sSUFBSUksS0FBSixnQ0FBdUNKLHNCQUF2QywyQkFBTjtBQUNEOztBQUVELE1BQUVDLFVBQUY7QUFDQSxRQUFNSSxRQUFRSCxvQkFBTUMsSUFBTixDQUFkOztBQUVBLFFBQUksT0FBT0UsTUFBTUMsSUFBYixLQUF1QixVQUEzQixFQUF1QztBQUNyQ0QsWUFBTUMsSUFBTixDQUFXLGFBQUs7QUFDZCxVQUFFTCxVQUFGO0FBQ0EsZUFBT00sQ0FBUDtBQUNELE9BSEQ7QUFJRCxLQUxELE1BS087QUFDTCxRQUFFTixVQUFGO0FBQ0EsYUFBT0ksS0FBUDtBQUNEO0FBQ0YsR0FsQkksQ0FBUDtBQW9CRDs7a0JBRWNOLFUiLCJmaWxlIjoiY29uY3VycmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWNvcmF0ZU1ldGhvZCBmcm9tICcuLi9saWIvZGVjb3JhdGUtbWV0aG9kJztcblxuZnVuY3Rpb24gY29uY3VycmVudChtYXhDb25jdXJyZW50bHlSdW5uaW5nID0gMSkge1xuICBsZXQgbnVtUnVubmluZyA9IDA7XG5cbiAgcmV0dXJuIGRlY29yYXRlTWV0aG9kKFxuICAgIChmbiwgLi4uYXJncykgPT4ge1xuICAgICAgaWYgKG51bVJ1bm5pbmcgPj0gbWF4Q29uY3VycmVudGx5UnVubmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1ldGhvZCBjYW4gb25seSBiZSBjYWxsZWQgJHttYXhDb25jdXJyZW50bHlSdW5uaW5nfSB0aW1lKHMpIGNvbmN1cnJlbnRseWApO1xuICAgICAgfVxuXG4gICAgICArK251bVJ1bm5pbmc7XG4gICAgICBjb25zdCB2YWx1ZSA9IGZuKC4uLmFyZ3MpO1xuXG4gICAgICBpZiAodHlwZW9mKHZhbHVlLnRoZW4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbHVlLnRoZW4odiA9PiB7XG4gICAgICAgICAgLS1udW1SdW5uaW5nO1xuICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC0tbnVtUnVubmluZztcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25jdXJyZW50O1xuIl19