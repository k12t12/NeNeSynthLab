import { Compressor, Gain, Reverb } from "tone"

class MasterChain {
    constructor(){
        
        this.compressor = new Compressor(-20).toDestination()
        this.reverb = new Reverb().connect(this.compressor)
        this.gain = new Gain(1).connect(this.reverb).connect(this.compressor)
    }

    setReverb(newWet, newDecay){

        this.reverb.decay = newDecay
        this.reverb.wet.rampTo(newWet, 0.005)
    }

    connectToMaster(module) {
        console.log(this.gain)
        module.connect(this.gain)
    }
}



const masterChain = new MasterChain()
masterChain.setReverb(0.5, 100)

export default masterChain