var APIKey = "5cc4264c8766b40941f334fc52eb29b6";
// variable to hold user input.
var city;
// variable to store weather data.
var requestURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

// The API call.
fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
