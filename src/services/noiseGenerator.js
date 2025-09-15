import { Player, FeedbackDelay, Filter, LFO, getContext, now } from "tone";
import findZeroCrossing from "../utils/findZeroCrossing";
import Perlin from "../utils/perlin";
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

    this.delay = new FeedbackDelay(init.delayTime, init.delayFeedback).toDestination();
    this.filter = new Filter(this.filterFreq, "lowpass").connect(this.delay);
    this.filter.set({ Q: init.filterQ });
    this.filter.toDestination();
    this.lfo = new LFO(
      init.lfoFreq,
      Math.max(this.filterFreq - this.LFOamp, 0),
      Math.min(this.filterFreq + this.LFOamp, FILTER_FREQ_MAX)
    )
      .connect(this.filter.frequency)
      .start();
  }

  setDelay(newFeedback, newTime) {
    this.delay.set({ feedback: newFeedback, time: newTime });

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
    this.setLFO(this.lfo.get().frequency, this.LFOamp); //When we change frequency, we need to update lfo min, max too
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
    const perlin = new Perlin();
    if (this.player) {
      this.player.dispose();
    }

    this.buffer = getContext().createBuffer(
      1,
      getContext().sampleRate * this.duration,
      getContext().sampleRate
    );
    this.data = this.buffer.getChannelData(0);
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = Math.abs(perlin.get((i * xRatio) / 1000, i * yRatio));
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
  }

  startSound() {
    this.isStart = true
    this.player.start(now());
  }

  stopSound() {
    this.isStart = false
    this.player.stop(now());
  }
}
