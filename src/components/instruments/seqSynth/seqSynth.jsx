import Bar from "../../UI/Bar";
import useSeqSynth from "./useSeqSynth";
import styles from "../../../assets/seqSynth.module.css"
import { useDraggable } from "@dnd-kit/core";
import Knob from "../../UI/Knob";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import getIntervalFromNote from "../../../utils/getIntervalFromNote";
import { seqSynthDefaultParametrs } from "../../../utils/defaultParametrs";
import { ftom } from "tone";

export default function seqSynthComponent({id, endPosStyle, onClose}) {
  
const {
    volume,
    setVolume,
    start,
    stop,
    currentSequence,
    setCurrentSequence,
    currentSequenceIndex,
    setCurrentSequenceIndex,
    currentStep,
    interval,
    setInterval,
    setEnvelopeState,
    envelopeState,
    filterState,
    setFilterState,
    delayState,
    setDelayState,
  } = useSeqSynth();
const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });

const handlerKnobDelayFeedback = (e) => {setDelayState({feedback: e, time: delayState.time})}
const handlerKnobDelayTime = (e) => {setDelayState({feedback: delayState.feedback, time: e})}

const handlerKnobRelease = (e) => { setEnvelopeState({attack: envelopeState.attack, release: e})}
const handlerKnobAttack = (e) => { setEnvelopeState({attack: e, release: envelopeState.release})}

const handlerKnobFilterFreq = (e) => { setFilterState({frequency: e, Q: filterState.Q})}
const handlerKnobFilterQ = (e) => { setFilterState({frequency: filterState.frequency, Q: e})}

 const handlerCurrentSequence = (newValue, curIndex) => {
    let noteNewValue = (newValue !== null) ? getNoteFromInterval(newValue).name : null
    setCurrentSequence(prev => prev.map((x,index)=> index==curIndex ? noteNewValue: x))
 }
 

 const handlerButtonCurrenSequenceIndex = (newIndex)=> {
  setCurrentSequenceIndex(newIndex)
 }



 const handlerButtonInterval = () => {
  const intervals = ["1n", "2n", "4n", "8n", "16n", "32n"]
  setInterval(intervals[((intervals.indexOf(interval) + 1) % intervals.length)])

 }

 const transformStyle = (transform) ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

    return (
        <div style={{...transformStyle, ...endPosStyle, position: "absolute"}} >
            <Bar volume={volume} onVolumeChange={(e)=>{setVolume(e.target.value)}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}> sequencer synth </div></Bar>

<div className={styles.seqSynth}>
      <div className={styles.knobs}> 
        <div>
        <label> ENVELOPE </label>
      <div className={styles.effectBlock}> 

      <div> attack <Knob initValue = {envelopeState.attack} step="0.01" max="3" min="0" onChange={handlerKnobAttack}> </Knob> {(Math.round(envelopeState.attack * 1000)) + "ms" } </div>
      <div> release<Knob initValue = {envelopeState.release} step="0.01" max="3" min="0" onChange={handlerKnobRelease}> </Knob> {(Math.round(envelopeState.release * 1000)) + "ms" }  </div>
      </div>
      </div>

      <div>
        <label> FILTER </label>
      <div className={styles.effectBlock}>
      <div> freq<Knob initValue = {filterState.frequency} step="1" max="2000" min="0" onChange={handlerKnobFilterFreq}> </Knob> {filterState.frequency + "Hz"}</div>
      <div> Q <Knob initValue = {filterState.Q} step="1" max="20" min="0" onChange={handlerKnobFilterQ}> </Knob> {filterState.Q} </div> 
      </div>
      </div>
      <div>
        <label> DELAY </label>
      <div className={styles.effectBlock}>
      <div> time <Knob initValue = {delayState.time} step="0.01" max="1" min="0.01" onChange={handlerKnobDelayTime}> </Knob> {delayState.time} </div>
      <div> feedback <Knob initValue = {delayState.feedback} step="0.1" max="1" min="0" onChange={handlerKnobDelayFeedback}> </Knob> {delayState.feedback * 100 + "%"} </div> 
      </div>
      </div>
      </div>

      

    <div className={styles.control}>interval: <button onClick={handlerButtonInterval}> {interval}
       </button> 
       sequence: <button style={{fontSize: currentSequenceIndex==0 ? 15: 10}} onClick={()=>handlerButtonCurrenSequenceIndex(0)}> 1 </button>
       <button style={{fontSize: currentSequenceIndex==1 ? 15: 10}}onClick={()=>handlerButtonCurrenSequenceIndex(1)}> 2 </button>
       <button style={{fontSize: currentSequenceIndex==2 ? 15: 10}}onClick={()=>handlerButtonCurrenSequenceIndex(2)}> 3 </button>
       <button style={{fontSize: currentSequenceIndex==3 ? 15: 10}} onClick={()=>handlerButtonCurrenSequenceIndex(3)}> 4 </button>
       </div>
   <div className={styles.knobs}> {
    currentSequence.map((x, ind)=>(<div key={ind}>
      
    <button onClick={()=>{
      handlerCurrentSequence(null, ind)
    }}> {currentStep==(ind) ? "O": "_"} </button>
    <Knob  initValue = {getIntervalFromNote(x)} step="1" max="-21" min="26" onChange={(e)=>handlerCurrentSequence(e, ind)}> </Knob> {x}
      </div>
    )
    )
}

</div>
</div>
        </div>
    )
}