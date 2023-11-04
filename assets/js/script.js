document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const cityInput = document.querySelector('input[type="text"]');
  const searchBtn = document.getElementById("search-btn");
  const locationBtn = document.querySelector(".location-btn");
  const currentWeather = document.querySelector(".current-weather");
  const daysForecast = document.querySelector(".days-forecast");
  const apiKey = "3acc16ffae9e45df92a064e41646355f";

  // need to add inline styles, ie: forecastCard.style.backgroundColor = "lightblue";
  function displayForecast(forecastData) {
    daysForecast.innerHTML = "";
    forecastData.list.forEach((forecast, index) => {
      if ((index + 1) % 8 === 0) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.style.backgroundColor = "lightblue";

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
      }
    });
  }

  // function getForecast(lat, lon) {
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

  // gets city from search and inputs into map api
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

    addToSearchHistory(city);
  }

  // displays current city name and temperature
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

  // Function that takes city input and puts it into the API, fetches that data, and appends to cityNameElement
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

  // Event listener for search button to put input value into get coordinates function and run get current weather function
  searchBtn.addEventListener("click", () => {
    console.log(cityInput.value);
    getCoordinates(cityInput.value);
    getCurrentWeather();
  });

  function addToSearchHistory(city) {
    // Create a list item element
    const listItem = document.createElement("li");
    listItem.textContent = city;

    // Add an event listener to the list item to perform a new search when clicked
    listItem.addEventListener("click", function () {
      searchCity(city);
    });

    // Append the list item to the search history container
    const searchHistoryContainer = document.getElementById("searchHistory");
    searchHistoryContainer.appendChild(listItem);
  }
});
