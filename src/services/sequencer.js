import {getTransport, now } from "tone";

export default class Sequencer{
    constructor(init, onStepUpdate, soundActionCallback){
        this.soundActionCallback = soundActionCallback
        this.seqLen = init.seqLen
        this.interval = init.interval
        this.isPlaying = false
        this.onStepUpdate = onStepUpdate; // callback 
        this.currentStep = 0;
        this.startTime = 0
        this.currentSequenceIndex = 0
        this.sequences = init.sequences.map(sequence => [...sequence]);
         this.eventId = null;
    }
createSequencer(time) {
  
  this.eventId = getTransport().scheduleRepeat((time) => {
      
      if (this.isPlaying) {
        
        if (this.sequences[this.currentSequenceIndex][this.currentStep]) {
          this.soundActionCallback(time, this.sequences[this.currentSequenceIndex][this.currentStep])
        }

        if (this.onStepUpdate) {this.onStepUpdate(this.currentStep)}

        this.currentStep = (this.currentStep + 1) % this.seqLen
      }
    }, this.interval, time || now());
}

setSequencer(newCurrentSequenceIndex, interval){
  const barDuration = getTransport().toSeconds("1m");
  const nextBarTime = (getTransport().position.split(':')[0]*1+1) * barDuration;
  
  getTransport().scheduleOnce(()=> {
    
  getTransport().clear(this.eventId)
   this.interval = interval    
   this.currentSequenceIndex = newCurrentSequenceIndex
   this.createSequencer(nextBarTime)
    
  }, nextBarTime)
}

setSequence(index, newSequence) {
   this.sequences[index] = newSequence

  }

stopSound(){
this.isPlaying = false
getTransport().clear(this.eventId)
this.currentStep = 0
if (this.onStepUpdate) {this.onStepUpdate(this.currentStep)}
}

startSound(){
  this.isPlaying = true
  
  getTransport().clear(this.eventId)
  const now = getTransport().seconds;
  
  const barDuration = getTransport().toSeconds("1m");
  const nextBarTime = (getTransport().position.split(':')[0]*1+1) * barDuration;
  

  this.createSequencer(nextBarTime)
  this.currentStep = 0

  if (this.onStepUpdate) {this.onStepUpdate(this.currentStep)}
}

dispose(){
 getTransport().clear(this.eventId)
 
}
}