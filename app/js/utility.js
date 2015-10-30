'use strict';

var utility = {
    convertTimestampToDate: function(timestamp){
        return new Date(timestamp*1000).toDateString();
    },

    convertTimestampToTime: function(timestamp){
        return new Date(timestamp*1000).toTimeString();
    },

    convertKelvinToCelcius: function(kelvin){
        return (kelvin - 273.15).toFixed(2);
    },

    convertKelvinToFahrenheit: function(kelvin){
        return ((kelvin * (9/5)) - 459.67).toFixed(2);    
    }
};