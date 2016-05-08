'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorate = require('../lib/decorate');

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var memoize = (0, _decorate2.default)(function (fn) {
  if (fn.length > 0) {
    throw new Error('Cannot memoize functions with arguments');
  }

  var memoizedValue = void 0;

  return function () {
    if (!memoizedValue) {
      memoizedValue = fn.call(this);
    }
    return memoizedValue;
  };
});

exports.default = memoize;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL21lbW9pemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU0sVUFBVSx3QkFBUyxVQUFTLEVBQVQsRUFBYTtBQUNwQyxNQUFJLEdBQUcsTUFBSCxHQUFZLENBQWhCLEVBQW1CO0FBQ2pCLFVBQU0sSUFBSSxLQUFKLENBQVUseUNBQVYsQ0FBTjtBQUNEOztBQUVELE1BQUksc0JBQUo7O0FBRUEsU0FBTyxZQUFXO0FBQ2hCLFFBQUksQ0FBQyxhQUFMLEVBQW9CO0FBQUUsc0JBQWdCLEdBQUcsSUFBSCxDQUFRLElBQVIsQ0FBaEI7QUFBK0I7QUFDckQsV0FBTyxhQUFQO0FBQ0QsR0FIRDtBQUlELENBWGUsQ0FBaEI7O2tCQWFlLE8iLCJmaWxlIjoibWVtb2l6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWNvcmF0ZSBmcm9tICcuLi9saWIvZGVjb3JhdGUnO1xuXG5jb25zdCBtZW1vaXplID0gZGVjb3JhdGUoZnVuY3Rpb24oZm4pIHtcbiAgaWYgKGZuLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBtZW1vaXplIGZ1bmN0aW9ucyB3aXRoIGFyZ3VtZW50cycpO1xuICB9XG5cbiAgbGV0IG1lbW9pemVkVmFsdWU7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmICghbWVtb2l6ZWRWYWx1ZSkgeyBtZW1vaXplZFZhbHVlID0gZm4uY2FsbCh0aGlzKSB9XG4gICAgcmV0dXJuIG1lbW9pemVkVmFsdWU7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZW1vaXplO1xuIl19