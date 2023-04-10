import {useState} from 'react';

const Form = ({newLocation}) => {
    const [city,
        setCity] = useState("");

    const onSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al hacer clic en el botón 'Buscar'

        // SI EL FORMULARIO ESTÁ VACIO RETORNA, SINO ESTABLECE CON newLocation(city)
        if (city === "" || !city) 
            return;
        newLocation(city);
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className='input-group mb-3 mx-auto'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Ciudad'
                        onChange={(e) => {
                            const city = e.target.value;
                            const formattedCity = city.split(" ")
                                                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                      .join(" ");
                            setCity(formattedCity);
                          }}/>
                    <button className='btn btn-primary input-group-text' type='submit'>Buscar</button>
                </div>
            </form>
        </div>
    )
}

export default Form