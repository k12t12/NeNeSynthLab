import { Compressor, Gain, Reverb } from "tone"

class MasterChain {
    constructor(){
        
        this.compressor = new Compressor(-20).toDestination()
        this.reverb = new Reverb().connect(this.compressor)
        this.gain = new Gain(1).connect(this.reverb).connect(this.compressor)
    }

    setReverb(newWet, newDecay){
        newWet = newWet / 1
        newDecay = newDecay / 1
        
        if (newDecay >= 0.1){
          
            this.reverb.decay = newDecay
        }
        if (newWet <=1) {
         
            this.reverb.wet.value = newWet
        }
    }

    connectToMaster(module) {
        module.connect(this.gain)
    }
}



const masterChain = new MasterChain()
masterChain.setReverb(0.5, 100)

export default masterChain