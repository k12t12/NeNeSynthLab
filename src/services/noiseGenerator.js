import { Player, FeedbackDelay, Filter, LFO, Gain, getContext, now } from "tone";
import findZeroCrossing from "../utils/findZeroCrossing";
import masterChain from "./masterChain";

const FILTER_FREQ_MAX = 8000;

export default class NoiseGenerator {
  constructor(init) {
    this.duration = 2;
    this.buffer = getContext().createBuffer(
      1,
      getContext().sampleRate * this.duration,
      getContext().sampleRate
    );
    this.data = this.buffer.getChannelData(0);
    this.player = null;
    this.LFOamp = init.lfoAmp;
    this.filterFreq = init.filterFreq; //this parameter is intended to make the LFO know what value to apply the amplitude to
    this.isStart = false

    this.gain = new Gain(init.volume)
    masterChain.connectToMaster(this.gain)
    this.delay = new FeedbackDelay(init.delayTime, init.delayFeedback).connect(this.gain)
    this.filter = new Filter(this.filterFreq, "lowpass").connect(this.delay).connect(this.gain);
   
    this.lfo = new LFO(
      init.lfoFreq,
      Math.max(this.filterFreq - this.LFOamp, 0),
      Math.min(this.filterFreq + this.LFOamp, FILTER_FREQ_MAX)
    )
      .connect(this.filter.frequency)
      .start();
  }

  setGainVolume(newVolume) {
    console.log(newVolume)
        this.gain.gain.rampTo(newVolume, 0.005)
    }

  setDelay(newFeedback, newTime) {
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
    this.filterFreq = newFreq;
    this.filter.set({ frequency: newFreq, Q: newQ });
    this.setLFO(this.lfo.get().frequency, this.LFOamp); //When we change frequency, we need to update lfo min and max too
  }

  setLFO(newFreq, newAmp) {
    this.LFOamp = newAmp;
    this.lfo.set({
      min: Math.max(this.filterFreq - this.LFOamp, 0),
      max: Math.min(this.filterFreq + this.LFOamp),
      frequency: newFreq,
    });
  }
  
  updateNoise(xRatio, yRatio) {
    if (this.player) {
      this.player.dispose();
    }

    this.buffer = getContext().createBuffer(
      1,
      getContext().sampleRate * this.duration,
      getContext().sampleRate
    );
    
    let perlinNoiseData = null
    //we need worker to calculate large audio data
    const worker = new Worker('/src/utils/generatePerlinNoiseBuffer.js', {type: 'module'})

    worker.postMessage({length: this.buffer.length, xRatio: xRatio, yRatio: yRatio})

    //when calculations are completed:
    worker.onmessage = (e) => {
      console.log(this.buffer)
      perlinNoiseData = e.data
      this.channel = this.buffer.getChannelData(0); // link to audio buffer channel
    
    // copy perlin noise data to audio channel
    for (let i in perlinNoiseData){
      this.channel[i] = perlinNoiseData[i]
    }
    
    this.player = new Player({
      url: this.buffer,
      loop: true,
      loopStart: findZeroCrossing(this.buffer),
      loopEnd: this.buffer.duration,
      autostart: true,
      fadeIn: 10,
    }).connect(this.filter);

    if (this.isStart) {
      this.startSound()
    } 
    };
  }

  startSound() {
    if (this.player) {
      this.isStart = true
      this.player.start(now());
    }
  }

  stopSound() {
    if (this.player) {
      this.isStart = false
      this.player.stop(now());
    }
  }
}
