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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVjb3JhdGUtbWV0aG9kLmpzIl0sIm5hbWVzIjpbImRlY29yYXRlTWV0aG9kIiwiZGVjb3JhdGVGbiIsImZuIiwiYXJncyIsImJpbmQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxjQUFULENBQXdCQyxVQUF4QixFQUFvQztBQUNsQyxTQUFPLHdCQUFTLFVBQVNDLEVBQVQsRUFBYTtBQUMzQixXQUFPLFlBQWtCO0FBQUEsd0NBQU5DLElBQU07QUFBTkEsWUFBTTtBQUFBOztBQUN2QixhQUFPRiw2QkFBV0MsR0FBR0UsSUFBSCxDQUFRLElBQVIsQ0FBWCxTQUE2QkQsSUFBN0IsRUFBUDtBQUNELEtBRkQ7QUFHRCxHQUpNLENBQVA7QUFLRDs7a0JBRWNILGMiLCJmaWxlIjoiZGVjb3JhdGUtbWV0aG9kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlY29yYXRlIGZyb20gJy4vZGVjb3JhdGUnO1xuXG5mdW5jdGlvbiBkZWNvcmF0ZU1ldGhvZChkZWNvcmF0ZUZuKSB7XG4gIHJldHVybiBkZWNvcmF0ZShmdW5jdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gZGVjb3JhdGVGbihmbi5iaW5kKHRoaXMpLCAuLi5hcmdzKTtcbiAgICB9O1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVjb3JhdGVNZXRob2Q7XG4iXX0=