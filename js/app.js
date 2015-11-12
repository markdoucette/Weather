/*
 * Weather application using AngularJS
 */

// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html', 
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.html', 
		controller: 'forecastController'
	})
	.when('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	});
});

// Services
weatherApp.service('cityService', function(){ 
	this.city = 'New York, NY';
});

// Controllers

/*
 * Home controller
 */
 weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
 	$scope.city = cityService.city;

 	$scope.$watch('city', function() {
 		cityService.city = $scope.city;
 	});
 }]);

/*
 * Forecast controller
 */
 weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
 	$scope.city = cityService.city;
 	$scope.days = $routeParams.days || '2';

 	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
 		{callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

 	$scope.weatherResult = $scope.weatherAPI.get({appid: "13ad1e368f71bdd2df629e3587d7686e", q: $scope.city, cnt: $scope.days});

 	$scope.convertKelvinToFahrenheit = function(degK) {
 		return Math.round(1.8 * (degK - 273.15) + 32);
 	};

 	$scope.convertKelvinToCelsius = function(degK) {
 		return Math.round(degK - 273.15);
 	};

 	$scope.convertToDate = function(date) {
 		return new Date(date * 1000);
 	};
 }]);

// Directives
weatherApp.directive('weatherReport', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/weatherReport.html', 
		replace: true
	}
});