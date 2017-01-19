'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applyTransform = require('../lib/apply-transform');

var _applyTransform2 = _interopRequireDefault(_applyTransform);

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function omit() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  function transformItem(item) {
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

exports.default = omit;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL29taXQuanMiXSwibmFtZXMiOlsib21pdCIsImZpZWxkcyIsInRyYW5zZm9ybUl0ZW0iLCJpdGVtIiwiZiIsImZuIiwiYXJncyIsInZhbHVlIiwidGhlbiIsInYiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLElBQVQsR0FBeUI7QUFBQSxvQ0FBUkMsTUFBUTtBQUFSQSxVQUFRO0FBQUE7O0FBQ3ZCLFdBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQzNCLDJCQUFnQkYsTUFBaEIsOEhBQXdCO0FBQUEsWUFBYkcsQ0FBYTtBQUFFLGVBQU9ELEtBQUtDLENBQUwsQ0FBUDtBQUFnQjtBQURmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRTNCLFdBQU9ELElBQVA7QUFDRDs7QUFFRCxTQUFPLDhCQUNMLFVBQUNFLEVBQUQsRUFBaUI7QUFBQSx1Q0FBVEMsSUFBUztBQUFUQSxVQUFTO0FBQUE7O0FBQ2YsUUFBTUMsUUFBUUYsb0JBQU1DLElBQU4sQ0FBZDs7QUFFQSxRQUFJLE9BQU9DLE1BQU1DLElBQWIsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsYUFBT0QsTUFBTUMsSUFBTixDQUFXO0FBQUEsZUFBSyw4QkFBZUMsQ0FBZixFQUFrQlAsYUFBbEIsQ0FBTDtBQUFBLE9BQVgsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU8sOEJBQWVLLEtBQWYsRUFBc0JMLGFBQXRCLENBQVA7QUFDRDtBQUNGLEdBVEksQ0FBUDtBQVdEOztrQkFFY0YsSSIsImZpbGUiOiJvbWl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcGx5VHJhbnNmb3JtIGZyb20gJy4uL2xpYi9hcHBseS10cmFuc2Zvcm0nO1xuaW1wb3J0IGRlY29yYXRlTWV0aG9kIGZyb20gJy4uL2xpYi9kZWNvcmF0ZS1tZXRob2QnO1xuXG5mdW5jdGlvbiBvbWl0KC4uLmZpZWxkcykge1xuICBmdW5jdGlvbiB0cmFuc2Zvcm1JdGVtKGl0ZW0pIHtcbiAgICBmb3IgKGNvbnN0IGYgb2YgZmllbGRzKSB7IGRlbGV0ZSBpdGVtW2ZdIH1cbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIHJldHVybiBkZWNvcmF0ZU1ldGhvZChcbiAgICAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZm4oLi4uYXJncyk7XG4gICAgICBcbiAgICAgIGlmICh0eXBlb2YodmFsdWUudGhlbikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRoZW4odiA9PiBhcHBseVRyYW5zZm9ybSh2LCB0cmFuc2Zvcm1JdGVtKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYXBwbHlUcmFuc2Zvcm0odmFsdWUsIHRyYW5zZm9ybUl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBvbWl0O1xuIl19