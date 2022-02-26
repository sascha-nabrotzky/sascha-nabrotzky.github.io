/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 506:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 154:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 354:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(489);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

module.exports = _inheritsLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 318:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 316:
/***/ ((module) => {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 489:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.shallowCompare = exports.validateRedirect = exports.insertParams = exports.resolve = exports.match = exports.pick = exports.startsWith = undefined;

var _invariant = __webpack_require__(128);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? 0 : (0, _invariant2.default)(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol
var match = function match(path, uri) {
  return pick([{ path: path }], uri);
};

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  var allSegments = baseSegments.concat(toSegments);
  var segments = [];
  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
};

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)

var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;

  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };
  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var paramRe = /^:(.+)/;

var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};
var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};
var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return { route: route, score: score, index: index };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri
  // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
};

////////////////////////////////////////////////////////////////////////////////
exports.startsWith = startsWith;
exports.pick = pick;
exports.match = match;
exports.resolve = resolve;
exports.insertParams = insertParams;
exports.validateRedirect = validateRedirect;
exports.shallowCompare = shallowCompare;

/***/ }),

/***/ 996:
/***/ ((module) => {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ 37:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(318);

__webpack_unused_export__ = true;
exports.dq = withPrefix;
exports.mc = withAssetPrefix;
exports.c4 = exports.ZP = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(316));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(506));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(354));

var _extends2 = _interopRequireDefault(__webpack_require__(154));

var _propTypes = _interopRequireDefault(__webpack_require__(697));

var _react = _interopRequireDefault(__webpack_require__(514));

var _reachRouter = __webpack_require__(631);

var _utils = __webpack_require__(122);

var _parsePath = __webpack_require__(752);

exports.cP = _parsePath.parsePath;
var _excluded = ["to", "getProps", "onClick", "onMouseEnter", "activeClassName", "activeStyle", "innerRef", "partiallyActive", "state", "replace", "_location"];

var isAbsolutePath = function isAbsolutePath(path) {
  return path === null || path === void 0 ? void 0 : path.startsWith("/");
};

function withPrefix(path, prefix) {
  var _ref, _prefix;

  if (prefix === void 0) {
    prefix = getGlobalBasePrefix();
  }

  if (!isLocalLink(path)) {
    return path;
  }

  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }

  var base = (_ref = (_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : getGlobalPathPrefix()) !== null && _ref !== void 0 ? _ref : "/";
  return "" + (base !== null && base !== void 0 && base.endsWith("/") ? base.slice(0, -1) : base) + (path.startsWith("/") ? path : "/" + path);
} // These global values are wrapped in typeof clauses to ensure the values exist.
// This is especially problematic in unit testing of this component.


var getGlobalPathPrefix = function getGlobalPathPrefix() {
  return  false ? 0 : "";
};

var getGlobalBasePrefix = function getGlobalBasePrefix() {
  return  false ? 0 : "";
};

var isLocalLink = function isLocalLink(path) {
  return path && !path.startsWith("http://") && !path.startsWith("https://") && !path.startsWith("//");
};

function withAssetPrefix(path) {
  return withPrefix(path, getGlobalPathPrefix());
}

function absolutify(path, current) {
  // If it's already absolute, return as-is
  if (isAbsolutePath(path)) {
    return path;
  }

  return (0, _utils.resolve)(path, current);
}

var rewriteLinkPath = function rewriteLinkPath(path, relativeTo) {
  if (typeof path === "number") {
    return path;
  }

  if (!isLocalLink(path)) {
    return path;
  }

  return isAbsolutePath(path) ? withPrefix(path) : absolutify(path, relativeTo);
};

var NavLinkPropTypes = {
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  partiallyActive: _propTypes.default.bool
}; // Set up IntersectionObserver

var createIntersectionObserver = function createIntersectionObserver(el, cb) {
  var io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (el === entry.target) {
        // Check if element is within viewport, remove listener, destroy observer, and run link callback.
        // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          io.unobserve(el);
          io.disconnect();
          cb();
        }
      }
    });
  }); // Add element to the observer

  io.observe(el);
  return {
    instance: io,
    el: el
  };
};

function GatsbyLinkLocationWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_reachRouter.Location, null, function (_ref2) {
    var location = _ref2.location;
    return /*#__PURE__*/_react.default.createElement(GatsbyLink, (0, _extends2.default)({}, props, {
      _location: location
    }));
  });
}

var GatsbyLink = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(GatsbyLink, _React$Component);

  function GatsbyLink(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // Default to no support for IntersectionObserver

    _this.defaultGetProps = function (_ref3) {
      var isPartiallyCurrent = _ref3.isPartiallyCurrent,
          isCurrent = _ref3.isCurrent;

      if (_this.props.partiallyActive ? isPartiallyCurrent : isCurrent) {
        return {
          className: [_this.props.className, _this.props.activeClassName].filter(Boolean).join(" "),
          style: (0, _extends2.default)({}, _this.props.style, _this.props.activeStyle)
        };
      }

      return null;
    };

    var IOSupported = false;

    if (typeof window !== "undefined" && window.IntersectionObserver) {
      IOSupported = true;
    }

    _this.state = {
      IOSupported: IOSupported
    };
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = GatsbyLink.prototype;

  _proto._prefetch = function _prefetch() {
    var currentPath = window.location.pathname; // reach router should have the correct state

    if (this.props._location && this.props._location.pathname) {
      currentPath = this.props._location.pathname;
    }

    var rewrittenPath = rewriteLinkPath(this.props.to, currentPath);
    var newPathName = (0, _parsePath.parsePath)(rewrittenPath).pathname; // Prefech is used to speed up next navigations. When you use it on the current navigation,
    // there could be a race-condition where Chrome uses the stale data instead of waiting for the network to complete

    if (currentPath !== newPathName) {
      ___loader.enqueue(newPathName);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Preserve non IO functionality if no support
    if (this.props.to !== prevProps.to && !this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    // Preserve non IO functionality if no support
    if (!this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.io) {
      return;
    }

    var _this$io = this.io,
        instance = _this$io.instance,
        el = _this$io.el;
    instance.unobserve(el);
    instance.disconnect();
  };

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.props.innerRef && this.props.innerRef.hasOwnProperty("current")) {
      this.props.innerRef.current = ref;
    } else if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    if (this.state.IOSupported && ref) {
      // If IO supported and element reference found, setup Observer functionality
      this.io = createIntersectionObserver(ref, function () {
        _this2._prefetch();
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        to = _this$props.to,
        _this$props$getProps = _this$props.getProps,
        getProps = _this$props$getProps === void 0 ? this.defaultGetProps : _this$props$getProps,
        _onClick = _this$props.onClick,
        _onMouseEnter = _this$props.onMouseEnter,
        $activeClassName = _this$props.activeClassName,
        $activeStyle = _this$props.activeStyle,
        $innerRef = _this$props.innerRef,
        partiallyActive = _this$props.partiallyActive,
        state = _this$props.state,
        replace = _this$props.replace,
        _location = _this$props._location,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, _excluded);

    if (false) {}

    var prefixedTo = rewriteLinkPath(to, _location.pathname);

    if (!isLocalLink(prefixedTo)) {
      return /*#__PURE__*/_react.default.createElement("a", (0, _extends2.default)({
        href: prefixedTo
      }, rest));
    }

    return /*#__PURE__*/_react.default.createElement(_reachRouter.Link, (0, _extends2.default)({
      to: prefixedTo,
      state: state,
      getProps: getProps,
      innerRef: this.handleRef,
      onMouseEnter: function onMouseEnter(e) {
        if (_onMouseEnter) {
          _onMouseEnter(e);
        }

        ___loader.hovering((0, _parsePath.parsePath)(prefixedTo).pathname);
      },
      onClick: function onClick(e) {
        if (_onClick) {
          _onClick(e);
        }

        if (e.button === 0 && // ignore right clicks
        !_this3.props.target && // let browser handle "target=_blank"
        !e.defaultPrevented && // onClick prevented default
        !e.metaKey && // ignore clicks with modifier keys...
        !e.altKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          var shouldReplace = replace;

          var isCurrent = encodeURI(prefixedTo) === _location.pathname;

          if (typeof replace !== "boolean" && isCurrent) {
            shouldReplace = true;
          } // Make sure the necessary scripts and data are
          // loaded before continuing.


          window.___navigate(prefixedTo, {
            state: state,
            replace: shouldReplace
          });
        }

        return true;
      }
    }, rest));
  };

  return GatsbyLink;
}(_react.default.Component);

GatsbyLink.propTypes = (0, _extends2.default)({}, NavLinkPropTypes, {
  onClick: _propTypes.default.func,
  to: _propTypes.default.string.isRequired,
  replace: _propTypes.default.bool,
  state: _propTypes.default.object
});

var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(GatsbyLinkLocationWrapper, (0, _extends2.default)({
    innerRef: ref
  }, props));
});

exports.ZP = _default;

var navigate = function navigate(to, options) {
  window.___navigate(rewriteLinkPath(to, window.location.pathname), options);
};

exports.c4 = navigate;

/***/ }),

/***/ 752:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.parsePath = parsePath;

function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf("?");

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}

/***/ }),

/***/ 679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;
exports.p2 = __webpack_unused_export__ = void 0;

var _scrollHandler = __webpack_require__(432);

__webpack_unused_export__ = _scrollHandler.ScrollHandler;

var _useScrollRestoration = __webpack_require__(855);

exports.p2 = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(318);

exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(506));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(354));

var React = _interopRequireWildcard(__webpack_require__(514));

var _propTypes = _interopRequireDefault(__webpack_require__(697));

var _sessionStorage = __webpack_require__(142);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";

var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);

  function ScrollHandler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;

    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;

      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };

    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };

    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));

      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;

      if (!shouldUpdateScroll) {
        return true;
      } // Hack to allow accessing this._stateStorage.


      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };

    return _this;
  }

  var _proto = ScrollHandler.prototype;

  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;

    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }

    this._isTicking = false;
  };

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
        key = _this$props$location.key,
        hash = _this$props$location.hash;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    } else if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
        hash = _this$props$location2.hash,
        key = _this$props$location2.key;
    var scrollPosition;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }
    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */


    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };

  return ScrollHandler;
}(React.Component);

exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ 142:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";

var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}

  var _proto = SessionStorage.prototype;

  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);

    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (false) {}

      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }

      return 0;
    }
  };

  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);

    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }

      if (false) {}
    }
  };

  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };

  return SessionStorage;
}();

exports.SessionStorage = SessionStorage;

/***/ }),

/***/ 855:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;

var _scrollHandler = __webpack_require__(432);

var _react = __webpack_require__(514);

var _reachRouter = __webpack_require__(631);

function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ 852:
/***/ ((module) => {

"use strict";


module.exports = Object.assign;
//# sourceMappingURL=object-assign.js.map

/***/ }),

/***/ 885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// prefer default export if available
const preferDefault=m=>m&&m.default||m;exports.components={"component---src-pages-404-js":preferDefault(__webpack_require__(616)),"component---src-pages-about-js":preferDefault(__webpack_require__(92)),"component---src-pages-contact-js":preferDefault(__webpack_require__(176)),"component---src-pages-datenschutz-js":preferDefault(__webpack_require__(30)),"component---src-pages-impressum-js":preferDefault(__webpack_require__(315)),"component---src-pages-index-js":preferDefault(__webpack_require__(143)),"component---src-pages-projects-js":preferDefault(__webpack_require__(293))};

/***/ }),

/***/ 874:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiRunner": () => (/* binding */ apiRunner),
/* harmony export */   "apiRunnerAsync": () => (/* binding */ apiRunnerAsync)
/* harmony export */ });
var plugins=[{name:'gatsby-plugin-react-helmet',plugin:__webpack_require__(814),options:{"plugins":[]}}];/* global plugins */ // During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]
const apis=__webpack_require__(120);function augmentErrorWithPlugin(plugin,err){if(plugin.name!==`default-site-plugin`){// default-site-plugin is user code and will print proper stack trace,
// so no point in annotating error message pointing out which plugin is root of the problem
err.message+=` (from plugin: ${plugin.name})`;}throw err;}function apiRunner(api,args,defaultReturn,argTransform){if(!apis[api]){console.log(`This API doesn't exist`,api);}const results=[];plugins.forEach(plugin=>{const apiFn=plugin.plugin[api];if(!apiFn){return;}try{const result=apiFn(args,plugin.options);if(result&&argTransform){args=argTransform({args,result});}// This if case keeps behaviour as before, we should allow undefined here as the api is defined
// TODO V4
if(typeof result!==`undefined`){results.push(result);}}catch(e){augmentErrorWithPlugin(plugin,e);}});return results.length?results:[defaultReturn];}async function apiRunnerAsync(api,args,defaultReturn,argTransform){if(!apis[api]){console.log(`This API doesn't exist`,api);}const results=[];for(const plugin of plugins){const apiFn=plugin.plugin[api];if(!apiFn){continue;}try{const result=await apiFn(args,plugin.options);if(result&&argTransform){args=argTransform({args,result});}// This if case keeps behaviour as before, we should allow undefined here as the api is defined
// TODO V4
if(typeof result!==`undefined`){results.push(result);}}catch(e){augmentErrorWithPlugin(plugin,e);}}return results.length?results:[defaultReturn];}

/***/ }),

/***/ 120:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Object containing options defined in `gatsby-config.js`
 * @typedef {object} pluginOptions
 */ /**
 * Replace the default server renderer. This is useful for integration with
 * Redux, css-in-js libraries, etc. that need custom setups for server
 * rendering.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {ReactNode} $0.bodyComponent The React element to be rendered as the page body
 * @param {function} $0.replaceBodyHTMLString Call this with the HTML string
 * you render. **WARNING** if multiple plugins implement this API it's the
 * last plugin that "wins". TODO implement an automated warning against this.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // From gatsby-plugin-glamor
 * const { renderToString } = require("react-dom/server")
 * const inline = require("glamor-inline")
 *
 * exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
 *   const bodyHTML = renderToString(bodyComponent)
 *   const inlinedHTML = inline(bodyHTML)
 *
 *   replaceBodyHTMLString(inlinedHTML)
 * }
 */exports.replaceRenderer=true;/**
 * Called after every page Gatsby server renders while building HTML so you can
 * set head and body components to be rendered in your `html.js`.
 *
 * Gatsby does a two-pass render for HTML. It loops through your pages first
 * rendering only the body and then takes the result body HTML string and
 * passes it as the `body` prop to your `html.js` to complete the render.
 *
 * It's often handy to be able to send custom components to your `html.js`.
 * For example, it's a very common pattern for React.js libraries that
 * support server rendering to pull out data generated during the render to
 * add to your HTML.
 *
 * Using this API over [`replaceRenderer`](#replaceRenderer) is preferable as
 * multiple plugins can implement this API where only one plugin can take
 * over server rendering. However, if your plugin requires taking over server
 * rendering then that's the one to
 * use
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {function} $0.setHeadComponents Takes an array of components as its
 * first argument which are added to the `headComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setHtmlAttributes Takes an object of props which will
 * spread into the `<html>` component.
 * @param {function} $0.setBodyAttributes Takes an object of props which will
 * spread into the `<body>` component.
 * @param {function} $0.setPreBodyComponents Takes an array of components as its
 * first argument which are added to the `preBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setPostBodyComponents Takes an array of components as its
 * first argument which are added to the `postBodyComponents` array which is passed
 * to the `html.js` component.
 * @param {function} $0.setBodyProps Takes an object of data which
 * is merged with other body props and passed to `html.js` as `bodyProps`.
 * @param {pluginOptions} pluginOptions
 * @example
 * // Import React so that you can use JSX in HeadComponents
 * const React = require("react")
 *
 * const HtmlAttributes = {
 *   lang: "en"
 * }
 *
 * const HeadComponents = [
 *   <script key="my-script" src="https://gatsby.dev/my-script" />
 * ]
 *
 * const BodyAttributes = {
 *   "data-theme": "dark"
 * }
 *
 * exports.onRenderBody = ({
 *   setHeadComponents,
 *   setHtmlAttributes,
 *   setBodyAttributes
 * }, pluginOptions) => {
 *   setHtmlAttributes(HtmlAttributes)
 *   setHeadComponents(HeadComponents)
 *   setBodyAttributes(BodyAttributes)
 * }
 */exports.onRenderBody=true;/**
 * Called after every page Gatsby server renders while building HTML so you can
 * replace head components to be rendered in your `html.js`. This is useful if
 * you need to reorder scripts or styles added by other plugins.
 * @param {object} $0
 * @param {string} $0.pathname The pathname of the page currently being rendered.
 * @param {Array<ReactNode>} $0.getHeadComponents Returns the current `headComponents` array.
 * @param {function} $0.replaceHeadComponents Takes an array of components as its
 * first argument which replace the `headComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPreBodyComponents Returns the current `preBodyComponents` array.
 *  @param {function} $0.replacePreBodyComponents Takes an array of components as its
 * first argument which replace the `preBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {Array<ReactNode>} $0.getPostBodyComponents Returns the current `postBodyComponents` array.
 *  @param {function} $0.replacePostBodyComponents Takes an array of components as its
 * first argument which replace the `postBodyComponents` array which is passed
 * to the `html.js` component. **WARNING** if multiple plugins implement this
 * API it's the last plugin that "wins".
 * @param {pluginOptions} pluginOptions
 * @example
 * // Move Typography.js styles to the top of the head section so they're loaded first.
 * exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
 *   const headComponents = getHeadComponents()
 *   headComponents.sort((x, y) => {
 *     if (x.key === 'TypographyStyle') {
 *       return -1
 *     } else if (y.key === 'TypographyStyle') {
 *       return 1
 *     }
 *     return 0
 *   })
 *   replaceHeadComponents(headComponents)
 * }
 */exports.onPreRenderHTML=true;/**
 * Allow a plugin to wrap the page element.
 *
 * This is useful for setting wrapper components around pages that won't get
 * unmounted on page changes. For setting Provider components, use [wrapRootElement](#wrapRootElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapPageElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Page" React Element built by Gatsby.
 * @param {object} $0.props Props object used by page.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const Layout = require("./src/components/layout").default
 *
 * exports.wrapPageElement = ({ element, props }) => {
 *   // props provide same data to Layout as Page element will get
 *   // including location, data, etc - you don't need to pass it
 *   return <Layout {...props}>{element}</Layout>
 * }
 */exports.wrapPageElement=true;/**
 * Allow a plugin to wrap the root element.
 *
 * This is useful to set up any Provider components that will wrap your application.
 * For setting persistent UI elements around pages use [wrapPageElement](#wrapPageElement).
 *
 * _Note:_
 * There is an equivalent hook in Gatsby's [Browser API](/docs/browser-apis/#wrapRootElement).
 * It is recommended to use both APIs together.
 * For example usage, check out [Using redux](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux).
 * @param {object} $0
 * @param {ReactNode} $0.element The "Root" React Element built by Gatsby.
 * @param {pluginOptions} pluginOptions
 * @returns {ReactNode} Wrapped element
 * @example
 * const React = require("react")
 * const { Provider } = require("react-redux")
 *
 * const createStore = require("./src/state/createStore")
 * const store = createStore()
 *
 * exports.wrapRootElement = ({ element }) => {
 *   return (
 *     <Provider store={store}>
 *       {element}
 *     </Provider>
 *   )
 * }
 */exports.wrapRootElement=true;

/***/ }),

/***/ 677:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTML)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(514);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function HTML(props){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("html",props.htmlAttributes,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("head",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{charSet:"utf-8"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{httpEquiv:"x-ua-compatible",content:"ie=edge"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1, shrink-to-fit=no"}),props.headComponents),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("body",props.bodyAttributes,props.preBodyComponents,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{key:`body`,id:"___gatsby",dangerouslySetInnerHTML:{__html:props.body}}),props.postBodyComponents));}HTML.propTypes={htmlAttributes:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),headComponents:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),bodyAttributes:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),preBodyComponents:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),body:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),postBodyComponents:(prop_types__WEBPACK_IMPORTED_MODULE_1___default().array)};

/***/ }),

/***/ 438:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "cleanPath": () => (/* binding */ cleanPath),
  "findMatchPath": () => (/* binding */ findMatchPath),
  "findPath": () => (/* binding */ findPath),
  "grabMatchParams": () => (/* binding */ grabMatchParams),
  "setMatchPaths": () => (/* binding */ setMatchPaths)
});

// EXTERNAL MODULE: ./node_modules/@gatsbyjs/reach-router/lib/utils.js
var utils = __webpack_require__(122);
;// CONCATENATED MODULE: ./.cache/strip-prefix.js
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */function stripPrefix(str,prefix=``){if(!prefix){return str;}if(str===prefix){return`/`;}if(str.startsWith(`${prefix}/`)){return str.slice(prefix.length);}return str;}
;// CONCATENATED MODULE: ./.cache/normalize-page-path.js
/* harmony default export */ const normalize_page_path = (path=>{if(path===undefined){return path;}if(path===`/`){return`/`;}if(path.charAt(path.length-1)===`/`){return path.slice(0,-1);}return path;});
;// CONCATENATED MODULE: ./.cache/redirects.json
const redirects_namespaceObject = [];
;// CONCATENATED MODULE: ./.cache/redirect-utils.js
// Convert to a map for faster lookup in maybeRedirect()
const redirectMap=new Map();const redirectIgnoreCaseMap=new Map();redirects_namespaceObject.forEach(redirect=>{if(redirect.ignoreCase){redirectIgnoreCaseMap.set(redirect.fromPath,redirect);}else{redirectMap.set(redirect.fromPath,redirect);}});function maybeGetBrowserRedirect(pathname){let redirect=redirectMap.get(pathname);if(!redirect){redirect=redirectIgnoreCaseMap.get(pathname.toLowerCase());}return redirect;}
;// CONCATENATED MODULE: ./.cache/find-path.js
const pathCache=new Map();let matchPaths=[];const trimPathname=rawPathname=>{const pathname=decodeURIComponent(rawPathname);// Remove the pathPrefix from the pathname.
const trimmedPathname=stripPrefix(pathname,decodeURIComponent(""))// Remove any hashfragment
.split(`#`)[0]// Remove search query
.split(`?`)[0];return trimmedPathname;};function absolutify(path){// If it's already absolute, return as-is
if(path.startsWith(`/`)||path.startsWith(`https://`)||path.startsWith(`http://`)){return path;}// Calculate path relative to current location, adding a trailing slash to
// match behavior of @reach/router
return new URL(path,window.location.href+(window.location.href.endsWith(`/`)?``:`/`)).pathname;}/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */const setMatchPaths=value=>{matchPaths=value;};/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */const findMatchPath=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(({path,matchPath})=>{return{path:matchPath,originalPath:path};});const path=(0,utils.pick)(pickPaths,trimmedPathname);if(path){return normalize_page_path(path.route.originalPath);}return null;};/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */const grabMatchParams=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(({path,matchPath})=>{return{path:matchPath,originalPath:path};});const path=(0,utils.pick)(pickPaths,trimmedPathname);if(path){return path.params;}return{};};// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));if(pathCache.has(trimmedPathname)){return pathCache.get(trimmedPathname);}const redirect=maybeGetBrowserRedirect(rawPathname);if(redirect){return findPath(redirect.toPath);}let foundPath=findMatchPath(trimmedPathname);if(!foundPath){foundPath=cleanPath(rawPathname);}pathCache.set(trimmedPathname,foundPath);return foundPath;};/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */const cleanPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));let foundPath=trimmedPathname;if(foundPath===`/index.html`){foundPath=`/`;}foundPath=normalize_page_path(foundPath);return foundPath;};

