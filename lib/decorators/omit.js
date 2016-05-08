'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applyTransform = require('../lib/apply-transform');

var _applyTransform2 = _interopRequireDefault(_applyTransform);

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function omit() {
  var _this = this;

  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return (0, _decorateMethod2.default)(function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fn) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var value;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              value = fn.apply(undefined, args);

              if (!(typeof value.then === 'function')) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return value;

            case 4:
              value = _context.sent;

            case 5:
              return _context.abrupt('return', (0, _applyTransform2.default)(value, function (item) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var f = _step.value;
                    delete item[f];
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                return item;
              }));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }());
}

exports.default = omit;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL29taXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxTQUFTLElBQVQsR0FBeUI7QUFBQTs7QUFBQSxvQ0FBUixNQUFRO0FBQVIsVUFBUTtBQUFBOztBQUN2QixTQUFPO0FBQUEsd0RBQ0wsaUJBQU8sRUFBUDtBQUFBLHlDQUFjLElBQWQ7QUFBYyxZQUFkO0FBQUE7O0FBQUEsVUFDTSxLQUROO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTSxtQkFETixHQUNjLG9CQUFNLElBQU4sQ0FEZDs7QUFBQSxvQkFFTSxPQUFPLE1BQU0sSUFBYixLQUF1QixVQUY3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUV5RCxLQUZ6RDs7QUFBQTtBQUUyQyxtQkFGM0M7O0FBQUE7QUFBQSwrQ0FJUyw4QkFBZSxLQUFmLEVBQXNCLFVBQUMsSUFBRCxFQUFVO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3JDLHVDQUFnQixNQUFoQiw4SEFBd0I7QUFBQSx3QkFBYixDQUFhO0FBQUUsMkJBQU8sS0FBSyxDQUFMLENBQVA7QUFBZ0I7QUFETDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVyQyx1QkFBTyxJQUFQO0FBQ0QsZUFITSxDQUpUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBUDtBQVdEOztrQkFFYyxJIiwiZmlsZSI6Im9taXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwbHlUcmFuc2Zvcm0gZnJvbSAnLi4vbGliL2FwcGx5LXRyYW5zZm9ybSc7XG5pbXBvcnQgZGVjb3JhdGVNZXRob2QgZnJvbSAnLi4vbGliL2RlY29yYXRlLW1ldGhvZCc7XG5cbmZ1bmN0aW9uIG9taXQoLi4uZmllbGRzKSB7XG4gIHJldHVybiBkZWNvcmF0ZU1ldGhvZChcbiAgICBhc3luYyAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGZuKC4uLmFyZ3MpO1xuICAgICAgaWYgKHR5cGVvZih2YWx1ZS50aGVuKSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IGF3YWl0IHZhbHVlIH1cblxuICAgICAgcmV0dXJuIGFwcGx5VHJhbnNmb3JtKHZhbHVlLCAoaXRlbSkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgZmllbGRzKSB7IGRlbGV0ZSBpdGVtW2ZdIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICB9XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgb21pdDtcbiJdfQ==