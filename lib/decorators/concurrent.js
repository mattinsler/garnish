'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function concurrent() {
  var _this = this;

  var maxConcurrentlyRunning = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var numRunning = 0;

  return (0, _decorateMethod2.default)(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fn) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var value;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(numRunning >= maxConcurrentlyRunning)) {
                _context.next = 2;
                break;
              }

              throw new Error('Method can only be called ' + maxConcurrentlyRunning + ' time(s) concurrently');

            case 2:

              ++numRunning;
              value = fn.apply(undefined, args);

              if (!(typeof value.then === 'function')) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return value;

            case 7:
              value = _context.sent;

            case 8:
              --numRunning;

              return _context.abrupt('return', value);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

exports.default = concurrent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2NvbmN1cnJlbnQuanMiXSwibmFtZXMiOlsiY29uY3VycmVudCIsIm1heENvbmN1cnJlbnRseVJ1bm5pbmciLCJudW1SdW5uaW5nIiwiZm4iLCJhcmdzIiwiRXJyb3IiLCJ2YWx1ZSIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7OztBQUVBLFNBQVNBLFVBQVQsR0FBZ0Q7QUFBQTs7QUFBQSxNQUE1QkMsc0JBQTRCLHVFQUFILENBQUc7O0FBQzlDLE1BQUlDLGFBQWEsQ0FBakI7O0FBRUEsU0FBTztBQUFBLHlEQUNMLGlCQUFPQyxFQUFQO0FBQUEsd0NBQWNDLElBQWQ7QUFBY0EsWUFBZDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFDTUYsY0FBY0Qsc0JBRHBCO0FBQUE7QUFBQTtBQUFBOztBQUFBLG9CQUVVLElBQUlJLEtBQUosZ0NBQXVDSixzQkFBdkMsMkJBRlY7O0FBQUE7O0FBS0UsZ0JBQUVDLFVBQUY7QUFDSUksbUJBTk4sR0FNY0gsb0JBQU1DLElBQU4sQ0FOZDs7QUFBQSxvQkFPTSxPQUFPRSxNQUFNQyxJQUFiLEtBQXVCLFVBUDdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEscUJBT3lERCxLQVB6RDs7QUFBQTtBQU8yQ0EsbUJBUDNDOztBQUFBO0FBUUUsZ0JBQUVKLFVBQUY7O0FBUkYsK0NBVVNJLEtBVlQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FESzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFQO0FBY0Q7O2tCQUVjTixVIiwiZmlsZSI6ImNvbmN1cnJlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjb3JhdGVNZXRob2QgZnJvbSAnLi4vbGliL2RlY29yYXRlLW1ldGhvZCc7XG5cbmZ1bmN0aW9uIGNvbmN1cnJlbnQobWF4Q29uY3VycmVudGx5UnVubmluZyA9IDEpIHtcbiAgbGV0IG51bVJ1bm5pbmcgPSAwO1xuXG4gIHJldHVybiBkZWNvcmF0ZU1ldGhvZChcbiAgICBhc3luYyAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChudW1SdW5uaW5nID49IG1heENvbmN1cnJlbnRseVJ1bm5pbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZXRob2QgY2FuIG9ubHkgYmUgY2FsbGVkICR7bWF4Q29uY3VycmVudGx5UnVubmluZ30gdGltZShzKSBjb25jdXJyZW50bHlgKTtcbiAgICAgIH1cblxuICAgICAgKytudW1SdW5uaW5nO1xuICAgICAgbGV0IHZhbHVlID0gZm4oLi4uYXJncyk7XG4gICAgICBpZiAodHlwZW9mKHZhbHVlLnRoZW4pID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gYXdhaXQgdmFsdWUgfVxuICAgICAgLS1udW1SdW5uaW5nO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmN1cnJlbnQ7XG4iXX0=