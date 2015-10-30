'use strict';

// Test Suite For Service
describe('Testing weatherAtRichmondApp', function(){
    var weatherAtRichmondService;
    var $httpBackend;

    beforeEach(module('weatherAtRichmondApp'));
    
    beforeEach(inject(function($injector){
        weatherAtRichmondService = $injector.get('weatherAtRichmondService');
    }));
    
    beforeEach(inject(function (_$httpBackend_, _weatherAtRichmondService_) {
        $httpBackend = _$httpBackend_;
        weatherAtRichmondService = _weatherAtRichmondService_;
    }));

    it('should return api endpoint', function(){
        var apiEndpoint = weatherAtRichmondService.getApiEndPoint();
        expect(apiEndpoint).toEqual('http://api.openweathermap.org/data/2.5/');
    });
    
    it('should return apiId', function(){
        var apiId = weatherAtRichmondService.getApiId();
        expect(apiId).toEqual('3c8e0409017ef03d895a46a5822d18d0');
    });
    
    it('should contain country, weather, sunrise in today weather json response', function() {
        var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=4781756&'
                     +'appid=3c8e0409017ef03d895a46a5822d18d0';
                
        var mockResponse = '{"coord":{"lon":-77.46,"lat":37.55},"weather":[{"id":500,"main":"Rain","description":'
        +'"light rain","icon":"10d"}],"base":"cmc stations","main":{"temp":291.669,"pressure":1021.96,'
        +'"humidity":97,"temp_min":291.669,"temp_max":291.669,"sea_level":1028.27,"grnd_level":1021.96},'
        +'"wind":{"speed":4.32,"deg":129.003},"rain":{"3h":1.1975},"clouds":{"all":92},"dt":1446047228,'
        +'"sys":{"message":0.0041,"country":"US","sunrise":1446031866,"sunset":1446070529},"id":4781756,'
        +'"name":"City of Richmond","cod":200}'
                
        $httpBackend.expectGET(apiUrl).respond(mockResponse);
        weatherAtRichmondService.getTodayWeather('4781756').then(function(response) {
            expect(JSON.stringify(response)).toContain('weather');
            expect(JSON.stringify(response)).toContain('country');
            expect(JSON.stringify(response)).toContain('sunrise');  
        });
        $httpBackend.flush();
    });
    
    it('should contain main, night, eve in forecasted weather json response', function() { 
        var apiUrl ='http://api.openweathermap.org/data/2.5/forecast/daily?id=4781756&'
                    +'appid=3c8e0409017ef03d895a46a5822d18d0';
        
        var mockResponse = '{"city":{"id":524901,"name":"Moscow","coord":{"lon":37.615555,"lat":55.75222},'
        +'"country":"RU","population":0},"cod":"200","message":0.0127,"cnt":7,"list":[{"dt":1446022800,'
        +'"temp":{"day":273,"min":272.13,"max":273,"night":272.13,"eve":273,"morn":273},"pressure":1008.19,'
        +'"humidity":80,"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],'
        +'"speed":9.37,"deg":344,"clouds":88,"snow":0.12},{"dt":1446109200,"temp":{"day":271.94,"min":268.18,'
        +'"max":273.55,"night":272.99,"eve":271.72,"morn":269.43},"pressure":1016.37,"humidity":82,'
        +'"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"speed":4.67,'
        +'"deg":311,"clouds":0,"snow":0.52},{"dt":1446195600,"temp":{"day":275.24,"min":271.05,"max":275.57,'
        +'"night":271.44,"eve":273.51,"morn":271.85},"pressure":1020.44,"humidity":86,"weather":[{"id":600,'
        +'"main":"Snow","description":"light snow","icon":"13d"}],"speed":4.31,"deg":332,"clouds":48,'
        +'"snow":0.71},{"dt":1446282000,"temp":{"day":274.04,"min":267.42,"max":274.59,"night":267.42,'
        +'"eve":270.65,"morn":271.14},"pressure":1026.97,"humidity":81,"weather":[{"id":600,"main":"Snow",'
        +'"description":"light snow","icon":"13d"}],"speed":3.06,"deg":280,"clouds":80,"snow":0.25},'
        +'{"dt":1446368400,"temp":{"day":275.11,"min":268.22,"max":279.08,"night":279.08,"eve":276.13,'
        +'"morn":268.22},"pressure":1017.07,"humidity":90,"weather":[{"id":501,"main":"Rain",'
        +'"description":"moderate rain","icon":"10d"}],"speed":5.36,"deg":258,"clouds":88,"rain":5.88},'
        +'{"dt":1446454800,"temp":{"day":277.87,"min":271.65,"max":277.87,"night":275.64,"eve":276.28,'
        +'"morn":271.65},"pressure":1021.89,"humidity":0,"weather":[{"id":500,"main":"Rain",'
        +'"description":"light rain","icon":"10d"}],"speed":7.72,"deg":243,"clouds":46},{"dt":1446541200,'
        +'"temp":{"day":279.05,"min":274.68,"max":279.05,"night":275.54,"eve":274.68,"morn":277.37},'
        +'"pressure":1018.53,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain",'
        +'"icon":"10d"}],"speed":2.85,"deg":316,"clouds":72,"rain":0.79}]}';
        
        $httpBackend.expectGET().respond(mockResponse);
        weatherAtRichmondService.getForecastWeather('4781756').then(function(response) {
            expect(JSON.stringify(response)).toContain('main');
            expect(JSON.stringify(response)).toContain('night');
            expect(JSON.stringify(response)).toContain('eve');  
        });
        $httpBackend.flush();
    });
    
});

// Test Suite For Utility
describe('Testing utility', function(){

    beforeEach(function(){
        jasmine.addMatchers(utility);
    });
   
    it('should return date string from timestamp', function() {
        var dateString = utility.convertTimestampToDate('1446031860');
        expect(dateString).toEqual('Wed Oct 28 2015');
    });
    
    it('should return time string from timestamp', function() {
        var timeString = utility.convertTimestampToTime('1446031860');
        expect(timeString).toEqual('07:31:00 GMT-0400 (Eastern Daylight Time)');
    });
    
    it('should return celcius equivalent of kelvin', function() {
        var celcius = utility.convertKelvinToCelcius('0');
        expect(celcius).toEqual('-273.15');
    });
    
    it('should return fahrenheit equivalent of kelvin', function() {
        var fahrenheit = utility.convertKelvinToFahrenheit('0');
        expect(fahrenheit).toEqual('-459.67');
    });
});

// Test Suite For Controllers
describe('Testing Controllers', function(){
    var $controller;
    
    beforeEach(module('weatherAtRichmondApp'));
        
    beforeEach(inject(function($injector){
        $controller = $injector.get('$controller');
    }));
    
    it('should return HomeController default cityId and tempScale', function(){
        var $scope = {};
        var controller = $controller('HomeController', {$scope: $scope});
        expect($scope.cityId).toEqual('4781756');
        expect($scope.tempScale).toEqual('C');
    });
    
    it('should return ForecastController default cityId and ftempScale', function(){
        var $scope = {};
        var controller = $controller('ForecastController', {$scope: $scope});
        expect($scope.cityId).toEqual('4781756');
        expect($scope.ftempScale).toEqual('C');
    });
});