/***/ }),

/***/ 31:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Link": () => (/* reexport */ gatsby_link/* default */.ZP),
  "PageRenderer": () => (/* reexport */ (public_page_renderer_default())),
  "StaticQuery": () => (/* binding */ StaticQuery),
  "StaticQueryContext": () => (/* binding */ StaticQueryContext),
  "graphql": () => (/* binding */ graphql),
  "navigate": () => (/* reexport */ gatsby_link/* navigate */.c4),
  "parsePath": () => (/* reexport */ gatsby_link/* parsePath */.cP),
  "prefetchPathname": () => (/* binding */ prefetchPathname),
  "useScrollRestoration": () => (/* reexport */ gatsby_react_router_scroll/* useScrollRestoration */.p2),
  "useStaticQuery": () => (/* binding */ useStaticQuery),
  "withAssetPrefix": () => (/* reexport */ gatsby_link/* withAssetPrefix */.mc),
  "withPrefix": () => (/* reexport */ gatsby_link/* withPrefix */.dq)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/gatsby-link/index.js
var gatsby_link = __webpack_require__(37);
// EXTERNAL MODULE: ./node_modules/gatsby-react-router-scroll/index.js
var gatsby_react_router_scroll = __webpack_require__(679);
// EXTERNAL MODULE: ./.cache/public-page-renderer.js
var public_page_renderer = __webpack_require__(861);
var public_page_renderer_default = /*#__PURE__*/__webpack_require__.n(public_page_renderer);
;// CONCATENATED MODULE: ./.cache/prefetch.js
const support=function(feature){if(typeof document===`undefined`){return false;}const fakeLink=document.createElement(`link`);try{if(fakeLink.relList&&typeof fakeLink.relList.supports===`function`){return fakeLink.relList.supports(feature);}}catch(err){return false;}return false;};const linkPrefetchStrategy=function(url,options){return new Promise((resolve,reject)=>{if(typeof document===`undefined`){reject();return;}const link=document.createElement(`link`);link.setAttribute(`rel`,`prefetch`);link.setAttribute(`href`,url);Object.keys(options).forEach(key=>{link.setAttribute(key,options[key]);});link.onload=resolve;link.onerror=reject;const parentElement=document.getElementsByTagName(`head`)[0]||document.getElementsByName(`script`)[0].parentNode;parentElement.appendChild(link);});};const xhrPrefetchStrategy=function(url){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(`GET`,url,true);req.onload=()=>{if(req.status===200){resolve();}else{reject();}};req.send(null);});};const supportedPrefetchStrategy=support(`prefetch`)?linkPrefetchStrategy:xhrPrefetchStrategy;const preFetched={};const prefetch=function(url,options){return new Promise(resolve=>{if(preFetched[url]){resolve();return;}supportedPrefetchStrategy(url,options).then(()=>{resolve();preFetched[url]=true;}).catch(()=>{});// 404s are logged to the console anyway
});};/* harmony default export */ const _cache_prefetch = ((/* unused pure expression or super */ null && (prefetch)));
;// CONCATENATED MODULE: ./node_modules/mitt/dist/mitt.es.js
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ const mitt_es = (mitt);
//# sourceMappingURL=mitt.es.js.map

;// CONCATENATED MODULE: ./.cache/emitter.js
const emitter_emitter=mitt_es();/* harmony default export */ const _cache_emitter = ((/* unused pure expression or super */ null && (emitter_emitter)));
// EXTERNAL MODULE: ./.cache/find-path.js + 4 modules
var find_path = __webpack_require__(438);
;// CONCATENATED MODULE: ./.cache/loader.js
/**
 * Available resource loading statuses
 */const PageResourceStatus={/**
   * At least one of critical resources failed to load
   */Error:`error`,/**
   * Resources loaded successfully
   */Success:`success`};const preferDefault=m=>m&&m.default||m;const stripSurroundingSlashes=s=>{s=s[0]===`/`?s.slice(1):s;s=s.endsWith(`/`)?s.slice(0,-1):s;return s;};const createPageDataUrl=path=>{const fixedPath=path===`/`?`index`:stripSurroundingSlashes(path);return`${""}/page-data/${fixedPath}/page-data.json`;};function doFetch(url,method=`GET`){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(method,url,true);req.onreadystatechange=()=>{if(req.readyState==4){resolve(req);}};req.send(null);});}const doesConnectionSupportPrefetch=()=>{if(`connection`in navigator&&typeof navigator.connection!==`undefined`){if((navigator.connection.effectiveType||``).includes(`2g`)){return false;}if(navigator.connection.saveData){return false;}}return true;};const toPageResources=(pageData,component=null)=>{const page={componentChunkName:pageData.componentChunkName,path:pageData.path,webpackCompilationHash:pageData.webpackCompilationHash,matchPath:pageData.matchPath,staticQueryHashes:pageData.staticQueryHashes};return{component,json:pageData.result,page};};class BaseLoader{constructor(loadComponent,matchPaths){this.inFlightNetworkRequests=new Map();// Map of pagePath -> Page. Where Page is an object with: {
//   status: PageResourceStatus.Success || PageResourceStatus.Error,
//   payload: PageResources, // undefined if PageResourceStatus.Error
// }
// PageResources is {
//   component,
//   json: pageData.result,
//   page: {
//     componentChunkName,
//     path,
//     webpackCompilationHash,
//     staticQueryHashes
//   },
//   staticQueryResults
// }
this.pageDb=new Map();this.inFlightDb=new Map();this.staticQueryDb={};this.pageDataDb=new Map();this.prefetchTriggered=new Set();this.prefetchCompleted=new Set();this.loadComponent=loadComponent;setMatchPaths(matchPaths);}memoizedGet(url){let inFlightPromise=this.inFlightNetworkRequests.get(url);if(!inFlightPromise){inFlightPromise=doFetch(url,`GET`);this.inFlightNetworkRequests.set(url,inFlightPromise);}// Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
return inFlightPromise.then(response=>{this.inFlightNetworkRequests.delete(url);return response;}).catch(err=>{this.inFlightNetworkRequests.delete(url);throw err;});}setApiRunner(apiRunner){this.apiRunner=apiRunner;this.prefetchDisabled=apiRunner(`disableCorePrefetching`).some(a=>a);}fetchPageDataJson(loadObj){const{pagePath,retries=0}=loadObj;const url=createPageDataUrl(pagePath);return this.memoizedGet(url).then(req=>{const{status,responseText}=req;// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.path===undefined){throw new Error(`not a valid pageData response`);}return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:jsonPayload});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404 page and it doesn't exist, we're done
if(pagePath===`/404.html`){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return this.fetchPageDataJson(Object.assign(loadObj,{pagePath:`/404.html`,notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return this.fetchPageDataJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});}loadPageDataJson(rawPath){const pagePath=findPath(rawPath);if(this.pageDataDb.has(pagePath)){const pageData=this.pageDataDb.get(pagePath);if(true){return Promise.resolve(pageData);}}return this.fetchPageDataJson({pagePath}).then(pageData=>{this.pageDataDb.set(pagePath,pageData);return pageData;});}findMatchPath(rawPath){return findMatchPath(rawPath);}// TODO check all uses of this and whether they use undefined for page resources not exist
loadPage(rawPath){const pagePath=findPath(rawPath);if(this.pageDb.has(pagePath)){const page=this.pageDb.get(pagePath);if(true){if(page.error){return{error:page.error,status:page.status};}return Promise.resolve(page.payload);}}if(this.inFlightDb.has(pagePath)){return this.inFlightDb.get(pagePath);}const inFlightPromise=Promise.all([this.loadAppData(),this.loadPageDataJson(pagePath)]).then(allData=>{const result=allData[1];if(result.status===PageResourceStatus.Error){return{status:PageResourceStatus.Error};}let pageData=result.payload;const{componentChunkName,staticQueryHashes=[]}=pageData;const finalResult={};const componentChunkPromise=this.loadComponent(componentChunkName).then(component=>{finalResult.createdAt=new Date();let pageResources;if(!component||component instanceof Error){finalResult.status=PageResourceStatus.Error;finalResult.error=component;}else{finalResult.status=PageResourceStatus.Success;if(result.notFound===true){finalResult.notFound=true;}pageData=Object.assign(pageData,{webpackCompilationHash:allData[0]?allData[0].webpackCompilationHash:``});pageResources=toPageResources(pageData,component);}// undefined if final result is an error
return pageResources;});const staticQueryBatchPromise=Promise.all(staticQueryHashes.map(staticQueryHash=>{// Check for cache in case this static query result has already been loaded
if(this.staticQueryDb[staticQueryHash]){const jsonPayload=this.staticQueryDb[staticQueryHash];return{staticQueryHash,jsonPayload};}return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req=>{const jsonPayload=JSON.parse(req.responseText);return{staticQueryHash,jsonPayload};}).catch(()=>{throw new Error(`We couldn't load "${""}/page-data/sq/d/${staticQueryHash}.json"`);});})).then(staticQueryResults=>{const staticQueryResultsMap={};staticQueryResults.forEach(({staticQueryHash,jsonPayload})=>{staticQueryResultsMap[staticQueryHash]=jsonPayload;this.staticQueryDb[staticQueryHash]=jsonPayload;});return staticQueryResultsMap;});return Promise.all([componentChunkPromise,staticQueryBatchPromise]).then(([pageResources,staticQueryResults])=>{let payload;if(pageResources){payload={...pageResources,staticQueryResults};finalResult.payload=payload;emitter.emit(`onPostLoadPageResources`,{page:payload,pageResources:payload});}this.pageDb.set(pagePath,finalResult);if(finalResult.error){return{error:finalResult.error,status:finalResult.status};}return payload;})// when static-query fail to load we throw a better error
.catch(err=>{return{error:err,status:PageResourceStatus.Error};});});inFlightPromise.then(()=>{this.inFlightDb.delete(pagePath);}).catch(error=>{this.inFlightDb.delete(pagePath);throw error;});this.inFlightDb.set(pagePath,inFlightPromise);return inFlightPromise;}// returns undefined if the page does not exists in cache
loadPageSync(rawPath,options={}){const pagePath=findPath(rawPath);if(this.pageDb.has(pagePath)){const pageData=this.pageDb.get(pagePath);if(pageData.payload){return pageData.payload;}if(options!==null&&options!==void 0&&options.withErrorDetails){return{error:pageData.error,status:pageData.status};}}return undefined;}shouldPrefetch(pagePath){// Skip prefetching if we know user is on slow or constrained connection
if(!doesConnectionSupportPrefetch()){return false;}// Check if the page exists.
if(this.pageDb.has(pagePath)){return false;}return true;}prefetch(pagePath){if(!this.shouldPrefetch(pagePath)){return false;}// Tell plugins with custom prefetching logic that they should start
// prefetching this path.
if(!this.prefetchTriggered.has(pagePath)){this.apiRunner(`onPrefetchPathname`,{pathname:pagePath});this.prefetchTriggered.add(pagePath);}// If a plugin has disabled core prefetching, stop now.
if(this.prefetchDisabled){return false;}const realPath=findPath(pagePath);// Todo make doPrefetch logic cacheable
// eslint-disable-next-line consistent-return
this.doPrefetch(realPath).then(()=>{if(!this.prefetchCompleted.has(pagePath)){this.apiRunner(`onPostPrefetchPathname`,{pathname:pagePath});this.prefetchCompleted.add(pagePath);}});return true;}doPrefetch(pagePath){const pageDataUrl=createPageDataUrl(pagePath);return prefetchHelper(pageDataUrl,{crossOrigin:`anonymous`,as:`fetch`}).then(()=>// This was just prefetched, so will return a response from
// the cache instead of making another request to the server
this.loadPageDataJson(pagePath));}hovering(rawPath){this.loadPage(rawPath);}getResourceURLsForPathname(rawPath){const pagePath=findPath(rawPath);const page=this.pageDataDb.get(pagePath);if(page){const pageResources=toPageResources(page.payload);return[...createComponentUrls(pageResources.page.componentChunkName),createPageDataUrl(pagePath)];}else{return null;}}isPageNotFound(rawPath){const pagePath=findPath(rawPath);const page=this.pageDb.get(pagePath);return!page||page.notFound;}loadAppData(retries=0){return this.memoizedGet(`${""}/page-data/app-data.json`).then(req=>{const{status,responseText}=req;let appData;if(status!==200&&retries<3){// Retry 3 times incase of non-200 responses
return this.loadAppData(retries+1);}// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.webpackCompilationHash===undefined){throw new Error(`not a valid app-data response`);}appData=jsonPayload;}catch(err){// continue regardless of error
}}return appData;});}}const createComponentUrls=componentChunkName=>(window.___chunkMapping[componentChunkName]||[]).map(chunk=>""+chunk);class ProdLoader extends (/* unused pure expression or super */ null && (BaseLoader)){constructor(asyncRequires,matchPaths,pageData){const loadComponent=chunkName=>{if(!asyncRequires.components[chunkName]){throw new Error(`We couldn't find the correct component chunk with the name ${chunkName}`);}return asyncRequires.components[chunkName]().then(preferDefault)// loader will handle the case when component is error
.catch(err=>err);};super(loadComponent,matchPaths);if(pageData){this.pageDataDb.set(pageData.path,{pagePath:pageData.path,payload:pageData,status:`success`});}}doPrefetch(pagePath){return super.doPrefetch(pagePath).then(result=>{if(result.status!==PageResourceStatus.Success){return Promise.resolve();}const pageData=result.payload;const chunkName=pageData.componentChunkName;const componentUrls=createComponentUrls(chunkName);return Promise.all(componentUrls.map(prefetchHelper)).then(()=>pageData);});}loadPageDataJson(rawPath){return super.loadPageDataJson(rawPath).then(data=>{if(data.notFound){// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,`HEAD`).then(req=>{if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});}}let instance;const setLoader=_loader=>{instance=_loader;};const publicLoader={enqueue:rawPath=>instance.prefetch(rawPath),// Real methods
getResourceURLsForPathname:rawPath=>instance.getResourceURLsForPathname(rawPath),loadPage:rawPath=>instance.loadPage(rawPath),// TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
loadPageSync:(rawPath,options={})=>instance.loadPageSync(rawPath,options),prefetch:rawPath=>instance.prefetch(rawPath),isPageNotFound:rawPath=>instance.isPageNotFound(rawPath),hovering:rawPath=>instance.hovering(rawPath),loadAppData:()=>instance.loadAppData()};/* harmony default export */ const loader = (publicLoader);function getStaticQueryResults(){if(instance){return instance.staticQueryDb;}else{return{};}}
;// CONCATENATED MODULE: ./.cache/gatsby-browser-entry.js
const prefetchPathname=loader.enqueue;const StaticQueryContext=/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createContext({});function StaticQueryDataRenderer({staticQueryData,data,query,render}){const finalData=data?data.data:staticQueryData[query]&&staticQueryData[query].data;return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment,null,finalData&&render(finalData),!finalData&&/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",null,"Loading (StaticQuery)"));}const StaticQuery=props=>{const{data,query,render,children}=props;return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(StaticQueryContext.Consumer,null,staticQueryData=>/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(StaticQueryDataRenderer,{data:data,query:query,render:render||children,staticQueryData:staticQueryData}));};const useStaticQuery=query=>{var _context$query;if(typeof (external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).useContext!==`function`&&"production"===`development`){throw new Error(`You're likely using a version of React that doesn't support Hooks\n`+`Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);}const context=external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().useContext(StaticQueryContext);// query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
// to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
// catch the misuse of the API and give proper direction
if(isNaN(Number(query))){throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);}if((_context$query=context[query])!==null&&_context$query!==void 0&&_context$query.data){return context[query].data;}else{throw new Error(`The result of this StaticQuery could not be fetched.\n\n`+`This is likely a bug in Gatsby and if refreshing the page does not fix it, `+`please open an issue in https://github.com/gatsbyjs/gatsby/issues`);}};StaticQuery.propTypes={data:(prop_types_default()).object,query:(prop_types_default()).string.isRequired,render:(prop_types_default()).func,children:(prop_types_default()).func};function graphql(){throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls `+`are supposed to only be evaluated at compile time, and then compiled away. `+`Unfortunately, something went wrong and the query was left in the compiled code.\n\n`+`Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);}

/***/ }),

/***/ 861:
/***/ ((module) => {

const preferDefault=m=>m&&m.default||m;if(false){}else if(false){}else{module.exports=()=>null;}

/***/ }),

/***/ 639:
/***/ ((__unused_webpack_module, exports) => {

exports.O=Component=>Component;

/***/ }),

/***/ 394:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RouteAnnouncerProps": () => (/* binding */ RouteAnnouncerProps)
/* harmony export */ });
// This is extracted to separate module because it's shared
// between browser and SSR code
const RouteAnnouncerProps={id:`gatsby-announcer`,style:{position:`absolute`,top:0,width:1,height:1,padding:0,overflow:`hidden`,clip:`rect(0, 0, 0, 0)`,whiteSpace:`nowrap`,border:0},"aria-live":`assertive`,"aria-atomic":`true`};

/***/ }),

/***/ 709:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "WritableAsPromise": () => (/* binding */ WritableAsPromise)
});

;// CONCATENATED MODULE: external "stream"
const external_stream_namespaceObject = require("stream");
;// CONCATENATED MODULE: ./.cache/server-utils/writable-as-promise.js
class WritableAsPromise extends external_stream_namespaceObject.Writable{constructor(){super();this._output=``;this._deferred={promise:null,resolve:null,reject:null};this._deferred.promise=new Promise((resolve,reject)=>{this._deferred.resolve=resolve;this._deferred.reject=reject;});}_write(chunk,enc,cb){this._output+=chunk.toString();cb();}end(){this._deferred.resolve(this._output);this.destroy();}// disguise us as a promise
then(resolve,reject){return this._deferred.promise.then(resolve,reject);}}

/***/ }),

/***/ 814:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
exports.__esModule=true;exports.onRenderBody=void 0;var _reactHelmet=__webpack_require__(593);var onRenderBody=function onRenderBody(_ref){var setHeadComponents=_ref.setHeadComponents,setHtmlAttributes=_ref.setHtmlAttributes,setBodyAttributes=_ref.setBodyAttributes;var helmet=_reactHelmet.Helmet.renderStatic();// These action functions were added partway through the Gatsby 1.x cycle.
if(setHtmlAttributes){setHtmlAttributes(helmet.htmlAttributes.toComponent());}if(setBodyAttributes){setBodyAttributes(helmet.bodyAttributes.toComponent());}setHeadComponents([helmet.title.toComponent(),helmet.link.toComponent(),helmet.meta.toComponent(),helmet.noscript.toComponent(),helmet.script.toComponent(),helmet.style.toComponent(),helmet.base.toComponent()]);};exports.onRenderBody=onRenderBody;

/***/ }),

/***/ 492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(31);
;// CONCATENATED MODULE: ./src/components/footer.module.scss
// Exports
var footerNavList = "footer-module--footerNavList--3YwRx";
var footerNavLink = "footer-module--footerNavLink--29-G3";
var activeFooterNavLink = "footer-module--activeFooterNavLink--2ZnHf";

;// CONCATENATED MODULE: ./src/components/footer.js
function Footer(){return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("footer",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("ul",{className:footerNavList},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:footerNavLink,activeClassName:activeFooterNavLink,to:"/impressum"},"Impressum")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:footerNavLink,activeClassName:activeFooterNavLink,to:"/datenschutz"},"Datenschutz"))));}
;// CONCATENATED MODULE: ./src/components/header.module.scss
// Exports
var logowrapper = "header-module--logowrapper--3hYLY";
var logo = "header-module--logo--tOLth";
var circle1 = "header-module--circle1--2XAF1";
var spin1 = "header-module--spin1--1eWoH";
var circle2 = "header-module--circle2--94yj1";
var spin2 = "header-module--spin2--2Pltn";
var navList = "header-module--navList--3weeY";
var navLink = "header-module--navLink--16dz7";
var activeNavLink = "header-module--activeNavLink--3Yf33";
var header = "header-module--header--_rwsu";
var herocontainer = "header-module--herocontainer--1-BzI";
var overflowcontainer = "header-module--overflowcontainer--3X62m";
var content = "header-module--content--2Osmk";
var projectsWrapper = "header-module--projectsWrapper--TajaT";

;// CONCATENATED MODULE: ./src/components/header.js
function Header(){const data=(0,gatsby_browser_entry.useStaticQuery)("2748089671");return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("header",{className:header},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:logowrapper},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:logo,to:"/"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:circle1}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:circle2}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"s/n")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,data.site.siteMetadata.author)),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("nav",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("ul",{className:navList},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:navLink,activeClassName:activeNavLink,to:"/"},"Home")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:navLink,activeClassName:activeNavLink,to:"/projects"},"Projekte")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:navLink,activeClassName:activeNavLink,to:"/about"},"About")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(gatsby_browser_entry.Link,{className:navLink,activeClassName:activeNavLink,to:"/contact"},"Kontakt")))));}
;// CONCATENATED MODULE: ./src/components/hero.module.scss
// Exports
var hero_module_herocontainer = "hero-module--herocontainer--2pDbV";
var gradient = "hero-module--gradient--3lHT2";
var hero_module_overflowcontainer = "hero-module--overflowcontainer--2ldli";
var TextFlowIn = "hero-module--TextFlowIn--1xDig";
var hero_module_header = "hero-module--header--eo_UF";
var hero_module_logowrapper = "hero-module--logowrapper--2yLMu";
var hero_module_content = "hero-module--content--3lJ6W";
var hero_module_projectsWrapper = "hero-module--projectsWrapper--oAnx8";

;// CONCATENATED MODULE: ./src/components/snowflakes.module.scss
// Exports
var snowflake = "snowflakes-module--snowflake--3lZrs";
var snowfall = "snowflakes-module--snowfall--1SezS";

;// CONCATENATED MODULE: ./src/components/snowflakes.js
function Snowflakes(){return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:snowflake}));}
;// CONCATENATED MODULE: ./src/components/hero.js
function Hero(){const textArray=["Frontend-","TYPO3-","UX-Design-"];let{0:state,1:setState}=(0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useState)(textArray[0]);(0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useEffect)(()=>{setInterval(()=>{textArray.forEach((item,i)=>{setTimeout(()=>{setState(item);},i*1500);});},4500);},[]);return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("section",{className:hero_module_herocontainer},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Snowflakes,null),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:hero_module_overflowcontainer},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",{dangerouslySetInnerHTML:{__html:state}})),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:hero_module_overflowcontainer},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Entwicklung")));}
;// CONCATENATED MODULE: ./src/components/ToTopButton.module.scss
// Exports
var totopbutton = "ToTopButton-module--totopbutton--38Zj1";
var buttonHidden = "ToTopButton-module--buttonHidden--18kai";
var ToTopButton_module_header = "ToTopButton-module--header--24qmP";
var ToTopButton_module_logowrapper = "ToTopButton-module--logowrapper--1TmWv";
var ToTopButton_module_herocontainer = "ToTopButton-module--herocontainer--2pqtj";
var ToTopButton_module_overflowcontainer = "ToTopButton-module--overflowcontainer--2xphy";
var ToTopButton_module_content = "ToTopButton-module--content--1pGKg";
var ToTopButton_module_projectsWrapper = "ToTopButton-module--projectsWrapper--37qzw";

