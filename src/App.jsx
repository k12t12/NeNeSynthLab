import { useState } from "react"
import { DndContext } from "@dnd-kit/core"
import { useWindowSize } from "react-use";
import DroneSynth from "./components/instruments/droneSynth/droneSynth"


import "./assets/main.css"
function App() {
  const {width, height} = useWindowSize();
  const [instruments, setInstruments] = useState([])
  const [index, setIndex] = useState(0)
  const addInstrument = () => {
    setInstruments([...instruments, {id: index, x: 92, y:92}])
    setIndex(index + 2)
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
    <button onClick={addInstrument}> add </button>
    <DndContext onDragEnd={handleDragEnd}>
    {instruments.map((ins)=> <DroneSynth key={ins.id} id={ins.id} 
     onClose={()=>{
      setInstruments(instruments.filter(el => el !== ins))
     }
    }
    x = {ins.x}
    y={ins.y}
      endPosStyle={{
      position: "absolute",
      left: ins.x,
      top: ins.y,
      }}></DroneSynth>)}
    </DndContext>
    </>
  )
}

export default App
