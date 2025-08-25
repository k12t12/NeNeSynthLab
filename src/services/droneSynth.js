import { Filter, Oscillator, Vibrato, FeedbackDelay} from "tone"

export default class DroneSynth {
    constructor() {
        this.delay = new FeedbackDelay(1, null)
        this.vibrato = new Vibrato(null, null).connect(this.delay)
        this.filter = new Filter(null, "lowpass").connect(this.vibrato)
        this.oscs = {
        firstOsc: new Oscillator(null, "square10").connect(this.filter),
        secondOsc: new Oscillator(null, "square10").connect(this.filter),
        thirdOsc: new Oscillator(null, "square10").connect(this.filter)
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