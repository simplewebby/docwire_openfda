// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
var option = document.getElementById('select-box');
var UserValue = option.options[option.selectedIndex];
var optionCount = document.getElementById('select-count');
var UserCount = optionCount.options[optionCount.selectedIndex];
var btn = document.getElementById('bt'); //Get the button:

mybutton = document.getElementById("myBtn");
mybuttonPrint = document.getElementById("myBtnPrint"); // When the user scrolls down 20px from the top of the document, show the button

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    mybuttonPrint.style.display = "block";
  } else {
    mybutton.style.display = "none";
    mybuttonPrint.style.display = "none";
  }
} // Pring to PDF 


function print(doc) {
  var objFra = document.createElement('iframe'); // Create an IFrame.

  objFra.style.visibility = "hidden"; // Hide the frame.

  objFra.src = doc; // Set source.

  document.body.appendChild(objFra); // Add the frame to the web page.

  objFra.contentWindow.focus(); // Set focus.

  objFra.contentWindow.print(); // Print it.
} //search Function


function search(searchTerm, UserValue, userCount) {
  return fetch("https://api.fda.gov/drug/label.json?search=".concat(searchTerm, "+AND+openfda.product_type:").concat(UserValue, "&limit=").concat(userCount)).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data.results.map(function (data) {
      return data;
    });
  }).catch(function (err) {
    return console.log(err, console.log("The Drug Not Found"));
  });
} // form event listener


searchForm.addEventListener('submit', function (e) {
  if (UserValue === 'prescription') {
    UserValue = 'prescription';
  }

  if (UserValue === 'otc') {
    UserValue = 'otc';
  }

  if (UserCount === '1') {
    UserCount = 1;
  }

  if (UserCount === '5') {
    UserCount = 5;
  }

  if (UserCount === '10') {
    UserCount = 10;
  }

  if (UserCount === '20') {
    UserCount = 20;
  } // get search term


  var searchTerm = searchInput.value;
  var userSelected = option.value;
  var userCount = optionCount.value;
  console.log(searchTerm, userSelected, userCount); // check input 

  if (searchTerm === '') {
    alert('Please add a search term');
  } else if (userSelected === '') {
    alert('Please select a drug type');
  } else if (userCount === '') {
    alert('Please select quantity');
  } // clear form


  document.getElementById("search-form").reset(); //Search FDA

  search(searchTerm, userSelected, userCount).then(function (results) {
    console.log(results);
    var output = '<div class="container">'; //loop thru meds                                                                                                                                               

    results.forEach(function (result) {
      if (userSelected === 'prescription') {
        output += "\n                    <div>\n                    <dl class=\"row\">\n                    <dt class=\"col-sm-3 h4\"><div class=\"p-3 mb-2 text-white\" style=\"background-color: #DE7B3A; color: #ffffff;\">Brand Name:</div></dt>\n                        <dd class=\"col-sm-9 h4 text-info\">\n                        <div class=\"p-3 mb-2 text-white\" style=\"background-color: #3d5165;\">".concat(result.openfda.brand_name, "</div>\n                        </dd>\n                        \n                        <dt class=\"col-sm-3\">Product NDC:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.openfda.product_ndc, "</dd>\n\n                        <dt class=\"col-sm-3\">Generic Name:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.openfda.generic_name, "</dd>\n                        \n                        <dt class=\"col-sm-3\">Effective Date:</dt> \n                        <dd class=\"col-sm-9\">").concat(result.effective_time, "</dd>\n\n                        <dt class=\"col-sm-3\">Manufacturer Name:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.openfda.manufacturer_name, "</dd>\n\n                        <dt class=\"col-sm-3\">Description:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.description, " </dd>\n\n                        <dt class=\"col-sm-3 \">Geriatric Use:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.geriatric_use, "</dd>\n\n                        <dt class=\"col-sm-3\">Indications and Usage:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.indications_and_usage, "</dd>\n\n                        <dt class=\"col-sm-3 \">Clinical Studies:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.clinical_studies, "</dd>\n                        \n                        <dt class=\"col-sm-3\">Clinical Studies Table:</dt>\n                        <dd class=\"col-sm-9\">\n                        <table class=\"table\"> ").concat(result.clinical_studies_table, "</table>\n                        </dd>\n\n                        <dt class=\"col-sm-3\">Dosage and administration:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.dosage_and_administration, "</dd>\n\n                        <dt class=\"col-sm-3 \">Adverse Reactions:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.adverse_reactions, "</dd>\n \n                        <dt class=\"col-sm-3 \">Clinical Pharmacology:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.clinical_pharmacology, "</dd>\n\n                        <dt class=\"col-sm-3\">Overdosage:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.overdosage, " </dd>\n                    </dl>\n                   </div>\n                   <hr>\n               ");
        output += '</div>';
      }

      if (userSelected === 'otc') {
        output += "\n\n                    <dl class=\"row\">\n                        <dt class=\"col-sm-3 h4\"><div class=\"p-3 mb-2 text-white\" style=\"background-color: #DE7B3A; color: #ffffff;\">Brand Name:</div></dt>\n                        <dd class=\"col-sm-9 h4 text-info\">\n                        <div class=\"p-3 mb-2 text-white\" style=\"background-color: #3d5165;\">".concat(result.openfda.brand_name, "</div>\n                        </dd>\n                        <dt class=\"col-sm-3\">Product NDC:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.openfda.product_ndc, "</dd>\n\n                        <dt class=\"col-sm-3\">Effective Date:</dt> \n                        <dd class=\"col-sm-9\">").concat(result.effective_time, "</dd>\n\n                        <dt class=\"col-sm-3\">Generic Name:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.openfda.generic_name, "</dd>\n\n                        <dt class=\"col-sm-3\">Manufacturer Name:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.openfda.manufacturer_name, "</dd>\n\n                        <dt class=\"col-sm-3\">Purpose:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.purpose, "</dd>\n\n                        <dt class=\"col-sm-3\">Warnings:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.warnings, " </dd>\n\n                        <dt class=\"col-sm-3\">Inactive Ingredient:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.inactive_ingredient, " </dd>\n\n                        <dt class=\"col-sm-3\">Clinical Studies:</dt>\n                        <dd class=\"col-sm-9\"> ").concat(result.active_ingredient, "</dd>\n\n                        <dt class=\"col-sm-3\">Dosage and administration:</dt>\n                        <dd class=\"col-sm-9\">").concat(result.dosage_and_administration, "</dd>\n\n                    </dl>\n                   <hr>    \n               ");
        output += '</div>';
      }

      document.getElementById('results').innerHTML = output;
    });
  });
  e.preventDefault();
});
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56377" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/fda_app.e31bb0bc.js.map