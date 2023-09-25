// Get DOM elements
const cityInput = document.querySelector('input[type="text"]');
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const currentWeather = document.querySelector(".current-weather");
const daysForecast = document.querySelector(".days-forecast");

// Add event listeners
searchBtn.addEventListener("click", searchWeather);
locationBtn.addEventListener("click", getCurrentLocation);

// Function to search weather by city name
function searchWeather() {
  const cityName = cityInput.value;
  fetchWeatherData(cityName);
}

// Function to get weather data from OpenWeatherMap API
function fetchWeatherData(cityName) {
  const apiKey = "4999fb722d8a3c7dac315d939656c458"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={4999fb722d8a3c7dac315d939656c458}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update the current weather section
      const temperature = data.main.temp;
      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;

      currentWeather.innerHTML = `
        <div class="details">
          <h2>${cityName} (${dayjs().format("YYYY-MM-DD")})</h2>
          <h4>Temperature: ${temperature} K</h4>
          <div class="icon">
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
            <h4>${weatherDescription}</h4>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to get weather data for current location
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherDataByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to get weather data from OpenWeatherMap API using coordinates
function fetchWeatherDataByCoordinates(latitude, longitude) {
  const apiKey = "4999fb722d8a3c7dac315d939656c458"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update the current weather section
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherIcon = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;

      currentWeather.innerHTML = `
        <div class="details">
          <h2>${cityName} (${dayjs().format("YYYY-MM-DD")})</h2>
          <h4>Temperature: ${temperature} K</h4>
          <div class="icon">
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
            <h4>${weatherDescription}</h4>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
