import { useEffect, useState } from 'react';
import cajaCerrada from './assets/caja-cerrada.jpg'
import cajaAbierta from './assets/caja-abierta.png'
import './App.css';


const codigos = ['1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1000', '2000', '3000']


function App() {

  const [correctos, setCorrectos] = useState([])
  const [incorrectos, setIncorrectos] = useState([])
  const [value, setValue] = useState('')
  const [mostarMensajeCorrecto, setMostarMensajeCorrecto] = useState(false)
  const [mostarMensajeIncorrecto, setMostarMensajeIncorrecto] = useState(false)

  
  const handleInputChange = (value) => {
    setValue(value) 
  }
  
  const revisar = () => {
    if(codigos.includes(value)){
      setCorrectos([...correctos, value])
    }else{
      setIncorrectos([...incorrectos, value])
    }
    setValue('');
  }

  useEffect(() => {
    incorrectos.length > 0 && setMostarMensajeIncorrecto(true)
    setTimeout(() => {
      setMostarMensajeIncorrecto(false)
    }, 5000);
  }, [incorrectos])

  useEffect(() => {
    correctos.length > 0 && setMostarMensajeCorrecto(true)
    setTimeout(() => {
      setMostarMensajeCorrecto(false)
    }, 5000);
  }, [correctos])


  return (
    <div className='flex min-h-900 items-center'>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-wrap'>
          {codigos.map(cod => (
            <div className='flex flex-col items-center gap-12 p-24 font-size-36 color-white'>
              <img src={correctos.includes(cod) ? cajaAbierta : cajaCerrada} alt="" className='img'/>
              {correctos.includes(cod) ? <p className='color-aqua'>{cod}</p> : (
                <p className=''> # # # # </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col py-48 px-36 items-center w-full gap-80'>
        <div className='flex flex-col gap-72 h-1-2'>
          <div className='flex flex-col gap-24 items-center margin-auto'>
            <label htmlFor="code" className='color-white font-size-24'>Escribe el código que encontraste</label>
            <input type="text" name='code' value={value} className='input-code' placeholder='####' autoComplete='off'
             onChange={(e) => handleInputChange(e.target.value)}
            />
            <button className='btn btn-outline-primary' disabled={value === ''} onClick={revisar}>Revisar Código</button>
          </div>
        </div>
        {mostarMensajeCorrecto && <div className='flex flex-col gap-8 font-size-18 color-white items-center'>
          <p>Perfecto! Abriste una caja!</p>
          <p>Seguí buscando más códigos!</p>
        </div>}
        {mostarMensajeIncorrecto && <div className='flex flex-col gap-8 font-size-18 color-white items-center'>
          <p>Error! Código equivocado!</p>
          <p>Intenta nuevamente con otro número</p>
        </div>}
        <div className='flex flex-col gap-24 h-1-2 w-full items-center font-size-24'>
          <p className='color-white text-center'>Intentos fallidos</p>
          <div className='container-fallidos'>
            {incorrectos.length > 0 ? (
              incorrectos.map((inc, index) => (
                <div className='flex gap-8'>
                  <p className='color-red'>{inc}</p>
                  {index < incorrectos.length -1 && <p className='color-white'>|</p> } 
                </div>
              )) 
            ) : (
              <p className='color-white'>No tenés intentos fallidos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
