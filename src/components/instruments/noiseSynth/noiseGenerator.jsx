import useNoiseGenerator from "./useNoiseGenerator";
import styles from "../../../assets/noiseGenerator.module.css"
import Knob from "../../UI/Knob";
import Bar from "../../UI/Bar";
import { useDraggable } from "@dnd-kit/core";
const MAX_RATIO = 3
const MIN_RATIO = 0


export default function noiseGeneratorComponent({id, endPosStyle, onClose}) {
    const  {
    instrument,
    updateInstrument,
    yRatioPrev,
    setYratioPrev,
    xRatioPrev,
    setXratioPrev,
    start,
    stop,
    isPlaying
  } = useNoiseGenerator(id)

    const handlerKnobFilterFreq = (e) => {updateInstrument({filterFreq: e})}
    const handlerKnobFilterQ = (e) => {updateInstrument({filterQ: e})}

    const handlerKnobDelayFeedback = (e) => {updateInstrument({delayFeedback: e})}
    const handlerKnobDelayTime = (e) => {updateInstrument({delayTime: e})}

    const handlerKnoblfoFreq = (e) => {updateInstrument({lfoFreq: e})}
    const handlerKnoblfoAmp = (e) => {updateInstrument({lfoAmp: e})}

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
        updateInstrument({xRatio: xRatioPrev})
        updateInstrument({yRatio: yRatioPrev})
    }

    
    const {attributes, listeners, setNodeRef, transform} = useDraggable({ 
        id: id,
      }); 
    
       const transformStyle = (transform) ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : {};

    return (
        <div style = {{...transformStyle, ...endPosStyle, position: "absolute"}}>
              <Bar isPlaying={isPlaying} volume={instrument?.volume} onVolumeChange={(e)=>{updateInstrument({volume: e.target.value})}} onStop={stop} onStart={start} onClose={onClose}> <div ref={setNodeRef} {...listeners} {...attributes}>  noise generator </div> </Bar>

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
              <div> freq<Knob initValue = {instrument?.filterFreq} step="1" max="8000" min="0" onChange={handlerKnobFilterFreq}> </Knob> {instrument?.filterFreq + "Hz"}</div>
              <div> Q <Knob initValue = {instrument?.filterQ} step="1" max="20" min="0" onChange={handlerKnobFilterQ}> </Knob> {instrument?.filterQ} </div> 
              </div>
              </div>

        <div>

            <div>
        <label> FILTER LFO </label>
              <div className={styles.effectBlock}>
              <div> freq <Knob initValue = {instrument?.lfoFreq} step="0.01" max="2" min="0" onChange={handlerKnoblfoFreq}> </Knob> {instrument?.lfoFreq + "Hz"} </div>
              <div> amp <Knob initValue = {instrument?.lfoAmp} step="10" max="8000" min="0" onChange={handlerKnoblfoAmp}> </Knob> {instrument?.lfoAmp} </div>
              </div>
              </div>
              </div>
        <label> DELAY </label>
              <div className={styles.effectBlock}>
              <div> time <Knob initValue = {instrument?.delayTime} step="0.01" max="1" min="0.01" onChange={handlerKnobDelayTime}> </Knob> {instrument?.delayTime} </div>
              <div> feedback <Knob initValue = {instrument?.delayFeedback} step="0.1" max="1" min="0" onChange={handlerKnobDelayFeedback}> </Knob> {instrument?.delayFeedback * 100 + "%"} </div> 
              </div>
              </div>
        


        </div>
        </div>

        
    )
}