;// CONCATENATED MODULE: ./src/components/ToTopButton.jsx
function ToTopButton(){const{0:currentClass,1:setClass}=(0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useState)(`${totopbutton}`);const button=(0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useRef)(null);window.addEventListener("scroll",()=>{setClass(window.scrollY>200?`${totopbutton}`:`${buttonHidden}`);});function toTop(){window.scrollTo({top:0,left:0,behavior:"smooth"});}return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("button",{className:currentClass,ref:button,onClick:toTop},"\xAB");}/* harmony default export */ const components_ToTopButton = (ToTopButton);
;// CONCATENATED MODULE: ./src/components/layout.module.scss
// Exports
var container = "layout-module--container--3nGj0";
var layout_module_content = "layout-module--content--bviAP";
var layout_module_header = "layout-module--header--2DZOU";
var layout_module_logowrapper = "layout-module--logowrapper--2cPMl";
var layout_module_herocontainer = "layout-module--herocontainer--3JDRk";
var layout_module_overflowcontainer = "layout-module--overflowcontainer--1aYo2";
var layout_module_projectsWrapper = "layout-module--projectsWrapper--22fYr";

;// CONCATENATED MODULE: ./src/components/layout.js
function Layout({children}){return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:container},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Header,null),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Hero,null),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("main",{className:layout_module_content},children),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(components_ToTopButton,null),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Footer,null));}

/***/ }),

/***/ 616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ About)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(514);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(492);
function About(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1",null,"I can't find your Page!"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img",{src:"http://25.media.tumblr.com/bb9a7e0e0cdc14dd816115c15b370975/tumblr_n036ieyQXV1qd5mq1o1_400.gif",alt:"Looking for your Page"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"This Page and Website is still under construction!")));}

/***/ }),

/***/ 92:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ About)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(593);
// EXTERNAL MODULE: ./src/components/layout.js + 11 modules
var layout = __webpack_require__(492);
;// CONCATENATED MODULE: ./src/components/about.module.scss
// Exports
var timeLinePoint = "about-module--timeLinePoint--259Y1";
var circleImg = "about-module--circleImg--3QOJ0";
var linie = "about-module--linie--2hAKD";

;// CONCATENATED MODULE: ./src/images/Sascha_Nabrotzky_sw.jpg
/* harmony default export */ const Sascha_Nabrotzky_sw = (__webpack_require__.p + "static/Sascha_Nabrotzky_sw-50683b05f8275ed6110781f6974cb8a2.jpg");
;// CONCATENATED MODULE: ./src/components/timeline.json
const timeline_namespaceObject = JSON.parse('{"Y":[{"jahr":"AKTUELL","taetigkeit":"Im Fokus: JavaScript, Typo3"},{"jahr":"2021","taetigkeit":"Mehrere Websites mit ReactJS und GraphQL programmiert | Docker | Typo3 | DDEV | Frontend-Entwickler in einer Agentur"},{"jahr":"2020","taetigkeit":"Weiterbildung in JavaScript, ReactJS, GatsbyJS, GraphQL, Github und SCSS | Website mit Gatsby/React erstellt"},{"jahr":"2019","taetigkeit":"Mediengestalter digital (Frontend-Entwickler) bei einem Onlineshop eines Großhändlers | Weiterbildung in UX/UI-Design | mehrere Website-Projekte"},{"jahr":"2017","taetigkeit":"Template-Entwicklung für Joomla! | Animationen mit CSS3"},{"jahr":"2016","taetigkeit":"nutzerzentriertes Webdesign und HTML5 | Illustration"},{"jahr":"2009","taetigkeit":"Portfolio-Websites mit Animationen in HTML, CSS3 und JQuery erstellt."},{"jahr":"2000","taetigkeit":"Mediengestalter bei einem großen Zeitungsverlag"},{"jahr":"1997","taetigkeit":"Ausbildung zum Schriftsetzer"}]}');
;// CONCATENATED MODULE: ./src/pages/about.js
function About(){return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Helmet.Helmet,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("title",null,"About | Sascha Nabrotzky"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"title",content:"About | Sascha Nabrotzky"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"description",content:"Timeline meiner beruflichen Qualifikation"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"keywords",content:"Timeline, Werdegang, Qualifikation"})),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h1",null,"Never stop learning!"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Als verheirateter Familienvater mit zwei Kindern lebe ich im l\xE4ndlichen Ladbergen, schon seit Jahren ist die"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"nutzerzentrierte Frontend-Entwicklung mein Interessengebiet.")," "),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Computer und Gestaltung habe ich schon in der Schulzeit kombiniert, darauf folgten jahrelange Erfahrung im grafischen Gewerbe und auch ein paar Preise habe ich gewonnen. Ich brachte mir autodidaktisch"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"HTML5, SCSS")," und vor allem",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null," JavaScript,")," gefolgt von ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"React.js")," ","und ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"Gatsby.js")," bei. Mit jeder neuen Technologie er\xF6ffnen sich mir unglaublich spannende M\xF6glichkeiten, die mich herausfordern und ich erschlie\xDFen kann -"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"Typo3, Fluid, Bootstrap, Docker, DDEV, Git "),"und headless CMS sind ein paar davon."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Zur\xFCckblickend kann ich sagen, dass meine St\xE4rken ganz klar in der"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"Kombination von Programmierkenntnissen und Design")," ","liegen und ich konstant neue Programmiertechniken lerne oder vertiefe."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Da ich ja nicht nur in Quellcode herumtippen kann, bin ich sonst ganz gerne mit meiner Familie oder diversen Holzarbeiten besch\xE4ftigt."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:timeLinePoint},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{id:"fotovonmir"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:Sascha_Nabrotzky_sw,alt:"Foto von Sascha Nabrotzky"}))),timeline_namespaceObject.Y.map(point=>{return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("section",{key:point.jahr.toString()},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:linie}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:timeLinePoint},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:circleImg},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",{dangerouslySetInnerHTML:{__html:point.jahr}})),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",{dangerouslySetInnerHTML:{__html:point.taetigkeit}})));})));}

/***/ }),

/***/ 176:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Contact)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./src/components/layout.js + 11 modules
var layout = __webpack_require__(492);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(593);
;// CONCATENATED MODULE: ./src/components/contact.module.scss
// Exports
var socialBtnWrapper = "contact-module--socialBtnWrapper--1ScC8";
var socialBtn = "contact-module--socialBtn--2zvJ8";
var gradient = "contact-module--gradient--3uifk";

;// CONCATENATED MODULE: ./src/pages/contact.js
function Contact(){return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Helmet.Helmet,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("title",null,"Kontakt | Sascha Nabrotzky"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"title",content:"Kontakt & Social Media | Sascha Nabrotzky"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"description",content:"Schreib mich an oder erfahre mehr \xFCber mich"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"keywords",content:"Kontakt, Social Media, Xing, Instagram, Twitter, Github"})),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h1",null,"Verlink dich mit mir!"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Hier sind die wichtigsten Stellen im Internet, unter denen man mich erreicht oder weitere Arbeiten von mir findet. Physisch hier:"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"Koldefeld 11, 49549 Ladbergen.")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:socialBtnWrapper},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{className:socialBtn,href:"mailto:sascha.nabrotzky@online.de",alt:"Schreiben Sie mir direkt"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"E-Mail")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{className:socialBtn,href:"https://www.linkedin.com/in/sascha-nabrotzky-b7429521a/",alt:"LinkedIn-Profil",target:"_blank",rel:"noreferrer"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"LinkedIn")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{className:socialBtn,href:"https://www.xing.com/profile/Sascha_Nabrotzky/cv",alt:"Xing-Profil",target:"_blank",rel:"noreferrer"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Xing")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{className:socialBtn,href:"https://github.com/sascha-nabrotzky",alt:"GitHub-Repositorys",target:"_blank",rel:"noreferrer"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"GitHub")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{className:socialBtn,href:"https://www.instagram.com/arrow_function0/",alt:"Instagram - Blick hinter die Kulissen",target:"_blank",rel:"noreferrer"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Instagram")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{className:socialBtn,href:"https://twitter.com/Arrow_Function0",alt:"Meine News",target:"_blank",rel:"noreferrer"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Twitter")))));}

/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Impressum)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(514);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(492);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(593);
function Impressum(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment),null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title",null,"Datenschutz | Sascha Nabrotzky"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"title",content:"Datenschutz | Sascha Nabrotzky"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"description",content:"Datenschutz"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"keywords",content:"Datenschutz"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1",null,"Datenschutzerkl\xE4rung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Ich freue mich sehr \xFCber Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert f\xFCr den Frontend-Entwickler Sascha Nabrotzky. Eine Nutzung der Internetseiten von Frontend-Entwickler Sascha Nabrotzky ist grunds\xE4tzlich ohne jede Angabe personenbezogener Daten m\xF6glich. Sofern eine betroffene Person besondere Services unseres Unternehmens \xFCber unsere Internetseite in Anspruch nehmen m\xF6chte, k\xF6nnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht f\xFCr eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in \xDCbereinstimmung mit den f\xFCr Frontend-Entwickler Sascha Nabrotzky geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerkl\xE4rung m\xF6chte unser Unternehmen die \xD6ffentlichkeit \xFCber Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerkl\xE4rung \xFCber die ihnen zustehenden Rechte aufgekl\xE4rt."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Frontend-Entwickler Sascha Nabrotzky hat als f\xFCr die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Ma\xDFnahmen umgesetzt, um einen m\xF6glichst l\xFCckenlosen Schutz der \xFCber diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch k\xF6nnen Internetbasierte Daten\xFCbertragungen grunds\xE4tzlich Sicherheitsl\xFCcken aufweisen, sodass ein absoluter Schutz nicht gew\xE4hrleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu \xFCbermitteln."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"1. Begriffsbestimmungen"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Die Datenschutzerkl\xE4rung von Frontend-Entwickler Sascha Nabrotzky beruht auf den Begrifflichkeiten, die durch den Europ\xE4ischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerkl\xE4rung soll sowohl f\xFCr die \xD6ffentlichkeit als auch f\xFCr unsere Kunden und Gesch\xE4ftspartner einfach lesbar und verst\xE4ndlich sein. Um dies zu gew\xE4hrleisten, m\xF6chten wir vorab die verwendeten Begrifflichkeiten erl\xE4utern."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Wir verwenden in dieser Datenschutzerkl\xE4rung unter anderem die folgenden Begriffe:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"a.\xA0\xA0\xA0 personenbezogene Daten"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare nat\xFCrliche Person (im Folgenden \u201Ebetroffene Person\u201C) beziehen. Als identifizierbar wird eine nat\xFCrliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identit\xE4t dieser nat\xFCrlichen Person sind, identifiziert werden kann.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"b.\xA0\xA0\xA0 betroffene Person"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Betroffene Person ist jede identifizierte oder identifizierbare nat\xFCrliche Person, deren personenbezogene Daten von dem f\xFCr die Verarbeitung Verantwortlichen verarbeitet werden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"c.\xA0\xA0\xA0 Verarbeitung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgef\xFChrte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Ver\xE4nderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch \xDCbermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verkn\xFCpfung, die Einschr\xE4nkung, das L\xF6schen oder die Vernichtung.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"d.\xA0\xA0\xA0 Einschr\xE4nkung der Verarbeitung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Einschr\xE4nkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre k\xFCnftige Verarbeitung einzuschr\xE4nken.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"e.\xA0\xA0\xA0 Profiling"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte pers\xF6nliche Aspekte, die sich auf eine nat\xFCrliche Person beziehen, zu bewerten, insbesondere, um Aspekte bez\xFCglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, pers\xF6nlicher Vorlieben, Interessen, Zuverl\xE4ssigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser nat\xFCrlichen Person zu analysieren oder vorherzusagen.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"f.\xA0\xA0\xA0\xA0 Pseudonymisierung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zus\xE4tzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden k\xF6nnen, sofern diese zus\xE4tzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Ma\xDFnahmen unterliegen, die gew\xE4hrleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren nat\xFCrlichen Person zugewiesen werden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"g.\xA0\xA0\xA0 Verantwortlicher oder f\xFCr die Verarbeitung Verantwortlicher"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Verantwortlicher oder f\xFCr die Verarbeitung Verantwortlicher ist die nat\xFCrliche oder juristische Person, Beh\xF6rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen \xFCber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise k\xF6nnen die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"h.\xA0\xA0\xA0 Auftragsverarbeiter"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Auftragsverarbeiter ist eine nat\xFCrliche oder juristische Person, Beh\xF6rde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"i.\xA0\xA0\xA0\xA0\xA0 Empf\xE4nger"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Empf\xE4nger ist eine nat\xFCrliche oder juristische Person, Beh\xF6rde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabh\xE4ngig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Beh\xF6rden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten m\xF6glicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empf\xE4nger.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"j.\xA0\xA0\xA0\xA0\xA0 Dritter"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Dritter ist eine nat\xFCrliche oder juristische Person, Beh\xF6rde, Einrichtung oder andere Stelle au\xDFer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"k.\xA0\xA0\xA0 Einwilligung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Einwilligung ist jede von der betroffenen Person freiwillig f\xFCr den bestimmten Fall in informierter Weise und unmissverst\xE4ndlich abgegebene Willensbekundung in Form einer Erkl\xE4rung oder einer sonstigen eindeutigen best\xE4tigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist."))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"2. Name und Anschrift des f\xFCr die Verarbeitung Verantwortlichen"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europ\xE4ischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Frontend-Entwickler Sascha Nabrotzky"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Koldefeld, 11"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"49549 Ladbergen"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Deutschland"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Tel.: 05485207979"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"E-Mail: sascha.nabrotzky[at]online.de"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Website: www.sascha-nabrotzky.github.io"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"3. Erfassung von allgemeinen Daten und Informationen"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Die Internetseite der Frontend-Entwickler Sascha Nabrotzky erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden k\xF6nnen die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche \xFCber ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige \xE4hnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Frontend-Entwickler Sascha Nabrotzky keine R\xFCckschl\xFCsse auf die betroffene Person. Diese Informationen werden vielmehr ben\xF6tigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung f\xFCr diese zu optimieren, (3) die dauerhafte Funktionsf\xE4higkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gew\xE4hrleisten sowie (4) um Strafverfolgungsbeh\xF6rden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden durch die Frontend-Entwickler Sascha Nabrotzky daher einerseits statistisch und ferner mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erh\xF6hen, um letztlich ein optimales Schutzniveau f\xFCr die von uns verarbeiteten personenbezogenen Daten sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"E-Mail-Kontakt / mailto-Links"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Auf der Website von Frontent-Entwickler Sascha Nabrotzky ist kein Kontaktformular vorhanden. Besucher k\xF6nnen \xFCber einen mailto-Link auf der Webseite Nachrichten an ihn \xFCbermitteln. Um eine Antwort empfangen zu k\xF6nnen, ist zumindest die Angabe einer g\xFCltigen E-Mail-Adresse erforderlich. Alle weiteren Angaben kann die anfragende Person freiwillig geben. Mit Absenden der Nachricht \xFCber den jeweiligen E-Mail-Client willigt der Besucher in die Verarbeitung der \xFCbermittelten personenbezogenen Daten ein."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Die Datenverarbeitung erfolgt ausschlie\xDFlich zu dem Zweck der Abwicklung und Beantwortung von Anfragen \xFCber den mailto-Link. Dies geschieht auf Basis der freiwillig erteilten Einwilligung gem. Art. 6 Abs. 1 Satz 1 Buchst. a. DSGVO. Die f\xFCr die Benutzung des mailto-Links erhobenen personenbezogenen Daten werden automatisch gel\xF6scht, sobald die Anfrage erledigt ist und keine Gr\xFCnde f\xFCr eine weitere Aufbewahrung gegeben sind."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"4. Routinem\xE4\xDFige L\xF6schung und Sperrung von personenbezogenen Daten"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Der f\xFCr die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur f\xFCr den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europ\xE4ischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der f\xFCr die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Entf\xE4llt der Speicherungszweck oder l\xE4uft eine vom Europ\xE4ischen Richtlinien- und Verordnungsgeber oder einem anderen zust\xE4ndigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinem\xE4\xDFig und entsprechend den gesetzlichen Vorschriften gesperrt oder gel\xF6scht."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"5. Rechte der betroffenen Person"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"a.\xA0\xA0\xA0 Recht auf Best\xE4tigung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber einger\xE4umte Recht, von dem f\xFCr die Verarbeitung Verantwortlichen eine Best\xE4tigung dar\xFCber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. M\xF6chte eine betroffene Person dieses Best\xE4tigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"b.\xA0\xA0\xA0 Recht auf Auskunft"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, jederzeit von dem f\xFCr die Verarbeitung Verantwortlichen unentgeltliche Auskunft \xFCber die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner hat der Europ\xE4ische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft \xFCber folgende Informationen zugestanden:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"die Verarbeitungszwecke"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"die Kategorien personenbezogener Daten, die verarbeitet werden"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"die Empf\xE4nger oder Kategorien von Empf\xE4ngern, gegen\xFCber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empf\xE4ngern in Drittl\xE4ndern oder bei internationalen Organisationen"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"falls m\xF6glich die geplante Dauer, f\xFCr die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht m\xF6glich ist, die Kriterien f\xFCr die Festlegung dieser Dauer"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"das Bestehen eines Rechts auf Berichtigung oder L\xF6schung der sie betreffenden personenbezogenen Daten oder auf Einschr\xE4nkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"das Bestehen eines Beschwerderechts bei einer Aufsichtsbeh\xF6rde"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verf\xFCgbaren Informationen \xFCber die Herkunft der Daten"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"das Bestehen einer automatisierten Entscheidungsfindung einschlie\xDFlich Profiling gem\xE4\xDF Artikel 22 Abs.1 und 4 DS-GVO und \u2014 zumindest in diesen F\xE4llen \u2014 aussagekr\xE4ftige Informationen \xFCber die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung f\xFCr die betroffene Person")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Ferner steht der betroffenen Person ein Auskunftsrecht dar\xFCber zu, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation \xFCbermittelt wurden. Sofern dies der Fall ist, so steht der betroffenen Person im \xDCbrigen das Recht zu, Auskunft \xFCber die geeigneten Garantien im Zusammenhang mit der \xDCbermittlung zu erhalten."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"M\xF6chte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"c.\xA0\xA0\xA0 Recht auf Berichtigung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, die unverz\xFCgliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Ber\xFCcksichtigung der Zwecke der Verarbeitung, die Vervollst\xE4ndigung unvollst\xE4ndiger personenbezogener Daten \u2014 auch mittels einer erg\xE4nzenden Erkl\xE4rung \u2014 zu verlangen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"M\xF6chte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"d.\xA0\xA0\xA0 Recht auf L\xF6schung (Recht auf Vergessen werden)"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverz\xFCglich gel\xF6scht werden, sofern einer der folgenden Gr\xFCnde zutrifft und soweit die Verarbeitung nicht erforderlich ist:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die personenbezogenen Daten wurden f\xFCr solche Zwecke erhoben oder auf sonstige Weise verarbeitet, f\xFCr welche sie nicht mehr notwendig sind."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gem\xE4\xDF Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO st\xFCtzte, und es fehlt an einer anderweitigen Rechtsgrundlage f\xFCr die Verarbeitung."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die betroffene Person legt gem\xE4\xDF Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gr\xFCnde f\xFCr die Verarbeitung vor, oder die betroffene Person legt gem\xE4\xDF Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die personenbezogenen Daten wurden unrechtm\xE4\xDFig verarbeitet."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die L\xF6schung der personenbezogenen Daten ist zur Erf\xFCllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gem\xE4\xDF Art. 8 Abs. 1 DS-GVO erhoben.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Sofern einer der oben genannten Gr\xFCnde zutrifft und eine betroffene Person die L\xF6schung von personenbezogenen Daten, die bei der Frontend-Entwickler Sascha Nabrotzky gespeichert sind, veranlassen m\xF6chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Frontend-Entwickler Sascha Nabrotzky wird veranlassen, dass dem L\xF6schverlangen unverz\xFCglich nachgekommen wird."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Wurden die personenbezogenen Daten von der Frontend-Entwickler Sascha Nabrotzky \xF6ffentlich gemacht und ist unser Unternehmen als Verantwortlicher gem\xE4\xDF Art. 17 Abs. 1 DS-GVO zur L\xF6schung der personenbezogenen Daten verpflichtet, so trifft die Frontend-Entwickler Sascha Nabrotzky unter Ber\xFCcksichtigung der verf\xFCgbaren Technologie und der Implementierungskosten angemessene Ma\xDFnahmen, auch technischer Art, um andere f\xFCr die Datenverarbeitung Verantwortliche, welche die ver\xF6ffentlichten personenbezogenen Daten verarbeiten, dar\xFCber in Kenntnis zu setzen, dass die betroffene Person von diesen anderen f\xFCr die Datenverarbeitung Verantwortlichen die L\xF6schung s\xE4mtlicher Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Frontend-Entwickler Sascha Nabrotzky wird im Einzelfall das Notwendige veranlassen.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"e.\xA0\xA0\xA0 Recht auf Einschr\xE4nkung der Verarbeitung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, von dem Verantwortlichen die Einschr\xE4nkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar f\xFCr eine Dauer, die es dem Verantwortlichen erm\xF6glicht, die Richtigkeit der personenbezogenen Daten zu \xFCberpr\xFCfen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die Verarbeitung ist unrechtm\xE4\xDFig, die betroffene Person lehnt die L\xF6schung der personenbezogenen Daten ab und verlangt stattdessen die Einschr\xE4nkung der Nutzung der personenbezogenen Daten."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Der Verantwortliche ben\xF6tigt die personenbezogenen Daten f\xFCr die Zwecke der Verarbeitung nicht l\xE4nger, die betroffene Person ben\xF6tigt sie jedoch zur Geltendmachung, Aus\xFCbung oder Verteidigung von Rechtsanspr\xFCchen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,"Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die berechtigten Gr\xFCnde des Verantwortlichen gegen\xFCber denen der betroffenen Person \xFCberwiegen.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschr\xE4nkung von personenbezogenen Daten, die bei der Frontend-Entwickler Sascha Nabrotzky gespeichert sind, verlangen m\xF6chte, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Frontend-Entwickler Sascha Nabrotzky wird die Einschr\xE4nkung der Verarbeitung veranlassen.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"f.\xA0\xA0\xA0\xA0 Recht auf Daten\xFCbertragbarkeit"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, g\xE4ngigen und maschinenlesbaren Format zu erhalten. Sie hat au\xDFerdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu \xFCbermitteln, sofern die Verarbeitung auf der Einwilligung gem\xE4\xDF Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gem\xE4\xDF Art. 6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht f\xFCr die Wahrnehmung einer Aufgabe erforderlich ist, die im \xF6ffentlichen Interesse liegt oder in Aus\xFCbung \xF6ffentlicher Gewalt erfolgt, welche dem Verantwortlichen \xFCbertragen wurde."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Ferner hat die betroffene Person bei der Aus\xFCbung ihres Rechts auf Daten\xFCbertragbarkeit gem\xE4\xDF Art. 20 Abs. 1 DS-GVO das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen \xFCbermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeintr\xE4chtigt werden."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Zur Geltendmachung des Rechts auf Daten\xFCbertragbarkeit kann sich die betroffene Person jederzeit an einen Mitarbeiter der Frontend-Entwickler Sascha Nabrotzky wenden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"g.\xA0\xA0\xA0 Recht auf Widerspruch"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, aus Gr\xFCnden, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch f\xFCr ein auf diese Bestimmungen gest\xFCtztes Profiling."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Die Frontend-Entwickler Sascha Nabrotzky verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir k\xF6nnen zwingende schutzw\xFCrdige Gr\xFCnde f\xFCr die Verarbeitung nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person \xFCberwiegen, oder die Verarbeitung dient der Geltendmachung, Aus\xFCbung oder Verteidigung von Rechtsanspr\xFCchen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Verarbeitet die Frontend-Entwickler Sascha Nabrotzky personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch f\xFCr das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegen\xFCber der Frontend-Entwickler Sascha Nabrotzky der Verarbeitung f\xFCr Zwecke der Direktwerbung, so wird die Frontend-Entwickler Sascha Nabrotzky die personenbezogenen Daten nicht mehr f\xFCr diese Zwecke verarbeiten."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Zudem hat die betroffene Person das Recht, aus Gr\xFCnden, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der Frontend-Entwickler Sascha Nabrotzky zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gem\xE4\xDF Art. 89 Abs. 1 DS-GVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erf\xFCllung einer im \xF6ffentlichen Interesse liegenden Aufgabe erforderlich."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Zur Aus\xFCbung des Rechts auf Widerspruch kann sich die betroffene Person direkt an jeden Mitarbeiter der Frontend-Entwickler Sascha Nabrotzky oder einen anderen Mitarbeiter wenden. Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter Verfahren auszu\xFCben, bei denen technische Spezifikationen verwendet werden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"h.\xA0\xA0\xA0 Automatisierte Entscheidungen im Einzelfall einschlie\xDFlich Profiling"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, nicht einer ausschlie\xDFlich auf einer automatisierten Verarbeitung \u2014 einschlie\xDFlich Profiling \u2014 beruhenden Entscheidung unterworfen zu werden, die ihr gegen\xFCber rechtliche Wirkung entfaltet oder sie in \xE4hnlicher Weise erheblich beeintr\xE4chtigt, sofern die Entscheidung (1) nicht f\xFCr den Abschluss oder die Erf\xFCllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zul\xE4ssig ist und diese Rechtsvorschriften angemessene Ma\xDFnahmen zur Wahrung der Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit ausdr\xFCcklicher Einwilligung der betroffenen Person erfolgt."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Ist die Entscheidung (1) f\xFCr den Abschluss oder die Erf\xFCllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2) erfolgt sie mit ausdr\xFCcklicher Einwilligung der betroffenen Person, trifft die Frontend-Entwickler Sascha Nabrotzky angemessene Ma\xDFnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung geh\xF6rt."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"M\xF6chte die betroffene Person Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden.")),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"i.\xA0\xA0\xA0\xA0\xA0 Recht auf Widerruf einer datenschutzrechtlichen Einwilligung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom Europ\xE4ischen Richtlinien- und Verordnungsgeber gew\xE4hrte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"M\xF6chte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie sich hierzu jederzeit an einen Mitarbeiter des f\xFCr die Verarbeitung Verantwortlichen wenden."))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"6. Rechtsgrundlage der Verarbeitung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage f\xFCr Verarbeitungsvorg\xE4nge, bei denen wir eine Einwilligung f\xFCr einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erf\xFCllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies beispielsweise bei Verarbeitungsvorg\xE4ngen der Fall ist, die f\xFCr eine Lieferung von Waren oder die Erbringung einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO. Gleiches gilt f\xFCr solche Verarbeitungsvorg\xE4nge die zur Durchf\xFChrung vorvertraglicher Ma\xDFnahmen erforderlich sind, etwa in F\xE4llen von Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, wie beispielsweise zur Erf\xFCllung steuerlicher Pflichten, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. In seltenen F\xE4llen k\xF6nnte die Verarbeitung von personenbezogenen Daten erforderlich werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen nat\xFCrlichen Person zu sch\xFCtzen. Dies w\xE4re beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt werden w\xFCrde und daraufhin sein Name, sein Alter, seine Krankenkassendaten oder sonstige lebenswichtige Informationen an einen Arzt, ein Krankenhaus oder sonstige Dritte weitergegeben werden m\xFCssten. Dann w\xFCrde die Verarbeitung auf Art. 6 I lit. d DS-GVO beruhen. Letztlich k\xF6nnten Verarbeitungsvorg\xE4nge auf Art. 6 I lit. f DS-GVO beruhen. Auf dieser Rechtsgrundlage basieren Verarbeitungsvorg\xE4nge, die von keiner der vorgenannten Rechtsgrundlagen erfasst werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht \xFCberwiegen. Solche Verarbeitungsvorg\xE4nge sind uns insbesondere deshalb gestattet, weil sie durch den Europ\xE4ischen Gesetzgeber besonders erw\xE4hnt wurden. Er vertrat insoweit die Auffassung, dass ein berechtigtes Interesse anzunehmen sein k\xF6nnte, wenn die betroffene Person ein Kunde des Verantwortlichen ist (Erw\xE4gungsgrund 47 Satz 2 DS-GVO)."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"7. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt werden"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchf\xFChrung unserer Gesch\xE4ftst\xE4tigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"8. Dauer, f\xFCr die die personenbezogenen Daten gespeichert werden"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Das Kriterium f\xFCr die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinem\xE4\xDFig gel\xF6scht, sofern sie nicht mehr zur Vertragserf\xFCllung oder Vertragsanbahnung erforderlich sind."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"9. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten; Erforderlichkeit f\xFCr den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten bereitzustellen; m\xF6gliche Folgen der Nichtbereitstellung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Wir kl\xE4ren Sie dar\xFCber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verf\xFCgung stellt, die in der Folge durch uns verarbeitet werden m\xFCssen. Die betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschlie\xDFt. Eine Nichtbereitstellung der personenbezogenen Daten h\xE4tte zur Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden k\xF6nnte. Vor einer Bereitstellung personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden. Unser Mitarbeiter kl\xE4rt den Betroffenen einzelfallbezogen dar\xFCber auf, ob die Bereitstellung der personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder f\xFCr den Vertragsabschluss erforderlich ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die Nichtbereitstellung der personenbezogenen Daten h\xE4tte."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"10. Bestehen einer automatisierten Entscheidungsfindung"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Diese Datenschutzerkl\xE4rung wurde durch den Datenschutzerkl\xE4rungs-Generator der DGD Deutsche Gesellschaft f\xFCr Datenschutz GmbH, die als"," ",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a",{href:"https://dg-datenschutz.de/datenschutz-dienstleistungen/externer-datenschutzbeauftragter/"},"Externer Datenschutzbeauftragter Dachau")," ","t\xE4tig ist, in Kooperation mit dem"," ",/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a",{href:"https://www.wbs-law.de/it-recht/datenschutzrecht/"},"Anwalt f\xFCr Datenschutzrecht")," ","Christian Solmecke erstellt.")));}

