import { Waveform, Compressor, Gain, JCReverb, FeedbackDelay, Filter} from "tone"
import RandomLFO from "./randomLFO"


class MasterChain {
    constructor(){
        this.DCblock = new Filter(20, 'highpass').toDestination()
        this.reverb = new JCReverb().connect(this.DCblock)
        this.predelay = new FeedbackDelay(0.8,0.01).connect(this.reverb)
        this.gain = new Gain(10).connect(this.predelay).connect(this.DCblock)
        
        //LFOs
        this.lfos = {
            pwLFO: new RandomLFO(0.001)
        }
    }

    setGain(newGain){
        this.gain.gain.value = newGain

    }

    setReverb(newWet, newSize){
        
        if (newSize >= 0.1) {
            this.reverb.roomSize.value = newSize
        }

            this.predelay.wet.value = newWet
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