import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import lookup from 'country-code-lookup';

const Card = ({showData, loadingData, weatherData, forecastData, cityName}) => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var date = day + '/' + month + '/' + year;
    const countryCode = weatherData.sys && weatherData.sys.country;
    const countryName = countryCode && lookup
        .byIso(countryCode)
        .country;
    const [cityImage,
        setCityImage] = useState('');
    const getCityImage = async(countryName) => {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${countryName} flag&client_id=eun4874AzxcpbQxHNQlrMxPWvriGs1VZVH_XcD4a3zc`);
        const data = await response.json();
        return data.results[0].urls.regular;
    };

    useEffect(() => {
        const fetchCityImage = async() => {
            const image = await getCityImage(countryName);
            setCityImage(image);
        };
        if (showData && countryName) {
            fetchCityImage();
        }
    }, [showData, countryName]);

    // ICONOS CLIMA
    var url = "";
    var iconUrl = "";

    if (loadingData) {
        return <Spinner/>;
    }

    if (showData) {
        url = "http://openweathermap.org/img/w/";
        iconUrl = url + weatherData.weather[0].icon + ".png"
    }

    return (
        <div className="mt-5">
            {showData === true
                ? (
                    <div className="container">
                        <div
                            className="card my-5 mx-auto bg-transparent text-light"
                            style={{
                            height: '60vh',
                            backgroundImage: `url(${cityImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(35%)'
                        }}>
                            <div className="row">
                                <div className="col-md-4">
                                    <h2 className='mt-4 card-text'>{cityName}</h2>
                                    <h5 className='card-text'>{date}</h5>
                                    <h3 className='card-text'>{(weatherData.main.temp - 273.15).toFixed(1)}°C</h3>
                                    <h6 className='card-desc'><img src={iconUrl} alt='icon'/>{weatherData
                                            .weather[0]
                                            .description
                                            .toUpperCase()}</h6>
                                    <h5 className='card-text'>Humedad: {weatherData.main.humidity}%</h5>
                                    <h5 className='card-text'>Térmica:&nbsp;
                                        <span
                                            style={{
                                            color: "red"
                                        }}>{(weatherData.main.feels_like - 273.15).toFixed(1)}°C</span>
                                    </h5>
                                    <h5 className='card-text'>Máxima: {(weatherData.main.temp_max - 273.15).toFixed(1)}°C</h5>
                                    <h5 className='card-text'>Mínima: {(weatherData.main.temp_min - 273.15).toFixed(1)}°C</h5>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body mt-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <h2 className="text-light">Sin Datos</h2>
                )}
        </div>
    );
};

export default Card;
