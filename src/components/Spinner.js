import React from 'react';
import Loading from '../assets/svg/Spinner-1s-200px.gif'

const Spinner = () => {
    return (
      <div>
        <img src={Loading} alt="loading spinner" className="img-fluid w-5"/>
      </div>
    )
}

export default Spinner