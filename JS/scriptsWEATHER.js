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
