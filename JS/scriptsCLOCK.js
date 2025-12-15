/*- Un reloj digital 24h + Fecha `new Date()` , `setInterval()`

- Constructor de fechas. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
- Métodos necesarios para componerlo todo https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date
- Qué hace y como funciona `setInterval()` https://developer.mozilla.org/es/docs/Web/API/setInterval 

*/ 

//creamos el reloj
function updateClock() {
  const now = new Date();

  const pad = n => n < 10 ? '0' + n : n;

  document.getElementById('time').textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  document.getElementById('date').textContent =
    `${pad(now.getDate())}-${pad(now.getMonth()+1)}-${pad(now.getFullYear())}`;

      
  frases();
}

//cargamos el reloj y lo modificamos cada 1s o 1000ms
updateClock();
setInterval(updateClock, 1000);

//añadimos las frases
function frases() {
  const hour = new Date().getHours();
  const motivation = document.getElementById('motivation');

  let text = '';

  if (hour >= 0 && hour < 7) {
    text = 'Estás enfermo si sigues tecleando';
  } else if (hour >= 7 && hour < 12) {
    text = 'Buenos días, desayuna fuerte y empieza';
  } else if (hour >= 12 && hour < 14) {
    text = '¿Rayo estará tomando el sol?';
  } else if (hour >= 14 && hour < 16) {
    text = 'Ve a comer, anda, matao';
  } else if (hour >= 16 && hour < 18) {
    text = 'Sigue hasta que diga que pares';
  } else if (hour >= 18 && hour < 22) {
    text = '¿Acaso he dicho que pares?';
  } else {
    text = 'Buenas noches, es hora de pensar en parar y descansar';
  }

  motivation.textContent = text;
}

/* --------------------------Fondo climatológico reutilizado--------------------------------- */
localStorage.setItem("weather_last", JSON.stringify({
  current: data.current,
  location: data.location,
  timestamp: Date.now()
}));

