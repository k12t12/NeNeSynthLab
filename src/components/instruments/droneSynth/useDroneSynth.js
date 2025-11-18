import { useEffect, useState, useRef } from "react";
import { droneSynthDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import DroneSynth from "../../../services/droneSynth";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import useInstrumentsStore from "../../../store/instrumentsStore";

export default function useDroneSynth(id) {
  const droneSynth = useRef(null);
  const instrument = useInstrumentsStore(state => state.instruments.find(instr => instr.id === id))
  const setInstrument =  useInstrumentsStore((state) => state.setInstrument)

  const [isPlaying, setIsPlaying] = useState(false)

  const updateInstrument = (changes) => {
    setInstrument(id, changes)
  }
  
  useEffect(() => {
    droneSynth.current = new DroneSynth(defaultParametrs);
    return () => {
      if (droneSynth.current) {
        droneSynth.current.stopSound();
      }
    };
  }, [droneSynth]);

  useEffect(()=> {
    droneSynth.current.setGainVolume(instrument?.volume)
  }, [instrument?.volume])

  useEffect(() => {
    droneSynth.current.setOscillator("firstOsc", {freq: instrument?.firstOsc.freq})
  }, [instrument?.firstOsc])

  useEffect(() => {
    droneSynth.current.setOscillator("secondOsc", {freq: instrument?.secondOsc.freq})
  }, [instrument?.secondOsc])

  useEffect(() => {
    droneSynth.current.setOscillator("thirdOsc", {freq: instrument?.thirdOsc.freq})
  }, [instrument?.thirdOsc])

  useEffect(() => {
    droneSynth.current.setFilter({freq: instrument?.filterFreq, Q: instrument?.filterQ})
  },[instrument?.filterFreq, instrument?.filterQ])

  useEffect(() => {
    droneSynth.current.setVibrato({freq: instrument?.vibratoFreq, depth: instrument?.vibratoDepth})
  }, [instrument?.vibratoFreq, instrument?.vibratoDepth])

  useEffect(()=>{
    droneSynth.current.setDelay({time: instrument?.delayTime, feedback: instrument?.delayFeedback})
    
  }, [instrument?.delayTime, instrument?.delayFeedback])

  const start = () => {droneSynth.current?.startSound(); setIsPlaying(true)};
  const stop = () => {droneSynth.current?.stopSound(); setIsPlaying(false)};

    return {instrument, updateInstrument, start, stop, isPlaying}
  
}