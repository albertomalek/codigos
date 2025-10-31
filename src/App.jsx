import { useEffect, useState } from 'react';
import cajaCerrada from './assets/caja-cerrada.jpg'
import cajaAbierta from './assets/caja-abierta.png'
import './App.css';


const codigos1 = ['2647', '8713', '1564', '3591', '9264', '7988', '6958', '5296', '2478', '4865', '3599', '6301']
const codigos2 = ['6472', '3285', '1564', '1953', '4692', '8798', '5869', '9625', '1247', '2973', '8080', '7084']
const codigos3 = ['7264', '4613', '1564', '5193', '2946', '9878', '8670', '6952', '3569', '7637', '6556', '5021']
const codigos4 = ['4726', '5143', '1564', '3159', '6429', '8897', '7095', '2569', '6789', '9524', '2807', '9340']


function App() {

  const [correctos, setCorrectos] = useState([])
  const [incorrectos, setIncorrectos] = useState([])
  const [value, setValue] = useState('')
  const [mostarMensajeCorrecto, setMostarMensajeCorrecto] = useState(false)
  const [mostarMensajeIncorrecto, setMostarMensajeIncorrecto] = useState(false)
  const [equipo, setEquipo] = useState('')
  const [iniciado, setIniciado] = useState(false);
  const [codigos, setCodigos] = useState([]);
  
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

  const iniciar = (color) => {
    switch (color) {
      case 'Verde':
        setCodigos(codigos1)
        break;
      case 'Rojo':
        setCodigos(codigos2)
        break;
      case 'Amarillo':
        setCodigos(codigos3)
        break;
      case 'Azul':
        setCodigos(codigos4)
        break;
      default:
        break;
    }
    setEquipo(color)
    setIniciado(true)
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


  return iniciado ? (
    <div className="flex min-h-900 items-center">
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
        <h3 className={`font-size-36
          ${equipo === 'Verde' && 'color-green'}
          ${equipo === 'Rojo' && 'color-red'}
          ${equipo === 'Amarillo' && 'color-yellow'}
          ${equipo === 'Azul' && 'color-blue'}
          `}>Equipo {equipo}</h3>
        <div className='flex flex-col gap-72 h-1-2'>
          <div className='flex flex-col gap-24 items-center margin-auto'>
            <label htmlFor="code" className='color-white font-size-24'>Escribe el código que encontraste</label>
            <input type="text" name='code' value={value} className='input-code' placeholder='####' autoComplete='off'
             onChange={(e) => handleInputChange(e.target.value)}
            />
            <button className='btn btn-outline-primary' disabled={value === ''} onClick={revisar}>Revisar Código</button>
          </div>
        </div>
        {mostarMensajeCorrecto && <div className='flex flex-col gap-8 font-size-18 color-white items-center mensaje-correcto'>
          <p>Perfecto! Abriste una caja!</p>
          <p>Seguí buscando más códigos!</p>
        </div>}
        {mostarMensajeIncorrecto && <div className='flex flex-col gap-8 font-size-18 color-white items-center mensaje-incorrecto'>
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
  ) : (
    <div className='flex flex-col gap-72 items-center justify-center min-h-900'>
      <h1 className='color-white font-size-72'>Shabbaton Colel Ereb 2025</h1>
      <div className='flex gap-24'>
        <button onClick={() => iniciar('Verde')} className='btn btn-outline-success p-24 font-size-24'>Equipo Verde</button>
        <button onClick={() => iniciar('Rojo')} className='btn btn-outline-danger p-24 font-size-24'>Equipo Rojo</button>
        <button onClick={() => iniciar('Amarillo')} className='btn btn-outline-warning p-24 font-size-24'>Equipo Amarillo</button>
        <button onClick={() => iniciar('Azul')} className='btn btn-outline-primary p-24 font-size-24'>Equipo Azul</button>
      </div>
    </div>
  );
}

export default App;
