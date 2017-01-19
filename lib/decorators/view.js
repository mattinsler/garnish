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

    function transformItem(item) {
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

// view.only = function() {
//
// };

exports.default = view;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL3ZpZXcuanMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJvYmoiLCJrZXkiLCJjcmVhdGUiLCJsZW5ndGgiLCJFcnJvciIsImxhc3RLZXkiLCJzbGljZSIsImsiLCJ1bmRlZmluZWQiLCJUWVBFIiwiY29tcHV0ZSIsIml0ZW0iLCJ2YWx1ZSIsImFyZ3MiLCJkZWxldGUiLCJjb3B5IiwidmFsdWVPYmoiLCJ2YWx1ZUxhc3RLZXkiLCJUWVBFX09SREVSIiwiZGVjb21wb3NlIiwidHlwZSIsInYiLCJzcGxpdCIsImRlY29tcG9zZU9iamVjdCIsInByZWZpeCIsInJlcyIsIk9iamVjdCIsImVudHJpZXMiLCJjb25jYXQiLCJwdXNoIiwidmlldyIsInZpZXdQcm9qZWN0aW9uIiwidHJhbnNmb3JtcyIsInNvcnQiLCJsIiwiciIsImluZGV4T2YiLCJmbiIsInRyYW5zZm9ybUl0ZW0iLCJ0IiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsU0FBU0EsUUFBVCxDQUFrQkMsR0FBbEIsRUFBMEQ7QUFBQSxNQUFuQ0MsR0FBbUMsdUVBQTdCLEVBQTZCOztBQUFBLGlGQUFKLEVBQUk7QUFBQSx5QkFBdkJDLE1BQXVCO0FBQUEsTUFBdkJBLE1BQXVCLCtCQUFkLEtBQWM7O0FBQ3hELE1BQUlELElBQUlFLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUFFLFVBQU0sSUFBSUMsS0FBSixDQUFVLHlFQUFWLENBQU47QUFBNkY7O0FBRXJILE1BQU1DLFVBQVVKLElBQUlLLEtBQUosQ0FBVSxDQUFDLENBQVgsRUFBYyxDQUFkLENBQWhCO0FBQ0EsTUFBSUwsSUFBSUUsTUFBSixLQUFlLENBQW5CLEVBQXNCO0FBQUUsV0FBTyxDQUFDSCxHQUFELEVBQU1LLE9BQU4sQ0FBUDtBQUF3Qjs7QUFKUTtBQUFBO0FBQUE7O0FBQUE7QUFNeEQseUJBQWdCSixJQUFJSyxLQUFKLENBQVUsQ0FBVixFQUFhLENB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QixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVakIsV0FBV2tCLE9BQVgsQ0FBbUJGLEVBQUVkLElBQXJCLElBQTZCRixXQUFXa0IsT0FBWCxDQUFtQkQsRUFBRWYsSUFBckIsQ0FBdkM7QUFBQSxHQUFoQjs7QUFFQSxTQUFPLDhCQUNMLFVBQUNpQixFQUFELEVBQWlCO0FBQUEsc0NBQVR4QixJQUFTO0FBQVRBLFVBQVM7QUFBQTs7QUFDZixhQUFTeUIsYUFBVCxDQUF1QjNCLElBQXZCLEVBQTZCO0FBQzNCLFVBQUlBLElBQUosRUFBVTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNSLGdDQUFnQnFCLFVBQWhCLG1JQUE0QjtBQUFBLGdCQUFqQk8sQ0FBaUI7O0FBQzFCNUIsbUJBQU80QixFQUFFbkIsSUFBRixDQUFPVCxJQUFQLEVBQWE0QixFQUFFdEMsR0FBZixFQUFvQnNDLEVBQUUzQixLQUF0QixFQUE2QkMsSUFBN0IsQ0FBUDtBQUNEO0FBSE87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlUO0FBQ0QsYUFBT0YsSUFBUDtBQUNEOztBQUVELFFBQU1DLFFBQVF5QixvQkFBTXhCLElBQU4sQ0FBZDs7QUFFQSxRQUFJLE9BQU9ELE1BQU00QixJQUFiLEtBQXVCLFVBQTNCLEVBQXVDO0FBQ3JDLGFBQU81QixNQUFNNEIsSUFBTixDQUFXO0FBQUEsZUFBSyw4QkFBZW5CLENBQWYsRUFBa0JpQixhQUFsQixDQUFMO0FBQUEsT0FBWCxDQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyw4QkFBZTFCLEtBQWYsRUFBc0IwQixhQUF0QixDQUFQO0FBQ0Q7QUFDRixHQWxCSSxDQUFQO0FBb0JEOztBQUVEO0FBQ0E7QUFDQTs7a0JBRWVSLEkiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHBseVRyYW5zZm9ybSBmcm9tICcuLi9saWIvYXBwbHktdHJhbnNmb3JtJztcbmltcG9ydCBkZWNvcmF0ZU1ldGhvZCBmcm9tICcuLi9saWIvZGVjb3JhdGUtbWV0aG9kJztcblxuZnVuY3Rpb24gdHJhdmVyc2Uob2JqLCBrZXkgPSBbXSwgeyBjcmVhdGUgPSBmYWxzZSB9ID0ge30pIHtcbiAgaWYgKGtleS5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbiB0cmF2ZXJzZShvYmosIGtleSkgcmVxdWlyZXMga2V5IHRvIGJlIGFuIGFycmF5IHdpdGggbGVuZ3RoID4gMCcpOyB9XG5cbiAgY29uc3QgbGFzdEtleSA9IGtleS5zbGljZSgtMSlbMF07XG4gIGlmIChrZXkubGVuZ3RoID09PSAxKSB7IHJldHVybiBbb2JqLCBsYXN0S2V5XTsgfVxuXG4gIGZvciAoY29uc3QgayBvZiBrZXkuc2xpY2UoMCwgLTEpKSB7XG4gICAgaWYgKG9ialtrXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY3JlYXRlID09PSB0cnVlKSB7XG4gICAgICAgIG9ialtrXSA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWQsIHVuZGVmaW5lZF07XG4gICAgICB9XG4gICAgfVxuICAgIG9iaiA9IG9ialtrXTtcbiAgfVxuXG4gIHJldHVybiBbb2JqLCBsYXN0S2V5XTtcbn1cblxuY29uc3QgVFlQRSA9IHtcbiAgY29tcHV0ZShpdGVtLCBrZXksIHZhbHVlLCBhcmdzKSB7XG4gICAgY29uc3QgW29iaiwgbGFzdEtleV0gPSB0cmF2ZXJzZShpdGVtLCBrZXksIHsgY3JlYXRlOiB0cnVlIH0pO1xuICAgIG9ialtsYXN0S2V5XSA9IHZhbHVlKGl0ZW0sIC4uLmFyZ3MpO1xuXG4gICAgcmV0dXJuIGl0ZW07XG4gIH0sXG5cbiAgZGVsZXRlKGl0ZW0sIGtleSkge1xuICAgIGNvbnN0IFtvYmosIGxhc3RLZXldID0gdHJhdmVyc2UoaXRlbSwga2V5KTtcbiAgICBpZiAob2JqKSB7XG4gICAgICBkZWxldGUgb2JqW2xhc3RLZXldO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9LFxuXG4gIGNvcHkoaXRlbSwga2V5LCB2YWx1ZSkge1xuICAgIGNvbnN0IFt2YWx1ZU9iaiwgdmFsdWVMYXN0S2V5XSA9IHRyYXZlcnNlKGl0ZW0sIHZhbHVlKTtcbiAgICBpZiAodmFsdWVPYmopIHtcbiAgICAgIGNvbnN0IFtvYmosIGxhc3RLZXldID0gdHJhdmVyc2UoaXRlbSwga2V5LCB7IGNyZWF0ZTogdHJ1ZSB9KTtcbiAgICAgIG9ialtsYXN0S2V5XSA9IHZhbHVlT2JqW3ZhbHVlTGFzdEtleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbn1cblxuY29uc3QgVFlQRV9PUkRFUiA9IFtUWVBFLmNvbXB1dGUsIFRZUEUuY29weSwgVFlQRS5kZWxldGVdO1xuXG5mdW5jdGlvbiBkZWNvbXBvc2Uoa2V5LCB2YWx1ZSkge1xuICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBbeyBrZXksIHZhbHVlLCB0eXBlOiBUWVBFLmNvbXB1dGUgfV07XG4gIH0gZWxzZSBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIFt7IGtleSwgdmFsdWUsIHR5cGU6IFRZUEUuZGVsZXRlIH1dO1xuICB9IGVsc2UgaWYgKHR5cGVvZih2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHZhbHVlWzBdID09PSAnIScpIHtcbiAgICAgIGNvbnN0IHYgPSB2YWx1ZS5zbGljZSgxKS5zcGxpdCgnLicpO1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgeyBrZXksIHZhbHVlOiB2LCB0eXBlOiBUWVBFLmNvcHkgfSxcbiAgICAgICAgeyBrZXk6IHYsIHZhbHVlOiBudWxsLCB0eXBlOiBUWVBFLmRlbGV0ZSB9XG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3sga2V5LCB2YWx1ZTogdmFsdWUuc3BsaXQoJy4nKSwgdHlwZTogVFlQRS5jb3B5IH1dO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdmlldyB0eXBlOiAke3ZhbHVlfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29tcG9zZU9iamVjdChvYmogPSB7fSwgcHJlZml4ID0gW10pIHtcbiAgY29uc3QgcmVzID0gW107XG5cbiAgZm9yIChjb25zdCBbaywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcbiAgICBjb25zdCBrZXkgPSBwcmVmaXguY29uY2F0KGsuc3BsaXQoJy4nKSk7XG4gICAgaWYgKHR5cGVvZih2YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXMucHVzaCguLi5kZWNvbXBvc2VPYmplY3QodmFsdWUsIGtleSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMucHVzaCguLi5kZWNvbXBvc2Uoa2V5LCB2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHZpZXcodmlld1Byb2plY3Rpb24gPSB7fSkge1xuICAvLyBleHRyYWN0IHRyYW5zZm9ybXNcbiAgY29uc3QgdHJhbnNmb3JtcyA9IGRlY29tcG9zZU9iamVjdCh2aWV3UHJvamVjdGlvbik7XG4gIC8vIG9yZGVyIHRyYW5zZm9ybXMgKGNvbXB1dGVzIC0+IGNvcHlzIC0+IGRlbGV0ZXMpXG4gIHRyYW5zZm9ybXMuc29ydCgobCwgcikgPT4gVFlQRV9PUkRFUi5pbmRleE9mKGwudHlwZSkgLSBUWVBFX09SREVSLmluZGV4T2Yoci50eXBlKSk7XG5cbiAgcmV0dXJuIGRlY29yYXRlTWV0aG9kKFxuICAgIChmbiwgLi4uYXJncykgPT4ge1xuICAgICAgZnVuY3Rpb24gdHJhbnNmb3JtSXRlbShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgZm9yIChjb25zdCB0IG9mIHRyYW5zZm9ybXMpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0LnR5cGUoaXRlbSwgdC5rZXksIHQudmFsdWUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSBmbiguLi5hcmdzKTtcbiAgICAgIFxuICAgICAgaWYgKHR5cGVvZih2YWx1ZS50aGVuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWUudGhlbih2ID0+IGFwcGx5VHJhbnNmb3JtKHYsIHRyYW5zZm9ybUl0ZW0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhcHBseVRyYW5zZm9ybSh2YWx1ZSwgdHJhbnNmb3JtSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICApXG59XG5cbi8vIHZpZXcub25seSA9IGZ1bmN0aW9uKCkge1xuLy9cbi8vIH07XG5cbmV4cG9ydCBkZWZhdWx0IHZpZXc7XG4iXX0=