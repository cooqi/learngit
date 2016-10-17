var myWebApp=angular.module('myWEB',['ngRoute','cartapp']);
myWebApp.config(function($routeProvider){
	$routeProvider.when('/index',{
		templateUrl:'tpls/index.html',
		controller:'cartCtrl'
	}).when('/filter',{
		templateUrl:'tpls/filter.html',
		controller:'filterCtrl'
	}).when('/accordion',{
		templateUrl:'tpls/accordion.html',
		controller:'accordionCtrl'
	}).otherwise({
		redirectTo:'/index'
	})
})
