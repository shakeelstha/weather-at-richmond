'use strict';
var cityId = '4781756'; //cityId for Richmond
var tempScale = 'C';
var ftempScale = tempScale;

angular.module('weatherAtRichmondApp.controllers', []).
/* Home Page Controller */
controller('HomeController', ['$scope', 'weatherAtRichmondService', '$http', function($scope, weatherAtRichmondService, $http) {    
    $scope.cityId = cityId;    
    $scope.tempScale = tempScale;
    
    //when city id submitted
    $scope.citySubmitForm = function() {
       
        // check to make sure the form is completely valid
        if ($scope.cityForm.$valid) {
            cityId = $scope.cityId;
            console.log("User Input CityId: "+cityId);
            
            weatherAtRichmondService.getTodayWeather(cityId).success(function(response){
                setTodayWeatherDataInScope($scope, response, tempScale);         

                clearCityId();
            }).error(function(){
                alert("Error in homeController");
            });
        };        
    }
    console.log("Default CityId: "+cityId);
    
    //when temp convert C<=>F
    $scope.convertTempTo = function(tScale){
        tempScale = tScale;
        weatherAtRichmondService.getTodayWeather(cityId).success(function(response){
        setTodayWeatherDataInScope($scope, response, tempScale);
        $scope.tempScale = tempScale;
        
        }).error(function(){
            alert("Error in homeController");
        });
    }
    
    //when page loads
    weatherAtRichmondService.getTodayWeather(cityId, tempScale).success(function(response){
        setTodayWeatherDataInScope($scope, response, tempScale);
        $scope.tempScale = tempScale;
        
    }).error(function(){
        alert("Error in homeController");
    });
}]).

/* Cities Page Controller */
controller('CitiesController', ['$scope', 'weatherAtRichmondService', '$http', function($scope, weatherAtRichmondService, $http){
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchCity   = '';     // set the default search/filter term  

    $scope.isLoading = true;

    weatherAtRichmondService.getUSCitiesList().success(function (data){
        $scope.cities = data;
        console.log(data);        
        
    }).error(function(){
        alert("Error in citiesController");
    }).finally(function(){
         $scope.isLoading = false;
    });
}]).

/* About Page Controller */
controller('ForecastController', ['$scope', 'weatherAtRichmondService', function($scope, weatherAtRichmondService){
    $scope.cityId = cityId;    
    $scope.ftempScale = tempScale;
    
    //when city id submitted
    $scope.forecastCitySubmitForm = function() {
       
        // check to make sure the form is completely valid
        if ($scope.forecastCityForm.$valid) {            
            cityId = $scope.cityId;
            console.log("User Input CityId: "+cityId);
            
            weatherAtRichmondService.getForecastWeather(cityId).success(function(response){
                setForecastWeatherDataInScope($scope, response, ftempScale);         
                
                clearCityId();
            }).error(function(){
                alert("Error in forecastController");
            });
        };        
    }
    console.log("Default CityId: "+cityId);
    
    //when temp convert C<=>F
    $scope.convertTempTo = function(ftScale){
        ftempScale = ftScale;
        weatherAtRichmondService.getForecastWeather(cityId).success(function(response){        
            setForecastWeatherDataInScope($scope, response, ftempScale);
            $scope.ftempScale = ftempScale;
        
        }).error(function(){
            alert("Error in homeController");
        });
    }
    
    //when page loads
    weatherAtRichmondService.getForecastWeather(cityId).success(function(response){
        setForecastWeatherDataInScope($scope, response, ftempScale);       
        $scope.ftempScale = ftempScale;
    }).error(function(){
        alert("Error in forecastController");
    });
}]).

