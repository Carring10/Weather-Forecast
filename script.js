// variables to store today's weather data.
var cityName = document.getElementById("city-name");
var sky = document.getElementById("sky");
var currentWeatherData = document.getElementById("current-weather-data");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUV = document.getElementById("current-uv-span");
var searchButton = document.getElementById("search-button");
var APIKey = "5cc4264c8766b40941f334fc52eb29b6";

function getWeatherData(city) {
  var requestURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;
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
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
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
            // Convert icon from url to an img.
            var iconCode = data.current.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
            document.getElementById("weather-icon").src = iconURL;

            sky.innerHTML = data.current.weather[0].description;
            currentTemp.innerHTML = "Temperature : " + data.current.temp + "\u00B0F";
            currentWind.innerHTML = "Wind Speed : " + data.current.wind_speed + " MPH";
            currentHumidity.innerHTML = "Humidity : " + data.current.humidity + " %";
            currentUV.innerHTML = data.current.uvi;
            if (data.current.uvi >= 6) {
              currentUV.classList.add("severe");
            } else if (data.current.uvi <= 5 && data.current.uvi >= 3) {
              currentUV.classList.add("moderate");
            } else {
              currentUV.classList.add("favorable");
            }

            // Set the container that holds the 5 day forecast to an empty string so each iteration of the for loop does not create endless elements.
            var forecastContainer = document.getElementById("forecast-container");
            forecastContainer.innerHTML = "";

            // Displays weather for the next 5 days.
            for (let i = 1; i < 6; i++) {
              // Make HTML for future forecasts.
              var card = document.createElement("div");
              card.setAttribute("class", "card");
              var cardDate = document.createElement("h3");
              var cardTemp = document.createElement("p");
              var cardWind = document.createElement("p");
              var cardHumidity = document.createElement("p");
              // Convert icon code to an image.
              var cardImg = document.createElement("img");
              var iconCode = data.daily[i].weather[0].icon;
              var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
              // Convert unix time to date.
              var date = new Date(data.daily[i].dt * 1000);
              var formattedDate =
                date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
              // Give HTML data.
              cardImg.src = iconURL;
              cardDate.textContent = formattedDate;
              cardTemp.textContent =
                "Temperature : " + data.daily[i].temp.day + "\u00B0F";
              cardHumidity.textContent = "Humidity : " + data.daily[i].humidity + " %";
              cardWind.textContent = "Wind : " + data.daily[i].wind_speed + " MPH";
              // Display onto page.
              forecastContainer.appendChild(card);
              card.append(cardDate);
              card.append(cardImg);
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

getWeatherData("Charlotte");
searchButton.addEventListener("click", function () {
  var citySearch = document.getElementById("search-input");
  if (!citySearch.value) {
    return null;
  }
  getWeatherData(citySearch.value);
  // Store user's search history into local storage.
  var userCities = localStorage.getItem("City");
  // If the value for user cities is falsy (doesn't already exist)...
  if (!userCities) {
    // A new array is created...
    var cityArr = [];
    // Push the user's search value into the empty array...
    cityArr.push(citySearch.value);
    // Turn the array into a string to be saved in local storage...
    localStorage.setItem("City", JSON.stringify(cityArr));
  } else {
    // If the value is truthy, convert string into an object...
    var cityArr = JSON.parse(userCities);
    // Push the user's search into that array...
    cityArr.push(citySearch.value);
    // Convert array with duplicates to a Set using the spread operator (unpacks elements), the new Set removes duplicates, the output is an array.
    var uniqueCitiesArr = [...new Set(cityArr)];
    // Convert it back into a string to be stored in local storage along with their previous searches.
    localStorage.setItem("City", JSON.stringify(uniqueCitiesArr));
    console.log(uniqueCitiesArr);
  }

  var prevSearch = document.getElementById("prev-search-container");
  prevSearch.innerHTML = "";
  if (!uniqueCitiesArr) {
    console.log(uniqueCitiesArr);
    var btn = document.createElement("button");
    btn.innerHTML = citySearch.value;
  } else {
    for (var i = 0; i < uniqueCitiesArr.length; i++) {
      (function () {
        var cityBtn = document.createElement("button");
        cityBtn.innerHTML = uniqueCitiesArr[i];
        cityBtn.setAttribute("class", "cityBtn");
        prevSearch.appendChild(cityBtn);
        cityBtn.addEventListener("click", function () {
          getWeatherData(cityBtn.innerText);
        });
      })();
    }
  }
});
