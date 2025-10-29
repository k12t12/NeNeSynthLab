import { gainToDb, PitchShift, Sampler } from "tone"
import kick from "../assets/sounds/bd01.mp3"
import getNoteFromInterval from "../utils/getNoteFromInterval"
import getIntervalFromNote from "../utils/getIntervalFromNote"

export default class KickSynth {

    constructor(init){
        this.tone = init.tone
                this.sampler = new Sampler({
                    urls: {
                        "C5": kick
                    }
                })
     
        this.setVolume(init.volume)
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