import { createContext } from 'react'
import { useState } from 'react'

export const CalcContext = createContext()
const CalcProvider = ({ children }) => {
 const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
 })
  const providerVlue={
    calc, setCalc
  }
  return (
    <CalcContext.Provider value={providerVlue}>
      {children}
    </CalcContext.Provider>
  )
}

export default CalcProvider