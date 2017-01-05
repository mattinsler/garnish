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

function omit() {
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

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

exports.default = omit;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL29taXQuanMiXSwibmFtZXMiOlsib21pdCIsImZpZWxkcyIsImZuIiwiYXJncyIsInZhbHVlIiwidGhlbiIsIml0ZW0iLCJmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVNBLElBQVQsR0FBeUI7QUFBQTs7QUFBQSxvQ0FBUkMsTUFBUTtBQUFSQSxVQUFRO0FBQUE7O0FBQ3ZCLFNBQU87QUFBQSx5REFDTCxpQkFBT0MsRUFBUDtBQUFBLHlDQUFjQyxJQUFkO0FBQWNBLFlBQWQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ01DLG1CQUROLEdBQ2NGLG9CQUFNQyxJQUFOLENBRGQ7O0FBQUEsb0JBRU0sT0FBT0MsTUFBTUMsSUFBYixLQUF1QixVQUY3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUV5REQsS0FGekQ7O0FBQUE7QUFFMkNBLG1CQUYzQzs7QUFBQTtBQUFBLCtDQUlTLDhCQUFlQSxLQUFmLEVBQXNCLFVBQUNFLElBQUQsRUFBVTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNyQyx1Q0FBZ0JMLE1BQWhCLDhIQUF3QjtBQUFBLHdCQUFiTSxDQUFhO0FBQUUsMkJBQU9ELEtBQUtDLENBQUwsQ0FBUDtBQUFnQjtBQURMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRXJDLHVCQUFPRCxJQUFQO0FBQ0QsZUFITSxDQUpUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBUDtBQVdEOztrQkFFY04sSSIsImZpbGUiOiJvbWl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcGx5VHJhbnNmb3JtIGZyb20gJy4uL2xpYi9hcHBseS10cmFuc2Zvcm0nO1xuaW1wb3J0IGRlY29yYXRlTWV0aG9kIGZyb20gJy4uL2xpYi9kZWNvcmF0ZS1tZXRob2QnO1xuXG5mdW5jdGlvbiBvbWl0KC4uLmZpZWxkcykge1xuICByZXR1cm4gZGVjb3JhdGVNZXRob2QoXG4gICAgYXN5bmMgKGZuLCAuLi5hcmdzKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBmbiguLi5hcmdzKTtcbiAgICAgIGlmICh0eXBlb2YodmFsdWUudGhlbikgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSBhd2FpdCB2YWx1ZSB9XG5cbiAgICAgIHJldHVybiBhcHBseVRyYW5zZm9ybSh2YWx1ZSwgKGl0ZW0pID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBmIG9mIGZpZWxkcykgeyBkZWxldGUgaXRlbVtmXSB9XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgfVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IG9taXQ7XG4iXX0=