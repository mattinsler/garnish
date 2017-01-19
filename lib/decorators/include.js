'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applyTransform = require('../lib/apply-transform');

var _applyTransform2 = _interopRequireDefault(_applyTransform);

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function include() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  function transformItem(item) {
    return fields.reduce(function (o, f) {
      o[f] = item[f];
      return o;
    }, {});
  }

  return (0, _decorateMethod2.default)(function (fn) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var value = fn.apply(undefined, args);

    if (typeof value.then === 'function') {
      return value.then(function (v) {
        return (0, _applyTransform2.default)(v, transformItem);
      });
    } else {
      return (0, _applyTransform2.default)(value, transformItem);
    }
  });
}

exports.default = include;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2luY2x1ZGUuanMiXSwibmFtZXMiOlsiaW5jbHVkZSIsImZpZWxkcyIsInRyYW5zZm9ybUl0ZW0iLCJpdGVtIiwicmVkdWNlIiwibyIsImYiLCJmbiIsImFyZ3MiLCJ2YWx1ZSIsInRoZW4iLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxPQUFULEdBQTRCO0FBQUEsb0NBQVJDLE1BQVE7QUFBUkEsVUFBUTtBQUFBOztBQUMxQixXQUFTQyxhQUFULENBQXVCQyxJQUF2QixFQUE2QjtBQUMzQixXQUFPRixPQUFPRyxNQUFQLENBQWMsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDN0JELFFBQUVDLENBQUYsSUFBT0gsS0FBS0csQ0FBTCxDQUFQO0FBQ0EsYUFBT0QsQ0FBUDtBQUNELEtBSE0sRUFHSixFQUhJLENBQVA7QUFJRDs7QUFFRCxTQUFPLDhCQUNMLFVBQUNFLEVBQUQsRUFBaUI7QUFBQSx1Q0FBVEMsSUFBUztBQUFUQSxVQUFTO0FBQUE7O0FBQ2YsUUFBTUMsUUFBUUYsb0JBQU1DLElBQU4sQ0FBZDs7QUFFQSxRQUFJLE9BQU9DLE1BQU1DLElBQWIsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsYUFBT0QsTUFBTUMsSUFBTixDQUFXO0FBQUEsZUFBSyw4QkFBZUMsQ0FBZixFQUFrQlQsYUFBbEIsQ0FBTDtBQUFBLE9BQVgsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU8sOEJBQWVPLEtBQWYsRUFBc0JQLGFBQXRCLENBQVA7QUFDRDtBQUNGLEdBVEksQ0FBUDtBQVdEOztrQkFFY0YsTyIsImZpbGUiOiJpbmNsdWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcGx5VHJhbnNmb3JtIGZyb20gJy4uL2xpYi9hcHBseS10cmFuc2Zvcm0nO1xuaW1wb3J0IGRlY29yYXRlTWV0aG9kIGZyb20gJy4uL2xpYi9kZWNvcmF0ZS1tZXRob2QnO1xuXG5mdW5jdGlvbiBpbmNsdWRlKC4uLmZpZWxkcykge1xuICBmdW5jdGlvbiB0cmFuc2Zvcm1JdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gZmllbGRzLnJlZHVjZSgobywgZikgPT4ge1xuICAgICAgb1tmXSA9IGl0ZW1bZl07XG4gICAgICByZXR1cm4gbztcbiAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gZGVjb3JhdGVNZXRob2QoXG4gICAgKGZuLCAuLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGZuKC4uLmFyZ3MpO1xuICAgICAgXG4gICAgICBpZiAodHlwZW9mKHZhbHVlLnRoZW4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50aGVuKHYgPT4gYXBwbHlUcmFuc2Zvcm0odiwgdHJhbnNmb3JtSXRlbSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFwcGx5VHJhbnNmb3JtKHZhbHVlLCB0cmFuc2Zvcm1JdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5jbHVkZTtcbiJdfQ==