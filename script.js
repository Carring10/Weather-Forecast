var cityContainer = document.getElementById("city-container");
var currentWeatherData = document.getElementById("current-weather-data");
var forecast = document.getElementById("forecast-container");
var searchButton = document.getElementById("search-button");
var APIKey = "5cc4264c8766b40941f334fc52eb29b6";
// variable to hold user input.
var city;
// variable to store weather data.
// var requestURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIKey;
var requestURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat=41.878113&lon=-87.629799&appid=8a4f71946c01452c9735df61812f9851&units=imperial";

function getAPI() {
  // The API call.
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // To make in HTML.
      var cityName = document.createElement("h2");
      var currentTemp = document.createElement("li");
      var currentWind = document.createElement("li");
      var currentHumidity = document.createElement("li");
      var currentUV = document.createElement("li");
      // To give HTML data.
      cityName.textContent = data.timezone;
      currentTemp.textContent = data.current.temp + "\u00B0F";
      currentWind.textContent = data.current.wind_speed + " MPH";
      currentHumidity.textContent = data.current.humidity + " %";
      currentUV.textContent = data.current.uvi;
      // To display HTML onto page.
      cityContainer.append(cityName);
      currentWeatherData.append(currentTemp);
      currentWeatherData.append(currentWind);
      currentWeatherData.append(currentHumidity);
      currentWeatherData.append(currentUV);
    })
    .catch(function (err) {
      console.log(err);
    });
}
searchButton.addEventListener("click", getAPI);
