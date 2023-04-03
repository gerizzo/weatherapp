import React, {useState} from 'react';
import Form from './Form';


const WeatherPanel = () => {
    const APIkey = '1806a53293661e823fc357c9423269a2';
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${APIkey}&lang=es`;
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${APIkey}&lang=es`;

    // USE STATE PARA TIEMPO ACTUAL, PRONÓSTICO Y PARA EL SPINNER MIENTRAS SE
    // OBTIENE UNA RESPUESTA A LA API
    const [weather,
        setWeather] = useState([]);
    const [forecast,
        setForecast] = useState([]);
    const [loading,
        setLoading] = useState(false);
    const [showInfo,
        setShowInfo] = useState(false);
    const [location,
        setLocation] = useState("");
    const getLocation = async(loc) => {
        setLoading(true);
        setLocation(loc);

        // WEATHER
        urlWeather = urlWeather + "&q=" + loc;
        await fetch(urlWeather)
            .then(response => response.json())
            .then(weatherData => {
                console.log(weatherData);
                setWeather(weatherData);
            })
            .catch(error => {
                console.error(error)
                setLoading(false);
                setShowInfo(false);
            });

        // FORESCAST
        urlForecast = urlForecast + "&q=" + loc;
        await fetch(urlForecast)
            .then(response => response.json())
            .then(forecastData => {
                console.log(forecastData);
                setForecast(forecastData);
                setLoading(false);
                setShowInfo(true);
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
                setShowInfo(false)
            });
    }

    return (
        <div>
            <Form newLocation={getLocation}/>
        </div>
    )
}

export default WeatherPanel