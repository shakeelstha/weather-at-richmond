'use strict';

angular.module('weatherAtRichmondApp.services',[]).
factory('weatherAtRichmondService', function($http){
    var apiEndpoint = 'http://api.openweathermap.org/data/2.5/';
    var appId = '3c8e0409017ef03d895a46a5822d18d0';        

    var weatherAtRichmond = {};
    
    // return API End Point
    weatherAtRichmond.getApiEndPoint = function(){
        return apiEndpoint;
    }
    
    // return API id
    weatherAtRichmond.getApiId = function(){
        return appId;
    }
    
    // Call API to get todays weather
    weatherAtRichmond.getTodayWeather = function(cityId){
        var apiUrl = apiEndpoint+'weather?id='+cityId+'&appid='+appId;
        return $http.get(apiUrl);
    }

    // Load json file to get US cities list
    weatherAtRichmond.getUSCitiesList = function(){
        return $http.get('data/us.city.list.json');
    }

    // Call API to get 16 days weather forecast
    weatherAtRichmond.getForecastWeather = function(cityId){
        var apiUrl = apiEndpoint+'forecast/daily?id='+cityId+'&appid='+appId;
        return $http.get(apiUrl);
    }
    
    return weatherAtRichmond;

});