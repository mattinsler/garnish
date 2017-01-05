'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applyTransform = require('../lib/apply-transform');

var _applyTransform2 = _interopRequireDefault(_applyTransform);

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function include() {
  var _this = this;

  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return (0, _decorateMethod2.default)(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fn) {
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
                return fields.reduce(function (o, f) {
                  o[f] = item[f];
                  return o;
                }, {});
              }));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

exports.default = include;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2luY2x1ZGUuanMiXSwibmFtZXMiOlsiaW5jbHVkZSIsImZpZWxkcyIsImZuIiwiYXJncyIsInZhbHVlIiwidGhlbiIsIml0ZW0iLCJyZWR1Y2UiLCJvIiwiZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxTQUFTQSxPQUFULEdBQTRCO0FBQUE7O0FBQUEsb0NBQVJDLE1BQVE7QUFBUkEsVUFBUTtBQUFBOztBQUMxQixTQUFPO0FBQUEseURBQ0wsaUJBQU9DLEVBQVA7QUFBQSx5Q0FBY0MsSUFBZDtBQUFjQSxZQUFkO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNNQyxtQkFETixHQUNjRixvQkFBTUMsSUFBTixDQURkOztBQUFBLG9CQUVNLE9BQU9DLE1BQU1DLElBQWIsS0FBdUIsVUFGN0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFFeURELEtBRnpEOztBQUFBO0FBRTJDQSxtQkFGM0M7O0FBQUE7QUFBQSwrQ0FJUyw4QkFBZUEsS0FBZixFQUFzQixVQUFDRSxJQUFELEVBQVU7QUFDckMsdUJBQU9MLE9BQU9NLE1BQVAsQ0FBYyxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUM3QkQsb0JBQUVDLENBQUYsSUFBT0gsS0FBS0csQ0FBTCxDQUFQO0FBQ0EseUJBQU9ELENBQVA7QUFDRCxpQkFITSxFQUdKLEVBSEksQ0FBUDtBQUlELGVBTE0sQ0FKVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURLOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUFhRDs7a0JBRWNSLE8iLCJmaWxlIjoiaW5jbHVkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHBseVRyYW5zZm9ybSBmcm9tICcuLi9saWIvYXBwbHktdHJhbnNmb3JtJztcbmltcG9ydCBkZWNvcmF0ZU1ldGhvZCBmcm9tICcuLi9saWIvZGVjb3JhdGUtbWV0aG9kJztcblxuZnVuY3Rpb24gaW5jbHVkZSguLi5maWVsZHMpIHtcbiAgcmV0dXJuIGRlY29yYXRlTWV0aG9kKFxuICAgIGFzeW5jIChmbiwgLi4uYXJncykgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZm4oLi4uYXJncyk7XG4gICAgICBpZiAodHlwZW9mKHZhbHVlLnRoZW4pID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gYXdhaXQgdmFsdWUgfVxuXG4gICAgICByZXR1cm4gYXBwbHlUcmFuc2Zvcm0odmFsdWUsIChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBmaWVsZHMucmVkdWNlKChvLCBmKSA9PiB7XG4gICAgICAgICAgb1tmXSA9IGl0ZW1bZl07XG4gICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH0sIHt9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbmNsdWRlO1xuIl19