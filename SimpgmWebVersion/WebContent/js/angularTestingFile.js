/**
 * 
 */
console.log("testingFile");
var data = [];
var myApp = angular.module('myApp', []);
//myApp.controller('MainCtrl', function($scope){
//	
//	$scope.firstPolygonX = parseInt(document.getElementById("firstPolygonInputX").value);
//	$scope.firstPolygonY = parseInt(document.getElementById("firstPolygonInputY").value);
//	$scope.secPolygonX = parseInt(document.getElementById("secondPolygonInputX").value);
//	$scope.secPolygonY = parseInt(document.getElementById("secondPolygonInputY").value);
//	
////	$scope.$watch ('firstPolygonX',function (newVal, oldVal){
////		console.log(newVal, oldVal);
////	});
//	
//	$scope.$watchGroup(['firstPolygonX','firstPolygonY','secPolygonX','secPolygonY'],function (newValues){
//		console.log(newValues);
//		data = newValues.slice();
//		console.log(data);
//	});
//})




//myApp.directive('helloWorld',function(){
//	function link(scope,el,attr){
//		scope.$watch('firstPolygonX',function(data){
//			console.log(data);
//		},true);
//	}
//	return {
//		link: link,
//		restrict: 'E',
//		scope: { data: '=' }
//	};
//});