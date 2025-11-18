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
    instrument,
    updateInstrument,
    currentStep,
    setCurrentStep,
    isPlaying
  } = useDrumMachine(id)

    const handlerButtonClear = () => {
      const newSequence = [null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null]
        updateInstrument({closeHatSeq: {...instrument?.closeHatSeq,
           sequences: instrument?.closeHatSeq.sequences.map((x,ind)=>(ind == instrument?.closeHatSeq.currentSequenceIndex ? newSequence : x))}});

     updateInstrument({openHatSeq: {...instrument?.openHatSeq,
       sequences: instrument?.openHatSeq.sequences.map((x,ind)=>(ind == instrument?.openHatSeq.currentSequenceIndex ? newSequence : x))}});
      updateInstrument({kickSeq: {...instrument?.kickSeq,
         sequences: instrument?.kickSeq.sequences.map((x,ind)=>(ind == instrument?.kickSeq.currentSequenceIndex ? newSequence : x))}});
       updateInstrument({snareSeq: {...instrument?.snareSeq,
         sequences:instrument?.snareSeq.sequences.map((x,ind)=>(ind == instrument?.snareSeq.currentSequenceIndex ? newSequence : x))}});
    }

    const handlerCheckKickSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        const currentSequence = instrument?.kickSeq.sequences[instrument?.kickSeq.currentSequenceIndex]
      const newSequence = currentSequence.map((x,index)=> index==curIndex ? newValue: x)
    
     updateInstrument({kickSeq: {...instrument?.kickSeq,
       sequences: instrument?.kickSeq.sequences.map((x,ind)=>(ind == instrument?.kickSeq.currentSequenceIndex ? newSequence : x))
      }})
     }

     const handlerCheckSnareSequence = (isOn, curIndex) => {
         const newValue = isOn ? "start" : null
        const currentSequence = instrument?.snareSeq.sequences[instrument?.snareSeq.currentSequenceIndex]
      const newSequence = currentSequence.map((x,index)=> index==curIndex ? newValue: x)
    
     updateInstrument({snareSeq: {...instrument?.snareSeq,
       sequences: instrument?.snareSeq.sequences.map((x,ind)=>(ind == instrument?.snareSeq.currentSequenceIndex ? newSequence : x))
      }})
     }

      const handlerCheckOpenHatSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        const currentSequence = instrument?.openHatSeq.sequences[instrument?.openHatSeq.currentSequenceIndex]
      const newSequence = currentSequence.map((x,index)=> index==curIndex ? newValue: x)
    
     updateInstrument({openHatSeq: {...instrument?.openHatSeq,
       sequences: instrument?.openHatSeq.sequences.map((x,ind)=>(ind == instrument?.openHatSeq.currentSequenceIndex ? newSequence : x))
      }})
      }

      const handlerCheckCloseHatSequence = (isOn, curIndex) => {
        const newValue = isOn ? "start" : null
        const currentSequence = instrument?.closeHatSeq.sequences[instrument?.closeHatSeq.currentSequenceIndex]
      const newSequence = currentSequence.map((x,index)=> index==curIndex ? newValue: x)
    
     updateInstrument({closeHatSeq: {...instrument?.closeHatSeq,
       sequences: instrument?.closeHatSeq.sequences.map((x,ind)=>(ind == instrument?.closeHatSeq.currentSequenceIndex ? newSequence : x))
      }})
      }

      const handlerKnobKickVolume = (e) => {
        
        updateInstrument({kick: { ...instrument?.kick, volume: e}})
      
      }

      const handlerKnobKickTone = (e) => {
        updateInstrument({kick: { ...instrument?.kick, tone: e}})
      }

      const handlerKnobSnareTone = (e) => {
        updateInstrument({snare: { ...instrument?.snare, tone: e}})
      }
      const handlerKnobSnareVolume = (e) => {
        updateInstrument({snare: { ...instrument?.snare, volume: e}})
      }

      const handlerKnobOpenHatTone = (e) => {
        updateInstrument({openHat: { ...instrument?.openHat, tone: e,}})
      }
      const handlerKnobOpenHatVolume = (e) => {
        updateInstrument({openHat: { ...instrument?.openHat, volume: e}})
      }

      const handlerKnobCloseHatTone = (e) => {
      updateInstrument({closeHat: { ...instrument?.closeHat, tone: e}})
      }

      const handlerKnobCloseHatVolume = (e) => {
       updateInstrument({closeHat: { ...instrument?.closeHat, volume: e}})
      }

      const {attributes, listeners, setNodeRef, transform} = useDraggable({
          id: id,
        });
      
         const transformStyle = (transform) ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        } : {};

    return (
      <div style = {{...transformStyle, ...endPosStyle, position: "absolute"}}>
        <Bar isPlaying = {isPlaying} volume = {instrument?.volume} onVolumeChange={(e)=>{updateInstrument({volume: e.target.value})}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}> drum machine </div> </Bar>
        <div className={styles.drumMachine}>
               
            <div className={styles.knobs}>

              <div>
              <label> KICK </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobKickVolume} max="1" min="0" step = "0.1" initValue={instrument?.kick.volume}> </Knob>  {instrument?.kick.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobKickTone} max="20" min="-20" step = "1" initValue={instrument?.kick.tone}> </Knob> {instrument?.kick.tone}
              </div>
              </div>
              </div>
              <div>
              <label> SNARE </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobSnareVolume} max="1" min="0" step = "0.1" initValue={instrument?.snare.volume}> </Knob>  {instrument?.snare.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobSnareTone} max="20" min="-20" step = "1" initValue={instrument?.snare.tone}> </Knob> {instrument?.snare.tone}
              </div>
              </div>
              </div>
              <div>
              <label> CLOSE HAT </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobCloseHatVolume} max="1" min="0" step = "0.1" initValue={instrument?.closeHat.volume}> </Knob>  {instrument?.closeHat.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobCloseHatTone} max="20" min="-20" step = "1" initValue={instrument?.closeHat.tone}> </Knob> {instrument?.closeHat.tone}
              </div>
              </div>
              </div>
              <div>
              <label> OPEN HAT </label>
              <div className={styles.effectBlock}>

              <div>
                <label> volume </label>
            <Knob onChange={handlerKnobOpenHatVolume} max="1" min="0" step = "0.1" initValue={instrument?.openHat.volume}> </Knob>  {instrument?.openHat.volume * 100 + "%"} 
            </div>
              <div>
                <label> tone </label>
            <Knob onChange={handlerKnobOpenHatTone} max="20" min="-20" step = "1" initValue={instrument?.openHat.tone}> </Knob> {instrument?.openHat.tone}
              </div>
              </div>
              </div>


        </div>
            <div className={styles.patternEditor}>
            
            <div>
            <PatternLine currentStep = {currentStep} name = "open hat" sequence = {instrument?.openHatSeq.sequences[0]} handler = {handlerCheckOpenHatSequence}></PatternLine>
            <PatternLine currentStep = {currentStep} name = "close hat" sequence = {instrument?.closeHatSeq.sequences[0]} handler = {handlerCheckCloseHatSequence}></PatternLine>
            <PatternLine currentStep = {currentStep} name = "snare" sequence = {instrument?.snareSeq.sequences[0]} handler = {handlerCheckSnareSequence}></PatternLine>
            <PatternLine currentStep = {currentStep} name = "kick" sequence = {instrument?.kickSeq.sequences[0]} handler = {handlerCheckKickSequence}></PatternLine>
            </div>

            <div>
            <button onClick={handlerButtonClear}> clear </button>
            </div>
            
            </div>
        </div>
        </div>
    )
}