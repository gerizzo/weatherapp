import React, {useState, useEffect} from 'react'
import Spinner from './Spinner'


const Card = ({showData, loadingData, weatherData, forecastData, cityName}) => {
  // IMPLEMENTACIÓN DE QUE SE BUSQUE UNA IMAGEN DE LA CIUDAD BUSCADA EN LA API DE UNSPLASH
  const [cityImage, setCityImage] = useState('');
  const getCityImage = async (cityName) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${cityName}&client_id=eun4874AzxcpbQxHNQlrMxPWvriGs1VZVH_XcD4a3zc`
    );
    const data = await response.json();
    return data.results[0].urls.regular;
  };
  useEffect(() => {
    const fetchCityImage = async () => {
      const image = await getCityImage(cityName);
      setCityImage(image);
    };
    if (showData) {
      fetchCityImage();
    }
  }, [showData, cityName]);




  if (loadingData) {
    return <Spinner/>
  }

  return (
    <div className='mt-5 '>
      {showData === true ? (
        // SI SHOW DATA ES TRUE ENTONCES SE CODEA LA TARJETA CARD
        <div className='container'>
          <div className='card mb-3 mx-auto bg-dark text-light'>
            <div className='row g-0'>
              <div className='col-md-4'></div>
              <div className='col-md-8'>
                <div className='card-body text-start mt-2'>
                  <img src={cityImage} className='m-auto' alt='imagenFondo'></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-light">Sin Datos</h2>
      )}
    </div>
  )
}

export default Card
