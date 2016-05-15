'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorate = require('../lib/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MEMOIZE = Symbol('memoize');

var memoize = (0, _decorate2.default)(function (fn) {
  if (fn.length > 0) {
    throw new Error('Cannot memoize functions with arguments');
  }

  return function () {
    var state = this[MEMOIZE] = this[MEMOIZE] || {
      called: false,
      value: undefined
    };

    if (!state.called) {
      state.called = true;
      state.value = fn.call(this);
    }
    return state.value;
  };
});

exports.default = memoize;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL21lbW9pemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU0sVUFBVSxPQUFPLFNBQVAsQ0FBaEI7O0FBRUEsSUFBTSxVQUFVLHdCQUFTLFVBQVMsRUFBVCxFQUFhO0FBQ3BDLE1BQUksR0FBRyxNQUFILEdBQVksQ0FBaEIsRUFBbUI7QUFDakIsVUFBTSxJQUFJLEtBQUosQ0FBVSx5Q0FBVixDQUFOO0FBQ0Q7O0FBRUQsU0FBTyxZQUFXO0FBQ2hCLFFBQU0sUUFBUSxLQUFLLE9BQUwsSUFBZ0IsS0FBSyxPQUFMLEtBQWlCO0FBQzdDLGNBQVEsS0FEcUM7QUFFN0MsYUFBTztBQUZzQyxLQUEvQzs7QUFLQSxRQUFJLENBQUMsTUFBTSxNQUFYLEVBQW1CO0FBQ2pCLFlBQU0sTUFBTixHQUFlLElBQWY7QUFDQSxZQUFNLEtBQU4sR0FBYyxHQUFHLElBQUgsQ0FBUSxJQUFSLENBQWQ7QUFDRDtBQUNELFdBQU8sTUFBTSxLQUFiO0FBQ0QsR0FYRDtBQVlELENBakJlLENBQWhCOztrQkFtQmUsTyIsImZpbGUiOiJtZW1vaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlY29yYXRlIGZyb20gJy4uL2xpYi9kZWNvcmF0ZSc7XG5cbmNvbnN0IE1FTU9JWkUgPSBTeW1ib2woJ21lbW9pemUnKTtcblxuY29uc3QgbWVtb2l6ZSA9IGRlY29yYXRlKGZ1bmN0aW9uKGZuKSB7XG4gIGlmIChmbi5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbWVtb2l6ZSBmdW5jdGlvbnMgd2l0aCBhcmd1bWVudHMnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXNbTUVNT0laRV0gPSB0aGlzW01FTU9JWkVdIHx8IHtcbiAgICAgIGNhbGxlZDogZmFsc2UsXG4gICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIGlmICghc3RhdGUuY2FsbGVkKSB7XG4gICAgICBzdGF0ZS5jYWxsZWQgPSB0cnVlO1xuICAgICAgc3RhdGUudmFsdWUgPSBmbi5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGUudmFsdWU7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplO1xuIl19