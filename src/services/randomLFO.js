import { Player, Gain, Scale} from "tone";
import noiseSample from '../assets/sounds/noise.ogg'
import { masterDefaultParametrs } from "../utils/defaultParametrs"
export default class RandomLFO {
    constructor(speed, gain, min, max) {
        this.gain = new Gain(gain)
        this.scale = new Scale(min, max).connect(this.gain)
        this.noise = new Player({
            url: noiseSample,
            autostart:true,
            loop: true,
            playbackRate: speed

        }).connect(this.scale)
        
        


        
    }

    setSpeed(newSpeed) {
        this.noise.set({playbackRate: newSpeed})
        
    }

    setGain(newGain) {
        this.gain.gain.value = newGain
    }

    connect(signal) {
        this.gain.connect(signal)
    }


}
