import { gainToDb, Filter, Oscillator, Vibrato, FeedbackDelay, Gain} from "tone"
import masterChain from "./masterChain"

export default class DroneSynth {
    constructor(init) { 
        this.gain = new Gain(init.volume)
        masterChain.connectToMaster(this.gain)

        this.delay = new FeedbackDelay(init.delayTime, init.delayFeedback).connect(this.gain)
        this.vibrato = new Vibrato(init.vibratoFreq, init.vibratoDepth).connect(this.delay).connect(this.gain)
        
        
        this.filter = new Filter(init.filterFreq, "lowpass").connect(this.vibrato)
        this.oscs = {
        firstOsc: new Oscillator(init.firstOsc.freq, "square10").connect(this.filter),
        secondOsc: new Oscillator(init.secondOsc.freq, "square10").connect(this.filter),
        thirdOsc: new Oscillator(init.thirdOsc.freq, "square10").connect(this.filter)
      }
      for (let osc in this.oscs) {
        this.oscs[osc].volume.value = -36
     
      }

        this.stopSound()

    }

    setGainVolume(newVolume){
      newVolume = newVolume / 1
      if (typeof(newVolume)=="number") {
            this.gain.gain.rampTo(newVolume, 0.005)
      }
    }

    setDelay(parametrs){
      parametrs.time = parametrs.time / 1
      parametrs.feedback = parametrs.feedback / 1

      if (parametrs.time) {
        this.delay.delayTime.rampTo(parametrs.time, 0.5)
      }
      if (parametrs.feedback) {
        this.delay.set({feedback: parametrs.feedback})
      }
      // we switch the wet value to 0 when the feedback is 0, thus disabling the delay 
  if (parametrs.feedback == 0) {
    this.delay.set({wet: 0})
  } else {
    this.delay.set({wet: 1})
    }
  }
    setOscillator(name, parametrs){
      if (parametrs.freq) {
        this.oscs[name].set({frequency: parametrs.freq})
        
      }
    }
    setFilter(parametrs){
      if (parametrs.freq){ this.filter.set({frequency: parametrs.freq})}
      if (parametrs.Q){ this.filter.set({Q: parametrs.Q})}
    }
    setVibrato(parametrs){
      parametrs.depth = parametrs.depth / 1
      
      if (parametrs.freq){ this.vibrato.set({frequency: parametrs.freq})}
      if (parametrs.depth){this.vibrato.depth.rampTo(parametrs.depth, 0.005)}
    }
    stopSound(){
        for (let osc in this.oscs) {
          this.oscs[osc].stop()
        }
    }
    
    startSound(){
        for (let osc in this.oscs) {
          this.oscs[osc].start()
        }
    }
}