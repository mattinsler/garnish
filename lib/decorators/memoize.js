'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorate = require('../lib/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MEMOIZE = Symbol('memoize');

var memoize = (0, _decorate2.default)(function (fn, target, key) {
  if (fn.length > 0) {
    throw new Error('Cannot memoize functions with arguments');
  }

  return function () {
    var objectState = this[MEMOIZE] = this[MEMOIZE] || {};
    var state = objectState[key] = objectState[key] || {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL21lbW9pemUuanMiXSwibmFtZXMiOlsiTUVNT0laRSIsIlN5bWJvbCIsIm1lbW9pemUiLCJmbiIsInRhcmdldCIsImtleSIsImxlbmd0aCIsIkVycm9yIiwib2JqZWN0U3RhdGUiLCJzdGF0ZSIsImNhbGxlZCIsInZhbHVlIiwidW5kZWZpbmVkIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFVBQVVDLE9BQU8sU0FBUCxDQUFoQjs7QUFFQSxJQUFNQyxVQUFVLHdCQUFTLFVBQVNDLEVBQVQsRUFBYUMsTUFBYixFQUFxQkMsR0FBckIsRUFBMEI7QUFDakQsTUFBSUYsR0FBR0csTUFBSCxHQUFZLENBQWhCLEVBQW1CO0FBQ2pCLFVBQU0sSUFBSUMsS0FBSixDQUFVLHlDQUFWLENBQU47QUFDRDs7QUFFRCxTQUFPLFlBQVc7QUFDaEIsUUFBTUMsY0FBYyxLQUFLUixPQUFMLElBQWdCLEtBQUtBLE9BQUwsS0FBaUIsRUFBckQ7QUFDQSxRQUFNUyxRQUFRRCxZQUFZSCxHQUFaLElBQW1CRyxZQUFZSCxHQUFaLEtBQW9CO0FBQ25ESyxjQUFRLEtBRDJDO0FBRW5EQyxhQUFPQztBQUY0QyxLQUFyRDs7QUFLQSxRQUFJLENBQUNILE1BQU1DLE1BQVgsRUFBbUI7QUFDakJELFlBQU1DLE1BQU4sR0FBZSxJQUFmO0FBQ0FELFlBQU1FLEtBQU4sR0FBY1IsR0FBR1UsSUFBSCxDQUFRLElBQVIsQ0FBZDtBQUNEO0FBQ0QsV0FBT0osTUFBTUUsS0FBYjtBQUNELEdBWkQ7QUFhRCxDQWxCZSxDQUFoQjs7a0JBb0JlVCxPIiwiZmlsZSI6Im1lbW9pemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjb3JhdGUgZnJvbSAnLi4vbGliL2RlY29yYXRlJztcblxuY29uc3QgTUVNT0laRSA9IFN5bWJvbCgnbWVtb2l6ZScpO1xuXG5jb25zdCBtZW1vaXplID0gZGVjb3JhdGUoZnVuY3Rpb24oZm4sIHRhcmdldCwga2V5KSB7XG4gIGlmIChmbi5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbWVtb2l6ZSBmdW5jdGlvbnMgd2l0aCBhcmd1bWVudHMnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBvYmplY3RTdGF0ZSA9IHRoaXNbTUVNT0laRV0gPSB0aGlzW01FTU9JWkVdIHx8IHt9O1xuICAgIGNvbnN0IHN0YXRlID0gb2JqZWN0U3RhdGVba2V5XSA9IG9iamVjdFN0YXRlW2tleV0gfHwge1xuICAgICAgY2FsbGVkOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgaWYgKCFzdGF0ZS5jYWxsZWQpIHtcbiAgICAgIHN0YXRlLmNhbGxlZCA9IHRydWU7XG4gICAgICBzdGF0ZS52YWx1ZSA9IGZuLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZS52YWx1ZTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemU7XG4iXX0=