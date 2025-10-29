import useNoiseGenerator from "./useNoiseGenerator";
import styles from "../../../assets/noiseGenerator.module.css"
import Knob from "../../UI/Knob";
import Bar from "../../UI/Bar";
import { useDraggable } from "@dnd-kit/core";
const MAX_RATIO = 3
const MIN_RATIO = 0


export default function noiseGeneratorComponent({id, endPosStyle, onClose}) {
    const {
        volume,
        setVolume,
        xRatioPrev,
        setXratioPrev,
        yRatioPrev,
        setYratioPrev,
        xRatio,
        yRatio,
        setXratio,
        setYratio,
        setDelayState,
    delayState,
    setFilterState,
    filterState,
    setlfoState,
    lfoState,
    start,
    stop
    } = useNoiseGenerator()

    const handlerKnobFilterFreq = (e) => { setFilterState({frequency: e, Q: filterState.Q})}
    const handlerKnobFilterQ = (e) => { setFilterState({frequency: filterState.frequency, Q: e})}

    const handlerKnobDelayFeedback = (e) => {setDelayState({feedback: e, time: delayState.time})}
    const handlerKnobDelayTime = (e) => {setDelayState({feedback: delayState.feedback, time: e})}

    const handlerKnoblfoFreq = (e) => { setlfoState({amp: lfoState.amp, freq: e})}
    const handlerKnoblfoAmp = (e) => { setlfoState({amp: e, freq: lfoState.freq})}

    const handlerNumberXRatio = (e)=> {
        let value = e.target.value
        if (value > MAX_RATIO) { value = MAX_RATIO}
        if (value < MIN_RATIO) { value = MIN_RATIO}

            setXratioPrev(value)
    }
    const handlerNumberYRatio = (e)=> {
        let value = e.target.value
        if (value > MAX_RATIO) { value = MAX_RATIO}
        if (value < MIN_RATIO) { value = MIN_RATIO}

            setYratioPrev(value)
    }
    const handlerButtonApplyRatioChange = () => {
        setXratio(xRatioPrev)
        setYratio(yRatioPrev)
    }

    
    const {attributes, listeners, setNodeRef, transform} = useDraggable({ 
        id: id,
      }); 
    
       const transformStyle = (transform) ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : {};

    return (
        <div style = {{...transformStyle, ...endPosStyle, position: "absolute"}}>
              <Bar volume={volume} onVolumeChange={(e)=>{setVolume(e.target.value)}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}>  noise generator </div> </Bar>

        <div className={styles.noiseGenerator}>
        <div className={styles.ratioControls}> 
        <div> 
        <label> x ratio</label>
        <input onChange={handlerNumberXRatio} step="0.01" value={xRatioPrev} type="number"/ >
        </div> 

        <div>
        <label> y ratio</label>
        <input onChange={handlerNumberYRatio} step="0.01" value={yRatioPrev} type="number"/ >
        </div> 
        
        </div>
        <button className={styles.applyButton} onClick={handlerButtonApplyRatioChange}> apply </button>
        <div className={styles.knobs}>
        <div>
                <label> FILTER </label>
              <div className={styles.effectBlock}>
              <div> freq<Knob initValue = {filterState.frequency} step="1" max="8000" min="0" onChange={handlerKnobFilterFreq}> </Knob> {filterState.frequency + "Hz"}</div>
              <div> Q <Knob initValue = {filterState.Q} step="1" max="20" min="0" onChange={handlerKnobFilterQ}> </Knob> {filterState.Q} </div> 
              </div>
              </div>

        <div>

            <div>
        <label> FILTER LFO </label>
              <div className={styles.effectBlock}>
              <div> freq <Knob initValue = {lfoState.freq} step="0.01" max="2" min="0" onChange={handlerKnoblfoFreq}> </Knob> {lfoState.freq + "Hz"} </div>
              <div> amp <Knob initValue = {lfoState.amp} step="10" max="8000" min="0" onChange={handlerKnoblfoAmp}> </Knob> {lfoState.amp} </div>
              </div>
              </div>
              </div>
        <label> DELAY </label>
              <div className={styles.effectBlock}>
              <div> time <Knob initValue = {delayState.time} step="0.01" max="1" min="0.01" onChange={handlerKnobDelayTime}> </Knob> {delayState.time} </div>
              <div> feedback <Knob initValue = {delayState.feedback} step="0.1" max="1" min="0" onChange={handlerKnobDelayFeedback}> </Knob> {delayState.feedback * 100 + "%"} </div> 
              </div>
              </div>
        


        </div>
        </div>

        
    )
}