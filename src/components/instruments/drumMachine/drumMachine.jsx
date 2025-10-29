import useDrumMachine from "./useDrumMachine";
import PatternLine from "../../UI/PatternLine";
import Knob from "../../UI/Knob";
import Bar from "../../UI/Bar";
import { useDraggable } from "@dnd-kit/core";

import styles from "../../../assets/drumMachine.module.css"

export default function DrumMachineComponent({id, endPosStyle, onClose}) {
    
    const {
        start,
        stop,
        kickSequence,
        setKickSequence,
        snareSequence,
        setSnareSequence,
        openHatSequence,
        setOpenHatSequence,
        setCloseHatSequence,
        closeHatSequence,
        currentStep,
        kickState,
        setKickState,
        snareState,
        setSnareState,
        closeHatState,
        setCloseHatState,
        openHatState,
        setOpenHatState,
        volume,
        setVolume

    } = useDrumMachine()
    const handlerButtonClear = () => {
        setCloseHatSequence([null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null]);
     setOpenHatSequence([null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null]),
      setSnareSequence([null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null]),
       setKickSequence([null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null])
    }

    const handlerCheckKickSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        setKickSequence(prev => prev.map((x,index)=> index==curIndex ? newValue: x))
     }

     const handlerCheckSnareSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        setSnareSequence(prev => prev.map((x,index)=> index==curIndex ? newValue: x))
     }

      const handlerCheckOpenHatSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        setOpenHatSequence(prev => prev.map((x,index)=> index==curIndex ? newValue: x))
      }

      const handlerCheckCloseHatSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        setCloseHatSequence(prev => prev.map((x,index)=> index==curIndex ? newValue: x))
      }

      const handlerKnobKickVolume = (e) => {
        setKickState({volume: e, tone: kickState.tone})
      }

      const handlerKnobKickTone = (e) => {
        setKickState({volume: kickState.volume, tone: e})
      }

      const handlerKnobSnareTone = (e) => {
        setSnareState({volume: snareState.volume, tone: e})
      }
      const handlerKnobSnareVolume = (e) => {
        setSnareState({volume: e, tone: snareState.tone})
      }

      const handlerKnobOpenHatTone = (e) => {
        setOpenHatState({volume: openHatState.volume, tone: e})
      }
      const handlerKnobOpenHatVolume = (e) => {
        setOpenHatState({volume: e, tone: openHatState.tone})
      }

      const handlerKnobCloseHatTone = (e) => {
        setCloseHatState({volume: closeHatState.volume, tone: e})
      }

      const handlerKnobCloseHatVolume = (e) => {
        setCloseHatState({volume: e, tone: closeHatState.tone})
      }

      const {attributes, listeners, setNodeRef, transform} = useDraggable({
          id: id,
        });
      
         const transformStyle = (transform) ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        } : {};

    return (
      <div style = {{...transformStyle, ...endPosStyle, position: "absolute"}}>
        <Bar volume = {volume} onVolumeChange={(e)=>{setVolume(e.target.value)}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}> drum machine </div> </Bar>
        <div className={styles.drumMachine}>
               
            <div className={styles.knobs}>

              <div>
              <label> KICK </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobKickVolume} max="1" min="0" step = "0.1" initValue={kickState.volume}> </Knob>  {kickState.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobKickTone} max="20" min="-20" step = "1" initValue={kickState.tone}> </Knob> {kickState.tone}
              </div>
              </div>
              </div>
              <div>
              <label> SNARE </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobSnareVolume} max="1" min="0" step = "0.1" initValue={snareState.volume}> </Knob>  {snareState.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobSnareTone} max="20" min="-20" step = "1" initValue={snareState.tone}> </Knob> {snareState.tone}
              </div>
              </div>
              </div>
              <div>
              <label> CLOSE HAT </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobCloseHatVolume} max="1" min="0" step = "0.1" initValue={closeHatState.volume}> </Knob>  {closeHatState.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobCloseHatTone} max="20" min="-20" step = "1" initValue={closeHatState.tone}> </Knob> {closeHatState.tone}
              </div>
              </div>
              </div>
              <div>
              <label> OPEN HAT </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobOpenHatVolume} max="1" min="0" step = "0.1" initValue={openHatState.volume}> </Knob>  {openHatState.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobOpenHatTone} max="20" min="-20" step = "1" initValue={openHatState.tone}> </Knob> {openHatState.tone}
              </div>
              </div>
              </div>


        </div>
            <div className={styles.patternEditor}>
            
            <div>
            <PatternLine currentStep = {currentStep} name = "open hat" sequence = {openHatSequence} handler = {handlerCheckOpenHatSequence}></PatternLine>
            <PatternLine currentStep = {currentStep} name = "close hat" sequence = {closeHatSequence} handler = {handlerCheckCloseHatSequence}></PatternLine>
            <PatternLine currentStep = {currentStep} name = "snare" sequence = {snareSequence} handler = {handlerCheckSnareSequence}></PatternLine>
            <PatternLine currentStep = {currentStep} name = "kick" sequence = {kickSequence} handler = {handlerCheckKickSequence}></PatternLine>
            </div>

            <div>
            <button onClick={handlerButtonClear}> clear </button>
            </div>
            
            </div>
        </div>
        </div>
    )
}