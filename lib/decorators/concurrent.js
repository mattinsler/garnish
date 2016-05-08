'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function concurrent() {
  var _this = this;

  var maxConcurrentlyRunning = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

  var numRunning = 0;

  return (0, _decorateMethod2.default)(function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fn) {
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

    return function (_x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
}

exports.default = concurrent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2NvbmN1cnJlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsU0FBUyxVQUFULEdBQWdEO0FBQUE7O0FBQUEsTUFBNUIsc0JBQTRCLHlEQUFILENBQUc7O0FBQzlDLE1BQUksYUFBYSxDQUFqQjs7QUFFQSxTQUFPO0FBQUEsd0RBQ0wsaUJBQU8sRUFBUDtBQUFBLHdDQUFjLElBQWQ7QUFBYyxZQUFkO0FBQUE7O0FBQUEsVUFNTSxLQU5OO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFDTSxjQUFjLHNCQURwQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxvQkFFVSxJQUFJLEtBQUosZ0NBQXVDLHNCQUF2QywyQkFGVjs7QUFBQTs7QUFLRSxnQkFBRSxVQUFGO0FBQ0ksbUJBTk4sR0FNYyxvQkFBTSxJQUFOLENBTmQ7O0FBQUEsb0JBT00sT0FBTyxNQUFNLElBQWIsS0FBdUIsVUFQN0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFPeUQsS0FQekQ7O0FBQUE7QUFPMkMsbUJBUDNDOztBQUFBO0FBUUUsZ0JBQUUsVUFBRjs7QUFSRiwrQ0FVUyxLQVZUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBUDtBQWNEOztrQkFFYyxVIiwiZmlsZSI6ImNvbmN1cnJlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjb3JhdGVNZXRob2QgZnJvbSAnLi4vbGliL2RlY29yYXRlLW1ldGhvZCc7XG5cbmZ1bmN0aW9uIGNvbmN1cnJlbnQobWF4Q29uY3VycmVudGx5UnVubmluZyA9IDEpIHtcbiAgbGV0IG51bVJ1bm5pbmcgPSAwO1xuXG4gIHJldHVybiBkZWNvcmF0ZU1ldGhvZChcbiAgICBhc3luYyAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChudW1SdW5uaW5nID49IG1heENvbmN1cnJlbnRseVJ1bm5pbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZXRob2QgY2FuIG9ubHkgYmUgY2FsbGVkICR7bWF4Q29uY3VycmVudGx5UnVubmluZ30gdGltZShzKSBjb25jdXJyZW50bHlgKTtcbiAgICAgIH1cblxuICAgICAgKytudW1SdW5uaW5nO1xuICAgICAgbGV0IHZhbHVlID0gZm4oLi4uYXJncyk7XG4gICAgICBpZiAodHlwZW9mKHZhbHVlLnRoZW4pID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gYXdhaXQgdmFsdWUgfVxuICAgICAgLS1udW1SdW5uaW5nO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmN1cnJlbnQ7XG4iXX0=