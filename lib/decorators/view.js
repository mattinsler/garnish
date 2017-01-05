'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _applyTransform = require('../lib/apply-transform');

var _applyTransform2 = _interopRequireDefault(_applyTransform);

var _decorateMethod = require('../lib/decorate-method');

var _decorateMethod2 = _interopRequireDefault(_decorateMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function traverse(obj) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$create = _ref.create,
      create = _ref$create === undefined ? false : _ref$create;

  if (key.length === 0) {
    throw new Error('function traverse(obj, key) requires key to be an array with length > 0');
  }

  var lastKey = key.slice(-1)[0];
  if (key.length === 1) {
    return [obj, lastKey];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = key.slice(0, -1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      if (obj[k] === undefined) {
        if (create === true) {
          obj[k] = {};
        } else {
          return [undefined, undefined];
        }
      }
      obj = obj[k];
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

  return [obj, lastKey];
}

var TYPE = {
  compute: function compute(item, key, value, args) {
    var _traverse = traverse(item, key, { create: true }),
        _traverse2 = _slicedToArray(_traverse, 2),
        obj = _traverse2[0],
        lastKey = _traverse2[1];

    obj[lastKey] = value.apply(undefined, [item].concat(_toConsumableArray(args)));

    return item;
  },
  delete: function _delete(item, key) {
    var _traverse3 = traverse(item, key),
        _traverse4 = _slicedToArray(_traverse3, 2),
        obj = _traverse4[0],
        lastKey = _traverse4[1];

    if (obj) {
      delete obj[lastKey];
    }

    return item;
  },
  copy: function copy(item, key, value) {
    var _traverse5 = traverse(item, value),
        _traverse6 = _slicedToArray(_traverse5, 2),
        valueObj = _traverse6[0],
        valueLastKey = _traverse6[1];

    if (valueObj) {
      var _traverse7 = traverse(item, key, { create: true }),
          _traverse8 = _slicedToArray(_traverse7, 2),
          obj = _traverse8[0],
          lastKey = _traverse8[1];

      obj[lastKey] = valueObj[valueLastKey];
    }

    return item;
  }
};

var TYPE_ORDER = [TYPE.compute, TYPE.copy, TYPE.delete];

function decompose(key, value) {
  if (typeof value === 'function') {
    return [{ key: key, value: value, type: TYPE.compute }];
  } else if (value === 0 || value === false) {
    return [{ key: key, value: value, type: TYPE.delete }];
  } else if (typeof value === 'string') {
    if (value[0] === '!') {
      var v = value.slice(1).split('.');
      return [{ key: key, value: v, type: TYPE.copy }, { key: v, value: null, type: TYPE.delete }];
    } else {
      return [{ key: key, value: value.split('.'), type: TYPE.copy }];
    }
  } else {
    throw new Error('Unknown view type: ' + value);
  }
}

function decomposeObject() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var res = [];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.entries(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          k = _step2$value[0],
          value = _step2$value[1];

      var key = prefix.concat(k.split('.'));
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        res.push.apply(res, _toConsumableArray(decomposeObject(value, key)));
      } else {
        res.push.apply(res, _toConsumableArray(decompose(key, value)));
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return res;
}

function view() {
  var viewProjection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // extract transforms
  var transforms = decomposeObject(viewProjection);
  // order transforms (computes -> copys -> deletes)
  transforms.sort(function (l, r) {
    return TYPE_ORDER.indexOf(l.type) - TYPE_ORDER.indexOf(r.type);
  });

  return (0, _decorateMethod2.default)(function (fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var value = fn.apply(undefined, args);
    var transform = function transform(item) {
      if (item) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = transforms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var t = _step3.value;

            item = t.type(item, t.key, t.value, args);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
      return item;
    };

    if (typeof value.then === 'function') {
      return value.then(function (v) {
        return (0, _applyTransform2.default)(v, transform);
      });
    } else {
      return (0, _applyTransform2.default)(value, transform);
    }
  });
}

// view.only = function() {
//
// };

exports.default = view;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3ZpZXcuanMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJvYmoiLCJrZXkiLCJjcmVhdGUiLCJsZW5ndGgiLCJFcnJvciIsImxhc3RLZXkiLCJzbGljZSIsImsiLCJ1bmRlZmluZWQiLCJUWVBFIiwiY29tcHV0ZSIsIml0ZW0iLCJ2YWx1ZSIsImFyZ3MiLCJkZWxldGUiLCJjb3B5IiwidmFsdWVPYmoiLCJ2YWx1ZUxhc3RLZXkiLCJUWVBFX09SREVSIiwiZGVjb21wb3NlIiwidHlwZSIsInYiLCJzcGxpdCIsImRlY29tcG9zZU9iamVjdCIsInByZWZpeCIsInJlcyIsIk9iamVjdCIsImVudHJpZXMiLCJjb25jYXQiLCJwdXNoIiwidmlldyIsInZpZXdQcm9qZWN0aW9uIiwidHJhbnNmb3JtcyIsInNvcnQiLCJsIiwiciIsImluZGV4T2YiLCJmbiIsInRyYW5zZm9ybSIsInQiLCJ0aGVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxTQUFTQSxRQUFULENBQWtCQyxHQUFsQixFQUEwRDtBQUFBLE1BQW5DQyxHQUFtQyx1RUFBN0IsRUFBNkI7O0FBQUEsaUZBQUosRUFBSTtBQUFBLHlCQUF2QkMsTUFBdUI7QUFBQSxNQUF2QkEsTUFBdUIsK0JBQWQsS0FBYzs7QUFDeEQsTUFBSUQsSUFBSUUsTUFBSixLQUFlLENBQW5CLEVBQXNCO0FBQUUsVUFBTSxJQUFJQyxLQUFKLENBQVUseUVBQVYsQ0FBTjtBQUE2Rjs7QUFFckgsTUFBTUMsVUFBVUosSUFBSUssS0FBSixDQUFVLENBQUMsQ0FBWCxFQUFjLENBQWQsQ0FBaEI7QUFDQSxNQUFJTCxJQUFJRSxNQUFKLEtBQWUsQ0FBbkIsRUFBc0I7QUFBRSxXQUFPLENBQUNILEdBQUQsRUFBTUssT0FBTixDQUFQO0FBQXdCOztBQUpRO0FBQUE7QUFBQTs7QUFBQTtBQU14RCx5QkFBZ0JKLElBQUlLLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBQyxDQUFkLENBQWhCLDhIQUFrQztBQUFBLFVBQXZCQyxDQUF1Qjs7QUFDaEMsVUFBSVAsSUFBSU8sQ0FBSixNQUFXQyxTQUFmLEVBQTBCO0FBQ3hCLFlBQUlOLFdBQVcsSUFBZixFQUFxQjtBQUNuQkYsY0FBSU8sQ0FBSixJQUFTLEVBQVQ7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxDQUFDQyxTQUFELEVBQVlBLFNBQVosQ0FBUDtBQUNEO0FBQ0Y7QUFDRFIsWUFBTUEsSUFBSU8sQ0FBSixDQUFOO0FBQ0Q7QUFmdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQnhELFNBQU8sQ0FBQ1AsR0FBRCxFQUFNSyxPQUFOLENBQVA7QUFDRDs7QUFFRCxJQUFNSSxPQUFPO0FBQ1hDLFNBRFcsbUJBQ0hDLElBREcsRUFDR1YsR0FESCxFQUNRVyxLQURSLEVBQ2VDLElBRGYsRUFDcUI7QUFBQSxvQkFDUGQsU0FBU1ksSUFBVCxFQUFlVixHQUFmLEVBQW9CLEVBQUVDLFFBQVEsSUFBVixFQUFwQixDQURPO0FBQUE7QUFBQSxRQUN2QkYsR0FEdUI7QUFBQSxRQUNsQkssT0FEa0I7O0FBRTlCTCxRQUFJSyxPQUFKLElBQWVPLHdCQUFNRCxJQUFOLDRCQUFlRSxJQUFmLEdBQWY7O0FBRUEsV0FBT0YsSUFBUDtBQUNELEdBTlU7QUFRWEcsUUFSVyxtQkFRSkgsSUFSSSxFQVFFVixHQVJGLEVBUU87QUFBQSxxQkFDT0YsU0FBU1ksSUFBVCxFQUFlVixHQUFmLENBRFA7QUFBQTtBQUFBLFFBQ1RELEdBRFM7QUFBQSxRQUNKSyxPQURJOztBQUVoQixRQUFJTCxHQUFKLEVBQVM7QUFDUCxhQUFPQSxJQUFJSyxPQUFKLENBQVA7QUFDRDs7QUFFRCxXQUFPTSxJQUFQO0FBQ0QsR0FmVTtBQWlCWEksTUFqQlcsZ0JBaUJOSixJQWpCTSxFQWlCQVYsR0FqQkEsRUFpQktXLEtBakJMLEVBaUJZO0FBQUEscUJBQ1liLFNBQVNZLElBQVQsRUFBZUMsS0FBZixDQURaO0FBQUE7QUFBQSxRQUNkSSxRQURjO0FBQUEsUUFDSkMsWUFESTs7QUFFckIsUUFBSUQsUUFBSixFQUFjO0FBQUEsdUJBQ1dqQixTQUFTWSxJQUFULEVBQWVWLEdBQWYsRUFBb0IsRUFBRUMsUUFBUSxJQUFWLEVBQXBCLENBRFg7QUFBQTtBQUFBLFVBQ0xGLEdBREs7QUFBQSxVQUNBSyxPQURBOztBQUVaTCxVQUFJSyxPQUFKLElBQWVXLFNBQVNDLFlBQVQsQ0FBZjtBQUNEOztBQUVELFdBQU9OLElBQVA7QUFDRDtBQXpCVSxDQUFiOztBQTRCQSxJQUFNTyxhQUFhLENBQUNULEtBQUtDLE9BQU4sRUFBZUQsS0FBS00sSUFBcEIsRUFBMEJOLEtBQUtLLE1BQS9CLENBQW5COztBQUVBLFNBQVNLLFNBQVQsQ0FBbUJsQixHQUFuQixFQUF3QlcsS0FBeEIsRUFBK0I7QUFDN0IsTUFBSSxPQUFPQSxLQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQ2hDLFdBQU8sQ0FBQyxFQUFFWCxRQUFGLEVBQU9XLFlBQVAsRUFBY1EsTUFBTVgsS0FBS0MsT0FBekIsRUFBRCxDQUFQO0FBQ0QsR0FGRCxNQUVPLElBQUlFLFVBQVUsQ0FBVixJQUFlQSxVQUFVLEtBQTdCLEVBQW9DO0FBQ3pDLFdBQU8sQ0FBQyxFQUFFWCxRQUFGLEVBQU9XLFlBQVAsRUFBY1EsTUFBTVgsS0FBS0ssTUFBekIsRUFBRCxDQUFQO0FBQ0QsR0FGTSxNQUVBLElBQUksT0FBT0YsS0FBUCxLQUFrQixRQUF0QixFQUFnQztBQUNyQyxRQUFJQSxNQUFNLENBQU4sTUFBYSxHQUFqQixFQUFzQjtBQUNwQixVQUFNUyxJQUFJVCxNQUFNTixLQUFOLENBQVksQ0FBWixFQUFlZ0IsS0FBZixDQUFxQixHQUFyQixDQUFWO0FBQ0EsYUFBTyxDQUNMLEVBQUVyQixRQUFGLEVBQU9XLE9BQU9TLENBQWQsRUFBaUJELE1BQU1YLEtBQUtNLElBQTVCLEVBREssRUFFTCxFQUFFZCxLQUFLb0IsQ0FBUCxFQUFVVCxPQUFPLElBQWpCLEVBQXVCUSxNQUFNWCxLQUFLSyxNQUFsQyxFQUZLLENBQVA7QUFJRCxLQU5ELE1BTU87QUFDTCxhQUFPLENBQUMsRUFBRWIsUUFBRixFQUFPVyxPQUFPQSxNQUFNVSxLQUFOLENBQVksR0FBWixDQUFkLEVBQWdDRixNQUFNWCxLQUFLTSxJQUEzQyxFQUFELENBQVA7QUFDRDtBQUNGLEdBVk0sTUFVQTtBQUNMLFVBQU0sSUFBSVgsS0FBSix5QkFBZ0NRLEtBQWhDLENBQU47QUFDRDtBQUNGOztBQUVELFNBQVNXLGVBQVQsR0FBZ0Q7QUFBQSxNQUF2QnZCLEdBQXVCLHVFQUFqQixFQUFpQjtBQUFBLE1BQWJ3QixNQUFhLHVFQUFKLEVBQUk7O0FBQzlDLE1BQU1DLE1BQU0sRUFBWjs7QUFEOEM7QUFBQTtBQUFBOztBQUFBO0FBRzlDLDBCQUF5QkMsT0FBT0MsT0FBUCxDQUFlM0IsR0FBZixDQUF6QixtSUFBOEM7QUFBQTtBQUFBLFVBQWxDTyxDQUFrQztBQUFBLFVBQS9CSyxLQUErQjs7QUFDNUMsVUFBTVgsTUFBTXVCLE9BQU9JLE1BQVAsQ0FBY3JCLEVBQUVlLEtBQUYsQ0FBUSxHQUFSLENBQWQsQ0FBWjtBQUNBLFVBQUksUUFBT1YsS0FBUCx5Q0FBT0EsS0FBUCxPQUFrQixRQUF0QixFQUFnQztBQUM5QmEsWUFBSUksSUFBSiwrQkFBWU4sZ0JBQWdCWCxLQUFoQixFQUF1QlgsR0FBdkIsQ0FBWjtBQUNELE9BRkQsTUFFTztBQUNMd0IsWUFBSUksSUFBSiwrQkFBWVYsVUFBVWxCLEdBQVYsRUFBZVcsS0FBZixDQUFaO0FBQ0Q7QUFDRjtBQVY2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVk5QyxTQUFPYSxHQUFQO0FBQ0Q7O0FBRUQsU0FBU0ssSUFBVCxHQUFtQztBQUFBLE1BQXJCQyxjQUFxQix1RUFBSixFQUFJOztBQUNqQztBQUNBLE1BQU1DLGFBQWFULGdCQUFnQlEsY0FBaEIsQ0FBbkI7QUFDQTtBQUNBQyxhQUFXQyxJQUFYLENBQWdCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVVqQixXQUFXa0IsT0FBWCxDQUFtQkYsRUFBRWQsSUFBckIsSUFBNkJGLFdBQVdrQixPQUFYLENBQW1CRCxFQUFFZixJQUFyQixDQUF2QztBQUFBLEdBQWhCOztBQUVBLFNBQU8sOEJBQ0wsVUFBQ2lCLEVBQUQsRUFBaUI7QUFBQSxzQ0FBVHhCLElBQVM7QUFBVEEsVUFBUztBQUFBOztBQUNmLFFBQU1ELFFBQVF5QixvQkFBTXhCLElBQU4sQ0FBZDtBQUNBLFFBQU15QixZQUFZLFNBQVpBLFNBQVksQ0FBQzNCLElBQUQsRUFBVTtBQUMxQixVQUFJQSxJQUFKLEVBQVU7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDUixnQ0FBZ0JxQixVQUFoQixtSUFBNEI7QUFBQSxnQkFBakJPLENBQWlCOztBQUMxQjVCLG1CQUFPNEIsRUFBRW5CLElBQUYsQ0FBT1QsSUFBUCxFQUFhNEIsRUFBRXRDLEdBQWYsRUFBb0JzQyxFQUFFM0IsS0FBdEIsRUFBNkJDLElBQTdCLENBQVA7QUFDRDtBQUhPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJVDtBQUNELGFBQU9GLElBQVA7QUFDRCxLQVBEOztBQVNBLFFBQUksT0FBT0MsTUFBTTRCLElBQWIsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsYUFBTzVCLE1BQU00QixJQUFOLENBQVcsVUFBQ25CLENBQUQ7QUFBQSxlQUFPLDhCQUFlQSxDQUFmLEVBQWtCaUIsU0FBbEIsQ0FBUDtBQUFBLE9BQVgsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU8sOEJBQWUxQixLQUFmLEVBQXNCMEIsU0FBdEIsQ0FBUDtBQUNEO0FBQ0YsR0FqQkksQ0FBUDtBQW1CRDs7QUFFRDtBQUNBO0FBQ0E7O2tCQUVlUixJIiwiZmlsZSI6InZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwbHlUcmFuc2Zvcm0gZnJvbSAnLi4vbGliL2FwcGx5LXRyYW5zZm9ybSc7XG5pbXBvcnQgZGVjb3JhdGVNZXRob2QgZnJvbSAnLi4vbGliL2RlY29yYXRlLW1ldGhvZCc7XG5cbmZ1bmN0aW9uIHRyYXZlcnNlKG9iaiwga2V5ID0gW10sIHsgY3JlYXRlID0gZmFsc2UgfSA9IHt9KSB7XG4gIGlmIChrZXkubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBFcnJvcignZnVuY3Rpb24gdHJhdmVyc2Uob2JqLCBrZXkpIHJlcXVpcmVzIGtleSB0byBiZSBhbiBhcnJheSB3aXRoIGxlbmd0aCA+IDAnKTsgfVxuXG4gIGNvbnN0IGxhc3RLZXkgPSBrZXkuc2xpY2UoLTEpWzBdO1xuICBpZiAoa2V5Lmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gW29iaiwgbGFzdEtleV07IH1cblxuICBmb3IgKGNvbnN0IGsgb2Yga2V5LnNsaWNlKDAsIC0xKSkge1xuICAgIGlmIChvYmpba10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNyZWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvYmpba10gPSB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdO1xuICAgICAgfVxuICAgIH1cbiAgICBvYmogPSBvYmpba107XG4gIH1cblxuICByZXR1cm4gW29iaiwgbGFzdEtleV07XG59XG5cbmNvbnN0IFRZUEUgPSB7XG4gIGNvbXB1dGUoaXRlbSwga2V5LCB2YWx1ZSwgYXJncykge1xuICAgIGNvbnN0IFtvYmosIGxhc3RLZXldID0gdHJhdmVyc2UoaXRlbSwga2V5LCB7IGNyZWF0ZTogdHJ1ZSB9KTtcbiAgICBvYmpbbGFzdEtleV0gPSB2YWx1ZShpdGVtLCAuLi5hcmdzKTtcblxuICAgIHJldHVybiBpdGVtO1xuICB9LFxuXG4gIGRlbGV0ZShpdGVtLCBrZXkpIHtcbiAgICBjb25zdCBbb2JqLCBsYXN0S2V5XSA9IHRyYXZlcnNlKGl0ZW0sIGtleSk7XG4gICAgaWYgKG9iaikge1xuICAgICAgZGVsZXRlIG9ialtsYXN0S2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbTtcbiAgfSxcblxuICBjb3B5KGl0ZW0sIGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBbdmFsdWVPYmosIHZhbHVlTGFzdEtleV0gPSB0cmF2ZXJzZShpdGVtLCB2YWx1ZSk7XG4gICAgaWYgKHZhbHVlT2JqKSB7XG4gICAgICBjb25zdCBbb2JqLCBsYXN0S2V5XSA9IHRyYXZlcnNlKGl0ZW0sIGtleSwgeyBjcmVhdGU6IHRydWUgfSk7XG4gICAgICBvYmpbbGFzdEtleV0gPSB2YWx1ZU9ialt2YWx1ZUxhc3RLZXldO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9XG59XG5cbmNvbnN0IFRZUEVfT1JERVIgPSBbVFlQRS5jb21wdXRlLCBUWVBFLmNvcHksIFRZUEUuZGVsZXRlXTtcblxuZnVuY3Rpb24gZGVjb21wb3NlKGtleSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZih2YWx1ZSkgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gW3sga2V5LCB2YWx1ZSwgdHlwZTogVFlQRS5jb21wdXRlIH1dO1xuICB9IGVsc2UgaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgIHJldHVybiBbeyBrZXksIHZhbHVlLCB0eXBlOiBUWVBFLmRlbGV0ZSB9XTtcbiAgfSBlbHNlIGlmICh0eXBlb2YodmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgIGlmICh2YWx1ZVswXSA9PT0gJyEnKSB7XG4gICAgICBjb25zdCB2ID0gdmFsdWUuc2xpY2UoMSkuc3BsaXQoJy4nKTtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHsga2V5LCB2YWx1ZTogdiwgdHlwZTogVFlQRS5jb3B5IH0sXG4gICAgICAgIHsga2V5OiB2LCB2YWx1ZTogbnVsbCwgdHlwZTogVFlQRS5kZWxldGUgfVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt7IGtleSwgdmFsdWU6IHZhbHVlLnNwbGl0KCcuJyksIHR5cGU6IFRZUEUuY29weSB9XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHZpZXcgdHlwZTogJHt2YWx1ZX1gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VPYmplY3Qob2JqID0ge30sIHByZWZpeCA9IFtdKSB7XG4gIGNvbnN0IHJlcyA9IFtdO1xuXG4gIGZvciAoY29uc3QgW2ssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XG4gICAgY29uc3Qga2V5ID0gcHJlZml4LmNvbmNhdChrLnNwbGl0KCcuJykpO1xuICAgIGlmICh0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzLnB1c2goLi4uZGVjb21wb3NlT2JqZWN0KHZhbHVlLCBrZXkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLnB1c2goLi4uZGVjb21wb3NlKGtleSwgdmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiB2aWV3KHZpZXdQcm9qZWN0aW9uID0ge30pIHtcbiAgLy8gZXh0cmFjdCB0cmFuc2Zvcm1zXG4gIGNvbnN0IHRyYW5zZm9ybXMgPSBkZWNvbXBvc2VPYmplY3Qodmlld1Byb2plY3Rpb24pO1xuICAvLyBvcmRlciB0cmFuc2Zvcm1zIChjb21wdXRlcyAtPiBjb3B5cyAtPiBkZWxldGVzKVxuICB0cmFuc2Zvcm1zLnNvcnQoKGwsIHIpID0+IFRZUEVfT1JERVIuaW5kZXhPZihsLnR5cGUpIC0gVFlQRV9PUkRFUi5pbmRleE9mKHIudHlwZSkpO1xuXG4gIHJldHVybiBkZWNvcmF0ZU1ldGhvZChcbiAgICAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZm4oLi4uYXJncyk7XG4gICAgICBjb25zdCB0cmFuc2Zvcm0gPSAoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIGZvciAoY29uc3QgdCBvZiB0cmFuc2Zvcm1zKSB7XG4gICAgICAgICAgICBpdGVtID0gdC50eXBlKGl0ZW0sIHQua2V5LCB0LnZhbHVlLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9O1xuXG4gICAgICBpZiAodHlwZW9mKHZhbHVlLnRoZW4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50aGVuKCh2KSA9PiBhcHBseVRyYW5zZm9ybSh2LCB0cmFuc2Zvcm0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcHBseVRyYW5zZm9ybSh2YWx1ZSwgdHJhbnNmb3JtKTtcbiAgICAgIH1cbiAgICB9XG4gIClcbn1cblxuLy8gdmlldy5vbmx5ID0gZnVuY3Rpb24oKSB7XG4vL1xuLy8gfTtcblxuZXhwb3J0IGRlZmF1bHQgdmlldztcbiJdfQ==