/***/ }),

/***/ 315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Impressum)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(514);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(492);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(593);
function Impressum(){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment),null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title",null,"Impressum | Sascha Nabrotzky"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"title",content:"Impressum | Sascha Nabrotzky"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"description",content:"Impressum"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta",{name:"keywords",content:"Impressum"})),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2",null,"Impressum"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"Angaben gem\xE4\xDF \xA7 5 TMG:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Sascha Nabrotzky"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Koldefeld 11"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"49549 Ladbergen"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"Kontakt:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Telefon: 05485 207981"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"E-Mail: sascha.nabrotzky(at)online.de"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"Umsatzsteuer-ID:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Umsatzsteuer-Identifikationsnummer gem\xE4\xDF \xA727 a Umsatzsteuergesetz:"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"DE267467596"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3",null,"Haftungsausschluss Disclaimer"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"Haftung f\xFCr Inhalte"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Als Diensteanbieter sind wir gem\xE4\xDF \xA7 7 Abs.1 TMG f\xFCr eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach \xA7\xA7 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, \xFCbermittelte oder gespeicherte fremde Informationen zu \xFCberwachen oder nach Umst\xE4nden zu forschen, die auf eine rechtswidrige T\xE4tigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber\xFChrt. Eine diesbez\xFCgliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m\xF6glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"Haftung f\xFCr Links"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Unser Angebot enth\xE4lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k\xF6nnen wir f\xFCr diese fremden Inhalte auch keine Gew\xE4hr \xFCbernehmen. F\xFCr die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m\xF6gliche Rechtsverst\xF6\xDFe \xFCberpr\xFCft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4",null,"Urheberrecht"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf\xE4ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au\xDFerhalb der Grenzen des Urheberrechtes bed\xFCrfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f\xFCr den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.")));}

/***/ }),

/***/ 143:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// NAMESPACE OBJECT: ./src/components/githubprojects.module.scss
var githubprojects_module_namespaceObject = {};
__webpack_require__.r(githubprojects_module_namespaceObject);
__webpack_require__.d(githubprojects_module_namespaceObject, {
  "hn": () => (projectsBox),
  "z5": () => (projectsWrapper)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./src/components/layout.js + 11 modules
var layout = __webpack_require__(492);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(593);
;// CONCATENATED MODULE: ./src/components/githubprojects.module.scss
// Exports
var projectsWrapper = "githubprojects-module--projectsWrapper--2N6XI";
var projectsBox = "githubprojects-module--projectsBox--3Pd2V";
var header = "githubprojects-module--header--barUY";
var logowrapper = "githubprojects-module--logowrapper--3AV27";
var herocontainer = "githubprojects-module--herocontainer--1gHok";
var overflowcontainer = "githubprojects-module--overflowcontainer--NHktR";
var content = "githubprojects-module--content--CrgO7";

;// CONCATENATED MODULE: ./src/components/githubprojects.js
function FetchGithubProjects(props){let{0:data,1:setData}=(0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useState)(null);//data auf null setzen, danach mit Funkt. setData die commits fetchen und Projektdaten mappen
(0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useEffect)(async()=>{let responseFromUrl=await fetch("https://api.github.com/users/sascha-nabrotzky/repos");let commits=await responseFromUrl.json();setData(commits);},[]);if(!data)return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Loading ...");return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("section",null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h2",null,"Projekte auf Github"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:projectsWrapper},data.map(project=>{return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a",{href:project.clone_url,rel:"noreferrer noopener",target:"_blank"},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:projectsBox,key:project.id},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h4",{dangerouslySetInnerHTML:{__html:project.name}}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",{dangerouslySetInnerHTML:{__html:project.description}}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:githubprojects_module_namespaceObject.updated},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Updated at:"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("date",{dangerouslySetInnerHTML:{__html:project.updated_at}}))));})));}
;// CONCATENATED MODULE: ./src/components/index.module.scss
// Exports
var techStackWrapper = "index-module--techStackWrapper--1nfux";
var logoWrapper = "index-module--logoWrapper--2G0OF";
var index_module_header = "index-module--header--2UwEv";
var index_module_logowrapper = "index-module--logowrapper--13obY";
var index_module_herocontainer = "index-module--herocontainer--1WWO2";
var index_module_overflowcontainer = "index-module--overflowcontainer--3-_Q5";
var index_module_content = "index-module--content--25yPl";
var index_module_projectsWrapper = "index-module--projectsWrapper--2fz5F";

