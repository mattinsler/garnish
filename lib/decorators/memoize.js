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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL21lbW9pemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU0sVUFBVSxPQUFPLFNBQVAsQ0FBaEI7O0FBRUEsSUFBTSxVQUFVLHdCQUFTLFVBQVMsRUFBVCxFQUFhLE1BQWIsRUFBcUIsR0FBckIsRUFBMEI7QUFDakQsTUFBSSxHQUFHLE1BQUgsR0FBWSxDQUFoQixFQUFtQjtBQUNqQixVQUFNLElBQUksS0FBSixDQUFVLHlDQUFWLENBQU47QUFDRDs7QUFFRCxTQUFPLFlBQVc7QUFDaEIsUUFBTSxjQUFjLEtBQUssT0FBTCxJQUFnQixLQUFLLE9BQUwsS0FBaUIsRUFBckQ7QUFDQSxRQUFNLFFBQVEsWUFBWSxHQUFaLElBQW1CLFlBQVksR0FBWixLQUFvQjtBQUNuRCxjQUFRLEtBRDJDO0FBRW5ELGFBQU87QUFGNEMsS0FBckQ7O0FBS0EsUUFBSSxDQUFDLE1BQU0sTUFBWCxFQUFtQjtBQUNqQixZQUFNLE1BQU4sR0FBZSxJQUFmO0FBQ0EsWUFBTSxLQUFOLEdBQWMsR0FBRyxJQUFILENBQVEsSUFBUixDQUFkO0FBQ0Q7QUFDRCxXQUFPLE1BQU0sS0FBYjtBQUNELEdBWkQ7QUFhRCxDQWxCZSxDQUFoQjs7a0JBb0JlLE8iLCJmaWxlIjoibWVtb2l6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWNvcmF0ZSBmcm9tICcuLi9saWIvZGVjb3JhdGUnO1xuXG5jb25zdCBNRU1PSVpFID0gU3ltYm9sKCdtZW1vaXplJyk7XG5cbmNvbnN0IG1lbW9pemUgPSBkZWNvcmF0ZShmdW5jdGlvbihmbiwgdGFyZ2V0LCBrZXkpIHtcbiAgaWYgKGZuLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBtZW1vaXplIGZ1bmN0aW9ucyB3aXRoIGFyZ3VtZW50cycpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG9iamVjdFN0YXRlID0gdGhpc1tNRU1PSVpFXSA9IHRoaXNbTUVNT0laRV0gfHwge307XG4gICAgY29uc3Qgc3RhdGUgPSBvYmplY3RTdGF0ZVtrZXldID0gb2JqZWN0U3RhdGVba2V5XSB8fCB7XG4gICAgICBjYWxsZWQ6IGZhbHNlLFxuICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBpZiAoIXN0YXRlLmNhbGxlZCkge1xuICAgICAgc3RhdGUuY2FsbGVkID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnZhbHVlID0gZm4uY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlLnZhbHVlO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbiJdfQ==