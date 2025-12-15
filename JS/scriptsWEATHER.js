/*
- Una estación meteorológica
  - API del tiempo de `https://www.weatherapi.com/`
  - Necesitarás una API KEY. Podrás conseguirla entrando en la url de weatherapi y pulsando en signup. 
    Rellena los datos que pide y nada más entrar os aparecerá esa API KEY.
  - Puedes probar que funciona en esta página: `https://www.weatherapi.com/api-explorer.aspx` metiendo la APIKEY y 
    dándole al botón de `show response`
  - Aquí está la documentación completa `https://www.weatherapi.com/docs/`
  - Este es el `base URL` al que tendréis que acceder `http://api.weatherapi.com/v1` añadiremos detrás lo que necesitemos. 
  - Este es un ejemplo de endpoint con la APIKEY y la ciudad. Solo habría que cambiar los datos de `${apiKey}` por la nuestra 
    y `${ciudad}` por la elegida por nosotros `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`
*/

const WEATHER_API_KEY = "54cde11be354430097d154905251312";
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";
const STORAGE_CITY = "weather_city";

let city = localStorage.getItem(STORAGE_CITY) || "Madrid";

async function fetchWeather(endpoint) {
  const url = `${WEATHER_BASE_URL}/${endpoint}&key=${WEATHER_API_KEY}&q=${city}&aqi=no&alerts=no`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error");
  return res.json();
}

/* ----------------------------WIDGET----------------------------- */
function initWeatherWidget() {
  const cityEl = document.getElementById("weather-city");
  const tempEl = document.getElementById("weather-temp");
  const conditionEl = document.getElementById("weather-condition");
  const iconEl = document.getElementById("weather-icon");

  if (!cityEl || !tempEl || !conditionEl || !iconEl) return;

  fetchWeather("current.json?")
    .then(data => {
      cityEl.textContent = data.location.name;
      tempEl.textContent = `${Math.round(data.current.temp_c)}°C`;
      conditionEl.textContent = data.current.condition.text;
      iconEl.src = `https:${data.current.condition.icon}`;
      iconEl.alt = data.current.condition.text;
    })
    .catch(() => {
      cityEl.textContent = "No disponible";
      conditionEl.textContent = "—";
    });
}

/* -------------------------DETAIL PAGE--------------------------- */
function initWeatherPage() {
  const form = document.getElementById("city-form");
  const input = document.getElementById("city-input");
  const cityTitle = document.getElementById("current-city");
  const tempEl = document.getElementById("current-temp");
  const conditionEl = document.getElementById("current-condition");
  const feelsEl = document.getElementById("current-feelslike");
  const iconEl = document.getElementById("current-icon");
  const forecastContainer = document.getElementById("forecast-container");

  if (!form || !forecastContainer) return;

  function renderCurrent(data) {
    cityTitle.textContent = data.location.name;
    tempEl.textContent = `${Math.round(data.current.temp_c)}°C`;
    conditionEl.textContent = data.current.condition.text;
    feelsEl.textContent = `Sensación térmica: ${Math.round(data.current.feelslike_c)}°C`;
    iconEl.src = `https:${data.current.condition.icon}`;
  }

  function renderForecast(days) {
    forecastContainer.innerHTML = "";
    days.forEach(day => {
      const date = new Date(day.date);
      const name = date.toLocaleDateString("es-ES", { weekday: "short" });

      const el = document.createElement("div");
      el.className = "forecast-day";
      el.innerHTML = `
        <div>${name}</div>
        <img src="https:${day.day.condition.icon}" alt="">
        <div class="forecast-temp">
          <span>${Math.round(day.day.maxtemp_c)}°</span>
          <span>${Math.round(day.day.mintemp_c)}°</span>
        </div>
      `;
      forecastContainer.appendChild(el);
    });
  }

  function loadPageWeather() {
    fetchWeather("forecast.json?days=5")
      .then(data => {
        renderCurrent(data);
        renderForecast(data.forecast.forecastday.slice(1));
            // usamos los datos del tiempo para elegir el fondo de pantalla de algunas de las páginas
            localStorage.setItem("weather_last", JSON.stringify({
              current: data.current,
              location: data.location,
              timestamp: Date.now()
            }));
      })
      .catch(console.error);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    city = input.value.trim();
    if (!city) return;

    localStorage.setItem(STORAGE_CITY, city);
    loadPageWeather();
    input.value = "";
  });

  loadPageWeather();
}

/* --------------------------INCIO--------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initWeatherWidget();
  initWeatherPage();
});

/* --------------------------Fondo climatológico reutilizado--------------------------------- */
localStorage.setItem("weather_last", JSON.stringify({
  current: data.current,
  location: data.location,
  timestamp: Date.now()
}));

