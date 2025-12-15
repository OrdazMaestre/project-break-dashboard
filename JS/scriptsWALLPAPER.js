/*

(Además de imagenes random de fondo.)

  - Estilos en línea que añadiremos con JS. 
  - Este puede ser un ejemplo: `document.body.style.backgroundImage = "url('mi-imagen.jpg')"`;
  - `setInterval` para darle ese tiempo de cambio
  - Las rutas que se escriben para las imagens que hagamos dentro de nuestros JS, cuando renderizan 
    es probable que de error cuando esté subida a `github pages`. Revisa tus rutas relativas `./` o `../`

*/


const UNSPLASH_KEY = "vbxLEnkJU54zVL1HQdmR-pUvoVmg2cK0cn0chE4qH5c";
const CHANGE_INTERVAL = 10 * 60 * 1000; // 10 minutos porque, si no, unsplash nos bloquea durante un rato, qué susto cuando
// desaparecieron los fondos de pantalla, resulta que tengo 50/h con el plan free


/* ---------- DETECTAR PÁGINA ---------- */
function getPageType() {
  if (document.body.classList.contains("weather-page")) {
    return "weather";
  }
  if (document.body.classList.contains("clock-page")) {
    return "clock";
  }
  if (document.body.classList.contains("links-page")) {
    return "links";
  }
  if (document.body.classList.contains("password-page")) {
    return "password";
  }
  return "default";
}


// ELECCION DE FONDO EMPEZANDO POR ¿DE DIA O DE NOCHE?
function getWeatherQuery() {
  const raw = localStorage.getItem("weather_last");
  if (!raw) return "night landscape";

  const data = JSON.parse(raw);

  if (!data.current || typeof data.current.is_day !== "number") {
    return "night landscape";
  }

  const temp = data.current.temp_c;
  const condition = data.current.condition.text.toLowerCase();
  const isNight = data.current.is_day === 0;

  // TEMOPERATURAS MOLESTAS
  if (temp >= 35) {
    return isNight ? "desert night" : "desert landscape";
  }

  if (temp <= 5) {
    return isNight ? "ice landscape night" : "frozen landscape";
  }

  // LLUVIA
  if (condition.includes("rain") || condition.includes("lluv")) {
    return isNight ? "rain night city" : "rain landscape";
  }

  // NUBES
  if (condition.includes("cloud") || condition.includes("nube")) {
    return isNight ? "cloudy night sky" : "cloudy landscape";
  }

  // DESPEJADO
  return isNight
    ? "clear night sky stars"
    : "sunny landscape";
}

/* ---------- STATIC PAGE QUERIES ---------- */
function getQueriesByPage(page) {
  switch (page) {
    case "password":
      return [
        "matrix code",
        "binary code",
        "encrypted code",
        "cyber security",
        "hacker screen"
      ];

    case "links":
      return [
        "universe",
        "galaxy",
        "nebula",
        "space stars",
        "cosmos"
      ];

    default:
      return ["abstract background"];
  }
}

/* ---------- RANDOM HELPER ---------- */
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------- UNSPLASH FETCH ---------- */
async function fetchRandomImage(query) {
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
    query
  )}&orientation=landscape&client_id=${UNSPLASH_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Unsplash API error");

  const data = await res.json();
  return data.urls.regular;
}

/* ---------- APPLY BACKGROUND ---------- */
async function setBackground() {
  const page = getPageType();
  let query;

  if (page === "weather" || page === "clock") {
    query = getWeatherQuery();
  } else {
    const options = getQueriesByPage(page);
    query = randomFromArray(options);
  }

  try {
    const imageUrl = await fetchRandomImage(query);
    document.body.style.backgroundImage = `url('${imageUrl}')`;
  } catch (error) {
    console.error("Background error:", error);
  }
}

/* ---------- INIT (WAIT FOR WEATHER DATA) ---------- */
function initBackgrounds() {
  const page = getPageType();

  // Weather & clock depend on real weather data
  if (page === "weather" || page === "clock") {
    const waitForWeather = setInterval(() => {
      if (localStorage.getItem("weather_last")) {
        setBackground();
        clearInterval(waitForWeather);
        setInterval(setBackground, CHANGE_INTERVAL);
      }
    }, 1000);
  } else {
    setBackground();
    setInterval(setBackground, CHANGE_INTERVAL);
  }
}

document.addEventListener("DOMContentLoaded", initBackgrounds);
