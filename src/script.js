function display_c() {
                var refresh = 1000; // Refresh rate in milli seconds
                mytime = setTimeout('display_ct()', refresh)
            }
            function display_ct() {
                var x = new Date()
                var x1 = x.toUTCString();// changing the display to UTC string
                document.getElementById('ct').innerHTML = x1;
                tt = display_c();
            }
let now = new Date();

function displayWeather(response) {
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#terms"
  ).innerHTML = `${response.data.weather[0].description}`;

function displayCity(city) {
  let apiKey = "2973349911f20f7a047092ceb58b6dc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name-input").value;
  displayCity(city);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2973349911f20f7a047092ceb58b6dc5";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${url}`).then(displayWeather);

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
       <h3>
         ${formatHours(forecast.dt * 1000)}
       </h3>
<img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
<div class="weather-forecast-temperature">
  <strong> ${Math.round(forecast.main.temp_max)}°C</strong> ${Math.round(
      forecast.main.temp_min
    )}°C
</div>
      </div>`;
  }
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

displayCity("Stamford");
