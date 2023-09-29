// Get DOM elements
const cityInput = document.querySelector('input[type="text"]');
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.querySelector(".location-btn");
const currentWeather = document.querySelector(".current-weather");
const daysForecast = document.querySelector(".days-forecast");
const apiKey = "3acc16ffae9e45df92a064e41646355f";

function displayForecast(forecastData) {
  // Display forecast
  daysForecast.innerHTML = "";
  forecastData.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const temperature = forecast.main.temp;
    const description = forecast.weather[0].description;

    // Create forecast card elements and append them to the daysForecast element
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const dateElement = document.createElement("p");
    dateElement.textContent = date;

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `${temperature}° F`;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;

    forecastCard.appendChild(dateElement);
    forecastCard.appendChild(temperatureElement);
    forecastCard.appendChild(descriptionElement);

    daysForecast.appendChild(forecastCard);
  });
}

function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayForecast(data);
    });
}

function getCoordinates(city) {
  const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(geocodingApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { lat, lon } = data[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      getForecast(lat, lon);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayCurrent(currentData) {
  currentWeather.innerHTML = "";
  currentWeather.insertAdjacentHTML(
    "beforeend",
    `
    <div>
      <h2>${currentData.name}</h2>
      <p>${currentData.main.temp}&deg; F</p>
    </div>
  `
  );
  getForecast(currentData.coord.lat, currentData.coord.lon);
}

const cityNameElement = document.createElement("h2");

function getCurrentWeather() {
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      cityNameElement.textContent = data.name;
      currentWeather.appendChild(cityNameElement);
      displayCurrent(data);
    });
}

searchBtn.addEventListener("click", () => {
  console.log(cityInput.value);
  getCoordinates(cityInput.value);
  getCurrentWeather();
});
