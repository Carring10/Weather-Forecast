// variables to store weather data.
var cityName = document.getElementById("city-name");
var sky = document.getElementById("sky");
var currentWeatherData = document.getElementById("current-weather-data");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUV = document.getElementById("current-uv");
var futureForecastData = document.getElementById("forecast-container");
var searchButton = document.getElementById("search-button");
var APIKey = "5cc4264c8766b40941f334fc52eb29b6";

searchButton.addEventListener("click", function () {
  var citySearch = document.getElementById("search-input");
  var requestURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    citySearch.value +
    "&appid=" +
    APIKey;

  function getWeatherData() {
    // The geolocation API call that takes the city input as a parameter.
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (coordinateData) {
        // Displays the City's name in HTML.
        cityName.innerHTML = coordinateData[0].name;

        function forecastWeather() {
          // Convert the city name parameter into latitude and longitude for Onecall API.
          var forecastWeather =
            "http://api.openweathermap.org/data/2.5/onecall?lat=" +
            coordinateData[0].lat +
            "&lon=" +
            coordinateData[0].lon +
            "&appid=" +
            APIKey +
            "&units=imperial";
          console.log(forecastWeather);
          fetch(forecastWeather)
            .then(function (response) {
              if (response.ok) {
                console.log(response);
                return response.json();
              } else {
                return Promise.reject(response);
              }
            })
            // Displays data for today's weather onto HTML.
            .then(function (data) {
              console.log(data);
              sky.innerHTML = data.current.weather[0].description;
              currentTemp.innerHTML =
                "Temperature : " + data.current.temp + "\u00B0F";
              currentWind.innerHTML =
                "Wind Speed : " + data.current.wind_speed + " MPH";
              currentHumidity.innerHTML =
                "Humidity : " + data.current.humidity + " %";
              currentUV.innerHTML = "UV Index: " + data.current.uvi;
              // Displays weather for the next 5 days.
            });
        }
        forecastWeather();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  getWeatherData();
});