;// CONCATENATED MODULE: ./src/images/TYPO3_Logo.svg
/* harmony default export */ const TYPO3_Logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEzNiA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsODUuMTQwNiwtMzAwLjkzOCkiPgogICAgICAgIDxnIGlkPSJwYXRoNTc3MSIgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNzI3MTcsMCwwLDAuMzcyNzE3LC04LjI5OTMzLDIwMS4wOTgpIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE0MC42LDM3MS41MDNDMTM1LjM5NSwzNzEuNTAzIDEyNy42MzksMzY5LjkxIDEyNi42ODMsMzY5LjY5M0wxMjYuNjgzLDM2MS45NDJDMTI5LjIzNCwzNjIuNDcyIDEzNS44MTgsMzYzLjU3MSAxNDAuNDk1LDM2My41NzFDMTQ1LjkxMSwzNjMuNTcxIDE0OS40MTgsMzU4Ljk2NSAxNDkuNDE4LDM1MC43ODdDMTQ5LjQxOCwzNDEuMTE4IDE0Ny44MjYsMzM2LjAyIDE0MC4yODMsMzM2LjAyTDEzMS41NywzMzYuMDJMMTMxLjU3LDMyOC4yNjVMMTM5LjIxOSwzMjguMjY1QzE0Ny44MjYsMzI4LjI2NSAxNDguMjQ5LDMxOS40NDYgMTQ4LjI0OSwzMTUuMTk3QzE0OC4yNDksMzA2LjgwMiAxNDUuNTkzLDMwMy40MDMgMTQwLjI4MywzMDMuNDAzQzEzNS42MDgsMzAzLjQwMyAxMzAuMjk0LDMwNC41NzIgMTI3LjIxNCwzMDUuMjFMMTI3LjIxNCwyOTcuNDU2QzEyOC4zODQsMjk3LjI0MiAxMzQuNjUzLDI5NS42NSAxNDAuMDY5LDI5NS42NUMxNTEuMDEzLDI5NS42NSAxNTcuMjgsMzAwLjMyMyAxNTcuMjgsMzE2LjE1NUMxNTcuMjgsMzIzLjM3OCAxNTQuNzI5LDMyOS43NTEgMTQ5LjA5OSwzMzEuNzcxQzE1NS41NzgsMzMyLjE5NSAxNTguNTUzLDMzOS4zMTIgMTU4LjU1MywzNDkuNzI1QzE1OC41NTMsMzY1LjU1MyAxNTIuMzk0LDM3MS41MDMgMTQwLjYsMzcxLjUwM005MS43MzMsMzAzLjQwM0M4Mi4xNzQsMzAzLjQwMyA3OC45ODQsMzA5Ljg4NyA3OC45ODQsMzMzLjI1N0M3OC45ODQsMzU2LjEgODIuMTc0LDM2My43NDggOTEuNzMzLDM2My43NDhDMTAxLjI5NCwzNjMuNzQ4IDEwNC40ODEsMzU2LjEgMTA0LjQ4MSwzMzMuMjU3QzEwNC40ODEsMzA5Ljg4NyAxMDEuMjk0LDMwMy40MDMgOTEuNzMzLDMwMy40MDNNOTEuNzMzLDM3MS41MDNDNzQuMjA0LDM3MS41MDMgNjkuNTI4LDM1OC43NTUgNjkuNTI4LDMzMi43MjdDNjkuNTI4LDMwNy43NiA3NC4yMDQsMjk1LjY1IDkxLjczMywyOTUuNjVDMTA5LjI2MywyOTUuNjUgMTEzLjkzNSwzMDcuNzYgMTEzLjkzNSwzMzIuNzI3QzExMy45MzUsMzU4Ljc1NSAxMDkuMjYzLDM3MS41MDMgOTEuNzMzLDM3MS41MDNNMzguODIzLDMwMy4zQzMyLjk3OCwzMDMuMyAyOC44MzYsMzAzLjkzNiAyOC44MzYsMzAzLjkzNkwyOC44MzYsMzM0Ljk1NkwzOC44MjMsMzM0Ljk1NkM0NC43NzEsMzM0Ljk1NiA0OC45MTUsMzMxLjAyNSA0OC45MTUsMzE5LjQ0NkM0OC45MTUsMzA4LjgyMSA0Ni4zNjUsMzAzLjMgMzguODIzLDMwMy4zTTM3Ljc2LDM0Mi43MTJMMjguODM2LDM0Mi43MTJMMjguODM2LDM3MC43NTdMMTkuNTk0LDM3MC43NTdMMTkuNTk0LDI5Ni4zOTJDMTkuNTk0LDI5Ni4zOTIgMjguNzMsMjk1LjY1IDM3LjU0OCwyOTUuNjVDNTMuNjk2LDI5NS42NSA1OC4zNzMsMzA1LjYzNSA1OC4zNzMsMzE4LjcwMkM1OC4zNzMsMzM0Ljg1MiA1Mi44NDYsMzQyLjcxMiAzNy43NiwzNDIuNzEyTS0xMC4yNTcsMzM2LjIzMkwtMTAuMjU3LDM3MC43NTdMLTE5LjgxOSwzNzAuNzU3TC0xOS44MTksMzM2LjIzMkwtMzguODM0LDI5Ni4zOTJMLTI4LjYzNywyOTYuMzkyTC0xNC42MTQsMzI2LjQ1N0wtMC41OSwyOTYuMzkyTDkuMDc2LDI5Ni4zOTJMLTEwLjI1NywzMzYuMjMyWk0tNTkuODM3LDMwNC40NjhMLTU5LjgzNywzNzAuNzU3TC02OS4wNzksMzcwLjc1N0wtNjkuMDc5LDMwNC40NjhMLTg1LjQ0LDMwNC40NjhMLTg1LjQ0LDI5Ni4zOTJMLTQzLjQ3NywyOTYuMzkyTC00My40NzcsMzA0LjQ2OEwtNTkuODM3LDMwNC40NjhaIiBzdHlsZT0iZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJwYXRoNTc3NSIgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNzI3MTcsMCwwLDAuMzcyNzE3LC04LjI5OTMzLDIwMS4wOTgpIj4KICAgICAgICAgICAgPHBhdGggZD0iTS0xMjkuOTY5LDM0MC4wNzFDLTEzMS40NywzNDAuNTE0IC0xMzIuNjY2LDM0MC42NjYgLTEzNC4yMzEsMzQwLjY2NkMtMTQ3LjA3MSwzNDAuNjY2IC0xNjUuOTMxLDI5NS43OTYgLTE2NS45MzEsMjgwLjg2MkMtMTY1LjkzMSwyNzUuMzYxIC0xNjQuNjI1LDI3My41MjcgLTE2Mi43ODksMjcxLjk1NkMtMTc4LjUwNiwyNzMuNzg5IC0xOTcuMzY5LDI3OS41NTQgLTIwMy4zOTYsMjg2Ljg4OUMtMjA0LjcwNSwyODguNzI0IC0yMDUuNDkxLDI5MS42MDUgLTIwNS40OTEsMjk1LjI3MUMtMjA1LjQ5MSwzMTguNTg5IC0xODAuNjA0LDM3MS41MDUgLTE2My4wNSwzNzEuNTA1Qy0xNTQuOTMsMzcxLjUwNSAtMTQxLjIzNCwzNTguMTQ1IC0xMjkuOTY5LDM0MC4wNzEiIHN0eWxlPSJmaWxsOnJnYigyNTUsMTM1LDApO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0icGF0aDU3NzkiIHRyYW5zZm9ybT0ibWF0cml4KDAuMzcyNzE3LDAsMCwwLjM3MjcxNywtOC4yOTkzMywyMDEuMDk4KSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMTM4LjE2NSwyNzAuMzgzQy0xMjEuOTIyLDI3MC4zODMgLTEwNS42NzcsMjczLjAwMyAtMTA1LjY3NywyODIuMTcyQy0xMDUuNjc3LDMwMC43NzMgLTExNy40NjYsMzIzLjMwMyAtMTIzLjQ5MiwzMjMuMzAzQy0xMzQuMjMyLDMyMy4zMDMgLTE0Ny41OTMsMjkzLjQzOSAtMTQ3LjU5MywyNzguNTA1Qy0xNDcuNTkzLDI3MS42OTQgLTE0NC45NzMsMjcwLjM4MyAtMTM4LjE2NSwyNzAuMzgzIiBzdHlsZT0iZmlsbDpyZ2IoMjU1LDEzNSwwKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
;// CONCATENATED MODULE: ./src/images/react-logo.svg
/* harmony default export */ const react_logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDQ4IDQ4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wOTYyNzY3LDAsMCwwLjA5NjI3NjYsLTE2LjkxNTgsLTQuOTQxMTkpIj4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTY2Ni4zLDI5Ni41QzY2Ni4zLDI2NCA2MjUuNiwyMzMuMiA1NjMuMiwyMTQuMUM1NzcuNiwxNTAuNSA1NzEuMiw5OS45IDU0Myw4My43QzUzNi41LDc5LjkgNTI4LjksNzguMSA1MjAuNiw3OC4xTDUyMC42LDEwMC40QzUyNS4yLDEwMC40IDUyOC45LDEwMS4zIDUzMiwxMDNDNTQ1LjYsMTEwLjggNTUxLjUsMTQwLjUgNTQ2LjksMTc4LjdDNTQ1LjgsMTg4LjEgNTQ0LDE5OCA1NDEuOCwyMDguMUM1MjIuMiwyMDMuMyA1MDAuOCwxOTkuNiA0NzguMywxOTcuMkM0NjQuOCwxNzguNyA0NTAuOCwxNjEuOSA0MzYuNywxNDcuMkM0NjkuMywxMTYuOSA0OTkuOSwxMDAuMyA1MjAuNywxMDAuM0w1MjAuNyw3OEM0OTMuMiw3OCA0NTcuMiw5Ny42IDQyMC44LDEzMS42QzM4NC40LDk3LjggMzQ4LjQsNzguNCAzMjAuOSw3OC40TDMyMC45LDEwMC43QzM0MS42LDEwMC43IDM3Mi4zLDExNy4yIDQwNC45LDE0Ny4zQzM5MC45LDE2MiAzNzYuOSwxNzguNyAzNjMuNiwxOTcuMkMzNDEsMTk5LjYgMzE5LjYsMjAzLjMgMzAwLDIwOC4yQzI5Ny43LDE5OC4yIDI5NiwxODguNSAyOTQuOCwxNzkuMkMyOTAuMSwxNDEgMjk1LjksMTExLjMgMzA5LjQsMTAzLjRDMzEyLjQsMTAxLjYgMzE2LjMsMTAwLjggMzIwLjksMTAwLjhMMzIwLjksNzguNUMzMTIuNSw3OC41IDMwNC45LDgwLjMgMjk4LjMsODQuMUMyNzAuMiwxMDAuMyAyNjMuOSwxNTAuOCAyNzguNCwyMTQuMkMyMTYuMiwyMzMuNCAxNzUuNywyNjQuMSAxNzUuNywyOTYuNUMxNzUuNywzMjkgMjE2LjQsMzU5LjggMjc4LjgsMzc4LjlDMjY0LjQsNDQyLjUgMjcwLjgsNDkzLjEgMjk5LDUwOS4zQzMwNS41LDUxMy4xIDMxMy4xLDUxNC45IDMyMS41LDUxNC45QzM0OSw1MTQuOSAzODUsNDk1LjMgNDIxLjQsNDYxLjNDNDU3LjgsNDk1LjEgNDkzLjgsNTE0LjUgNTIxLjMsNTE0LjVDNTI5LjcsNTE0LjUgNTM3LjMsNTEyLjcgNTQzLjksNTA4LjlDNTcyLDQ5Mi43IDU3OC4zLDQ0Mi4yIDU2My44LDM3OC44QzYyNS44LDM1OS43IDY2Ni4zLDMyOC45IDY2Ni4zLDI5Ni41Wk01MzYuMSwyMjkuOEM1MzIuNCwyNDIuNyA1MjcuOCwyNTYgNTIyLjYsMjY5LjNDNTE4LjUsMjYxLjMgNTE0LjIsMjUzLjMgNTA5LjUsMjQ1LjNDNTA0LjksMjM3LjMgNTAwLDIyOS41IDQ5NS4xLDIyMS45QzUwOS4zLDIyNCA1MjMsMjI2LjYgNTM2LjEsMjI5LjhaTTQ5MC4zLDMzNi4zQzQ4Mi41LDM0OS44IDQ3NC41LDM2Mi42IDQ2Ni4yLDM3NC41QzQ1MS4zLDM3NS44IDQzNi4yLDM3Ni41IDQyMSwzNzYuNUM0MDUuOSwzNzYuNSAzOTAuOCwzNzUuOCAzNzYsMzc0LjZDMzY3LjcsMzYyLjcgMzU5LjYsMzUwIDM1MS44LDMzNi42QzM0NC4yLDMyMy41IDMzNy4zLDMxMC4yIDMzMSwyOTYuOEMzMzcuMiwyODMuNCAzNDQuMiwyNzAgMzUxLjcsMjU2LjlDMzU5LjUsMjQzLjQgMzY3LjUsMjMwLjYgMzc1LjgsMjE4LjdDMzkwLjcsMjE3LjQgNDA1LjgsMjE2LjcgNDIxLDIxNi43QzQzNi4xLDIxNi43IDQ1MS4yLDIxNy40IDQ2NiwyMTguNkM0NzQuMywyMzAuNSA0ODIuNCwyNDMuMiA0OTAuMiwyNTYuNkM0OTcuOCwyNjkuNyA1MDQuNywyODMgNTExLDI5Ni40QzUwNC43LDMwOS44IDQ5Ny44LDMyMy4yIDQ5MC4zLDMzNi4zWk01MjIuNiwzMjMuM0M1MjgsMzM2LjcgNTMyLjYsMzUwLjEgNTM2LjQsMzYzLjFDNTIzLjMsMzY2LjMgNTA5LjUsMzY5IDQ5NS4yLDM3MS4xQzUwMC4xLDM2My40IDUwNSwzNTUuNSA1MDkuNiwzNDcuNEM1MTQuMiwzMzkuNCA1MTguNSwzMzEuMyA1MjIuNiwzMjMuM1pNNDIxLjIsNDMwQzQxMS45LDQyMC40IDQwMi42LDQwOS43IDM5My40LDM5OEM0MDIuNCwzOTguNCA0MTEuNiwzOTguNyA0MjAuOSwzOTguN0M0MzAuMywzOTguNyA0MzkuNiwzOTguNSA0NDguNywzOThDNDM5LjcsNDA5LjcgNDMwLjQsNDIwLjQgNDIxLjIsNDMwWk0zNDYuOCwzNzEuMUMzMzIuNiwzNjkgMzE4LjksMzY2LjQgMzA1LjgsMzYzLjJDMzA5LjUsMzUwLjMgMzE0LjEsMzM3IDMxOS4zLDMyMy43QzMyMy40LDMzMS43IDMyNy43LDMzOS43IDMzMi40LDM0Ny43QzMzNy4xLDM1NS43IDM0MS45LDM2My41IDM0Ni44LDM3MS4xWk00MjAuNywxNjNDNDMwLDE3Mi42IDQzOS4zLDE4My4zIDQ0OC41LDE5NUM0MzkuNSwxOTQuNiA0MzAuMywxOTQuMyA0MjEsMTk0LjNDNDExLjYsMTk0LjMgNDAyLjMsMTk0LjUgMzkzLjIsMTk1QzQwMi4yLDE4My4zIDQxMS41LDE3Mi42IDQyMC43LDE2M1pNMzQ2LjcsMjIxLjlDMzQxLjgsMjI5LjYgMzM2LjksMjM3LjUgMzMyLjMsMjQ1LjZDMzI3LjcsMjUzLjYgMzIzLjQsMjYxLjYgMzE5LjMsMjY5LjZDMzEzLjksMjU2LjIgMzA5LjMsMjQyLjggMzA1LjUsMjI5LjhDMzE4LjYsMjI2LjcgMzMyLjQsMjI0IDM0Ni43LDIyMS45Wk0yNTYuMiwzNDcuMUMyMjAuOCwzMzIgMTk3LjksMzEyLjIgMTk3LjksMjk2LjVDMTk3LjksMjgwLjggMjIwLjgsMjYwLjkgMjU2LjIsMjQ1LjlDMjY0LjgsMjQyLjIgMjc0LjIsMjM4LjkgMjgzLjksMjM1LjhDMjg5LjYsMjU1LjQgMjk3LjEsMjc1LjggMzA2LjQsMjk2LjdDMjk3LjIsMzE3LjUgMjg5LjgsMzM3LjggMjg0LjIsMzU3LjNDMjc0LjMsMzU0LjIgMjY0LjksMzUwLjggMjU2LjIsMzQ3LjFaTTMxMCw0OTBDMjk2LjQsNDgyLjIgMjkwLjUsNDUyLjUgMjk1LjEsNDE0LjNDMjk2LjIsNDA0LjkgMjk4LDM5NSAzMDAuMiwzODQuOUMzMTkuOCwzODkuNyAzNDEuMiwzOTMuNCAzNjMuNywzOTUuOEMzNzcuMiw0MTQuMyAzOTEuMiw0MzEuMSA0MDUuMyw0NDUuOEMzNzIuNyw0NzYuMSAzNDIuMSw0OTIuNyAzMjEuMyw0OTIuN0MzMTYuOCw0OTIuNiAzMTMsNDkxLjcgMzEwLDQ5MFpNNTQ3LjIsNDEzLjhDNTUxLjksNDUyIDU0Ni4xLDQ4MS43IDUzMi42LDQ4OS42QzUyOS42LDQ5MS40IDUyNS43LDQ5Mi4yIDUyMS4xLDQ5Mi4yQzUwMC40LDQ5Mi4yIDQ2OS43LDQ3NS43IDQzNy4xLDQ0NS42QzQ1MS4xLDQzMC45IDQ2NS4xLDQxNC4yIDQ3OC40LDM5NS43QzUwMSwzOTMuMyA1MjIuNCwzODkuNiA1NDIsMzg0LjdDNTQ0LjMsMzk0LjggNTQ2LjEsNDA0LjUgNTQ3LjIsNDEzLjhaTTU4NS43LDM0Ny4xQzU3Ny4xLDM1MC44IDU2Ny43LDM1NC4xIDU1OCwzNTcuMkM1NTIuMywzMzcuNiA1NDQuOCwzMTcuMiA1MzUuNSwyOTYuM0M1NDQuNywyNzUuNSA1NTIuMSwyNTUuMiA1NTcuNywyMzUuN0M1NjcuNiwyMzguOCA1NzcsMjQyLjIgNTg1LjgsMjQ1LjlDNjIxLjIsMjYxIDY0NC4xLDI4MC44IDY0NC4xLDI5Ni41QzY0NCwzMTIuMiA2MjEuMSwzMzIuMSA1ODUuNywzNDcuMVoiIHN0eWxlPSJmaWxsOnJnYig5NywyMTgsMjUxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iNDIwLjkiIGN5PSIyOTYuNSIgcj0iNDUuNyIgc3R5bGU9ImZpbGw6cmdiKDk3LDIxOCwyNTEpOyIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
;// CONCATENATED MODULE: ./src/images/gatsby-logo.svg
/* harmony default export */ const gatsby_logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+DQogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMTE0LjIyNiwtNjQuOTU5OSkiPg0KICAgICAgICA8ZyBpZD0iZ2F0c2J5LWxvZ28iIHRyYW5zZm9ybT0ibWF0cml4KDAuNDI5NDQ1LDAsMCwxLjAxNzQ3LDY1LjM4MDcsMS44OTg2OSkiPg0KICAgICAgICAgICAgPHJlY3QgeD0iMTEzLjc0IiB5PSI2MS45NzgiIHdpZHRoPSI5MS40MTUiIGhlaWdodD0iMzguNjQyIiBzdHlsZT0iZmlsbDpub25lOyIvPg0KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNTI4NTMsMCwwLDAuMTQ4OTI4LDExNC4wODUsNjIuMzIxNCkiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMjgsMEM1Ny4zMDgsMCAwLDU3LjMwNyAwLDEyOEMwLDE5OC42OTMgNTcuMzA4LDI1NiAxMjgsMjU2QzE5OC42OTMsMjU2IDI1NiwxOTguNjkzIDI1NiwxMjhDMjU2LDU3LjMwNyAxOTguNjkzLDAgMTI4LDBaTTI3LjUwNCwxMjkuMzM0TDEyNi42NjUsMjI4LjQ5NkM3Mi4yMTQsMjI3Ljc4NiAyOC4yMTMsMTgzLjc4NSAyNy41MDQsMTI5LjMzNFpNMTUwLjQ5NiwyMjUuOTgzTDMwLjAxNywxMDUuNTA0QzQwLjIzMyw2MC44MjMgODAuMjIyLDI3LjQ4NyAxMjgsMjcuNDg3QzE2MS4zOTcsMjcuNDg3IDE5MC45ODUsNDMuNzggMjA5LjI2Myw2OC44NDZMMTk1LjM0Niw4MS4xMjZDMTgwLjUyLDU5Ljg2NCAxNTUuODg3LDQ1Ljk0OSAxMjgsNDUuOTQ5QzkyLjQ5NSw0NS45NDkgNjIuMjYsNjguNTAxIDUwLjgzMSwxMDAuMDYyTDE1NS45MzksMjA1LjE2OUMxODEuNDY0LDE5NS45MjYgMjAxLjA5NSwxNzQuMzc5IDIwNy42NywxNDcuNjkyTDE2NC4xMDMsMTQ3LjY5MkwxNjQuMTAzLDEyOEwyMTAuMDUxLDEyOEwyMTAuMDUxLDEyOEwyMjguNTEzLDEyOEwyMjguNTEzLDEyOEMyMjguNTEzLDE3NS43NzggMTk1LjE3NywyMTUuNzY3IDE1MC40OTYsMjI1Ljk4M1oiIHN0eWxlPSJmaWxsOnJnYigxMTYsNzYsMTU4KTtmaWxsLXJ1bGU6bm9uemVybzsiLz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg0K");
;// CONCATENATED MODULE: ./src/images/sass-logo.svg
/* harmony default export */ const sass_logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNjYgNTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+DQogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtMTcyLjU4MiwtMC42MDk0ODUpIj4NCiAgICAgICAgPGcgaWQ9InNhc3MtbG9nbyIgdHJhbnNmb3JtPSJtYXRyaXgoMC44OTc1MiwwLDAsMC42MDI0MSwxMTIuNjE1LDAuNzA0OTk2KSI+DQogICAgICAgICAgICA8cmVjdCB4PSI2Ni44MTUiIHk9Ii0wLjE1OSIgd2lkdGg9IjczIiBoZWlnaHQ9IjgzIiBzdHlsZT0iZmlsbDpub25lOyIvPg0KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4xMzA3NjUsMCwwLDAuMTk1NDYsNjcuNDU0MSwwLjg5ODMzNykiPg0KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00NzEuNCwyMzZDNDUyLjMsMjM2LjEgNDM1LjcsMjQwLjcgNDIxLjgsMjQ3LjVDNDE2LjcsMjM3LjQgNDExLjYsMjI4LjQgNDEwLjcsMjIxLjhDNDA5LjcsMjE0LjEgNDA4LjUsMjA5LjQgNDA5LjcsMjAwLjJDNDEwLjksMTkxIDQxNi4zLDE3Ny45IDQxNi4yLDE3Ni45QzQxNi4xLDE3NS45IDQxNSwxNzEuMiA0MDQsMTcxLjFDMzkzLDE3MSAzODMuNSwxNzMuMiAzODIuNCwxNzYuMUMzODEuMywxNzkgMzc5LjIsMTg1LjYgMzc3LjgsMTkyLjRDMzc1LjksMjAyLjQgMzU1LjgsMjM4LjEgMzQ0LjMsMjU2LjhDMzQwLjYsMjQ5LjUgMzM3LjQsMjQzLjEgMzM2LjcsMjM4QzMzNS43LDIzMC4zIDMzNC41LDIyNS42IDMzNS43LDIxNi40QzMzNi45LDIwNy4yIDM0Mi4zLDE5NC4xIDM0Mi4yLDE5My4xQzM0Mi4xLDE5Mi4xIDM0MSwxODcuNCAzMzAsMTg3LjNDMzE5LDE4Ny4yIDMwOS41LDE4OS40IDMwOC40LDE5Mi4zQzMwNy4zLDE5NS4yIDMwNi4xLDIwMiAzMDMuOCwyMDguNkMzMDEuNSwyMTUuMiAyNzQuOCwyNzQuOCAyNjcuOCwyOTAuMkMyNjQuMiwyOTguMSAyNjEuMSwzMDQuNCAyNTguOSwzMDguN0MyNTguOSwzMDguNyAyNTguOCwzMDkgMjU4LjUsMzA5LjVDMjU2LjYsMzEzLjIgMjU1LjUsMzE1LjIgMjU1LjUsMzE1LjJMMjU1LjUsMzE1LjNDMjU0LDMxOCAyNTIuNCwzMjAuNSAyNTEuNiwzMjAuNUMyNTEsMzIwLjUgMjQ5LjksMzEzLjMgMjUxLjgsMzAzLjVDMjU1LjgsMjgyLjggMjY1LjMsMjUwLjYgMjY1LjIsMjQ5LjVDMjY1LjIsMjQ4LjkgMjY3LDI0My4zIDI1OSwyNDAuNEMyNTEuMiwyMzcuNSAyNDguNCwyNDIuMyAyNDcuNywyNDIuM0MyNDcsMjQyLjMgMjQ2LjUsMjQ0IDI0Ni41LDI0NEMyNDYuNSwyNDQgMjU1LjIsMjA3LjggMjI5LjksMjA3LjhDMjE0LjEsMjA3LjggMTkyLjMsMjI1LjEgMTgxLjUsMjQwLjdDMTc0LjcsMjQ0LjQgMTYwLjIsMjUyLjMgMTQ0LjcsMjYwLjhDMTM4LjgsMjY0LjEgMTMyLjcsMjY3LjQgMTI3LDI3MC41QzEyNi42LDI3MC4xIDEyNi4yLDI2OS42IDEyNS44LDI2OS4yQzk1LjIsMjM2LjUgMzguNiwyMTMuNCA0MSwxNjkuNUM0MS45LDE1My41IDQ3LjQsMTExLjUgMTQ5LjcsNjAuNUMyMzMuOSwxOSAzMDAuOSwzMC41IDMxMi41LDU2QzMyOS4xLDkyLjQgMjc2LjYsMTYwIDE4OS42LDE2OS44QzE1Ni40LDE3My41IDEzOSwxNjAuNyAxMzQuNiwxNTUuOUMxMzAsMTUwLjkgMTI5LjMsMTUwLjYgMTI3LjYsMTUxLjZDMTI0LjgsMTUzLjEgMTI2LjYsMTU3LjYgMTI3LjYsMTYwLjJDMTMwLjIsMTY3IDE0MC45LDE3OSAxNTksMTg0LjlDMTc1LDE5MC4xIDIxMy45LDE5MyAyNjEsMTc0LjhDMzEzLjcsMTU0LjQgMzU0LjksOTcuNyAzNDIuOCw1MC4yQzMzMC43LDIgMjUwLjcsLTEzLjkgMTc1LDEzQzEzMCwyOSA4MS4yLDU0LjIgNDYuMSw4N0M0LjQsMTI2IC0yLjIsMTU5LjkgMC41LDE3NC4xQzEwLjIsMjI0LjUgNzkuNywyNTcuMyAxMDcuNSwyODEuNkMxMDYuMSwyODIuNCAxMDQuOCwyODMuMSAxMDMuNywyODMuN0M4OS44LDI5MC42IDM2LjgsMzE4LjMgMjMuNiwzNDcuNkM4LjYsMzgwLjggMjYsNDA0LjYgMzcuNSw0MDcuOEM3My4yLDQxNy43IDEwOS45LDM5OS45IDEyOS42LDM3MC41QzE0OS4zLDM0MS4xIDE0Ni45LDMwMi45IDEzNy44LDI4NS40QzEzNy43LDI4NS4yIDEzNy42LDI4NSAxMzcuNCwyODQuOEMxNDEsMjgyLjcgMTQ0LjcsMjgwLjUgMTQ4LjMsMjc4LjRDMTU1LjQsMjc0LjIgMTYyLjQsMjcwLjMgMTY4LjQsMjY3LjFDMTY1LDI3Ni40IDE2Mi41LDI4Ny41IDE2MS4zLDMwMy41QzE1OS44LDMyMi4zIDE2Ny41LDM0Ni43IDE3Ny42LDM1Ni4zQzE4Mi4xLDM2MC41IDE4Ny40LDM2MC42IDE5MC44LDM2MC42QzIwMi42LDM2MC42IDIwNy45LDM1MC44IDIxMy44LDMzOS4yQzIyMSwzMjUgMjI3LjUsMzA4LjUgMjI3LjUsMzA4LjVDMjI3LjUsMzA4LjUgMjE5LjQsMzUzLjEgMjQxLjQsMzUzLjFDMjQ5LjQsMzUzLjEgMjU3LjUsMzQyLjcgMjYxLjEsMzM3LjRMMjYxLjEsMzM3LjVDMjYxLjEsMzM3LjUgMjYxLjMsMzM3LjIgMjYxLjcsMzM2LjVDMjYyLjUsMzM1LjIgMjYzLDMzNC40IDI2MywzMzQuNEwyNjMsMzM0LjJDMjY2LjIsMzI4LjYgMjczLjQsMzE1LjkgMjg0LjEsMjk0LjhDMjk3LjksMjY3LjYgMzExLjIsMjMzLjYgMzExLjIsMjMzLjZDMzExLjIsMjMzLjYgMzEyLjQsMjQxLjkgMzE2LjUsMjU1LjdDMzE4LjksMjYzLjggMzIzLjksMjcyLjcgMzI3LjksMjgxLjNDMzI0LjcsMjg1LjggMzIyLjcsMjg4LjMgMzIyLjcsMjg4LjNMMzIyLjgsMjg4LjRDMzIwLjIsMjkxLjggMzE3LjQsMjk1LjUgMzE0LjMsMjk5LjFDMzAzLjQsMzEyLjEgMjkwLjQsMzI3IDI4OC42LDMzMS4zQzI4Ni41LDMzNi40IDI4NywzNDAuMSAyOTEsMzQzLjFDMjkzLjksMzQ1LjMgMjk5LjEsMzQ1LjYgMzA0LjQsMzQ1LjNDMzE0LjIsMzQ0LjYgMzIxLjEsMzQyLjIgMzI0LjUsMzQwLjdDMzI5LjgsMzM4LjggMzM2LDMzNS45IDM0MS44LDMzMS42QzM1Mi41LDMyMy43IDM1OSwzMTIuNCAzNTguNCwyOTcuNUMzNTguMSwyODkuMyAzNTUuNCwyODEuMSAzNTIuMSwyNzMuNEMzNTMuMSwyNzIgMzU0LDI3MC42IDM1NSwyNjkuMkMzNzEuOSwyNDQuNSAzODUsMjE3LjQgMzg1LDIxNy40QzM4NSwyMTcuNCAzODYuMiwyMjUuNyAzOTAuMywyMzkuNUMzOTIuMywyNDYuNSAzOTYuNCwyNTQuMSA0MDAsMjYxLjVDMzg0LjEsMjc0LjQgMzc0LjMsMjg5LjQgMzcwLjgsMjk5LjJDMzY0LjUsMzE3LjQgMzY5LjQsMzI1LjYgMzc4LjcsMzI3LjVDMzgyLjksMzI4LjQgMzg4LjksMzI2LjQgMzkzLjMsMzI0LjVDMzk4LjksMzIyLjcgNDA1LjUsMzE5LjYgNDExLjgsMzE1QzQyMi41LDMwNy4xIDQzMi44LDI5Ni4xIDQzMi4yLDI4MS4yQzQzMS45LDI3NC40IDQzMC4xLDI2Ny43IDQyNy42LDI2MS4yQzQ0MS4xLDI1NS42IDQ1OC41LDI1Mi41IDQ4MC43LDI1NS4xQzUyOC4zLDI2MC43IDUzNy43LDI5MC40IDUzNS45LDMwMi45QzUzNC4xLDMxNS40IDUyNC4xLDMyMi4yIDUyMC44LDMyNC4zQzUxNy41LDMyNi40IDUxNi40LDMyNy4xIDUxNi43LDMyOC42QzUxNy4xLDMzMC44IDUxOC43LDMzMC43IDUyMS41LDMzMC4zQzUyNS40LDMyOS42IDU0Ni41LDMyMC4yIDU0Ny40LDI5Ny4yQzU0OC45LDI2Ny44IDUyMC45LDIzNS43IDQ3MS40LDIzNlpNMTA0LjIsMzU5LjhDODguNCwzNzcgNjYuNCwzODMuNSA1Ni45LDM3OEM0Ni43LDM3Mi4xIDUwLjcsMzQ2LjcgNzAuMSwzMjguNUM4MS45LDMxNy40IDk3LjEsMzA3LjEgMTA3LjIsMzAwLjhDMTA5LjUsMjk5LjQgMTEyLjksMjk3LjQgMTE3LDI5NC45QzExNy43LDI5NC41IDExOC4xLDI5NC4zIDExOC4xLDI5NC4zQzExOC45LDI5My44IDExOS43LDI5My4zIDEyMC41LDI5Mi44QzEyNy42LDMxOC44IDEyMC44LDM0MS43IDEwNC4yLDM1OS44Wk0yMTkuMiwyODEuNkMyMTMuNywyOTUgMjAyLjIsMzI5LjMgMTk1LjIsMzI3LjRDMTg5LjIsMzI1LjggMTg1LjUsMjk5LjggMTk0LDI3NC4xQzE5OC4zLDI2MS4yIDIwNy40LDI0NS44IDIxMi43LDIzOS44QzIyMS4zLDIzMC4yIDIzMC44LDIyNyAyMzMuMSwyMzAuOUMyMzYsMjM2IDIyMi42LDI3My4yIDIxOS4yLDI4MS42Wk0zMTQuMSwzMjdDMzExLjgsMzI4LjIgMzA5LjYsMzI5IDMwOC42LDMyOC40QzMwNy45LDMyOCAzMDkuNiwzMjYuNCAzMDkuNiwzMjYuNEMzMDkuNiwzMjYuNCAzMjEuNSwzMTMuNiAzMjYuMiwzMDcuOEMzMjguOSwzMDQuNCAzMzIuMSwzMDAuNCAzMzUuNSwyOTUuOUwzMzUuNSwyOTcuMkMzMzUuNSwzMTIuNSAzMjAuNywzMjIuOCAzMTQuMSwzMjdaTTM4Ny4zLDMxMC4zQzM4NS42LDMwOS4xIDM4NS45LDMwNS4xIDM5MS42LDI5Mi42QzM5My44LDI4Ny43IDM5OSwyNzkuNSA0MDcuOSwyNzEuNkM0MDguOSwyNzQuOCA0MDkuNiwyNzcuOSA0MDkuNSwyODAuOEM0MDkuNCwzMDAuMSAzOTUuNiwzMDcuMyAzODcuMywzMTAuM1oiIHN0eWxlPSJmaWxsOnJnYigyMDUsMTAzLDE1Myk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4NCg==");
;// CONCATENATED MODULE: ./src/images/HTML5_Logo.svg
/* harmony default export */ const HTML5_Logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDMwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLjk2MTgyMSwwLjc0MDkyMSkiPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMDc4MTI1LDAsMCwwLjA3ODEyNSwtNS45NjE4MiwtMC43NDA5MjEpIj4KICAgICAgICAgICAgPHBhdGggZD0iTTEwOC40LDBMMTMxLjQsMEwxMzEuNCwyMi44TDE1Mi42LDIyLjhMMTUyLjYsMEwxNzUuNiwwTDE3NS42LDY5TDE1Mi42LDY5TDE1Mi42LDQ2TDEzMS42LDQ2TDEzMS42LDY5TDEwOC40LDY5TTIwNiwyM0wxODUuNywyM0wxODUuNywwTDI0OS40LDBMMjQ5LjQsMjNMMjI5LDIzTDIyOSw2OUwyMDYsNjlNMjU5LjUsMEwyODMuNiwwTDI5OC40LDI0LjNMMzEzLjIsMEwzMzcuMywwTDMzNy4zLDY5TDMxNC4zLDY5TDMxNC4zLDM0LjhMMjk4LjIsNTkuNkwyODIuMSwzNC44TDI4Mi4xLDY5TDI1OS41LDY5TTM0OC43LDBMMzcxLjcsMEwzNzEuNyw0Ni4yTDQwNC4zLDQ2LjJMNDA0LjMsNjlMMzQ4LjcsNjkiIHN0eWxlPSJmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wNzgxMjUsMCwwLDAuMDc4MTI1LC01Ljk2MTgyLC0wLjc0MDkyMSkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTA3LjYsNDcxTDc0LjYsMTAwLjZMNDM3LjQsMTAwLjZMNDA0LjQsNDcwLjhMMjU1LjcsNTEyIiBzdHlsZT0iZmlsbDpyZ2IoMjI4LDc3LDM4KTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wNzgxMjUsMCwwLDAuMDc4MTI1LC01Ljk2MTgyLC0wLjc0MDkyMSkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjU2LDQ4MC41TDI1NiwxMzFMNDA0LjMsMTMxTDM3Niw0NDciIHN0eWxlPSJmaWxsOnJnYigyNDEsMTAxLDQxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wNzgxMjUsMCwwLDAuMDc4MTI1LC01Ljk2MTgyLC0wLjc0MDkyMSkiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTQyLDE3Ni4zTDI1NiwxNzYuM0wyNTYsMjIxLjdMMTkxLjgsMjIxLjdMMTk2LDI2OC4yTDI1NiwyNjguMkwyNTYsMzEzLjVMMTU0LjQsMzEzLjVNMTU2LjQsMzM2LjNMMjAyLDMzNi4zTDIwNS4yLDM3Mi42TDI1NiwzODYuMkwyNTYsNDMzLjZMMTYyLjgsNDA3LjYiIHN0eWxlPSJmaWxsOnJnYigyMzUsMjM1LDIzNSk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMDc4MTI1LDAsMCwwLjA3ODEyNSwtNS45NjE4MiwtMC43NDA5MjEpIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM2OS42LDE3Ni4zTDI1NS44LDE3Ni4zTDI1NS44LDIyMS43TDM2NS40LDIyMS43TTM2MS4zLDI2OC4yTDI1NS44LDI2OC4yTDI1NS44LDMxMy42TDMxMS44LDMxMy42TDMwNi41LDM3Mi42TDI1NS44LDM4Ni4yTDI1NS44LDQzMy40TDM0OC44LDQwNy42IiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
;// CONCATENATED MODULE: ./src/images/js-logo.svg
/* harmony default export */ const js_logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUwIDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDAyNzIsMCwwLDAuNjE1OTAyLC00Ny4yNzc5LC0wLjEwODU2KSI+CiAgICAgICAgPGcgaWQ9ImpzLWxvZ28iPgogICAgICAgICAgICA8cmVjdCB4PSI2Ni44MTUiIHk9Ii0wLjE1OSIgd2lkdGg9IjczIiBoZWlnaHQ9IjgzIiBzdHlsZT0iZmlsbDpub25lOyIvPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjYzOTMzLDAsMCwxLjg2Mzg5LC02NjMuMDUsLTIuOTU3MjUpIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMDY5MTA5NCwwLDAsMC4wNjkxMDk0LDQ0NS43MSwxLjY3NTYpIj4KICAgICAgICAgICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjMwIiBoZWlnaHQ9IjYzMCIgc3R5bGU9ImZpbGw6cmdiKDI0NywyMjMsMzApOyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wNjkxMDk0LDAsMCwwLjA2OTEwOTQsNDQ1LjcxLDEuNjc1NikiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00MjMuMiw0OTIuMTlDNDM1Ljg5LDUxMi45MSA0NTIuNCw1MjguMTQgNDgxLjYsNTI4LjE0QzUwNi4xMyw1MjguMTQgNTIxLjgsNTE1Ljg4IDUyMS44LDQ5OC45NEM1MjEuOCw0NzguNjQgNTA1LjcsNDcxLjQ1IDQ3OC43LDQ1OS42NEw0NjMuOSw0NTMuMjlDNDIxLjE4LDQzNS4wOSAzOTIuOCw0MTIuMjkgMzkyLjgsMzY0LjA5QzM5Mi44LDMxOS42OSA0MjYuNjMsMjg1Ljg5IDQ3OS41LDI4NS44OUM1MTcuMTQsMjg1Ljg5IDU0NC4yLDI5OC45OSA1NjMuNywzMzMuMjlMNTE3LjYsMzYyLjg5QzUwNy40NSwzNDQuNjkgNDk2LjUsMzM3LjUyIDQ3OS41LDMzNy41MkM0NjIuMTYsMzM3LjUyIDQ1MS4xNywzNDguNTIgNDUxLjE3LDM2Mi44OUM0NTEuMTcsMzgwLjY1IDQ2Mi4xNywzODcuODQgNDg3LjU3LDM5OC44NEw1MDIuMzcsNDA1LjE4QzU1Mi42Nyw0MjYuNzUgNTgxLjA3LDQ0OC43NCA1ODEuMDcsNDk4LjE4QzU4MS4wNyw1NTEuNDggNTM5LjIsNTgwLjY4IDQ4Mi45Nyw1ODAuNjhDNDI3Ljk5LDU4MC42OCAzOTIuNDcsNTU0LjQ4IDM3NS4wOSw1MjAuMTRMNDIzLjIsNDkyLjE5Wk0yMTQuMDcsNDk3LjMyQzIyMy4zNyw1MTMuODIgMjMxLjgzLDUyNy43NyAyNTIuMTcsNTI3Ljc3QzI3MS42Miw1MjcuNzcgMjgzLjg5LDUyMC4xNiAyODMuODksNDkwLjU3TDI4My44OSwyODkuMjdMMzQzLjA5LDI4OS4yN0wzNDMuMDksNDkxLjM3QzM0My4wOSw1NTIuNjcgMzA3LjE1LDU4MC41NyAyNTQuNjksNTgwLjU3QzIwNy4yOSw1ODAuNTcgMTc5Ljg0LDU1Ni4wNCAxNjUuODgsNTI2LjQ5NUwyMTQuMDcsNDk3LjMyWiIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
;// CONCATENATED MODULE: ./src/images/docker-logo.svg
/* harmony default export */ const docker_logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wNjk2OTYxLDAsMCwwLjA2OTY5NjEsLTE4LjA1NjksLTE1LjY3NDEpIj4KICAgICAgICA8cGF0aCBkPSJNODI3LjMsNDYxLjVDODI1LjcsNDYwLjIgODExLjIsNDQ5LjMgNzgwLjYsNDQ5LjNDNzcyLjUsNDQ5LjMgNzY0LjQsNDQ5LjkgNzU2LjQsNDUxLjRDNzUwLjUsNDEwLjcgNzE2LjksMzkwLjkgNzE1LjQsMzkwTDcwNy4yLDM4NS4yTDcwMS44LDM5M0M2OTUsNDAzLjUgNjkwLjEsNDE1IDY4Ny4yLDQyNy4yQzY4MS43LDQ1MC40IDY4NSw0NzIuMiA2OTYuOCw0OTAuOEM2ODIuNiw0OTguNyA2NTkuNyw1MDAuNyA2NTUuMSw1MDAuOEwyNzcsNTAwLjhDMjY3LjEsNTAwLjggMjU5LjEsNTA4LjggMjU5LjEsNTE4LjdDMjU4LjcsNTUxLjggMjY0LjMsNTg0LjcgMjc1LjYsNjE1LjhDMjg4LjYsNjUwIDMwOCw2NzUuMSAzMzMuMiw2OTAuNUMzNjEuNCw3MDcuOCA0MDcuMyw3MTcuNyA0NTkuNCw3MTcuN0M0ODIuOSw3MTcuOCA1MDYuNCw3MTUuNiA1MjkuNSw3MTEuM0M1NjEuNiw3MDUuNCA1OTIuNSw2OTQuMiA2MjAuOSw2NzguMUM2NDQuMyw2NjQuNSA2NjUuNCw2NDcuMyA2ODMuMyw2MjdDNzEzLjIsNTkzLjEgNzMxLjEsNTU1LjMgNzQ0LjQsNTIxLjhMNzQ5LjcsNTIxLjhDNzgyLjUsNTIxLjggODAyLjcsNTA4LjcgODEzLjgsNDk3LjdDODIxLjIsNDkwLjcgODI3LDQ4Mi4yIDgzMC43LDQ3Mi43TDgzMyw0NjUuOEw4MjcuMyw0NjEuNVpNMzEyLDQ4OS45TDM2Mi43LDQ4OS45QzM2NS4xLDQ4OS45IDM2Ny4xLDQ4Ny45IDM2Ny4xLDQ4NS41TDM2Ny4xLDQ0MC40QzM2Ny4xLDQzOCAzNjUuMSw0MzYgMzYyLjcsNDM1LjlMMzEyLDQzNS45QzMwOS42LDQzNS45IDMwNy42LDQzNy45IDMwNy42LDQ0MC4zTDMwNy42LDQ4NS41QzMwNy42LDQ4OCAzMDkuNiw0ODkuOSAzMTIsNDg5LjlNMzgxLjksNDg5LjlMNDMyLjYsNDg5LjlDNDM1LDQ4OS45IDQzNyw0ODcuOSA0MzcsNDg1LjVMNDM3LDQ0MC40QzQzNyw0MzggNDM1LDQzNiA0MzIuNiw0MzUuOUwzODEuOSw0MzUuOUMzNzkuNCw0MzUuOSAzNzcuNCw0MzcuOSAzNzcuNCw0NDAuNEwzNzcuNCw0ODUuNUMzNzcuNCw0ODggMzc5LjQsNDg5LjkgMzgxLjksNDg5LjlNNDUyLjcsNDkwTDUwMy40LDQ5MEM1MDUuOCw0OTAgNTA3LjgsNDg4IDUwNy44LDQ4NS42TDUwNy44LDQ0MC41QzUwNy44LDQzOC4xIDUwNS44LDQzNi4xIDUwMy40LDQzNkw0NTIuNyw0MzZDNDUwLjMsNDM2IDQ0OC4zLDQzOCA0NDguMyw0NDAuNEw0NDguMyw0ODUuNkM0NDguMyw0ODggNDUwLjMsNDg5LjkgNDUyLjcsNDkwTTUyMi44LDQ5MEw1NzMuNSw0OTBDNTc1LjksNDkwIDU3Ny45LDQ4OCA1NzgsNDg1LjZMNTc4LDQ0MC41QzU3OCw0MzggNTc2LDQzNiA1NzMuNSw0MzZMNTIyLjgsNDM2QzUyMC40LDQzNiA1MTguNCw0MzggNTE4LjQsNDQwLjRMNTE4LjQsNDg1LjZDNTE4LjQsNDg4IDUyMC4zLDQ5MCA1MjIuOCw0OTBNMzgxLjgsNDI1TDQzMi41LDQyNUM0MzQuOSw0MjUgNDM2LjksNDIzIDQzNi45LDQyMC41TDQzNi45LDM3NS40QzQzNi45LDM3MyA0MzQuOSwzNzEgNDMyLjUsMzcxTDM4MS44LDM3MUMzNzkuMywzNzEgMzc3LjQsMzczIDM3Ny4zLDM3NS40TDM3Ny4zLDQyMC41QzM3Ny40LDQyMyAzNzkuNCw0MjUgMzgxLjgsNDI1TTQ1Mi43LDQyNUw1MDMuNCw0MjVDNTA1LjgsNDI1IDUwNy44LDQyMyA1MDcuOCw0MjAuNUw1MDcuOCwzNzUuNEM1MDcuOCwzNzMgNTA1LjgsMzcxIDUwMy40LDM3MUw0NTIuNywzNzFDNDUwLjMsMzcxIDQ0OC4zLDM3MyA0NDguMywzNzUuNEw0NDguMyw0MjAuNUM0NDguMyw0MjMgNDUwLjMsNDI1IDQ1Mi43LDQyNU01MjIuOCw0MjVMNTczLjUsNDI1QzU3Niw0MjUgNTc3LjksNDIzIDU3OCw0MjAuNUw1NzgsMzc1LjRDNTc4LDM3Mi45IDU3NiwzNzEgNTczLjUsMzcxTDUyMi44LDM3MUM1MjAuNCwzNzEgNTE4LjQsMzczIDUxOC40LDM3NS40TDUxOC40LDQyMC41QzUxOC40LDQyMyA1MjAuMyw0MjUgNTIyLjgsNDI1TTUyMi44LDM2MC4xTDU3My41LDM2MC4xQzU3NiwzNjAuMSA1NzgsMzU4LjEgNTc4LDM1NS42TDU3OCwzMTAuNEM1NzgsMzA4IDU3NiwzMDYgNTczLjUsMzA2TDUyMi44LDMwNkM1MjAuNCwzMDYgNTE4LjQsMzA4IDUxOC40LDMxMC40TDUxOC40LDM1NS42QzUxOC40LDM1OC4xIDUyMC4zLDM2MC4xIDUyMi44LDM2MC4xTTU5My40LDQ5MEw2NDQuMSw0OTBDNjQ2LjUsNDkwIDY0OC41LDQ4OCA2NDguNSw0ODUuNkw2NDguNSw0NDAuNUM2NDguNSw0MzggNjQ2LjUsNDM2LjEgNjQ0LjEsNDM2TDU5My40LDQzNkM1OTEsNDM2IDU4OSw0MzggNTg5LDQ0MC40TDU4OSw0ODUuNkM1ODksNDg4IDU5MSw0OTAgNTkzLjQsNDkwIiBzdHlsZT0iZmlsbDpyZ2IoMCwxNDUsMjI2KTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgIDwvZz4KPC9zdmc+Cg==");
;// CONCATENATED MODULE: ./src/images/git-quad-logo.svg
/* harmony default export */ const git_quad_logo = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4zNTExLDAsMCwwLjM1MTA5OSwtOC43Nzc1MWUtMDUsLTAuMDMwNTY4MykiPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMTExLjc4LDUxLjk3N0w2Mi4wMzUsMi4yMzhDNTkuMTczLC0wLjYyNyA1NC41MjcsLTAuNjI3IDUxLjY2MSwyLjIzOEw0MS4zMzIsMTIuNTY4TDU0LjQzNCwyNS42N0M1Ny40OCwyNC42NDIgNjAuOTcxLDI1LjMzMSA2My4zOTgsMjcuNzU5QzY1LjgzNywzMC4yMDEgNjYuNTIyLDMzLjcyMiA2NS40NjgsMzYuNzc4TDc4LjA5Niw0OS40MDZDODEuMTUxLDQ4LjM1MyA4NC42NzYsNDkuMDMzIDg3LjExNSw1MS40NzdDOTAuNTI2LDU0Ljg4NyA5MC41MjYsNjAuNDEyIDg3LjExNSw2My44MjJDODMuNzA0LDY3LjIzNCA3OC4xNzksNjcuMjM0IDc0Ljc2Niw2My44MjJDNzIuMjAyLDYxLjI1NiA3MS41NjcsNTcuNDg4IDcyLjg2Niw1NC4zMjhMNjEuMDg5LDQyLjU1MUw2MS4wODgsNzMuNTQyQzYxLjkyLDczLjk1NCA2Mi43MDQsNzQuNTAzIDYzLjM5Nyw3NS4xOTNDNjYuODA3LDc4LjYwMiA2Ni44MDcsODQuMTI2IDYzLjM5Nyw4Ny41NDFDNTkuOTg3LDkwLjk1IDU0LjQ1OSw5MC45NSA1MS4wNTIsODcuNTQxQzQ3LjY0Miw4NC4xMjYgNDcuNjQyLDc4LjYwMiA1MS4wNTIsNzUuMTkzQzUxLjg5NSw3NC4zNTIgNTIuODcsNzMuNzE1IDUzLjkxMSw3My4yODhMNTMuOTExLDQyLjAwOUM1Mi44Nyw0MS41ODQgNTEuODk2LDQwLjk1MiA1MS4wNTIsNDAuMTA0QzQ4LjQ2OSwzNy41MjMgNDcuODQ3LDMzLjczMiA0OS4xNzEsMzAuNTZMMzYuMjU1LDE3LjY0MkwyLjE0OSw1MS43NDdDLTAuNzE2LDU0LjYxNCAtMC43MTYsNTkuMjYgMi4xNDksNjIuMTI1TDUxLjg5MSwxMTEuODY0QzU0Ljc1NSwxMTQuNzI5IDU5LjQsMTE0LjcyOSA2Mi4yNjcsMTExLjg2NEwxMTEuNzc5LDYyLjM2QzExNC42NDQsNTkuNDk0IDExNC42NDQsNTQuODQ3IDExMS43NzksNTEuOTgxIiBzdHlsZT0iZmlsbDpyZ2IoMjQwLDgxLDUxKTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(31);
;// CONCATENATED MODULE: ./src/images/socMedImg.jpg
/* harmony default export */ const socMedImg = (__webpack_require__.p + "static/socMedImg-41482ae0fbbcd8b0412c8f058f0d7386.jpg");
;// CONCATENATED MODULE: ./src/pages/index.js
function Home(){const data=(0,gatsby_browser_entry.useStaticQuery)("6822090");return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Helmet.Helmet,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("title",null,data.site.siteMetadata.title),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"title",content:data.site.siteMetadata.title}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"description",content:data.site.siteMetadata.description}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"author",content:data.site.siteMetadata.author}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"keywords",content:data.site.siteMetadata.keywords}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"image",content:socMedImg}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"twitter:card",content:"summary"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"twitter:title",content:data.site.siteMetadata.title}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"twitter:image",content:socMedImg}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{property:"og:title",content:data.site.siteMetadata.title}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{property:"og:description",content:data.site.siteMetadata.description}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{property:"og:image",content:socMedImg}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{property:"og:url",content:data.site.siteMetadata.url}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{property:"og:type",content:"website"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("html",{lang:"de"})),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h1",null,"Komplexe Systeme auf das Display gebracht!"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Hallo und herzlich willkommen auf meiner Seite, ich bin"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"Sascha Nabrotzky.")),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Ich brachte mir das Programmieren von Websites selber bei und bin schon einige Jahre im Online-Bereich t\xE4tig. Ich liebe das Gestalten von Websites und Daten, ohne das Design aus den Augen zu verlieren."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Ich erstelle Websites mit"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"React.JS, Gasty.JS, SCSS und GraphQL.")," Das Enterprise-CMS ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"TYPO3")," setze ich dann ein, wenn eine datenbankgest\xFCtzte und sichere Website erstellt werden muss."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Bei allen gr\xF6\xDFeren Projekten, die ich programmiere, ist gutes"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"UX-Design")," sehr wichtig. Die Nutzererfahrung geht weit \xFCber das visuelle Design hinaus und f\xE4ngt auch viel eher im ganzen Zusammenspiel der komplexen Design-Systeme an."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(FetchGithubProjects,null),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("aside",{className:techStackWrapper},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h2",null,"Skills"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{className:logoWrapper},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:react_logo,alt:"React-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:gatsby_logo,alt:"Gatsby-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:js_logo,alt:"JS-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:HTML5_Logo,alt:"HTML5-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:sass_logo,alt:"SASS-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:git_quad_logo,alt:"Git-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:docker_logo,alt:"Docker-Logo"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("img",{src:TYPO3_Logo,alt:"TYPO3-Logo"})))));}

/***/ }),

