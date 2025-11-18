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
 
const {instrument, updateInstrument, start, stop, currentStep, isPlaying} = useSeqSynth(id);

const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });

const handlerKnobDelayFeedback = (e) => {updateInstrument({delayFeedback: e})}
const handlerKnobDelayTime = (e) => {updateInstrument({delayTime: e})}

const handlerKnobRelease = (e) => {updateInstrument({release: e})}
const handlerKnobAttack = (e) => {updateInstrument({attack: e})}

const handlerKnobFilterFreq = (e) => {updateInstrument({filterFreq: e})}
const handlerKnobFilterQ = (e) => {updateInstrument({filterQ: e})}

 const handlerCurrentSequence = (newValue, curIndex) => {
    let noteNewValue = (newValue !== null) ? getNoteFromInterval(newValue).name : null
    const currentSequence = instrument?.seq.sequences[instrument?.seq.currentSequenceIndex]
    const newSequence = currentSequence.map((x,index)=> index==curIndex ? noteNewValue: x)
    
    updateInstrument({seq: {...instrument?.seq,
       sequences: instrument?.seq.sequences.map((x,ind)=>(ind == instrument?.seq.currentSequenceIndex ? newSequence : x))
      }})
 }
 

 const handlerButtonCurrenSequenceIndex = (newIndex)=> {
  updateInstrument({seq:{...instrument?.seq, currentSequenceIndex: newIndex}})
 }



 const handlerButtonInterval = () => {
  const intervals = ["1n", "2n", "4n", "8n", "16n", "32n"]
  updateInstrument({seq:{...instrument?.seq, interval: intervals[((intervals.indexOf(instrument?.seq.interval) + 1) % intervals.length)]}})

 }

 const transformStyle = (transform) ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

    return (
        <div style={{...transformStyle, ...endPosStyle, position: "absolute"}} >
            <Bar isPlaying={isPlaying} volume={instrument?.volume} onVolumeChange={(e)=>{updateInstrument({volume: e.target.value})}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}> sequencer synth </div></Bar>

<div className={styles.seqSynth}>
      <div className={styles.knobs}> 
        <div>
        <label> ENVELOPE </label>
      <div className={styles.effectBlock}> 

      <div> attack <Knob initValue = {instrument?.attack} step="0.01" max="3" min="0" onChange={handlerKnobAttack}> </Knob> {(Math.round(instrument?.attack * 1000)) + "ms" } </div>
      <div> release<Knob initValue = {instrument?.release} step="0.01" max="3" min="0" onChange={handlerKnobRelease}> </Knob> {(Math.round(instrument?.release * 1000)) + "ms" }  </div>
      </div>
      </div>

      <div>
        <label> FILTER </label>
      <div className={styles.effectBlock}>
      <div> freq<Knob initValue = {instrument?.filterFreq} step="1" max="2000" min="0" onChange={handlerKnobFilterFreq}> </Knob> {instrument?.filterFreq + "Hz"}</div>
      <div> Q <Knob initValue = {instrument?.filterQ} step="1" max="20" min="0" onChange={handlerKnobFilterQ}> </Knob> {instrument?.filterQ} </div> 
      </div>
      </div>
      <div>
        <label> DELAY </label>
      <div className={styles.effectBlock}>
      <div> time <Knob initValue = {instrument?.delayTime} step="0.01" max="1" min="0.01" onChange={handlerKnobDelayTime}> </Knob> {instrument?.delayTime} </div>
      <div> feedback <Knob initValue = {instrument?.delayFeedback} step="0.1" max="1" min="0" onChange={handlerKnobDelayFeedback}> </Knob> {instrument?.delayFeedback * 100 + "%"} </div> 
      </div>
      </div>
      </div>

      

    <div className={styles.control}>interval: <button onClick={handlerButtonInterval}> {instrument?.seq.interval}
       </button> 
       sequence: <button style={{fontSize: instrument?.seq.currentSequenceIndex==0 ? 15: 10}} onClick={()=>handlerButtonCurrenSequenceIndex(0)}> 1 </button>
       <button style={{fontSize: instrument?.seq.currentSequenceIndex==1 ? 15: 10}}onClick={()=>handlerButtonCurrenSequenceIndex(1)}> 2 </button>
       <button style={{fontSize: instrument?.seq.currentSequenceIndex==2 ? 15: 10}}onClick={()=>handlerButtonCurrenSequenceIndex(2)}> 3 </button>
       <button style={{fontSize: instrument?.seq.currentSequenceIndex==3 ? 15: 10}} onClick={()=>handlerButtonCurrenSequenceIndex(3)}> 4 </button>
       </div>
   <div className={styles.knobs}> {
    instrument?.seq.sequences[instrument?.seq.currentSequenceIndex].map((x, ind)=>(<div key={ind}>
      
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