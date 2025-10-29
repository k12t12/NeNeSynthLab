import {Sampler, PitchShift, gainToDb} from "tone"
import openHihat from "../assets/sounds/hihat04.mp3"
import closeHihat from "../assets/sounds/hihat01.mp3"
import getNoteFromInterval from "../utils/getNoteFromInterval"
import getIntervalFromNote from "../utils/getIntervalFromNote"

export default class HihatSynth{
    constructor(init, type) {
        this.tone = init.tone
        
        this.sampler = new Sampler({
            urls: {
                "C5": type === "close" ? closeHihat : openHihat
            }
        })
    }

    setTone(newTone){
        this.tone = newTone
    }

    setVolume(newVolume) {
        this.sampler.set({volume: gainToDb(newVolume)})
    }
    
    play(time) {
            if (this.sampler.loaded) {
                this.sampler.triggerAttackRelease(getNoteFromInterval(this.tone + getIntervalFromNote("C6")).name, 3, time)
                }
            }
    }