/***/ 293:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Projects)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(31);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(593);
// EXTERNAL MODULE: ./src/components/layout.js + 11 modules
var layout = __webpack_require__(492);
;// CONCATENATED MODULE: ./src/components/projects.module.scss
// Exports
var projects = "projects-module--projects--dnhvL";

;// CONCATENATED MODULE: ./src/pages/projects.js
function Projects(){const data=(0,gatsby_browser_entry.useStaticQuery)("753870196");return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(Helmet.Helmet,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("title",null,"Projekte | Sascha Nabrotzky"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"title",content:"Projekte | Sascha Nabrotzky"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"description",content:"Kleine Auswahl meiner Projekte"}),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("meta",{name:"keywords",content:"Projekte, Projects, React, Gatsby, JavaScript, UI/UX-Design"})),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(layout/* default */.Z,null,/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h1",null,"Meine Projekte"),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("p",null,"Hier ist eine Auswahl meiner umfangreicheren"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"Website-Projekte,")," bei denen ich alles"," ",/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("strong",null,"von Grund auf planen, erstellen")," und auch die Nutzererfahrung optimieren konnte, h\xE4ufig gestaltete ich ebenfalls die restlichen Werbemittel."),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("ol",null,data.allMarkdownRemark.edges.map(edge=>{return/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("li",{className:projects,key:edge.node.id.toString()},/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("h3",null,edge.node.frontmatter.title),/*#__PURE__*/external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("div",{dangerouslySetInnerHTML:{__html:edge.node.html}}));}))));}

/***/ }),

/***/ 631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "BaseContext": () => (/* binding */ BaseContext),
  "Link": () => (/* binding */ Link),
  "Location": () => (/* binding */ Location),
  "LocationProvider": () => (/* binding */ LocationProvider),
  "Match": () => (/* binding */ Match),
  "Redirect": () => (/* binding */ Redirect),
  "Router": () => (/* binding */ Router),
  "ServerLocation": () => (/* binding */ ServerLocation),
  "createHistory": () => (/* reexport */ createHistory),
  "createMemorySource": () => (/* reexport */ createMemorySource),
  "globalHistory": () => (/* reexport */ globalHistory),
  "isRedirect": () => (/* binding */ isRedirect),
  "matchPath": () => (/* reexport */ match),
  "navigate": () => (/* reexport */ history_navigate),
  "redirectTo": () => (/* binding */ redirectTo),
  "useLocation": () => (/* binding */ useLocation),
  "useMatch": () => (/* binding */ useMatch),
  "useNavigate": () => (/* binding */ useNavigate),
  "useParams": () => (/* binding */ useParams)
});

// EXTERNAL MODULE: external "D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js"
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_ = __webpack_require__(514);
var external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(697);
// EXTERNAL MODULE: ./node_modules/invariant/invariant.js
var invariant = __webpack_require__(128);
var invariant_default = /*#__PURE__*/__webpack_require__.n(invariant);
// EXTERNAL MODULE: ./.cache/react-lifecycles-compat.js
var react_lifecycles_compat = __webpack_require__(639);
;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/lib/utils.js


