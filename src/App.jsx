import { useState } from "react"
import { DndContext } from "@dnd-kit/core"
import Menu from "./components/Menu"
import useInstrumentsStore from "./store/instrumentsStore"

import "./assets/main.css"

function App() {
  const instruments = useInstrumentsStore((state) => state.instruments)
  const setInstrument = useInstrumentsStore((state) => state.setInstrument)
  const addInstrument = useInstrumentsStore((state) => state.addInstrument)
  const removeInstrument = useInstrumentsStore((state) => state.removeInstrument) 
  
  

 const handleDragEnd = (event) => {
  const currentInstrument = instruments.find(instr => instr.id === event.active.id);
  setInstrument(event.active.id, {
    x: currentInstrument.x + event.delta.x,
    y: currentInstrument.y + event.delta.y
  }
   )
 }
  return (
    <>
    <DndContext onDragEnd={handleDragEnd}>
      
    {instruments.map((ins)=>{
      const Instrument = ins.comp
      return (
       <Instrument key={ins.id} id={ins.id} 
     onClose={()=>{
      removeInstrument(ins.id)
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

    </DndContext>
    <Menu addInstrumentCallback={addInstrument}> </Menu>
    </>
  )
}

export default App