/* Contact Page Controller */
controller('ContactController', ['$scope', 'weatherAtRichmondService', function($scope, weatherAtRichmondService){
    $scope.showMsg = false;
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.contactForm.$valid) {

            var contactFormDataObject = {
                fullname : $scope.user.fullname,
                email  : $scope.user.email,
                message : $scope.user.msg
            }
            console.log("Fullname: "+contactFormDataObject.fullname+", Email: "+contactFormDataObject.email+", Message: "+contactFormDataObject.message);
            
            /*
            $http.post("url to backend page/servlet/api", dataObject, {}).success(function(dataFromServer, status, headers, config) {
                console.log(dataFromServer.title);
            }).error(function(data, status, headers, config) {
                alert("Submitting form failed!");
            }); 
            */
            
            clearFields($scope);
            $scope.showMsg = true;
        }
    };
}]);

function clearFields(){
     document.getElementById('fullname').value = '';
     document.getElementById('email').value = '';
     document.getElementById('msg').value = '';
}

function clearCityId(){
     document.getElementById('cityId').value = '';     
}

function setTodayWeatherDataInScope($scope, response, tempScale){    
    $scope.weather = response.weather[0];    
    $scope.sunrise = utility.convertTimestampToTime(response.sys.sunrise);
    $scope.sunset = utility.convertTimestampToTime(response.sys.sunset);
    $scope.todayDate = utility.convertTimestampToDate(response.sys.sunrise);    
    $scope.cityname = response.name;
    $scope.country = response.sys.country;

    if(tempScale == 'C'){
        $scope.currentTemp = utility.convertKelvinToCelcius(response.main.temp);
        $scope.minTemp = utility.convertKelvinToCelcius(response.main.temp_min);
        $scope.maxTemp = utility.convertKelvinToCelcius(response.main.temp_max);
    }else if(tempScale == 'F'){
        $scope.currentTemp = utility.convertKelvinToFahrenheit(response.main.temp);
        $scope.minTemp = utility.convertKelvinToFahrenheit(response.main.temp_min);
        $scope.maxTemp = utility.convertKelvinToFahrenheit(response.main.temp_max);
    }
    
    $scope.speed = response.wind.speed;
    $scope.cloudiness = response.weather[0].description;
    $scope.pressure = response.main.pressure;
    $scope.humidity = response.main.humidity;
    $scope.lon = response.coord.lon;
    $scope.lat = response.coord.lat;
    $scope.geocodes = "[ "+$scope.lon+", "+$scope.lat+" ]"; 
}

function setForecastWeatherDataInScope($scope, response, ftempScale){
    $scope.fcityname = response.city.name;
    $scope.fcountry = response.city.country;
    
    $scope.flon = response.city.coord.lon;
    $scope.flat = response.city.coord.lat;
    $scope.fgeocodes = "[ "+$scope.flon+", "+$scope.flat+" ]"; 
    
    var forecastList = [];

    for(var i=0; i<response.list.length; i++){
        var forecastObj = {
            date : '',
            icon : '',
            dayTemp : '',
            cloudiness : '',
            pressure : '',
            humidity : '',
            minTemp : '',
            maxTemp : ''
        }
        
        forecastObj.date = utility.convertTimestampToDate(response.list[i].dt)
        forecastObj.icon = response.list[i].weather[0].icon;
        forecastObj.main = response.list[i].weather[0].main;
        forecastObj.cloudiness = response.list[i].weather[0].description;
        forecastObj.pressure = response.list[i].pressure;
        forecastObj.humidity = response.list[i].humidity;
        
        if(ftempScale == 'C'){
            forecastObj.dayTemp = utility.convertKelvinToCelcius(response.list[i].temp.day);
            forecastObj.minTemp = utility.convertKelvinToCelcius(response.list[i].temp.min);
            forecastObj.maxTemp = utility.convertKelvinToCelcius(response.list[i].temp.max);
        }else if(ftempScale == 'F'){
            forecastObj.dayTemp = utility.convertKelvinToFahrenheit(response.list[i].temp.day);
            forecastObj.minTemp = utility.convertKelvinToFahrenheit(response.list[i].temp.min);
            forecastObj.maxTemp = utility.convertKelvinToFahrenheit(response.list[i].temp.max);
        }
        
        forecastList.push(forecastObj);
    }
    
    $scope.forecastList = forecastList;
}
