// Controllers

/*
 * Home controller
 */
 weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
 	$scope.city = cityService.city;

 	$scope.$watch('city', function() {
 		cityService.city = $scope.city;
 	});

 	$scope.submit = function() {
 		$location.path('/forecast');
 	};
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

