import React, {useState} from 'react';
import Form from './Form';
import Card from './Card';

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
    const [searched,
        setSearched] = useState(false);

    const getLocation = async(loc) => {
        try {
            setLoading(true);
            setLocation(loc);

            // WEATHER
            const responseWeather = await fetch(`${urlWeather}&q=${loc}`);
            const weatherData = await responseWeather.json();
            if (responseWeather.ok) {
                setWeather(weatherData);
                // FORECAST
                const responseForecast = await fetch(`${urlForecast}&q=${loc}`);
                if (responseForecast.ok) {
                    const forecastData = await responseForecast.json();
                    setForecast(forecastData);
                } else {
                    throw new Error("Response not OK");
                }
                setLoading(false);
                setShowInfo(true);
                setSearched(true);
            } else {
                throw new Error("Response not OK");
                
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setShowInfo(false);
            if (error.message === "Response not OK") {
                setSearched(true);
                setShowInfo(false);
            }
        }
    };

    return (
        <div>
            <Form newLocation={getLocation}/>
            <Card
                showData={showInfo}
                loadingData={loading}
                weatherData={weather}
                forecastData={forecast}
                cityName={location}
                searched={searched}/>
        </div>
    )
}

export default WeatherPanel
