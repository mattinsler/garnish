"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function decorate(decorateFn) {
  return function (target, key, _ref) {
    var configurable = _ref.configurable;
    var enumerable = _ref.enumerable;
    var writable = _ref.writable;

    return {
      configurable: configurable,
      enumerable: enumerable,
      writable: writable,
      value: decorateFn(target[key], target, key)
    };
  };
}

exports.default = decorate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVjb3JhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTLFFBQVQsQ0FBa0IsVUFBbEIsRUFBOEI7QUFDNUIsU0FBTyxVQUFTLE1BQVQsRUFBaUIsR0FBakIsUUFBOEQ7QUFBQSxRQUF0QyxZQUFzQyxRQUF0QyxZQUFzQztBQUFBLFFBQXhCLFVBQXdCLFFBQXhCLFVBQXdCO0FBQUEsUUFBWixRQUFZLFFBQVosUUFBWTs7QUFDbkUsV0FBTztBQUNMLGdDQURLO0FBRUwsNEJBRks7QUFHTCx3QkFISztBQUlMLGFBQU8sV0FBVyxPQUFPLEdBQVAsQ0FBWCxFQUF3QixNQUF4QixFQUFnQyxHQUFoQztBQUpGLEtBQVA7QUFNRCxHQVBEO0FBUUQ7O2tCQUVjLFEiLCJmaWxlIjoiZGVjb3JhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0ZUZuKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgeyBjb25maWd1cmFibGUsIGVudW1lcmFibGUsIHdyaXRhYmxlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlLFxuICAgICAgZW51bWVyYWJsZSxcbiAgICAgIHdyaXRhYmxlLFxuICAgICAgdmFsdWU6IGRlY29yYXRlRm4odGFyZ2V0W2tleV0sIHRhcmdldCwga2V5KVxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlY29yYXRlO1xuIl19