////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? 0 : invariant_default()(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol
var match = function match(path, uri) {
  return pick([{ path: path }], uri);
};

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  var allSegments = baseSegments.concat(toSegments);
  var segments = [];
  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
};

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)

var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;

  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };
  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var paramRe = /^:(.+)/;

var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};
var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};
var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return { route: route, score: score, index: index };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri
  // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
};

////////////////////////////////////////////////////////////////////////////////

;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/lib/history.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getLocation = function getLocation(source) {
  var _source$location = source.location,
      search = _source$location.search,
      hash = _source$location.hash,
      href = _source$location.href,
      origin = _source$location.origin,
      protocol = _source$location.protocol,
      host = _source$location.host,
      hostname = _source$location.hostname,
      port = _source$location.port;
  var pathname = source.location.pathname;


  if (!pathname && href && canUseDOM) {
    var url = new URL(href);
    pathname = url.pathname;
  }

  return {
    pathname: encodeURI(decodeURI(pathname)),
    search: search,
    hash: hash,
    href: href,
    origin: origin,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
};

var createHistory = function createHistory(source, options) {
  var listeners = [];
  var location = getLocation(source);
  var transitioning = false;
  var resolveTransition = function resolveTransition() {};

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    _onTransitionComplete: function _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },
    listen: function listen(listener) {
      listeners.push(listener);

      var popstateListener = function popstateListener() {
        location = getLocation(source);
        listener({ location: location, action: "POP" });
      };

      source.addEventListener("popstate", popstateListener);

      return function () {
        source.removeEventListener("popstate", popstateListener);
        listeners = listeners.filter(function (fn) {
          return fn !== listener;
        });
      };
    },
    navigate: function navigate(to) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          state = _ref.state,
          _ref$replace = _ref.replace,
          replace = _ref$replace === undefined ? false : _ref$replace;

      if (typeof to === "number") {
        source.history.go(to);
      } else {
        state = _extends({}, state, { key: Date.now() + "" });
        // try...catch iOS Safari limits to 100 pushState calls
        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }
      }

      location = getLocation(source);
      transitioning = true;
      var transition = new Promise(function (res) {
        return resolveTransition = res;
      });
      listeners.forEach(function (listener) {
        return listener({ location: location, action: "PUSH" });
      });
      return transition;
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native
var createMemorySource = function createMemorySource() {
  var initialPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";

  var searchIndex = initialPath.indexOf("?");
  var initialLocation = {
    pathname: searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : ""
  };
  var index = 0;
  var stack = [initialLocation];
  var states = [null];

  return {
    get location() {
      return stack[index];
    },
    addEventListener: function addEventListener(name, fn) {},
    removeEventListener: function removeEventListener(name, fn) {},

    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState: function pushState(state, _, uri) {
        var _uri$split = uri.split("?"),
            pathname = _uri$split[0],
            _uri$split$ = _uri$split[1],
            search = _uri$split$ === undefined ? "" : _uri$split$;

        index++;
        stack.push({ pathname: pathname, search: search.length ? "?" + search : search });
        states.push(state);
      },
      replaceState: function replaceState(state, _, uri) {
        var _uri$split2 = uri.split("?"),
            pathname = _uri$split2[0],
            _uri$split2$ = _uri$split2[1],
            search = _uri$split2$ === undefined ? "" : _uri$split2$;

        stack[index] = { pathname: pathname, search: search };
        states[index] = state;
      },
      go: function go(to) {
        var newIndex = index + to;

        if (newIndex < 0 || newIndex > states.length - 1) {
          return;
        }

        index = newIndex;
      }
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var getSource = function getSource() {
  return canUseDOM ? window : createMemorySource();
};

var globalHistory = createHistory(getSource());
var history_navigate = globalHistory.navigate;

////////////////////////////////////////////////////////////////////////////////


;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/index.js
var es_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/anchor-has-content */







////////////////////////////////////////////////////////////////////////////////

var createNamedContext = function createNamedContext(name, defaultValue) {
  var Ctx = (0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.createContext)(defaultValue);
  Ctx.displayName = name;
  return Ctx;
};

////////////////////////////////////////////////////////////////////////////////
// Location Context/Provider
var LocationContext = createNamedContext("Location");

// sets up a listener if there isn't one already so apps don't need to be
// wrapped in some top level provider
var Location = function Location(_ref) {
  var children = _ref.children;
  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    LocationContext.Consumer,
    null,
    function (context) {
      return context ? children(context) : external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        LocationProvider,
        null,
        children
      );
    }
  );
};

var LocationProvider = function (_React$Component) {
  _inherits(LocationProvider, _React$Component);

  function LocationProvider() {
    var _temp, _this, _ret;

    _classCallCheck(this, LocationProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      context: _this.getContext(),
      refs: { unlisten: null }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LocationProvider.prototype.getContext = function getContext() {
    var _props$history = this.props.history,
        navigate = _props$history.navigate,
        location = _props$history.location;

    return { navigate: navigate, location: location };
  };

  LocationProvider.prototype.componentDidCatch = function componentDidCatch(error, info) {
    if (isRedirect(error)) {
      var _navigate = this.props.history.navigate;

      _navigate(error.uri, { replace: true });
    } else {
      throw error;
    }
  };

  LocationProvider.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.context.location !== this.state.context.location) {
      this.props.history._onTransitionComplete();
    }
  };

  LocationProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var refs = this.state.refs,
        history = this.props.history;

    history._onTransitionComplete();
    refs.unlisten = history.listen(function () {
      Promise.resolve().then(function () {
        // TODO: replace rAF with react deferred update API when it's ready https://github.com/facebook/react/issues/13306
        requestAnimationFrame(function () {
          if (!_this2.unmounted) {
            _this2.setState(function () {
              return { context: _this2.getContext() };
            });
          }
        });
      });
    });
  };

  LocationProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    var refs = this.state.refs;

    this.unmounted = true;
    refs.unlisten();
  };

  LocationProvider.prototype.render = function render() {
    var context = this.state.context,
        children = this.props.children;

    return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
      LocationContext.Provider,
      { value: context },
      typeof children === "function" ? children(context) : children || null
    );
  };

  return LocationProvider;
}((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Component);

////////////////////////////////////////////////////////////////////////////////


LocationProvider.defaultProps = {
  history: globalHistory
};
 false ? 0 : void 0;
var ServerLocation = function ServerLocation(_ref2) {
  var url = _ref2.url,
      children = _ref2.children;

  var searchIndex = url.indexOf("?");
  var searchExists = searchIndex > -1;
  var pathname = void 0;
  var search = "";
  var hash = "";

  if (searchExists) {
    pathname = url.substring(0, searchIndex);
    search = url.substring(searchIndex);
  } else {
    pathname = url;
  }

  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    LocationContext.Provider,
    {
      value: {
        location: {
          pathname: pathname,
          search: search,
          hash: hash
        },
        navigate: function navigate() {
          throw new Error("You can't call navigate on the server.");
        }
      }
    },
    children
  );
};
////////////////////////////////////////////////////////////////////////////////
// Sets baseuri and basepath for nested routers and links
var BaseContext = createNamedContext("Base", {
  baseuri: "/",
  basepath: "/",
  navigate: globalHistory.navigate
});

////////////////////////////////////////////////////////////////////////////////
// The main event, welcome to the show everybody.
var Router = function Router(props) {
  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (baseContext) {
      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        Location,
        null,
        function (locationContext) {
          return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(RouterImpl, es_extends({}, baseContext, locationContext, props));
        }
      );
    }
  );
};

var RouterImpl = function (_React$PureComponent) {
  _inherits(RouterImpl, _React$PureComponent);

  function RouterImpl() {
    _classCallCheck(this, RouterImpl);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  RouterImpl.prototype.render = function render() {
    var _props = this.props,
        location = _props.location,
        _navigate2 = _props.navigate,
        basepath = _props.basepath,
        primary = _props.primary,
        children = _props.children,
        baseuri = _props.baseuri,
        _props$component = _props.component,
        component = _props$component === undefined ? "div" : _props$component,
        domProps = _objectWithoutProperties(_props, ["location", "navigate", "basepath", "primary", "children", "baseuri", "component"]);

    var routes = external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().Children.toArray(children).reduce(function (array, child) {
      var routes = createRoute(basepath)(child);
      return array.concat(routes);
    }, []);
    var pathname = location.pathname;


    var match = pick(routes, pathname);

    if (match) {
      var params = match.params,
          uri = match.uri,
          route = match.route,
          element = match.route.value;

      // remove the /* from the end for child routes relative paths

      basepath = route.default ? basepath : route.path.replace(/\*$/, "");

      var props = es_extends({}, params, {
        uri: uri,
        location: location,
        navigate: function navigate(to, options) {
          return _navigate2(resolve(to, uri), options);
        }
      });

      var clone = external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().cloneElement(element, props, element.props.children ? external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        Router,
        { location: location, primary: primary },
        element.props.children
      ) : undefined);

      // using 'div' for < 16.3 support
      var FocusWrapper = primary ? FocusHandler : component;
      // don't pass any props to 'div'
      var wrapperProps = primary ? es_extends({ uri: uri, location: location, component: component }, domProps) : domProps;

      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        BaseContext.Provider,
        {
          value: { baseuri: uri, basepath: basepath, navigate: props.navigate }
        },
        external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
          FocusWrapper,
          wrapperProps,
          clone
        )
      );
    } else {
      // Not sure if we want this, would require index routes at every level
      // warning(
      //   false,
      //   `<Router basepath="${basepath}">\n\nNothing matched:\n\t${
      //     location.pathname
      //   }\n\nPaths checked: \n\t${routes
      //     .map(route => route.path)
      //     .join(
      //       "\n\t"
      //     )}\n\nTo get rid of this warning, add a default NotFound component as child of Router:
      //   \n\tlet NotFound = () => <div>Not Found!</div>
      //   \n\t<Router>\n\t  <NotFound default/>\n\t  {/* ... */}\n\t</Router>`
      // );
      return null;
    }
  };

  return RouterImpl;
}((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).PureComponent);

RouterImpl.defaultProps = {
  primary: true
};


var FocusContext = createNamedContext("Focus");

var FocusHandler = function FocusHandler(_ref3) {
  var uri = _ref3.uri,
      location = _ref3.location,
      component = _ref3.component,
      domProps = _objectWithoutProperties(_ref3, ["uri", "location", "component"]);

  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    FocusContext.Consumer,
    null,
    function (requestFocus) {
      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(FocusHandlerImpl, es_extends({}, domProps, {
        component: component,
        requestFocus: requestFocus,
        uri: uri,
        location: location
      }));
    }
  );
};

// don't focus on initial render
var initialRender = true;
var focusHandlerCount = 0;

var FocusHandlerImpl = function (_React$Component2) {
  _inherits(FocusHandlerImpl, _React$Component2);

  function FocusHandlerImpl() {
    var _temp2, _this4, _ret2;

    _classCallCheck(this, FocusHandlerImpl);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this4), _this4.state = {}, _this4.requestFocus = function (node) {
      if (!_this4.state.shouldFocus && node) {
        node.focus();
      }
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  FocusHandlerImpl.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var initial = prevState.uri == null;
    if (initial) {
      return es_extends({
        shouldFocus: true
      }, nextProps);
    } else {
      var myURIChanged = nextProps.uri !== prevState.uri;
      var navigatedUpToMe = prevState.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === nextProps.uri;
      return es_extends({
        shouldFocus: myURIChanged || navigatedUpToMe
      }, nextProps);
    }
  };

  FocusHandlerImpl.prototype.componentDidMount = function componentDidMount() {
    focusHandlerCount++;
    this.focus();
  };

  FocusHandlerImpl.prototype.componentWillUnmount = function componentWillUnmount() {
    focusHandlerCount--;
    if (focusHandlerCount === 0) {
      initialRender = true;
    }
  };

  FocusHandlerImpl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location && this.state.shouldFocus) {
      this.focus();
    }
  };

  FocusHandlerImpl.prototype.focus = function focus() {
    if (false) {}

    var requestFocus = this.props.requestFocus;


    if (requestFocus) {
      requestFocus(this.node);
    } else {
      if (initialRender) {
        initialRender = false;
      } else if (this.node) {
        // React polyfills [autofocus] and it fires earlier than cDM,
        // so we were stealing focus away, this line prevents that.
        if (!this.node.contains(document.activeElement)) {
          this.node.focus();
        }
      }
    }
  };

  FocusHandlerImpl.prototype.render = function render() {
    var _this5 = this;

    var _props2 = this.props,
        children = _props2.children,
        style = _props2.style,
        requestFocus = _props2.requestFocus,
        _props2$component = _props2.component,
        Comp = _props2$component === undefined ? "div" : _props2$component,
        uri = _props2.uri,
        location = _props2.location,
        domProps = _objectWithoutProperties(_props2, ["children", "style", "requestFocus", "component", "uri", "location"]);

    return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
      Comp,
      es_extends({
        style: es_extends({ outline: "none" }, style),
        tabIndex: "-1",
        ref: function ref(n) {
          return _this5.node = n;
        }
      }, domProps),
      external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        FocusContext.Provider,
        { value: this.requestFocus },
        this.props.children
      )
    );
  };

  return FocusHandlerImpl;
}((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Component);

(0,react_lifecycles_compat/* polyfill */.O)(FocusHandlerImpl);

var k = function k() {};

////////////////////////////////////////////////////////////////////////////////
var forwardRef = (external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = function forwardRef(C) {
    return C;
  };
}

var Link = forwardRef(function (_ref4, ref) {
  var innerRef = _ref4.innerRef,
      props = _objectWithoutProperties(_ref4, ["innerRef"]);

  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (_ref5) {
      var basepath = _ref5.basepath,
          baseuri = _ref5.baseuri;
      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        Location,
        null,
        function (_ref6) {
          var location = _ref6.location,
              navigate = _ref6.navigate;

          var to = props.to,
              state = props.state,
              replace = props.replace,
              _props$getProps = props.getProps,
              getProps = _props$getProps === undefined ? k : _props$getProps,
              anchorProps = _objectWithoutProperties(props, ["to", "state", "replace", "getProps"]);

          var href = resolve(to, baseuri);
          var encodedHref = encodeURI(href);
          var isCurrent = location.pathname === encodedHref;
          var isPartiallyCurrent = startsWith(location.pathname, encodedHref);

          return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement("a", es_extends({
            ref: ref || innerRef,
            "aria-current": isCurrent ? "page" : undefined
          }, anchorProps, getProps({ isCurrent: isCurrent, isPartiallyCurrent: isPartiallyCurrent, href: href, location: location }), {
            href: href,
            onClick: function onClick(event) {
              if (anchorProps.onClick) anchorProps.onClick(event);
              if (shouldNavigate(event)) {
                event.preventDefault();
                var shouldReplace = replace;
                if (typeof replace !== "boolean" && isCurrent) {
                  var _location$state = es_extends({}, location.state),
                      key = _location$state.key,
                      restState = _objectWithoutProperties(_location$state, ["key"]);

                  shouldReplace = shallowCompare(es_extends({}, state), restState);
                }
                navigate(href, {
                  state: state,
                  replace: shouldReplace
                });
              }
            }
          }));
        }
      );
    }
  );
});

Link.displayName = "Link";

 false ? 0 : void 0;

////////////////////////////////////////////////////////////////////////////////
function RedirectRequest(uri) {
  this.uri = uri;
}

var isRedirect = function isRedirect(o) {
  return o instanceof RedirectRequest;
};

var redirectTo = function redirectTo(to) {
  throw new RedirectRequest(to);
};

var RedirectImpl = function (_React$Component3) {
  _inherits(RedirectImpl, _React$Component3);

  function RedirectImpl() {
    _classCallCheck(this, RedirectImpl);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  // Support React < 16 with this hook
  RedirectImpl.prototype.componentDidMount = function componentDidMount() {
    var _props3 = this.props,
        navigate = _props3.navigate,
        to = _props3.to,
        from = _props3.from,
        _props3$replace = _props3.replace,
        replace = _props3$replace === undefined ? true : _props3$replace,
        state = _props3.state,
        noThrow = _props3.noThrow,
        baseuri = _props3.baseuri,
        props = _objectWithoutProperties(_props3, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    Promise.resolve().then(function () {
      var resolvedTo = resolve(to, baseuri);
      navigate(insertParams(resolvedTo, props), { replace: replace, state: state });
    });
  };

  RedirectImpl.prototype.render = function render() {
    var _props4 = this.props,
        navigate = _props4.navigate,
        to = _props4.to,
        from = _props4.from,
        replace = _props4.replace,
        state = _props4.state,
        noThrow = _props4.noThrow,
        baseuri = _props4.baseuri,
        props = _objectWithoutProperties(_props4, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    var resolvedTo = resolve(to, baseuri);
    if (!noThrow) redirectTo(insertParams(resolvedTo, props));
    return null;
  };

  return RedirectImpl;
}((external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Component);

var Redirect = function Redirect(props) {
  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (_ref7) {
      var baseuri = _ref7.baseuri;
      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        Location,
        null,
        function (locationContext) {
          return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(RedirectImpl, es_extends({}, locationContext, { baseuri: baseuri }, props));
        }
      );
    }
  );
};

 false ? 0 : void 0;

////////////////////////////////////////////////////////////////////////////////
var Match = function Match(_ref8) {
  var path = _ref8.path,
      children = _ref8.children;
  return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
    BaseContext.Consumer,
    null,
    function (_ref9) {
      var baseuri = _ref9.baseuri;
      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().createElement(
        Location,
        null,
        function (_ref10) {
          var navigate = _ref10.navigate,
              location = _ref10.location;

          var resolvedPath = resolve(path, baseuri);
          var result = match(resolvedPath, location.pathname);
          return children({
            navigate: navigate,
            location: location,
            match: result ? es_extends({}, result.params, {
              uri: result.uri,
              path: path
            }) : null
          });
        }
      );
    }
  );
};

////////////////////////////////////////////////////////////////////////////////
// Hooks

var useLocation = function useLocation() {
  var context = (0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useContext)(LocationContext);

  if (!context) {
    throw new Error("useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.location;
};

var useNavigate = function useNavigate() {
  var context = (0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useContext)(BaseContext);

  if (!context) {
    throw new Error("useNavigate hook was used but a BaseContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.navigate;
};

var useParams = function useParams() {
  var context = (0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useContext)(BaseContext);

  if (!context) {
    throw new Error("useParams hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();

  var results = match(context.basepath, location.pathname);

  return results ? results.params : null;
};

var useMatch = function useMatch(path) {
  if (!path) {
    throw new Error("useMatch(path: string) requires an argument of a string to match against");
  }
  var context = (0,external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_.useContext)(BaseContext);

  if (!context) {
    throw new Error("useMatch hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();

  var resolvedPath = resolve(path, context.baseuri);
  var result = match(resolvedPath, location.pathname);
  return result ? es_extends({}, result.params, {
    uri: result.uri,
    path: path
  }) : null;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var stripSlashes = function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
};

var createRoute = function createRoute(basepath) {
  return function (element) {
    if (!element) {
      return null;
    }

    if (element.type === (external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default()).Fragment && element.props.children) {
      return external_D_Projekte_Sascha_sascha_nabrotzky_github_io_node_modules_react_index_js_default().Children.map(element.props.children, createRoute(basepath));
    }
    !(element.props.path || element.props.default || element.type === Redirect) ?  false ? 0 : invariant_default()(false) : void 0;

    !!(element.type === Redirect && (!element.props.from || !element.props.to)) ?  false ? 0 : invariant_default()(false) : void 0;

    !!(element.type === Redirect && !validateRedirect(element.props.from, element.props.to)) ?  false ? 0 : invariant_default()(false) : void 0;

    if (element.props.default) {
      return { value: element, default: true };
    }

    var elementPath = element.type === Redirect ? element.props.from : element.props.path;

    var path = elementPath === "/" ? basepath : stripSlashes(basepath) + "/" + stripSlashes(elementPath);

    return {
      value: element,
      default: element.props.default,
      path: element.props.children ? stripSlashes(path) + "/*" : path
    };
  };
};

var shouldNavigate = function shouldNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

////////////////////////////////////////////////////////////////////////


/***/ }),

/***/ 128:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 593:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Helmet": () => (/* binding */ HelmetExport)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(524);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_side_effect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(909);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(514);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(852);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_4__);






var ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src",
    TARGET: "target"
};

var REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = "data-react-helmet";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
        bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [react__WEBPACK_IMPORTED_MODULE_3___default().createElement(TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case ATTRIBUTE_NAMES.BODY:
        case ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            classCallCheck(this, HelmetWrapper);
            return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case TAG_NAMES.SCRIPT:
                case TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _babelHelpers$extends;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _babelHelpers$extends2, _babelHelpers$extends3;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

                case TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _babelHelpers$extends4;

                newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (false) {}

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            react__WEBPACK_IMPORTED_MODULE_3___default().Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = convertReactPropstoHtmlAttributes(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case TAG_NAMES.LINK:
                    case TAG_NAMES.META:
                    case TAG_NAMES.NOSCRIPT:
                    case TAG_NAMES.SCRIPT:
                    case TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Component, newProps);
        };

        createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
             * @param {Object} bodyAttributes: {"className": "root"}
             * @param {String} defaultTitle: "Default Title"
             * @param {Boolean} defer: true
             * @param {Boolean} encodeSpecialCharacters: true
             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
             * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
             * @param {String} title: "Title"
             * @param {Object} titleAttributes: {"itemprop": "name"}
             * @param {String} titleTemplate: "MySite.com - %s"
             */
            set: function set$$1(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);
        return HelmetWrapper;
    }((react__WEBPACK_IMPORTED_MODULE_3___default().Component)), _class.propTypes = {
        base: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        bodyAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        children: prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)), (prop_types__WEBPACK_IMPORTED_MODULE_0___default().node)]),
        defaultTitle: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
        defer: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
        encodeSpecialCharacters: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().bool),
        htmlAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        link: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        meta: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        noscript: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        onChangeClientState: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().func),
        script: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        style: prop_types__WEBPACK_IMPORTED_MODULE_0___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_0___default().object)),
        title: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
        titleAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().object),
        titleTemplate: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = react_side_effect__WEBPACK_IMPORTED_MODULE_1___default()(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelmetExport);



/***/ }),

/***/ 909:
/***/ ((module) => {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ 524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(514);
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect =
    /*#__PURE__*/
    function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.PureComponent);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;


/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\.cache\\ssr-builtin-trackers\\fs");

/***/ }),

/***/ 216:
/***/ ((module) => {

"use strict";
module.exports = require("D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react-dom\\server.js");

/***/ }),

/***/ 514:
/***/ ((module) => {

"use strict";
module.exports = require("D:\\Projekte\\Sascha\\sascha-nabrotzky.github.io\\node_modules\\react\\index.js");

/***/ }),

