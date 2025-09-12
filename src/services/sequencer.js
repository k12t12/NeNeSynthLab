import {getTransport } from "tone";

export default class Sequencer{
    constructor(init, onStepUpdate, soundActionCallback){
        this.soundActionCallback = soundActionCallback
      this.interval = "4n"
      this.isPlaying = false
        this.onStepUpdate = onStepUpdate; // callback 
        this.currentStep = 0;
        this.isPlaying = false;
        this.startTime = 0
        this.currentSequenceIndex = 0
        this.sequences = init.sequences.map(sequence => [...sequence]);
         this.eventId = null;
    }
createSequencer(time) {
  this.eventId = getTransport().scheduleRepeat((time) => {
      if (this.isPlaying) {
      this.soundActionCallback(time, this.sequences[this.currentSequenceIndex][this.currentStep])
      this.onStepUpdate(this.currentStep)
      this.currentStep = (this.currentStep + 1) % 8
      }
    }, this.interval, time??null);
}

setSequencer(newCurrentSequenceIndex, interval){
  const now = getTransport().seconds;
  const barDuration = getTransport().toSeconds("1m");
  const nextBarTime = Math.ceil(now / barDuration) * barDuration;
  getTransport().scheduleOnce(()=> {
  getTransport().clear(this.eventId)
   this.interval = interval
   this.currentSequenceIndex = newCurrentSequenceIndex
   this.createSequencer()
  }, nextBarTime)
}

setSequence(index, newSequence) {
   this.sequences[index] = newSequence

  }

stopSound(){
this.isPlaying = false
getTransport().clear(this.eventId)
this.currentStep = 0
this.onStepUpdate(this.currentStep)
}

startSound(){
  this.isPlaying = true
  getTransport().clear(this.eventId)
  const now = getTransport().seconds;
  const barDuration = getTransport().toSeconds("1m");
  const nextBarTime = Math.ceil(now / barDuration) * barDuration;
    this.createSequencer(nextBarTime)
  this.currentStep = 0
  this.onStepUpdate(this.currentStep)
}

}