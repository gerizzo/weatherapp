import React, {useState} from 'react'

const WeatherPanel = () => {
    const cityUrl = null;
    const countryCode = null;
    const APIkey = '1806a53293661e823fc357c9423269a2';
    const urlWeather =  `api.openweathermap.org/data/2.5/weather?q=${cityUrl},${countryCode}&appid=${APIkey}&lang=es`;
    const urlForecast = `api.openweathermap.org/data/2.5/forecast?q=${cityUrl},${countryCode}&appid=${APIkey}&lang=es`;

    // USE STATE PARA TIEMPO ACTUAL, PRONÓSTICO Y PARA EL SPINNER MIENTRAS SE OBTIENE UNA RESPUESTA A LA API
    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [location, setLocation] = useState("");

 
  return (
    <div>WeatherPanel</div>
  )
}

export default WeatherPanel