import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import lookup from 'country-code-lookup';

const Card = ({ showData, loadingData, weatherData, forecastData, cityName }) => {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = day + '/' + month + '/' + year;
  const countryCode = weatherData.sys && weatherData.sys.country;
  const countryName = countryCode && lookup.byIso(countryCode).country;
  const [cityImage, setCityImage] = useState('');
  const getCityImage = async (countryName) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${countryName} flag&client_id=eun4874AzxcpbQxHNQlrMxPWvriGs1VZVH_XcD4a3zc`
    );
    const data = await response.json();
    return data.results[0].urls.regular;
  };

  useEffect(() => {
    const fetchCityImage = async () => {
      console.log(countryName);
      const image = await getCityImage(countryName);
      setCityImage(image);
    };
    if (showData && countryName) {
      fetchCityImage();
    }
  }, [showData, countryName]);

  if (loadingData) {
    return <Spinner />;
  }

  return (
    <div className="mt-5">
      {showData === true ? (
        <div className="container">
          <div className="card my-5 mx-auto bg-transparent text-light" style={{
            height: '60vh',
            backgroundImage: `url(${cityImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(25%)'
          }}>
            <div className="row">
              <div className="col-md-4">
                <h3 className='mt-4' style={{textShadow: "black 2px 2px"}}>{cityName}</h3>
                <p className='card-date'>{date}</p>
                <h1 className='card-temperature'>{(weatherData.main.temp - 273.15).toFixed(1)}°C</h1>
              </div>
              <div className="col-md-8">
                <div className="card-body text-start mt-2">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-light">Sin Datos</h2>
      )}
    </div>
  );
};

export default Card;
