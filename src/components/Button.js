import React from 'react'
import { useContext } from 'react'
import { CalcContext } from '../context/CalcContext'
import useSound from 'use-sound'
import tik from './Tik.mp3'
const GetstyleName = btn => {
  
   const ClassName={
    '=' : 'equals',
    'x': 'opt',
    '-': 'opt',
    '+': 'opt',
    '/': 'opt'
   }
   return ClassName[btn]
   
}

const Button = ({value}) => {
  
   const { calc, setCalc } = useContext(CalcContext)

  // user click commma(.)
  const commaClick = () =>{
   setCalc({
    ...calc,
    num: !calc.num.tostring().includes('.') ? calc.num + value : calc.num
   })
  }

  //user click C
  const resetClick = () => {
    setCalc({
      sign: '' ,
      num: 0,
      res: 0
    })
  }
  //user click number
  const handleclickButton = () =>{
    const numberString = value.toString()
 
    let numberValue;
    if(numberString === '0' && calc.num === 0){
      numberValue = '0'
    }else{
      numberValue = Number(calc.num + numberString)
    }
    setCalc({
      ...calc,
      num: numberValue
    })
  }
  //user click opration
  const signClick = () =>{
     setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
     })
  }
  
  //user click equal

  const  equalClick = () =>{
    if(calc.res && calc.num){
      const math = (a, b, sign) =>{
        const result ={ 
          '+': (a, b) => a + b, 
          '-': (a, b) => a - b, 
          'x': (a, b) => a * b, 
          '/': (a, b) => a / b
        }
         return result[sign](a,b); 
      }
       setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0
       })

    }
   
  }

  // user click persent
  const persenClick = () =>{
    setCalc({
      num: (calc.num / 100),
      res: (calc.res / 100),
      sign: ''
    })
  }

  //user click invert
  const invertClick = () =>{
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: '' 
    })
  } 
  const handlebtnOnclick = () =>{
    const result = {
      '.': commaClick,
      'C': resetClick,
      '/': signClick,
      'x': signClick,
      '-': signClick,
      '+': signClick,
      '=': equalClick,
      '%': persenClick,
      '+-': invertClick
    }
    if(result[value]){
    return result[value]()
    }else{
    return handleclickButton()
    }
    
  }
  return (
    <button onClick={handlebtnOnclick} className={`${GetstyleName(value)} button`}>{value}</button>
  )
}

export default Button