import { useState } from "react"
import { DndContext } from "@dnd-kit/core"
import DroneSynth from "./components/instruments/droneSynth/droneSynth"
import SeqSynth from "./components/instruments/seqSynth/seqSynth"
import NoiseGenerator from "./components/instruments/noiseSynth/noiseGenerator"

import "./assets/main.css"

function App() {
  const [instruments, setInstruments] = useState([])
  const [index, setIndex] = useState(0)
  const addInstrument = (instrumentComponent) => {
    setInstruments([...instruments, {id: index, x: 92, y:92, component: instrumentComponent}])
    setIndex(index + 1)
  }
 const handleDragEnd = (event) => {

  setInstruments((prev) => {
    console.log(prev)
    return prev.map(instrument=>{
      console.log(instrument.x + event.delta.x)
      return ((instrument.id == event.active.id) ) ? {
        ...instrument,
        x: instrument.x + event.delta.x,
        y: instrument.y + event.delta.y
      } : instrument
    }
    )
  })


 }
  return (
    <>
    <button onClick={()=>addInstrument(DroneSynth)}> add drone synth </button>
    <button onClick={()=>addInstrument(SeqSynth)}> add sequencer synth </button>
    <DndContext onDragEnd={handleDragEnd}>
    {instruments.map((ins)=>{
      const Instrument = ins.component
      return (
       <Instrument key={ins.id} id={ins.id} 
     onClose={()=>{
      setInstruments(instruments.filter(el => el !== ins))
     }
    }
    x = {ins.x}
    y={ins.y}
      endPosStyle={{
      left: ins.x,
      top: ins.y,
      }}></Instrument>)
      }
      )
      }

      <NoiseGenerator> </NoiseGenerator>
    </DndContext>
    </>
  )
}

export default App
