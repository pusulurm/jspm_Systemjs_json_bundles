define(['angular'],function(angular){
	angular.module('cacheModule', [])
	.factory('localizaationCache', ['$cacheFactory', function($cacheFactory){
			var localeCache = $cacheFactory("localizaationCache");
			return localeCache;
		 }]);
});