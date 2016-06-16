(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.reset = function() {
    modules = {};
    cache = {};
    aliases = {};
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("index.static.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <title>BitcoinZebra</title>\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n  <link rel=\"stylesheet\" href=\"stylesheets/app.css\">\n  <link rel=\"icon\" href=\"images/favicon.png\">\n  <script src=\"javascripts/vendor.js\"></script>\n  <script src=\"javascripts/app.js\"></script>\n</head>\n<body>\n  <div class=\"wrapper\">\n    <div class=\"parallax\">\n      <div class=\"moon\"></div>\n      <div class=\"yellow-planet\"></div>\n      <div class=\"blue-planet\"></div>\n      <div class=\"dark-planet\"></div>\n      <div class=\"stars\"></div>\n      <div class=\"big-stars\"></div>\n      <div class=\"comet-left\"></div>\n      <div class=\"comet-right\"></div>\n      <div class=\"dark-comet-left\"></div>\n      <div class=\"dark-comet-right\"></div>\n    </div>\n    <div class=\"container\">\n      <div class=\"header\">\n        <div class=\"nav\">\n          <div class=\"logo\"><a href=\"/\"><img src=\"images/Logo.png\"></a></div>\n          <div class=\"nav-item\"><a href=\"#\">Transactions</a></div>\n          <div class=\"nav-item\"><a href=\"#\">Bets</a></div>\n          <div class=\"nav-item\"><a href=\"#\">Promotions</a></div>\n        </div>\n        <div class=\"options\">\n          <div class=\"options-left\">\n            <div class=\"balance\">0.00200 mB</div>\n            <div class=\"button free-satoshi\">\n              <div class=\"button-inner\">FREE SATOSHI</div>\n            </div>\n          </div>\n          <div class=\"options-right\">\n            <div class=\"button deposit\">\n              <div class=\"button-inner\">DEPOSIT</div>\n            </div>\n            <div class=\"button withdraw\">\n              <div class=\"button-inner\">WITHDRAW</div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"game\">\n        <div class=\"groups\">\n          <div class=\"left-top\"></div>\n          <div class=\"right-top\"></div>\n          <div class=\"left-bottom\"></div>\n          <div class=\"right-bottom\"></div>\n        </div>\n        <div class=\"title\">Your bet</div>\n        <div class=\"buttons\">\n          <div class=\"button\"><span>1</span>/2</div>\n          <div class=\"button centered\"><span>2</span>X</div>\n          <div class=\"button\"><span>M</span>A<span>X</span></div>\n        </div>\n        <div class=\"bet\">0.00000001 mB</div>\n        <div class=\"profit-chance\">\n          <div class=\"profit\">Profit:<span>0.00000051 mB</span></div>\n          <div class=\"win-chance\">Win chance:<span>54%</span></div>\n        </div>\n        <div class=\"prediction\">\n          <div class=\"button\">Lower</div>\n          <div class=\"value centered\">50</div>\n          <div class=\"button\">Higher</div>\n        </div>\n      </div>\n      <div class=\"center\">\n        <div class=\"round\">\n          <div class=\"planet\"></div>\n          <div class=\"value\">82</div>\n        </div>\n        <div class=\"role\">Click to play\n          <div class=\"antenna\">\n            <div class=\"antenna-head\"></div>\n          </div>\n          <div class=\"button\">\n            <div class=\"button-inner\">role</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"table\">\n        <div class=\"table-header\">\n          <div class=\"controls\">\n            <div class=\"left\"></div>\n            <div class=\"center\"></div>\n            <div class=\"right\"></div>\n          </div>\n          <div class=\"options\">\n            <div class=\"button\">\n              <div class=\"button-inner\">My bets</div>\n            </div>\n            <div class=\"button button-active\">\n              <div class=\"button-inner\">All bets</div>\n            </div>\n            <div class=\"button\">\n              <div class=\"button-inner\">Best astro</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"table-list\">\n          <div class=\"table-listItem table-head\">\n            <div class=\"table-td\">Id</div>\n            <div class=\"table-td\">User</div>\n            <div class=\"table-td\">Number</div>\n            <div class=\"table-td\">Prediction</div>\n            <div class=\"table-td\">Bet size</div>\n            <div class=\"table-td\">Win oods</div>\n            <div class=\"table-td\">Profit</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937597</div>\n            <div class=\"table-td\">Ransom_2vh5e</div>\n            <div class=\"table-td\">35</div>\n            <div class=\"table-td\">> 54</div>\n            <div class=\"table-td\">0.00122 mB</div>\n            <div class=\"table-td\">11%</div>\n            <div class=\"table-td lose\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937596</div>\n            <div class=\"table-td\">yousee</div>\n            <div class=\"table-td\">92</div>\n            <div class=\"table-td\">> 50</div>\n            <div class=\"table-td\">0.00591 mB</div>\n            <div class=\"table-td\">66%</div>\n            <div class=\"table-td lose\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937595</div>\n            <div class=\"table-td\">shugar</div>\n            <div class=\"table-td\">80</div>\n            <div class=\"table-td\">> 49</div>\n            <div class=\"table-td\">0.00425 mB</div>\n            <div class=\"table-td\">144%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937594</div>\n            <div class=\"table-td\">flywithmemsl</div>\n            <div class=\"table-td\">123</div>\n            <div class=\"table-td\">> 29</div>\n            <div class=\"table-td\">0.03002 mB</div>\n            <div class=\"table-td\">29%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937593</div>\n            <div class=\"table-td\">chudovische</div>\n            <div class=\"table-td\">101</div>\n            <div class=\"table-td\">> 110</div>\n            <div class=\"table-td\">0.00100 mB</div>\n            <div class=\"table-td\">12%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937592</div>\n            <div class=\"table-td\">sitnik</div>\n            <div class=\"table-td\">99</div>\n            <div class=\"table-td\">> 51</div>\n            <div class=\"table-td\">0.01237 mB</div>\n            <div class=\"table-td\">80%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937593</div>\n            <div class=\"table-td\">molefrog</div>\n            <div class=\"table-td\">54</div>\n            <div class=\"table-td\">> 54</div>\n            <div class=\"table-td\">0.01488 mB</div>\n            <div class=\"table-td\">49%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937597</div>\n            <div class=\"table-td\">Ransom_2vh5e</div>\n            <div class=\"table-td\">35</div>\n            <div class=\"table-td\">> 54</div>\n            <div class=\"table-td\">0.00122 mB</div>\n            <div class=\"table-td\">11%</div>\n            <div class=\"table-td lose\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937596</div>\n            <div class=\"table-td\">yousee</div>\n            <div class=\"table-td\">92</div>\n            <div class=\"table-td\">> 50</div>\n            <div class=\"table-td\">0.00591 mB</div>\n            <div class=\"table-td\">66%</div>\n            <div class=\"table-td lose\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937595</div>\n            <div class=\"table-td\">shugar</div>\n            <div class=\"table-td\">80</div>\n            <div class=\"table-td\">> 49</div>\n            <div class=\"table-td\">0.00425 mB</div>\n            <div class=\"table-td\">144%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937594</div>\n            <div class=\"table-td\">flywithmemsl</div>\n            <div class=\"table-td\">123</div>\n            <div class=\"table-td\">> 29</div>\n            <div class=\"table-td\">0.03002 mB</div>\n            <div class=\"table-td\">29%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937593</div>\n            <div class=\"table-td\">chudovische</div>\n            <div class=\"table-td\">101</div>\n            <div class=\"table-td\">> 110</div>\n            <div class=\"table-td\">0.00100 mB</div>\n            <div class=\"table-td\">12%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937592</div>\n            <div class=\"table-td\">sitnik</div>\n            <div class=\"table-td\">99</div>\n            <div class=\"table-td\">> 51</div>\n            <div class=\"table-td\">0.01237 mB</div>\n            <div class=\"table-td\">80%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n          <div class=\"table-listItem\">\n            <div class=\"table-td\">2739937593</div>\n            <div class=\"table-td\">molefrog</div>\n            <div class=\"table-td\">54</div>\n            <div class=\"table-td\">> 54</div>\n            <div class=\"table-td\">0.01488 mB</div>\n            <div class=\"table-td\">49%</div>\n            <div class=\"table-td win\">+0.00044</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</body>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=templates.js.map