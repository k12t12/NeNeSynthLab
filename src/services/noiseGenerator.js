import { Player, FeedbackDelay, getContext, now } from 'tone';
import findZeroCrossing from '../utils/findZeroCrossing';
import Perlin from '../utils/perlin';

export default class NoiseGenerator{
    constructor(){
        this.duration = 2
        this.buffer=getContext().createBuffer(1, getContext().sampleRate * this.duration, getContext().sampleRate);
        this.data = this.buffer.getChannelData(0);
       this.player = null
       this.delay = new FeedbackDelay(0.3, 0.8).toDestination()

    }

  updateNoise(xRatio, yRatio) {
  const perlin = new Perlin()
  if (this.player) {
  this.player.dispose()
  }

  this.buffer=getContext().createBuffer(1, getContext().sampleRate * this.duration, getContext().sampleRate);
        this.data = this.buffer.getChannelData(0);
  for (let i = 0; i < this.data.length; i++) {
   
    this.data[i] = Math.abs(perlin.get(i*xRatio/1000, i*yRatio))
    
  } 
  
  this.player = new Player({
  url: this.buffer,
  loop: true,     
  loopStart: findZeroCrossing(this.buffer),        
  loopEnd: this.buffer.duration, 
  autostart: true,
  fadeIn: 10  
}).connect(this.delay).start(now()+0.1);

}


startSound() {
this.player.start()
}

stopSound() {
this.player.stop()
}
} 

