import { Gain, Reverb, FeedbackDelay, Filter} from "tone"
import RandomLFO from "./randomLFO"
import { masterDefaultParametrs } from "../utils/defaultParametrs"

class MasterChain {
    constructor(){
        this.DCblock = new Filter(20, 'highpass').toDestination()
        this.reverb = new Reverb().connect(this.DCblock)
        this.gain = new Gain(10).connect(this.reverb).connect(this.DCblock)
        
        //LFOs
        this.lfos = {
            pwLFO: new RandomLFO(null, null, -0.5, 0.5),
            detuneLFO: new RandomLFO(null, null, -300, 300)
        }
    }

    setGain(newGain){
        this.gain.gain.value = newGain

    }

    setReverb(newWet, newSize){
        
        if (newSize >= 0.1) {
            this.reverb.decay = newSize
        }

            this.reverb.wet.value = newWet
    }

    setLFO(lfo, newSpeed, newGain) {
        if (newGain) this.lfos[lfo].setGain(newGain)
        if (newSpeed) this.lfos[lfo].setSpeed(newSpeed)

    }

    connectLFOtoSignal(lfo, signal) {
        this.lfos[lfo].connect(signal)

    }

    connectToMaster(module) {
        module.connect(this.gain)
    }
}



const masterChain = new MasterChain()

export default masterChain