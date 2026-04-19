import { Player, Gain} from "tone";
import noiseSample from '../assets/sounds/noise.ogg'

export default class RandomLFO {
    constructor(speed, gain) {
        this.gain = new Gain(gain)

        this.noise = new Player({
            url: noiseSample,
            autostart:true,
            loop: true,
            playbackRate: speed

        }).connect(this.gain)
        
        


        
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
