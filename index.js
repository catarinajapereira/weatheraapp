//DATE____________________________________________________
let now = new Date();
let newdate = document.querySelector("#date");

newdate.innerHTML = formatTime(now);

function formatTime(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayIndex = now.getDay();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let daymonth = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[dayIndex];
  return `${day}   ${daymonth}/${month}     ${hours}:${minutes}`;
}

//SEARCHBAR____________________________________________________

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h1 = document.querySelector("#Citytemp");
  h1.innerHTML = `${searchInput.value}`;
  searchcity(searchInput.value);
}

let formcity = document.querySelector("#searchBar");
formcity.addEventListener("submit", search);

//TEMPfahrenheit____________________________________________________

function showfahrenheittemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiustemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showfahrenheittemp);

//TEMPcelcius____________________________________________________

function showcelsiustemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiustemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showcelsiustemp);
let celsiustemperature = null;
//TRUE TEMP_________________________________________

function displayWeatherCondition(response) {
  document.querySelector("#Citytemp").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiustemperature);
  celsiustemperature = response.data.main.temp;
  //document.querySelector("#Precipitation").innerHTML =response.data.main.precipitation;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchcity(city) {
  console.log();
  let apikey = "9413ff4c9edfa5384e909cc03e3a00a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//current location___________________________________
function searchLocation(position) {
  let apikey = "9413ff4c9edfa5384e909cc03e3a00a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

/*let form = document.querySelector("#searchbar");
form.addEventListener("submit", searchcity);*/
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"style="
    padding: 0px 56px 15px 112px;width: 896px;
">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div>
          <span class="weather-max"> ${Math.round(
            forecastDay.temp.max
          )}  º </span>
          <span class="weather-min">  ${Math.round(
            forecastDay.temp.min
          )} º </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9413ff4c9edfa5384e909cc03e3a00a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
