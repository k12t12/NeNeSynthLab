import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import useDroneSynth from "./useDroneSynth";
import Knob from "../../UI/Knob";
import Bar from "../../UI/Bar";
import { useWindowSize } from "react-use";
import { useDraggable } from "@dnd-kit/core";

import styles from "../../../assets/droneSynth.module.css"
export default function DroneSynthComponent({id, endPosStyle, onClose, x, y}) {
  const { start, stop, setFirstOsc, setSecondOsc, setThirdOsc, setVibrato, setFilter, setDelay , firstOscState, secondOscState, thirdOscState, vibratoState, filterState, delayState} = useDroneSynth();

  const handlerSliderFirstOscFreq = (e) => { setFirstOsc({interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name})}
  const handlerSliderSecondOscFreq = (e) => { setSecondOsc({interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name})}
  const handlerSliderThirdOscFreq = (e) => { setThirdOsc({interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name})}
  const handlerKnobFilterFreq = (e) => {setFilter({freq: e, Q: filterState.Q})}
  const handlerKnobFilterQ = (e) => {setFilter({Q: e, freq: filterState.freq})}
  const handlerKnobVibratoFreq = (e) => {setVibrato({freq: e, depth: vibratoState.depth})}
  const handlerKnobVibratoDepth = (e) => {setVibrato({freq: vibratoState.freq, depth: e})}
  const handlerKnobDelayFeedback = (e) => {setDelay({feedback: e, time: delayState.time})}
  const handlerKnobDelayTime = (e) => {setDelay({feedback: delayState.feedback, time: e})}
  const {width, height} = useWindowSize(); 

   const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  console.log(transform && (transform.x+x))
   const transformStyle = (transform) ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

  return (
    <div style = {{...transformStyle, ...endPosStyle}}>
      <Bar onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}> drone synth </div> </Bar>
      
      
      <div className={styles.droneSynth}>
      <div> 
      <label> freq1 </label> 
      <input type="range" id="firstOscFreq" value={firstOscState.interval} min="-57" max="-9"  onChange={handlerSliderFirstOscFreq} />
      <span> {firstOscState.noteName} </span>
      </div>
      <div>
      
      <label> freq2 </label> 
      <input type="range" id="secondOscFreq"  value={secondOscState.interval} min="-57" max="-9" step="1"  onChange={handlerSliderSecondOscFreq} />
      <span> {secondOscState.noteName} </span>
      </div>
      <div>

      <label> freq3 </label> 
      <input type="range" id="firstOscFreq"  value={thirdOscState.interval} min="-57" max="-9" step="1"  onChange={handlerSliderThirdOscFreq} />
      <span> {thirdOscState.noteName} </span>
      </div>

      <div className={styles.knobs}>
      
      <div> <label> LP-FILTER </label>
      <div className={styles.effectBlock}> 
      <label> freq </label>
      <Knob onChange={handlerKnobFilterFreq} max="2000" min="0" step = "2" initValue={filterState.freq}> </Knob> 
      <div>{filterState.freq} HZ </div>
      <label> reso </label>
      <Knob onChange={handlerKnobFilterQ} max="50" min="0" step = "1" initValue={filterState.Q}> </Knob>
      <div>{filterState.Q} </div>
      </div>
      </div>

      <div> <label> VIBRATO </label> 
      <div className={styles.effectBlock}>
      <label> freq </label>
      <Knob onChange={handlerKnobVibratoFreq} max="2" min="0" step = "0.05" initValue={vibratoState.freq}> </Knob>
      <div>{vibratoState.freq} HZ </div>
      <label> depth </label>
      <Knob onChange={handlerKnobVibratoDepth} max="1" min="0" step = "0.1" initValue={vibratoState.depth}> </Knob>
      <div>{vibratoState.depth} </div>
      </div>
      </div>

       <div> <label> DELAY </label>
       <div className={styles.effectBlock}>
       <label> time </label>
      <Knob onChange={handlerKnobDelayTime} max="1" min="0" step = "0.1" initValue={delayState.time}> </Knob>
      <div>{delayState.time} </div>
      <label> wet </label>
      <Knob onChange={handlerKnobDelayFeedback} max="1" min="0" step = "0.1" initValue={delayState.feedback}> </Knob>
       <div>{delayState.feedback*100}%</div>
       </div>
      </div>
      </div>
      </div>
    </div>
  );
}
