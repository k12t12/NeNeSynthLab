import { getTransport } from "tone"
import { useEffect, useState, useRef } from "react"
import masterChain from "../services/masterChain"
import { masterDefaultParametrs as defaultParametrs}   from "../utils/defaultParametrs"
import { seqSynthDefaultParametrs } from "../utils/defaultParametrs"
import { droneSynthDefaultParametrs } from "../utils/defaultParametrs"
import { drumMachineDefaultParametrs } from "../utils/defaultParametrs"
import { noiseGeneratorDefaultParametrs } from "../utils/defaultParametrs"
import useInstrumentsStore from "../store/instrumentsStore"
import generateId from "../utils/generateId"

import styles from "../assets/menu.module.css"

export default function MenuComponent({addInstrumentCallback, init = defaultParametrs}) {
    const [isMenuHiden, setIsMenuHiden] = useState(false)
    const [BPM, setBPM] = useState(getTransport().bpm.value)
    const [reverbState, setReverbState] = useState({decay: init.reverbDecay, wet: init.reverbWet})
    const instruments = useInstrumentsStore((state) => state.instruments)
    const loadInstruments = useInstrumentsStore((state) => state.loadInstruments) 
                                                                                                            
    const loadEl = useRef()
    const progressCanvas = useRef(null)
    const master = useRef(null)

    const handlerLoadButton = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = function() {
      const loadedIns = JSON.parse(reader.result)
      loadedIns.map((ins, ind)=> { return ins.id = Number(String(generateId()) + ind) })
      loadInstruments(loadedIns)
  
  };
}

  const handlerSaveButton = () => {
    const projectData = JSON.stringify(instruments)
    const blob = new Blob([projectData], { type: 'application/json' });
    loadEl.current.href = URL.createObjectURL(blob)
    loadEl.current.download = 'project.NeNe'
    loadEl.current.click()
  }

    const handlerAddButton = (type) => {
        let componentName, parametrs

        switch(type) {
            case("drumMachine"):
                componentName = "DrumMachine"
                parametrs = drumMachineDefaultParametrs
                break;
            case("seqSynth"):
                componentName = "SeqSynth"
                parametrs = seqSynthDefaultParametrs
                break;
            case("noiseGenerator"):
                componentName = "NoiseGenerator"
                parametrs = noiseGeneratorDefaultParametrs
                break;
            case("droneSynth"):
                componentName = "DroneSynth"
                parametrs = droneSynthDefaultParametrs
                break;
        }
        addInstrumentCallback({
            comp: componentName,
            id: generateId(),
            x: 99,
            y: 99,
            ...parametrs
                    })
    }

    useEffect(()=>{
        master.current = masterChain

        const draw = () => {
        const len = getTransport().toTicks("1m")
        let pos = getTransport().ticks%len
        const ctx = progressCanvas.current.getContext("2d")
        ctx.clearRect(0,0,180, 50)
        ctx.fillRect(0, -12, 1, 50)
        ctx.fillRect(pos/5, -12, 5, 50)
        ctx.fillRect(len/5-1, -12, 1, 50)
        window.requestAnimationFrame(draw);
        }
      draw()

    },[])
    
    useEffect(()=>{
    loadEl.current = document.createElement('a')
  }, [])

    useEffect(()=>{
        
        master.current.setReverb(reverbState.wet, reverbState.decay)
    }, [reverbState])

    useEffect(()=>{
        
        getTransport().bpm.value = BPM

    },
    [BPM])

    const handlerShowHideMenu = () => {
        setIsMenuHiden(!isMenuHiden)
    }

    const handlerSliderReverbWet = (e) => {setReverbState({wet: e.target.value, decay: reverbState.decay})}
    const handlerSliderReverbDecay = (e) => {setReverbState({wet: reverbState.wet, decay: e.target.value})}

    return (
        <div className={`${styles.menu} ${isMenuHiden ? styles.hidenMenu:null}`}>
        
        
            
            <button  onClick={handlerShowHideMenu} className={styles.openCloseButton}> {isMenuHiden ? "open": "hide"} </button>

            <div className={styles.loadBlock}> 
            <label htmlFor="project_load"> load </label>
            <input className={styles.loadButton} id="project_load" type="file" onChange={handlerLoadButton} /> 
            </div>
            <button className={styles.menuButton} onClick={handlerSaveButton}> save </button>

            <div> ADD INSTRUMENT </div>
            <div className={styles.addBlock}>
                <button className={styles.menuButton} onClick={()=>{handlerAddButton("droneSynth")}}> drone synth </button>
                <button className={styles.menuButton} onClick={()=>{handlerAddButton("seqSynth")}}>  sequencer synth </button>
                <button className={styles.menuButton} onClick={()=>{handlerAddButton("noiseGenerator")}}>  noise generator </button>
                <button className={styles.menuButton} onClick={()=>{handlerAddButton("drumMachine")}}>  drum machine </button>
            </div>
            <div className={styles.BPMControl}>
            BMP
            <input className = {styles.slider} type="range" id="BPM"  min="10" max="300" onChange={(e)=>{setBPM(e.target.value)}} value={BPM} /> {BPM}
            </div>
            <canvas className = {styles.canvas} ref = {progressCanvas} id="tactProgress" width="180" height="50"></canvas>

        MASTER
        <div className={styles.masterBlock}>
            <div> reverb wet </div>
            
            <input className = {styles.slider} type="range" id="wet"  min="0" max="1" step="0.01" onChange={handlerSliderReverbWet} value={reverbState.wet} /> 
            <div> reverb room size </div>
            <input className = {styles.slider} type="range" id="decay"  min="0.1" max="1" step="0.1" onChange={handlerSliderReverbDecay} value={reverbState.decay} />
            </div>
        </div>
    )
}