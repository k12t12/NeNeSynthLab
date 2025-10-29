 import DroneSynth from "./instruments/droneSynth/droneSynth"
import SeqSynth from "./instruments/seqSynth/seqSynth"
import NoiseGenerator from "./instruments/noiseSynth/noiseGenerator"
import DrumMachine from "./instruments/drumMachine/drumMachine"
import { getTransport } from "tone"
import { useEffect, useState, useRef } from "react"
import masterChain from "../services/masterChain"
import { masterDefaultParametrs as defaultParametrs}   from "../utils/defaultParametrs"
import { seqSynthDefaultParametrs } from "../utils/defaultParametrs"
import { droneSynthDefaultParametrs } from "../utils/defaultParametrs"
import { drumMachineDefaultParametrs } from "../utils/defaultParametrs"
import { noiseGeneratorDefaultParametrs } from "../utils/defaultParametrs"

import styles from "../assets/menu.module.css"

export default function MenuComponent({addInstrumentCallback, init = defaultParametrs}) {
    const [isMenuHiden, setIsMenuHiden] = useState(false)
    const [BPM, setBPM] = useState(getTransport().bpm.value)
    const [reverbState, setReverbState] = useState({decay: init.reverbDecay, wet: init.reverbWet})
    const [index, setIndex] = useState(0)

    const progressCanvas = useRef(null)
    const master = useRef(null)

    const handlerAddButton = (type) => {
        let component, parametrs

        switch(type) {
            case("drumMachine"):
                component = DrumMachine
                parametrs = drumMachineDefaultParametrs
                break;
            case("seqSynth"):
                component = SeqSynth
                parametrs = seqSynthDefaultParametrs
                break;
            case("noiseGenerator"):
                component = NoiseGenerator
                parametrs = noiseGeneratorDefaultParametrs
                break;
            case("droneSynth"):
                component = SeqSynth
                parametrs = droneSynthDefaultParametrs
                break;
        }
        setIndex(index+1);
        addInstrumentCallback({
            comp: component,
            id: index,
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
        console.log(reverbState.wet)
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
        
        
            
            <button onClick={handlerShowHideMenu} className={styles.openCloseButton}> {isMenuHiden ? "open": "hide"} </button>
            ADD INSTRUMENT
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
            <div> reverb decay </div>
            <input className = {styles.slider} type="range" id="decay"  min="0.1" max="4" step="0.1" onChange={handlerSliderReverbDecay} value={reverbState.decay} />
            </div>
        </div>
    )
}