'use strict';

angular.module('weatherAtRichmondApp',[
    'weatherAtRichmondApp.services',
    'weatherAtRichmondApp.controllers',
	'ngRoute',
    'weatherAtRichmondApp.directives'
]).
config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/home', { templateUrl: 'views/home.html', controller: 'HomeController' }).
		when('/forecast', { templateUrl: 'views/forecast.html', controller: 'ForecastController' }).
        when('/cities', { templateUrl: 'views/cities.html', controller: 'CitiesController' }).
		when('/contact', { templateUrl: 'views/contact.html', controller: 'ContactController' }).
		otherwise({redirectTo: '/home'});
}]);