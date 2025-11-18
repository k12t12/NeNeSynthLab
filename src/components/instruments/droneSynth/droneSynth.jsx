import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import useDroneSynth from "./useDroneSynth";
import Knob from "../../UI/Knob";
import Bar from "../../UI/Bar";
import { useDraggable } from "@dnd-kit/core";
import styles from "../../../assets/droneSynth.module.css"

export default function DroneSynthComponent({id, endPosStyle, onClose}) {
  const {instrument, updateInstrument, start, stop, isPlaying} = useDroneSynth(id);

  const handlerSliderFirstOscFreq = (e) => { updateInstrument({firstOsc: {interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name}})}
  const handlerSliderSecondOscFreq = (e) => {  updateInstrument({secondOsc: {interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name}})}
  const handlerSliderThirdOscFreq = (e) => {  updateInstrument({thirdOsc: {interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name}})}
  const handlerKnobFilterFreq = (e) => {updateInstrument({filterFreq: e})}
  const handlerKnobFilterQ = (e) => {updateInstrument({filterQ: e})}
  const handlerKnobVibratoFreq = (e) => {updateInstrument({vibratoFreq: e})}
  const handlerKnobVibratoDepth = (e) => {updateInstrument({vibratoDepth: e})}
  const handlerKnobDelayFeedback = (e) => {updateInstrument({delayFeedback: e})}
  const handlerKnobDelayTime = (e) => {updateInstrument({delayTime: e})}

   const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });

   const transformStyle = (transform) ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

  return (
    <div style = {{...transformStyle, ...endPosStyle, position: "absolute"}}>
      <Bar isPlaying={isPlaying} volume = {instrument?.volume} onVolumeChange={(e)=>{updateInstrument({volume: e.target.value})}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes} > drone synth </div> </Bar>
      
      
      <div className={styles.droneSynth}>
      <div> 
      <label> freq1 </label> 
      <input type="range" id="firstOscFreq" value={instrument?.firstOsc.interval} min="-57" max="-9"  onChange={handlerSliderFirstOscFreq} />
      <span> {instrument?.firstOsc.noteName} </span>
      </div>
      <div>
      
      <label> freq2 </label> 
      <input type="range" id="secondOscFreq"  value={instrument?.secondOsc.interval} min="-57" max="-9" step="1"  onChange={handlerSliderSecondOscFreq} />
      <span> {instrument?.secondOsc.noteName} </span>
      </div>
      <div>

      <label> freq3 </label> 
      <input type="range" id="firstOscFreq"  value={instrument?.thirdOsc.interval} min="-57" max="-9" step="1"  onChange={handlerSliderThirdOscFreq} />
      <span> {instrument?.thirdOsc.noteName} </span>
      </div>

      <div className={styles.knobs}>
      
      <div> <label> LP-FILTER </label>
      <div className={styles.effectBlock}> 
      <label> freq </label>
      <Knob onChange={handlerKnobFilterFreq} max="2000" min="0" step = "2" initValue={instrument?.filterFreq}> </Knob> 
      <div>{instrument?.filterFreq} HZ </div>
      <label> reso </label>
      <Knob onChange={handlerKnobFilterQ} max="50" min="0" step = "1" initValue={instrument?.filterQ}> </Knob>
      <div>{instrument?.filterQ} </div>
      </div>
      </div>

      <div> <label> VIBRATO </label> 
      <div className={styles.effectBlock}>
      <label> freq </label>
      <Knob onChange={handlerKnobVibratoFreq} max="2" min="0" step = "0.05" initValue={instrument?.vibratoFreq}> </Knob>
      <div>{instrument?.vibratoFreq} HZ </div>
      <label> depth </label>
      <Knob onChange={handlerKnobVibratoDepth} max="1" min="0" step = "0.1" initValue={instrument?.vibratoDepth}> </Knob>
      <div>{instrument?.vibratoDepth} </div>
      </div>
      </div>

       <div> <label> DELAY </label>
       <div className={styles.effectBlock}>
       <label> time </label>
      <Knob onChange={handlerKnobDelayTime} max="1" min="0.01" step = "0.01" initValue={instrument?.delayTime}> </Knob>
      <div>{instrument?.delayTime} </div>
      <label> fe-back </label>
      <Knob onChange={handlerKnobDelayFeedback} max="1" min="0" step = "0.1" initValue={instrument?.delayFeedback * 100 + "%"}> </Knob>
       <div>{instrument?.delayFeedback*100}%</div>
       </div>
      </div>
      </div>
      </div>
    </div>
  );
}
