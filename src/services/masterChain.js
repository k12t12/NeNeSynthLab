import { LFO, Compressor, Gain, JCReverb, FeedbackDelay, Signal} from "tone"

class MasterChain {
    constructor(){
        this.compressor = new Compressor(0).toDestination()
        this.reverb = new JCReverb().connect(this.compressor)
        this.predelay = new FeedbackDelay(0.8,0.01).connect(this.reverb)
        this.gain = new Gain(10).connect(this.predelay).connect(this.compressor)
      
    }

    setGain(newGain){
        this.gain.gain.value = newGain

    }

    setReverb(newWet, newSize){
        
        if (newSize >= 0.1){
            this.reverb.roomSize.value = newSize
        }

            this.predelay.wet.value = newWet
            this.reverb.wet.value = newWet
    }

    connectToMaster(module) {
        module.connect(this.gain)
    }
}



const masterChain = new MasterChain()

export default masterChain