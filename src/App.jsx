import { useState } from "react"
import DroneSynth from "./components/instruments/droneSynth/droneSynth"

import "./assets/main.css"
function App() {
  const [instuments, setInstruments] = useState([])
  const [index, setIndex] = useState(0)
  const addInstrument = () => {
    setInstruments([...instuments, index])
    setIndex(index + 1)
  }

  return (
    <>
    <button onClick={addInstrument}> add </button>
    {instuments.map(()=> <DroneSynth></DroneSynth>)}
    </>
  )
}

export default App
