// variables to store today's weather data.
var cityName = document.getElementById("city-name");
var sky = document.getElementById("sky");
var currentWeatherData = document.getElementById("current-weather-data");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUV = document.getElementById("current-uv");
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
              var iconCode = data.current.weather[0].icon;
              var iconURL =
                "http://openweathermap.org/img/w/" + iconCode + ".png";
              document.getElementById("weather-icon").src = iconURL;

              sky.innerHTML = data.current.weather[0].description;
              currentTemp.innerHTML =
                "Temperature : " + data.current.temp + "\u00B0F";
              currentWind.innerHTML =
                "Wind Speed : " + data.current.wind_speed + " MPH";
              currentHumidity.innerHTML =
                "Humidity : " + data.current.humidity + " %";
              currentUV.innerHTML = "UV Index: " + data.current.uvi;

              // Set the container that holds the 5 day forecast to an empty string so each iteration of the for loop does not create endless elements.
              var forecastContainer =
                document.getElementById("forecast-container");
              forecastContainer.innerHTML = "";

              // Displays weather for the next 5 days.
              for (let i = 1; i < 6; i++) {
                // Make HTML for future forecasts.
                var card = document.createElement("div");
                var cardDate = document.createElement("h3");
                var cardTemp = document.createElement("p");
                var cardWind = document.createElement("p");
                var cardHumidity = document.createElement("p");
                // Convert icon code to an image.
                var cardImg = document.createElement("img");
                var iconCode = data.daily[i].weather[0].icon;
                var iconURL =
                  "http://openweathermap.org/img/w/" + iconCode + ".png";
                // Convert unix time to date.
                var date = new Date(data.daily[i].dt * 1000);
                var formattedDate =
                  date.getMonth() +
                  1 +
                  "/" +
                  date.getDate() +
                  "/" +
                  date.getFullYear();
                // Give HTML data.
                cardImg.src = iconURL;
                cardDate.textContent = formattedDate;
                cardTemp.textContent =
                  "Temperature : " + data.daily[i].temp.day + "\u00B0F";
                cardHumidity.textContent =
                  "Humidity : " + data.daily[i].humidity;
                cardWind.textContent =
                  "Wind : " + data.daily[i].wind_speed + " MPH";
                // Display onto page.
                forecastContainer.appendChild(card);
                card.append(cardImg);
                card.append(cardDate);
                card.append(cardTemp);
                card.append(cardHumidity);
                card.append(cardWind);
              }
            });
        }
        forecastWeather();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  getWeatherData();
  // Store user's search history into local storage.
  var userCities = localStorage.getItem("City");
  if (!userCities) {
    var cityArr = [];
    cityArr.push(citySearch.value);
    localStorage.setItem("City", JSON.stringify(cityArr));
  } else {
    var cityArr = JSON.parse(userCities);
    cityArr.push(citySearch.value);
    localStorage.setItem("City", JSON.stringify(cityArr));
  }
});
