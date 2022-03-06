// variables to store weather data.
var cityName = document.getElementById("city-name");
var sky = document.getElementById("sky");
var currentWeatherData = document.getElementById("current-weather-data");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUV = document.getElementById("current-uv");
var FutureForecastData = document.getElementById("forecast-container");
var searchButton = document.getElementById("search-button");
var APIKey = "5cc4264c8766b40941f334fc52eb29b6";

searchButton.addEventListener("click", function () {
  var citySearch = document.getElementById("search-input");
  var requestURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch.value +
    "&appid=" +
    APIKey +
    "&units=imperial";

  function getAPI() {
    // The API call.
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // To give HTML data.
        cityName.innerHTML = data.name;
        sky.innerHTML = data.weather[0].description;
        currentTemp.innerHTML = "Temperature : " + data.main.temp + "\u00B0F";
        currentWind.innerHTML = "Wind Speed : " + data.wind.speed + " MPH";
        currentHumidity.innerHTML = "Humidity : " + data.main.humidity + " %";
        function getUV() {
          console.log(data);
          var requestUV =
            "http://api.openweathermap.org/data/2.5/onecall?lat=" +
            data.coord.lat +
            "&lon=" +
            data.coord.lon +
            "&appid=" +
            APIKey;
          console.log(requestUV);
          fetch(requestUV)
            .then(function (response) {
              if (response.ok) {
                console.log(response);
                return response.json();
              } else {
                return Promise.reject(response);
              }
            })
            .then(function (data) {
              console.log(data);
              currentUV.innerHTML = "UV Index: " + data.current.uvi;
            });
        }
        getUV();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  getAPI();
});
