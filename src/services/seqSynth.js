import { Oscillator, FeedbackDelay, AmplitudeEnvelope, Filter,Gain } from "tone";
import Sequencer from "./sequencer";

export default class SeqSynth{
constructor(init, onStepUpdate){
    this.delay = new FeedbackDelay(1,0.2).toDestination()
    this.filter = new Filter(init.filterFreq, "lowpass").connect(this.delay)
    this.filter.set({Q: init.filterQ})
    this.filter.toDestination()
    this.ampEnv = new AmplitudeEnvelope({
        attack: init.attack,
        decay: init.release,
        sustain: 0
    }).connect(this.filter);
    this.oscillator = new Oscillator(null, "sawtooth28").connect(this.ampEnv)
    this.oscillator.start()
   
    this.sequencer = new Sequencer(init, onStepUpdate, (time, note)=> {this.ampEnv.triggerAttackRelease("1n", time); this.oscillator.set({frequency: note})})
    
  
    
}

setDelay(newFeedback, newTime){
  this.delay.set({feedback: newFeedback, time: newTime})
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

}