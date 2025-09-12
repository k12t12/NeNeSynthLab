import { Filter, Oscillator, Vibrato, FeedbackDelay} from "tone"

export default class DroneSynth {
    constructor(init) {
        this.delay = new FeedbackDelay(init.delayTime, init.delayFeedback)
        this.vibrato = new Vibrato(init.vibratoFreq, init.vibratoDepth).connect(this.delay)
        this.filter = new Filter(init.filterFreq, "lowpass").connect(this.vibrato)
        this.oscs = {
        firstOsc: new Oscillator(init.firstOsc.freq, "square10").connect(this.filter),
        secondOsc: new Oscillator(init.secondOsc.freq, "square10").connect(this.filter),
        thirdOsc: new Oscillator(init.thirdOsc.freq, "square10").connect(this.filter)
      }
        this.delay.toDestination()
    }
    setDelay(parametrs){
      if (parametrs.time) {
        this.delay.set({delayTime: parametrs.time})
      }
      if (parametrs.feedback) {
        this.delay.set({feedback: parametrs.feedback})
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
      if (parametrs.freq){ this.vibrato.set({frequency: parametrs.freq})}
      if (parametrs.depth){this.vibrato.set({depth: parametrs.depth})}
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