define([
	'i18n/en_CA.json!',
	'i18n/en_US.json!',
	'i18n/fr_CA.json!',
	'angular',
	'./cacheModule'
	], function(en_CA, en_US, fr_CA, angular){
		var moduleName = 'main.i18n';
			angular.module(moduleName,['cacheModule']).
			run(['localizaationCache', function(cache){
				cache.put('dist/main/i18n/en_CA.json',en_CA);
				cache.put('dist/main/i18n/fr_CA.json',fr_CA);
				cache.put('dist/main/i18n/en_US.json',en_US);
			}])
	})