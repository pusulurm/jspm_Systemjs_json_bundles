/**
 * Created by pusulurm on 9/24/2015.
 */
var jspm = require('jspm');
console.log('started..!'); 
 jspm.bundle('angular + angular-translate + jquery + json','dist/commonBundle.js',{sourceMaps: true, inject: true}).then(function(){
 	jspm.bundle('github:pusulurm/directive1@master - dist/commonBundle','dist/directive1/directive1.js',{sourceMaps: true, inject: true}).then(function(){
 		jspm.bundle('github:pusulurm/directive2@master - dist/commonBundle','dist/directive2/directive2.js',{sourceMaps: true, inject: true}).then(function(){
 			jspm.bundle('main - directive1 - directive2 - dist/commonBundle','dist/mainBundle.js',{sourceMaps: true, inject: true});
 			console.log('completed..!');
 		})
 	}); 	
 });
