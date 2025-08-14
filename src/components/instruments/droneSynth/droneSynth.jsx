import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import useDroneSynth from "./useDroneSynth";
import Knob from "../../UI/Knob";
import "../../../assets/droneSynth.css"

export default function DroneSynthComponent() {
  const { start, stop, setFirstOsc, setSecondOsc, setThirdOsc, setVibrato, setFilter, setReverb , firstOscState, secondOscState, thirdOscState, vibratoState, filterState, reverbState} = useDroneSynth();
  const handlerSliderFirstOscFreq = (e) => { setFirstOsc({interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name})}
  const handlerSliderSecondOscFreq = (e) => { setSecondOsc({interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name})}
  const handlerSliderThirdOscFreq = (e) => { setThirdOsc({interval: Number(e.target.value), freq: getNoteFromInterval(Number(e.target.value)).freq, noteName: getNoteFromInterval(Number(e.target.value)).name})}
  const handlerKnobFilterFreq = (e) => {setFilter({freq: e, Q: filterState.Q})}
  const handlerKnobFilterQ = (e) => {setFilter({Q: e, freq: filterState.freq})}
  const handlerKnobVibratoFreq = (e) => {setVibrato({freq: e, depth: vibratoState.depth})}
  const handlerKnobVibratoDepth = (e) => {setVibrato({freq: vibratoState.freq, depth: e})}
  const handlerKnobReverbDecay = (e) => {setReverb({decay: e, wet: reverbState.wet})}
  const handlerKnobReverbWet = (e) => {setReverb({decay: reverbState.decay, wet: e})}
  return (
    <>
      <div className="droneSynth">
      <button onClick={start}> start </button> 
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

      <div className="knobs">
      
      <div> <label> LP-FILTER </label>
      <div className="effectBlock"> 
      <label> freq </label>
      <Knob onChange={handlerKnobFilterFreq} max="2000" min="0" step = "2" initValue={filterState.freq}> </Knob> 
      <div>{filterState.freq} </div>
      <label> reso </label>
      <Knob onChange={handlerKnobFilterQ} max="50" min="0" step = "1" initValue={filterState.Q}> </Knob>
      <div>{filterState.Q} </div>
      </div>
      </div>

      <div> <label> VIBRATO </label> 
      <div className="effectBlock">
      <label> freq </label>
      <Knob onChange={handlerKnobVibratoFreq} max="2" min="0" step = "0.05" initValue={vibratoState.freq}> </Knob>
      <div>{vibratoState.freq} </div>
      <label> depth </label>
      <Knob onChange={handlerKnobVibratoDepth} max="1" min="0" step = "0.1" initValue={vibratoState.depth}> </Knob>
      <div>{vibratoState.depth} </div>
      </div>
      </div>

       <div> <label> REVERB </label>
       <div className="effectBlock">
       <label> decay </label>
      <Knob onChange={handlerKnobReverbDecay} max="10" min="1" step = "1" initValue={reverbState.decay}> </Knob>
      <div>{reverbState.decay} </div>
      <label> wet </label>
      <Knob onChange={handlerKnobReverbWet} max="1" min="0" step = "0.1" initValue={reverbState.wet}> </Knob>
       <div>{reverbState.wet} </div>
       </div>
      </div>
      </div>
      </div>
    </>
  );
}
