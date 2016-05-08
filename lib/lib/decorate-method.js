'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorate = require('./decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decorateMethod(decorateFn) {
  return (0, _decorate2.default)(function (fn) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return decorateFn.apply(undefined, [fn.bind(this)].concat(args));
    };
  });
}

exports.default = decorateMethod;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVjb3JhdGUtbWV0aG9kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0M7QUFDbEMsU0FBTyx3QkFBUyxVQUFTLEVBQVQsRUFBYTtBQUMzQixXQUFPLFlBQWtCO0FBQUEsd0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDdkIsYUFBTyw2QkFBVyxHQUFHLElBQUgsQ0FBUSxJQUFSLENBQVgsU0FBNkIsSUFBN0IsRUFBUDtBQUNELEtBRkQ7QUFHRCxHQUpNLENBQVA7QUFLRDs7a0JBRWMsYyIsImZpbGUiOiJkZWNvcmF0ZS1tZXRob2QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjb3JhdGUgZnJvbSAnLi9kZWNvcmF0ZSc7XG5cbmZ1bmN0aW9uIGRlY29yYXRlTWV0aG9kKGRlY29yYXRlRm4pIHtcbiAgcmV0dXJuIGRlY29yYXRlKGZ1bmN0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgIHJldHVybiBkZWNvcmF0ZUZuKGZuLmJpbmQodGhpcyksIC4uLmFyZ3MpO1xuICAgIH07XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWNvcmF0ZU1ldGhvZDtcbiJdfQ==