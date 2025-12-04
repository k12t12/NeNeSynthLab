import { Compressor, Gain, JCReverb, FeedbackDelay} from "tone"

class MasterChain {
    constructor(){
        
        this.compressor = new Compressor(-20).toDestination()
        this.reverb = new JCReverb().connect(this.compressor)
        this.delay = new FeedbackDelay(0.8,0.01).connect(this.reverb)
        this.gain = new Gain(1).connect(this.delay).connect(this.compressor)
    }

    setReverb(newWet, newSize){
        newWet = newWet / 1
        newSize = newSize / 1
        
        if (newSize >= 0.1){
          
            this.reverb.roomSize.value = newSize
        }
        if (newWet <=1) {
            this.delay.wet.value = newWet
            this.reverb.wet.value = newWet
        }
    }

    connectToMaster(module) {
        module.connect(this.gain)
    }
}



const masterChain = new MasterChain()

export default masterChain