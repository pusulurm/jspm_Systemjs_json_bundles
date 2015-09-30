"bundle";
System.registerDynamic("npm:angular-translate@2.8.0/dist/angular-translate-loader-partial/angular-translate-loader-partial", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    (function(root, factory) {
      if (typeof define === 'function' && define.amd) {
        define([], function() {
          return (factory());
        });
      } else if (typeof exports === 'object') {
        module.exports = factory();
      } else {
        factory();
      }
    }(this, function() {
      angular.module('pascalprecht.translate').provider('$translatePartialLoader', $translatePartialLoader);
      function $translatePartialLoader() {
        'use strict';
        function Part(name, priority) {
          this.name = name;
          this.isActive = true;
          this.tables = {};
          this.priority = priority || 0;
        }
        Part.prototype.parseUrl = function(urlTemplate, targetLang) {
          if (angular.isFunction(urlTemplate)) {
            return urlTemplate(this.name, targetLang);
          }
          return urlTemplate.replace(/\{part\}/g, this.name).replace(/\{lang\}/g, targetLang);
        };
        Part.prototype.getTable = function(lang, $q, $http, $httpOptions, urlTemplate, errorHandler) {
          if (!this.tables[lang]) {
            var self = this;
            return $http(angular.extend({
              method: 'GET',
              url: this.parseUrl(urlTemplate, lang)
            }, $httpOptions)).then(function(result) {
              self.tables[lang] = result.data;
              return result.data;
            }, function() {
              if (errorHandler) {
                return errorHandler(self.name, lang).then(function(data) {
                  self.tables[lang] = data;
                  return data;
                }, function() {
                  return $q.reject(self.name);
                });
              } else {
                return $q.reject(self.name);
              }
            });
          } else {
            return $q.when(this.tables[lang]);
          }
        };
        var parts = {};
        function hasPart(name) {
          return Object.prototype.hasOwnProperty.call(parts, name);
        }
        function isStringValid(str) {
          return angular.isString(str) && str !== '';
        }
        function isPartAvailable(name) {
          if (!isStringValid(name)) {
            throw new TypeError('Invalid type of a first argument, a non-empty string expected.');
          }
          return (hasPart(name) && parts[name].isActive);
        }
        function deepExtend(dst, src) {
          for (var property in src) {
            if (src[property] && src[property].constructor && src[property].constructor === Object) {
              dst[property] = dst[property] || {};
              deepExtend(dst[property], src[property]);
            } else {
              dst[property] = src[property];
            }
          }
          return dst;
        }
        function getPrioritizedParts() {
          var prioritizedParts = [];
          for (var part in parts) {
            if (parts[part].isActive) {
              prioritizedParts.push(parts[part]);
            }
          }
          prioritizedParts.sort(function(a, b) {
            return a.priority - b.priority;
          });
          return prioritizedParts;
        }
        this.addPart = function(name, priority) {
          if (!isStringValid(name)) {
            throw new TypeError('Couldn\'t add part, part name has to be a string!');
          }
          if (!hasPart(name)) {
            parts[name] = new Part(name, priority);
          }
          parts[name].isActive = true;
          return this;
        };
        this.setPart = function(lang, part, table) {
          if (!isStringValid(lang)) {
            throw new TypeError('Couldn\'t set part.`lang` parameter has to be a string!');
          }
          if (!isStringValid(part)) {
            throw new TypeError('Couldn\'t set part.`part` parameter has to be a string!');
          }
          if (typeof table !== 'object' || table === null) {
            throw new TypeError('Couldn\'t set part. `table` parameter has to be an object!');
          }
          if (!hasPart(part)) {
            parts[part] = new Part(part);
            parts[part].isActive = false;
          }
          parts[part].tables[lang] = table;
          return this;
        };
        this.deletePart = function(name) {
          if (!isStringValid(name)) {
            throw new TypeError('Couldn\'t delete part, first arg has to be string.');
          }
          if (hasPart(name)) {
            parts[name].isActive = false;
          }
          return this;
        };
        this.isPartAvailable = isPartAvailable;
        this.$get = ['$rootScope', '$injector', '$q', '$http', function($rootScope, $injector, $q, $http) {
          var service = function(options) {
            if (!isStringValid(options.key)) {
              throw new TypeError('Unable to load data, a key is not a non-empty string.');
            }
            if (!isStringValid(options.urlTemplate) && !angular.isFunction(options.urlTemplate)) {
              throw new TypeError('Unable to load data, a urlTemplate is not a non-empty string or not a function.');
            }
            var errorHandler = options.loadFailureHandler;
            if (errorHandler !== undefined) {
              if (!angular.isString(errorHandler)) {
                throw new Error('Unable to load data, a loadFailureHandler is not a string.');
              } else {
                errorHandler = $injector.get(errorHandler);
              }
            }
            var loaders = [],
                deferred = $q.defer(),
                prioritizedParts = getPrioritizedParts();
            angular.forEach(prioritizedParts, function(part) {
              loaders.push(part.getTable(options.key, $q, $http, options.$http, options.urlTemplate, errorHandler));
              part.urlTemplate = options.urlTemplate;
            });
            $q.all(loaders).then(function() {
              var table = {};
              angular.forEach(prioritizedParts, function(part) {
                deepExtend(table, part.tables[options.key]);
              });
              deferred.resolve(table);
            }, function() {
              deferred.reject(options.key);
            });
            return deferred.promise;
          };
          service.addPart = function(name, priority) {
            if (!isStringValid(name)) {
              throw new TypeError('Couldn\'t add part, first arg has to be a string');
            }
            if (!hasPart(name)) {
              parts[name] = new Part(name, priority);
              $rootScope.$emit('$translatePartialLoaderStructureChanged', name);
            } else if (!parts[name].isActive) {
              parts[name].isActive = true;
              $rootScope.$emit('$translatePartialLoaderStructureChanged', name);
            }
            return service;
          };
          service.deletePart = function(name, removeData) {
            if (!isStringValid(name)) {
              throw new TypeError('Couldn\'t delete part, first arg has to be string');
            }
            if (removeData === undefined) {
              removeData = false;
            } else if (typeof removeData !== 'boolean') {
              throw new TypeError('Invalid type of a second argument, a boolean expected.');
            }
            if (hasPart(name)) {
              var wasActive = parts[name].isActive;
              if (removeData) {
                var $translate = $injector.get('$translate');
                var cache = $translate.loaderCache();
                if (typeof(cache) === 'string') {
                  cache = $injector.get(cache);
                }
                if (typeof(cache) === 'object') {
                  angular.forEach(parts[name].tables, function(value, key) {
                    cache.remove(parts[name].parseUrl(parts[name].urlTemplate, key));
                  });
                }
                delete parts[name];
              } else {
                parts[name].isActive = false;
              }
              if (wasActive) {
                $rootScope.$emit('$translatePartialLoaderStructureChanged', name);
              }
            }
            return service;
          };
          service.isPartLoaded = function(name, lang) {
            return angular.isDefined(parts[name]) && angular.isDefined(parts[name].tables[lang]);
          };
          service.getRegisteredParts = function() {
            var registeredParts = [];
            angular.forEach(parts, function(p) {
              if (p.isActive) {
                registeredParts.push(p.name);
              }
            });
            return registeredParts;
          };
          service.isPartAvailable = isPartAvailable;
          return service;
        }];
      }
      $translatePartialLoader.displayName = '$translatePartialLoader';
      return 'pascalprecht.translate';
    }));
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("i18n/en_CA.json!github:systemjs/plugin-json@0.1.0", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {"MAIN.KEY1": "MAIN ENGLISH CA KEY1"};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("i18n/en_US.json!github:systemjs/plugin-json@0.1.0", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {"MAIN.KEY1": "MAIN ENGLISH US KEY1"};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("i18n/fr_CA.json!github:systemjs/plugin-json@0.1.0", [], true, function(require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {"MAIN.KEY1": "MAIN FRENCH FR KEY1"};
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("cacheModule.js", ["npm:angular@1.5.0-beta.0"], function(angular) {
  angular.module('cacheModule', []).factory('localizaationCache', ['$cacheFactory', function($cacheFactory) {
    var localeCache = $cacheFactory("localizaationCache");
    return localeCache;
  }]);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("main_locale_cache.js", ["i18n/en_CA.json!github:systemjs/plugin-json@0.1.0", "i18n/en_US.json!github:systemjs/plugin-json@0.1.0", "i18n/fr_CA.json!github:systemjs/plugin-json@0.1.0", "npm:angular@1.5.0-beta.0", "cacheModule.js"], function(en_CA, en_US, fr_CA, angular) {
  var moduleName = 'main.i18n';
  angular.module(moduleName, ['cacheModule']).run(['localizaationCache', function(cache) {
    cache.put('dist/main/i18n/en_CA.json', en_CA);
    cache.put('dist/main/i18n/fr_CA.json', fr_CA);
    cache.put('dist/main/i18n/en_US.json', en_US);
  }]);
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("main.js", ["npm:angular@1.5.0-beta.0", "github:pusulurm/directive1@master", "github:pusulurm/directive2@master", "npm:angular-translate@2.8.0", "npm:angular-translate@2.8.0/dist/angular-translate-loader-partial/angular-translate-loader-partial", "main_locale_cache.js", "cacheModule.js"], function(angular) {
  angular.module('mainModule', ['pascalprecht.translate', 'Directive1Module', 'Directive2Module', 'main.i18n', 'cacheModule']).factory('myhttpIntercepter', ['localizaationCache', function(localeCache) {
    return {request: function(config) {
        if (config.url.indexOf('i18n') > -1) {
          config.cache = localeCache;
        }
        ;
        return config;
      }};
  }]).config(['$translateProvider', '$translatePartialLoaderProvider', '$httpProvider', function($translateProvider, $translatePartialLoaderProvider, $httpProvider) {
    $httpProvider.interceptors.push('myhttpIntercepter');
    $translateProvider.useLoader('$translatePartialLoader', {urlTemplate: 'dist/{part}/i18n/{lang}.json'});
    $translateProvider.preferredLanguage('en_CA');
    $translatePartialLoaderProvider.addPart('main');
    $translatePartialLoaderProvider.addPart('directive1');
    $translatePartialLoaderProvider.addPart('directive2');
  }]).controller('mainController', ['$scope', function($scope) {
    $scope.message = "Message from controller...!";
  }]);
});

_removeDefine();
})();
//# sourceMappingURL=mainBundle.js.map