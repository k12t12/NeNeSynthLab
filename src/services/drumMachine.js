import KickSynth from "./kickSynth"
import SnareSynth from "./snareSynth"
import HihatSynth from "./hihatSynth"
import Sequencer from "./sequencer"
import { Gain, start } from "tone" 
import masterChain from "./masterChain"

export default class DrumMachine{

    constructor(init, onStepUpdate) {
        
        this.gain = new Gain(init.volume)
        masterChain.connectToMaster(this.gain)
        
        this.kick = new KickSynth(init.kick)
        this.snare = new SnareSynth(init.snare)
        this.openHat = new HihatSynth(init.openHat, "open") 
        this.closeHat = new HihatSynth(init.closeHat, "close")

        this.kick.sampler.connect(this.gain)
        this.snare.sampler.connect(this.gain)
        this.openHat.sampler.connect(this.gain)
        this.closeHat.sampler.connect(this.gain)
        this.kickSequencer = new Sequencer(init.kickSeq, onStepUpdate, (time)=>{this.kick.play(time)})
        this.snareSequencer = new Sequencer(init.snareSeq, onStepUpdate, (time)=>{this.snare.play(time)})
        this.openHatSequencer = new Sequencer(init.openHatSeq, onStepUpdate, (time)=>{this.openHat.play(time)})
        this.closeHatSequencer = new Sequencer(init.closeHatSeq, onStepUpdate, (time)=>{this.closeHat.play(time)})
       start() /* we need to explicitly specify the launch of
        the audio context, because Gain is a passive module
        that does not activate the audio context when the
        class is created */

    } 

    setGainVolume(newVolume) {
        this.gain.gain.rampTo(newVolume, 0.005)

    }

    startSound() {
        this.kickSequencer.startSound()
        this.snareSequencer.startSound()
        this.openHatSequencer.startSound()
        this.closeHatSequencer.startSound()
    }

    stopSound() {
        this.kickSequencer.stopSound()
        this.snareSequencer.stopSound()
        this.openHatSequencer.stopSound()
        this.closeHatSequencer.stopSound()
    }
}