/***/ 423:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 741:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_from":"gatsby@3.14.0","_id":"gatsby@3.14.0","_inBundle":false,"_integrity":"sha512-ikXoVZ9LQO9lZBxVvQxrYkjhX1zz9/7/Iv/6WCt/UPdgYCWCKc6GWOqlbLKmjShM0fBxJHfjmiahNxuTzJIZsw==","_location":"/gatsby","_phantomChildren":{"@babel/code-frame":"7.14.5","@babel/runtime":"7.15.4","@types/common-tags":"1.8.1","anymatch":"3.1.2","better-opn":"2.1.1","braces":"3.0.2","chalk":"4.1.2","clipboardy":"2.3.0","common-tags":"1.8.0","configstore":"5.0.1","convert-hrtime":"3.0.0","create-gatsby":"1.14.0","envinfo":"7.8.1","execa":"5.1.1","fs-exists-cached":"1.0.0","fs-extra":"10.0.0","fsevents":"2.3.2","gatsby-core-utils":"2.14.0","gatsby-recipes":"0.25.0","gatsby-telemetry":"2.14.0","glob-parent":"5.1.2","is-binary-path":"2.1.0","is-glob":"4.0.1","is-valid-path":"0.1.1","joi":"17.4.2","lodash":"4.17.21","lru-cache":"6.0.0","meant":"1.0.3","node-fetch":"2.6.1","normalize-path":"3.0.0","opentracing":"0.14.5","picomatch":"2.2.2","pretty-error":"2.1.2","progress":"2.0.3","prompts":"2.4.1","redux":"4.1.1","resolve-cwd":"3.0.0","semver":"7.3.5","signal-exit":"3.0.4","source-map":"0.7.3","stack-trace":"0.0.10","strip-ansi":"5.2.0","update-notifier":"5.1.0","uuid":"3.4.0","yargs":"15.4.1","yoga-layout-prebuilt":"1.10.0","yurnalist":"2.1.0"},"_requested":{"type":"version","registry":true,"raw":"gatsby@3.14.0","name":"gatsby","escapedName":"gatsby","rawSpec":"3.14.0","saveSpec":null,"fetchSpec":"3.14.0"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/gatsby/-/gatsby-3.14.0.tgz","_shasum":"06c27464f1a9d044169ec910d0c9d7ef44e0b1d8","_spec":"gatsby@3.14.0","_where":"D:\\\\Projekte\\\\Sascha\\\\sascha-nabrotzky.github.io","author":{"name":"Kyle Mathews","email":"mathews.kyle@gmail.com"},"bin":{"gatsby":"cli.js"},"bugs":{"url":"https://github.com/gatsbyjs/gatsby/issues"},"bundleDependencies":false,"dependencies":{"@babel/code-frame":"^7.14.0","@babel/core":"^7.15.5","@babel/eslint-parser":"^7.15.4","@babel/helper-plugin-utils":"^7.14.5","@babel/parser":"^7.15.5","@babel/runtime":"^7.15.4","@babel/traverse":"^7.15.4","@babel/types":"^7.15.4","@gatsbyjs/reach-router":"^1.3.6","@gatsbyjs/webpack-hot-middleware":"^2.25.2","@nodelib/fs.walk":"^1.2.4","@pmmmwh/react-refresh-webpack-plugin":"^0.4.3","@types/http-proxy":"^1.17.4","@typescript-eslint/eslint-plugin":"^4.29.3","@typescript-eslint/parser":"^4.29.3","@vercel/webpack-asset-relocator-loader":"^1.6.0","address":"1.1.2","anser":"^2.0.1","autoprefixer":"^10.2.4","axios":"^0.21.1","babel-loader":"^8.2.2","babel-plugin-add-module-exports":"^1.0.4","babel-plugin-dynamic-import-node":"^2.3.3","babel-plugin-lodash":"^3.3.4","babel-plugin-remove-graphql-queries":"^3.14.0","babel-preset-gatsby":"^1.14.0","better-opn":"^2.0.0","bluebird":"^3.7.2","body-parser":"^1.19.0","browserslist":"^4.12.2","cache-manager":"^2.11.1","chalk":"^4.1.2","chokidar":"^3.5.2","common-tags":"^1.8.0","compression":"^1.7.4","cookie":"^0.4.1","core-js":"^3.17.2","cors":"^2.8.5","css-loader":"^5.0.1","css-minimizer-webpack-plugin":"^2.0.0","css.escape":"^1.5.1","date-fns":"^2.14.0","debug":"^3.2.7","deepmerge":"^4.2.2","del":"^5.1.0","detect-port":"^1.3.0","devcert":"^1.1.3","dotenv":"^8.2.0","eslint":"^7.32.0","eslint-config-react-app":"^6.0.0","eslint-plugin-flowtype":"^5.9.2","eslint-plugin-graphql":"^4.0.0","eslint-plugin-import":"^2.24.2","eslint-plugin-jsx-a11y":"^6.4.1","eslint-plugin-react":"^7.25.1","eslint-plugin-react-hooks":"^4.2.0","eslint-webpack-plugin":"^2.5.4","event-source-polyfill":"^1.0.15","execa":"^5.1.1","express":"^4.17.1","express-graphql":"^0.12.0","fastest-levenshtein":"^1.0.12","fastq":"^1.10.0","file-loader":"^6.2.0","find-cache-dir":"^3.3.1","fs-exists-cached":"1.0.0","fs-extra":"^10.0.0","gatsby-cli":"^3.14.0","gatsby-core-utils":"^2.14.0","gatsby-graphiql-explorer":"^1.14.0","gatsby-legacy-polyfills":"^1.14.0","gatsby-link":"^3.14.0","gatsby-plugin-page-creator":"^3.14.0","gatsby-plugin-typescript":"^3.14.0","gatsby-plugin-utils":"^1.14.0","gatsby-react-router-scroll":"^4.14.0","gatsby-telemetry":"^2.14.0","gatsby-worker":"^0.5.0","glob":"^7.1.6","got":"^11.8.2","graphql":"^15.4.0","graphql-compose":"~7.25.0","graphql-playground-middleware-express":"^1.7.18","hasha":"^5.2.0","http-proxy":"^1.18.1","invariant":"^2.2.4","is-relative":"^1.0.0","is-relative-url":"^3.0.0","joi":"^17.2.1","json-loader":"^0.5.7","latest-version":"5.1.0","lodash":"^4.17.21","md5-file":"^5.0.0","meant":"^1.0.1","memoizee":"^0.4.15","micromatch":"^4.0.2","mime":"^2.4.6","mini-css-extract-plugin":"1.6.2","mitt":"^1.2.0","moment":"^2.27.0","multer":"^1.4.2","normalize-path":"^3.0.0","null-loader":"^4.0.1","opentracing":"^0.14.4","p-defer":"^3.0.0","parseurl":"^1.3.3","path-to-regexp":"0.1.7","physical-cpu-count":"^2.0.0","platform":"^1.3.6","postcss":"^8.3.5","postcss-flexbugs-fixes":"^5.0.2","postcss-loader":"^5.0.0","prompts":"^2.3.2","prop-types":"^15.7.2","query-string":"^6.13.1","raw-loader":"^4.0.2","react-dev-utils":"^11.0.3","react-refresh":"^0.9.0","redux":"^4.0.5","redux-thunk":"^2.3.0","resolve-from":"^5.0.0","semver":"^7.3.5","shallow-compare":"^1.2.2","signal-exit":"^3.0.3","slugify":"^1.4.4","socket.io":"3.1.1","socket.io-client":"3.1.1","source-map":"^0.7.3","source-map-support":"^0.5.19","st":"^2.0.0","stack-trace":"^0.0.10","string-similarity":"^1.2.2","strip-ansi":"^5.2.0","style-loader":"^2.0.0","terser-webpack-plugin":"^5.1.1","tmp":"^0.2.1","true-case-path":"^2.2.1","type-of":"^2.0.1","url-loader":"^4.1.1","uuid":"3.4.0","v8-compile-cache":"^2.2.0","webpack":"^5.35.0","webpack-dev-middleware":"^4.1.0","webpack-merge":"^5.7.3","webpack-stats-plugin":"^1.0.3","webpack-virtual-modules":"^0.3.2","xstate":"^4.11.0","yaml-loader":"^0.6.0"},"deprecated":false,"description":"Blazing fast modern site generator for React","devDependencies":{"@babel/cli":"^7.15.4","@babel/helper-plugin-utils":"^7.14.5","@babel/register":"^7.15.3","@types/eslint":"^7.2.6","@types/micromatch":"^4.0.1","@types/normalize-path":"^3.0.0","@types/reach__router":"^1.3.5","@types/react-dom":"^17.0.9","@types/semver":"^7.3.8","@types/signal-exit":"^3.0.0","@types/string-similarity":"^4.0.0","@types/tmp":"^0.2.0","@types/webpack-virtual-modules":"^0.1.1","babel-preset-gatsby-package":"^1.14.0","copyfiles":"^2.3.0","cross-env":"^7.0.3","documentation":"^13.1.0","enhanced-resolve":"^5.8.2","lmdb-store":"~1.5.5","react":"^16.12.0","react-dom":"^16.12.0","rimraf":"^3.0.2","typescript":"^4.3.5","xhr-mock":"^2.5.1","zipkin":"^0.22.0","zipkin-javascript-opentracing":"^3.0.0","zipkin-transport-http":"^0.22.0"},"engines":{"node":">=12.13.0"},"files":["apis.json","ipc.json","cache-dir/","cli.js","dist/","gatsby-admin-public/","graphql.js","graphql.d.ts","reporter.js","reporter.d.ts","index.d.ts","scripts/postinstall.js","utils.js","internal.js","internal.d.ts","!**/__tests__/"],"gitHead":"f3f1bbc4b75e4ede40500e899449820c958a72ff","homepage":"https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby#readme","keywords":["blog","generator","jekyll","markdown","react","ssg","website"],"license":"MIT","main":"cache-dir/commonjs/gatsby-browser-entry.js","module":"cache-dir/gatsby-browser-entry.js","name":"gatsby","peerDependencies":{"react":"^16.9.0 || ^17.0.0","react-dom":"^16.9.0 || ^17.0.0"},"repository":{"type":"git","url":"git+https://github.com/gatsbyjs/gatsby.git"},"resolutions":{"graphql":"^15.5.1","@mdx-js/mdx":"^2.0.0-next.3","@mdx-js/react":"^2.0.0-next.3","@mdx-js/runtime":"^2.0.0-next.3","remark-mdx":"^2.0.0-next.3","remark-mdxjs":"^2.0.0-next.3"},"scripts":{"build":"npm run build:types && npm run build:src && npm run build:internal-plugins && npm run build:rawfiles && npm run build:cjs","build:cjs":"babel cache-dir --out-dir cache-dir/commonjs --ignore \\"**/__tests__\\" --ignore \\"**/__mocks__\\" && copyfiles -u 1 cache-dir/**/*.json cache-dir/commonjs","build:internal-plugins":"copyfiles -u 1 src/internal-plugins/**/package.json dist","build:rawfiles":"copyfiles -u 1 src/internal-plugins/**/raw_* dist","build:src":"babel src --out-dir dist --source-maps --verbose --ignore \\"**/gatsby-cli.js,src/internal-plugins/dev-404-page/raw_dev-404-page.js,**/__tests__,**/__mocks__\\" --extensions \\".ts,.js\\"","build:types":"tsc --emitDeclarationOnly --declaration --declarationDir dist && node scripts/check-declaration.js","clean-test-bundles":"find test/ -type f -name bundle.js* -exec rm -rf {} +","postbuild":"node scripts/output-api-file.js && yarn workspace gatsby-admin build","postinstall":"node scripts/postinstall.js","prebuild":"rimraf dist && rimraf cache-dir/commonjs","prepare":"cross-env NODE_ENV=production npm run build","typecheck":"tsc --noEmit","watch":"rimraf dist && mkdir dist && npm run build:internal-plugins && npm run build:rawfiles && npm run build:src -- --watch"},"types":"index.d.ts","version":"3.14.0","yargs":{"boolean-negation":false}}');

/***/ }),

/***/ 804:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"polyfill":["/polyfill.js"],"app":["/app.js"],"component---src-pages-404-js":["/component---src-pages-404-js.js"],"component---src-pages-about-js":["/component---src-pages-about-js.js"],"component---src-pages-contact-js":["/component---src-pages-contact-js.js"],"component---src-pages-datenschutz-js":["/component---src-pages-datenschutz-js.js"],"component---src-pages-impressum-js":["/component---src-pages-impressum-js.js"],"component---src-pages-index-js":["/component---src-pages-index-js.js"],"component---src-pages-projects-js":["/component---src-pages-projects-js.js"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sanitizeComponents": () => (/* binding */ sanitizeComponents),
/* harmony export */   "default": () => (/* binding */ staticPage)
/* harmony export */ });
const React=__webpack_require__(514);const path=__webpack_require__(423);const{renderToString,renderToStaticMarkup,pipeToNodeWritable}=__webpack_require__(216);const{ServerLocation,Router,isRedirect}=__webpack_require__(631);const merge=__webpack_require__(996);const{StaticQueryContext}=__webpack_require__(31);const fs=__webpack_require__(17);const{WritableAsPromise}=__webpack_require__(709);const{RouteAnnouncerProps}=__webpack_require__(394);const{apiRunner,apiRunnerAsync}=__webpack_require__(874);const syncRequires=__webpack_require__(885);const{version:gatsbyVersion}=__webpack_require__(741);const{grabMatchParams}=__webpack_require__(438);const chunkMapping=__webpack_require__(804);// we want to force posix-style joins, so Windows doesn't produce backslashes for urls
const{join}=path.posix;// const testRequireError = require("./test-require-error")
// For some extremely mysterious reason, webpack adds the above module *after*
// this module so that when this code runs, testRequireError is undefined.
// So in the meantime, we'll just inline it.
const testRequireError=(moduleName,err)=>{const regex=new RegExp(`Error: Cannot find module\\s.${moduleName}`);const firstLine=err.toString().split(`\n`)[0];return regex.test(firstLine);};let Html;try{Html=__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../src/html'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));}catch(err){if(testRequireError(`../src/html`,err)){Html=__webpack_require__(677);}else{throw err;}}Html=Html&&Html.__esModule?Html.default:Html;const getPageDataPath=path=>{const fixedPagePath=path===`/`?`index`:path;return join(`page-data`,fixedPagePath,`page-data.json`);};const getPageDataUrl=pagePath=>{const pageDataPath=getPageDataPath(pagePath);return`${""}/${pageDataPath}`;};const getStaticQueryPath=hash=>join(`page-data`,`sq`,`d`,`${hash}.json`);const getStaticQueryUrl=hash=>`${""}/${getStaticQueryPath(hash)}`;const getAppDataUrl=()=>`${""}/${join(`page-data`,`app-data.json`)}`;const createElement=React.createElement;const sanitizeComponents=components=>{const componentsArray=[].concat(components).flat(Infinity).filter(Boolean);return componentsArray.map(component=>{// Ensure manifest is always loaded from content server
// And not asset server when an assetPrefix is used
if(false){}return component;});};function deepMerge(a,b){const combineMerge=(target,source,options)=>{const destination=target.slice();source.forEach((item,index)=>{if(typeof destination[index]===`undefined`){destination[index]=options.cloneUnlessOtherwiseSpecified(item,options);}else if(options.isMergeableObject(item)){destination[index]=merge(target[index],item,options);}else if(target.indexOf(item)===-1){destination.push(item);}});return destination;};return merge(a,b,{arrayMerge:combineMerge});}async function staticPage({pagePath,pageData,staticQueryContext,styles,scripts,reversedStyles,reversedScripts,inlinePageData=false}){// for this to work we need this function to be sync or at least ensure there is single execution of it at a time
global.unsafeBuiltinUsage=[];try{let bodyHtml=``;let headComponents=[/*#__PURE__*/React.createElement("meta",{name:"generator",content:`Gatsby ${gatsbyVersion}`,key:`generator-${gatsbyVersion}`})];let htmlAttributes={};let bodyAttributes={};let preBodyComponents=[];let postBodyComponents=[];let bodyProps={};function loadPageDataSync(_pagePath){if(_pagePath===pagePath){// no need to use fs if we are asking for pageData of current page
return pageData;}const pageDataPath=getPageDataPath(_pagePath);const pageDataFile=join(process.cwd(),`public`,pageDataPath);try{// deprecation notice
const myErrorHolder={name:`Usage of loadPageDataSync for page other than currently generated page disables incremental html generation in future builds`};Error.captureStackTrace(myErrorHolder,loadPageDataSync);global.unsafeBuiltinUsage.push(myErrorHolder.stack);const pageDataJson=fs.readFileSync(pageDataFile);return JSON.parse(pageDataJson);}catch(error){// not an error if file is not found. There's just no page data
return null;}}const replaceBodyHTMLString=body=>{bodyHtml=body;};const setHeadComponents=components=>{headComponents=headComponents.concat(sanitizeComponents(components));};const setHtmlAttributes=attributes=>{// TODO - we should remove deep merges
htmlAttributes=deepMerge(htmlAttributes,attributes);};const setBodyAttributes=attributes=>{// TODO - we should remove deep merges
bodyAttributes=deepMerge(bodyAttributes,attributes);};const setPreBodyComponents=components=>{preBodyComponents=preBodyComponents.concat(sanitizeComponents(components));};const setPostBodyComponents=components=>{postBodyComponents=postBodyComponents.concat(sanitizeComponents(components));};const setBodyProps=props=>{// TODO - we should remove deep merges
bodyProps=deepMerge({},bodyProps,props);};const getHeadComponents=()=>headComponents;const replaceHeadComponents=components=>{headComponents=sanitizeComponents(components);};const getPreBodyComponents=()=>preBodyComponents;const replacePreBodyComponents=components=>{preBodyComponents=sanitizeComponents(components);};const getPostBodyComponents=()=>postBodyComponents;const replacePostBodyComponents=components=>{postBodyComponents=sanitizeComponents(components);};const pageDataUrl=getPageDataUrl(pagePath);const{componentChunkName,staticQueryHashes=[]}=pageData;const staticQueryUrls=staticQueryHashes.map(getStaticQueryUrl);class RouteHandler extends React.Component{render(){var _pageData$result,_pageData$result$page;const props={...this.props,...pageData.result,params:{...grabMatchParams(this.props.location.pathname),...(((_pageData$result=pageData.result)===null||_pageData$result===void 0?void 0:(_pageData$result$page=_pageData$result.pageContext)===null||_pageData$result$page===void 0?void 0:_pageData$result$page.__params)||{})}};const pageElement=createElement(syncRequires.components[componentChunkName],props);const wrappedPage=apiRunner(`wrapPageElement`,{element:pageElement,props},pageElement,({result})=>{return{element:result,props};}).pop();return wrappedPage;}}const routerElement=/*#__PURE__*/React.createElement(ServerLocation,{url:`${""}${pagePath}`},/*#__PURE__*/React.createElement(Router,{id:"gatsby-focus-wrapper",baseuri:""},/*#__PURE__*/React.createElement(RouteHandler,{path:"/*"})),/*#__PURE__*/React.createElement("div",RouteAnnouncerProps));const bodyComponent=/*#__PURE__*/React.createElement(StaticQueryContext.Provider,{value:staticQueryContext},apiRunner(`wrapRootElement`,{element:routerElement,pathname:pagePath},routerElement,({result})=>{return{element:result,pathname:pagePath};}).pop());// Let the site or plugin render the page component.
await apiRunnerAsync(`replaceRenderer`,{bodyComponent,replaceBodyHTMLString,setHeadComponents,setHtmlAttributes,setBodyAttributes,setPreBodyComponents,setPostBodyComponents,setBodyProps,pathname:pagePath,pathPrefix:""});// If no one stepped up, we'll handle it.
if(!bodyHtml){try{// react 18 enabled
if(pipeToNodeWritable){const writableStream=new WritableAsPromise();const{startWriting}=pipeToNodeWritable(bodyComponent,writableStream,{onCompleteAll(){startWriting();},onError(){}});bodyHtml=await writableStream;}else{bodyHtml=renderToString(bodyComponent);}}catch(e){// ignore @reach/router redirect errors
if(!isRedirect(e))throw e;}}apiRunner(`onRenderBody`,{setHeadComponents,setHtmlAttributes,setBodyAttributes,setPreBodyComponents,setPostBodyComponents,setBodyProps,pathname:pagePath,loadPageDataSync,bodyHtml,scripts,styles,pathPrefix:""});reversedScripts.forEach(script=>{// Add preload/prefetch <link>s for scripts.
headComponents.push(/*#__PURE__*/React.createElement("link",{as:"script",rel:script.rel,key:script.name,href:`${""}/${script.name}`}));});if(pageData&&!inlinePageData){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:pageDataUrl,href:pageDataUrl,crossOrigin:"anonymous"}));}staticQueryUrls.forEach(staticQueryUrl=>headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:staticQueryUrl,href:staticQueryUrl,crossOrigin:"anonymous"})));const appDataUrl=getAppDataUrl();if(appDataUrl){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"fetch",rel:"preload",key:appDataUrl,href:appDataUrl,crossOrigin:"anonymous"}));}reversedStyles.forEach(style=>{// Add <link>s for styles that should be prefetched
// otherwise, inline as a <style> tag
if(style.rel===`prefetch`){headComponents.push(/*#__PURE__*/React.createElement("link",{as:"style",rel:style.rel,key:style.name,href:`${""}/${style.name}`}));}else{headComponents.unshift(/*#__PURE__*/React.createElement("style",{"data-href":`${""}/${style.name}`,"data-identity":`gatsby-global-css`,dangerouslySetInnerHTML:{__html:style.content}}));}});// Add page metadata for the current page
const windowPageData=`/*<![CDATA[*/window.pagePath="${pagePath}";${inlinePageData?`window.pageData=${JSON.stringify(pageData)};`:``}/*]]>*/`;postBodyComponents.push(/*#__PURE__*/React.createElement("script",{key:`script-loader`,id:`gatsby-script-loader`,dangerouslySetInnerHTML:{__html:windowPageData}}));// Add chunk mapping metadata
const scriptChunkMapping=`/*<![CDATA[*/window.___chunkMapping=${JSON.stringify(chunkMapping)};/*]]>*/`;postBodyComponents.push(/*#__PURE__*/React.createElement("script",{key:`chunk-mapping`,id:`gatsby-chunk-mapping`,dangerouslySetInnerHTML:{__html:scriptChunkMapping}}));let bodyScripts=[];if(chunkMapping[`polyfill`]){chunkMapping[`polyfill`].forEach(script=>{const scriptPath=`${""}${script}`;bodyScripts.push(/*#__PURE__*/React.createElement("script",{key:scriptPath,src:scriptPath,noModule:true}));});}// Filter out prefetched bundles as adding them as a script tag
// would force high priority fetching.
bodyScripts=bodyScripts.concat(scripts.filter(s=>s.rel!==`prefetch`).map(s=>{const scriptPath=`${""}/${JSON.stringify(s.name).slice(1,-1)}`;return/*#__PURE__*/React.createElement("script",{key:scriptPath,src:scriptPath,async:true});}));postBodyComponents.push(...bodyScripts);apiRunner(`onPreRenderHTML`,{getHeadComponents,replaceHeadComponents,getPreBodyComponents,replacePreBodyComponents,getPostBodyComponents,replacePostBodyComponents,pathname:pagePath,pathPrefix:""});const html=`<!DOCTYPE html>${renderToStaticMarkup(/*#__PURE__*/React.createElement(Html,Object.assign({},bodyProps,{headComponents:headComponents,htmlAttributes:htmlAttributes,bodyAttributes:bodyAttributes,preBodyComponents:preBodyComponents,postBodyComponents:postBodyComponents,body:bodyHtml,path:pagePath})))}`;return{html,unsafeBuiltinsUsage:global.unsafeBuiltinUsage};}catch(e){e.unsafeBuiltinsUsage=global.unsafeBuiltinUsage;throw e;}}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=render-page.js.map