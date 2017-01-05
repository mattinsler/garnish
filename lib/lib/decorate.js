"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function decorate(decorateFn) {
  return function (target, key, _ref) {
    var configurable = _ref.configurable,
        enumerable = _ref.enumerable,
        writable = _ref.writable;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVjb3JhdGUuanMiXSwibmFtZXMiOlsiZGVjb3JhdGUiLCJkZWNvcmF0ZUZuIiwidGFyZ2V0Iiwia2V5IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsUUFBVCxDQUFrQkMsVUFBbEIsRUFBOEI7QUFDNUIsU0FBTyxVQUFTQyxNQUFULEVBQWlCQyxHQUFqQixRQUE4RDtBQUFBLFFBQXRDQyxZQUFzQyxRQUF0Q0EsWUFBc0M7QUFBQSxRQUF4QkMsVUFBd0IsUUFBeEJBLFVBQXdCO0FBQUEsUUFBWkMsUUFBWSxRQUFaQSxRQUFZOztBQUNuRSxXQUFPO0FBQ0xGLGdDQURLO0FBRUxDLDRCQUZLO0FBR0xDLHdCQUhLO0FBSUxDLGFBQU9OLFdBQVdDLE9BQU9DLEdBQVAsQ0FBWCxFQUF3QkQsTUFBeEIsRUFBZ0NDLEdBQWhDO0FBSkYsS0FBUDtBQU1ELEdBUEQ7QUFRRDs7a0JBRWNILFEiLCJmaWxlIjoiZGVjb3JhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0ZUZuKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGtleSwgeyBjb25maWd1cmFibGUsIGVudW1lcmFibGUsIHdyaXRhYmxlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlLFxuICAgICAgZW51bWVyYWJsZSxcbiAgICAgIHdyaXRhYmxlLFxuICAgICAgdmFsdWU6IGRlY29yYXRlRm4odGFyZ2V0W2tleV0sIHRhcmdldCwga2V5KVxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlY29yYXRlO1xuIl19