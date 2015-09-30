define(['angular123', 'directive1', 'directive2',
		'angular-translate','angular-translate/dist/angular-translate-loader-partial/angular-translate-loader-partial',
		'./main_locale_cache',
		'./cacheModule'],function(angular){
	angular.module('mainModule',
					  			['pascalprecht.translate', 
					  			 'Directive1Module', 
					  			 'Directive2Module',
					  			 'main.i18n',
					  			 'cacheModule'
					  			])
		.factory('myhttpIntercepter', ['localizaationCache',function(localeCache){
			return{
				request: function(config){
					if(config.url.indexOf('i18n') > -1){
						config.cache = localeCache;	
					};					
					return config;
				}
			}
		}])
		.config(['$translateProvider','$translatePartialLoaderProvider','$httpProvider', function($translateProvider, $translatePartialLoaderProvider, $httpProvider){
			//$httpProvider.defaults.cache  = $cacheFactory('localizaationCache');
			$httpProvider.interceptors.push('myhttpIntercepter');
			$translateProvider.useLoader('$translatePartialLoader', {
				urlTemplate: 'dist/{part}/i18n/{lang}.json'
			});
			$translateProvider.preferredLanguage('en_CA');
			$translatePartialLoaderProvider.addPart('main');
			$translatePartialLoaderProvider.addPart('directive1');
			$translatePartialLoaderProvider.addPart('directive2');
		}])		
		.controller('mainController', ['$scope', function($scope){
			$scope.message = "Message from controller...!";
		}]);
});