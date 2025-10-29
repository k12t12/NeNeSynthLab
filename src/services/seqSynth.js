import { Oscillator, FeedbackDelay, AmplitudeEnvelope, Filter,Gain } from "tone";
import Sequencer from "./sequencer";
import masterChain from "./masterChain";


export default class SeqSynth{
constructor(init, onStepUpdate){

    this.gain = new Gain(init.volume)
    masterChain.connectToMaster(this.gain)
    this.delay = new FeedbackDelay(init.delayTime, init.delayFeedback).connect(this.gain)
    this.filter = new Filter(init.filterFreq, "lowpass").connect(this.delay).connect(this.gain)
    this.filter.set({Q: init.filterQ})
    this.ampEnv = new AmplitudeEnvelope({
        attack: init.attack,
        decay: init.release,
        sustain: 0
    }).connect(this.filter);
    this.oscillator = new Oscillator(null, "square20").connect(this.ampEnv).start()
  
    this.sequencer = new Sequencer(init.seq, onStepUpdate,
       (time, note)=> {this.ampEnv.triggerAttackRelease("1n", time);
         this.oscillator.set({frequency: note})
        })
    
  
    
}

setGainVolume(newVolume) {
        this.gain.gain.rampTo(newVolume, 0.005)

    }
    
setDelay(newFeedback, newTime){
    this.delay.feedback.rampTo(newFeedback, 0.005)
    this.delay.delayTime.rampTo(newTime,0.05)
  // we switch the wet value to 0 when the feedback is 0, thus disabling the delay 
  if (newFeedback == 0) {
    this.delay.set({wet: 0})
  } else {
    this.delay.set({wet: 1})
  }

}

setFilter(newFreq, newQ) {
  this.filter.set({frequency: newFreq, Q: newQ})
}

setEnvelope(newAttack, newRelease){
this.ampEnv.set({attack: newAttack, decay: newRelease})
}

dispose(){
  this.oscillator.dispose()
  this.delay.dispose()
  this.sequencer.dispose()
  this.filter.dispose()
  this.gain.dispose()
}
}