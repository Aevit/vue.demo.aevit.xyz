(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Vue // late bind
var map = window.__VUE_HOT_MAP__ = Object.create(null)
var installed = false
var isBrowserify = false

exports.install = function (vue, browserify) {
  if (installed) return
  installed = true

  Vue = vue
  isBrowserify = browserify

  exports.compatible = Number(Vue.version.split('.')[0]) >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
      'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Vue.extend(options),
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  injectHook(options, 'init', function () {
    map[id].instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    var instances = map[id].instances
    instances.splice(instances.indexOf(this), 1)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

function tryWrap (fn) {
  return function (id, arg) {
    try { fn(id, arg) } catch (e) {
      console.error(e)
      console.warn('Something went wrong during Vue component hot-reload. Full reload required.')
    }
  }
}

exports.rerender = tryWrap(function (id, fns) {
  var record = map[id]
  record.Ctor.options.render = fns.render
  record.Ctor.options.staticRenderFns = fns.staticRenderFns
  record.instances.slice().forEach(function (instance) {
    instance.$options.render = fns.render
    instance.$options.staticRenderFns = fns.staticRenderFns
    instance._staticTrees = [] // reset static trees
    instance.$forceUpdate()
    // force update on direct children for potential slot content update
    instance.$children.forEach(function (child) {
      if (Object.keys(child.$slots).length > 0) {
        child.$forceUpdate()
      }
    })
  })
})

exports.reload = tryWrap(function (id, options) {
  makeOptionsHot(id, options)
  var record = map[id]
  record.Ctor.extendOptions = options
  var newCtor = Vue.extend(options)
  record.Ctor.options = newCtor.options
  record.Ctor.cid = newCtor.cid
  if (newCtor.release) {
    // temporary global mixin strategy used in < 2.0.0-alpha.6
    newCtor.release()
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$parent) {
      instance.$parent.$forceUpdate()
    } else {
      console.warn('Root or manually mounted instance modified. Full reload required.')
    }
  })
})

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['info'],
  data: function data() {
    return {};
  },

  computed: {},
  ready: function ready() {},

  methods: {},
  events: {},
  components: {}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"tab-list-item\"><img :src=\"info.pic_url\"/></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-822d55d2", module.exports)
  } else {
    hotAPI.update("_v-822d55d2", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"vue-hot-reload-api":1}],3:[function(require,module,exports){
(function (global){
'use strict';

var _vue = (typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null);

var _vue2 = _interopRequireDefault(_vue);

var _Tab = require('../views/Tab.vue');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.debug = true;

Promise.all([new Promise(function (resolve) {
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', resolve);
  } else {
    window.attachEvent('onload', resolve);
  }
})]).then(function (event) {
  new _vue2.default(_Tab2.default);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../views/Tab.vue":4}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TabItem = require('../components/TabItem.vue');

var _TabItem2 = _interopRequireDefault(_TabItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  el: function el() {
    return '#app';
  },
  data: function data() {
    return {
      categoryNav: 0,
      totalData: allData,
      subNav: '全部'
    };
  },

  computed: {
    subNavList: function subNavList() {
      var self = this;
      var subList = self.totalData[self.categoryNav];

      var navList = ['全部'];
      for (var i = 0; i < subList.length; i++) {
        navList.push(subList[i].name);
      }
      return navList;
    },
    subList: function subList() {
      var self = this;
      var subList = self.totalData[self.categoryNav];

      var list = [];
      for (var i = 0; i < subList.length; i++) {
        var wList = subList[i].list;
        for (var j = 0; j < wList.length; j++) {
          if (self.subNav == '全部') {
            list.push(wList[j]);
          } else if (self.subNav == subList[i].name) {
            list.push(wList[j]);
          }
        }
      }
      return list;
    }
  },
  ready: function ready() {},

  methods: {
    setCategoryNav: function setCategoryNav(nav) {
      this.categoryNav = nav;
      this.subNav = '全部';
    },
    setSubNav: function setSubNav(nav) {
      this.subNav = nav;
    }
  },
  events: {},
  components: {
    TabItem: _TabItem2.default
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div class=\"tab-container\"><div class=\"tab-nav\"><ul class=\"tab-main-nav\"><li @click=\"setCategoryNav(0)\" :class=\"{active: categoryNav === 0}\" class=\"tab-main-nav-item\">产品设计</li><li @click=\"setCategoryNav(1)\" :class=\"{active: categoryNav === 1}\" class=\"tab-main-nav-item\">交互设计</li><li @click=\"setCategoryNav(2)\" :class=\"{active: categoryNav === 2}\" class=\"tab-main-nav-item\">视觉设计</li></ul><ul class=\"tab-sub-nav\"><li v-for=\"item in subNavList\" :class=\"{active: subNav === item}\" @click=\"setSubNav(item)\" class=\"tab-sub-nav-item\">{{item}}</li></ul></div><div class=\"tab-list\"><tab-item v-for=\"item in subList\" :info=\"item\"></tab-item></div></div>"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-fe23b9c8", module.exports)
  } else {
    hotAPI.update("_v-fe23b9c8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../components/TabItem.vue":2,"vue-hot-reload-api":1}]},{},[3]);

//# sourceMappingURL=tab.js.map
