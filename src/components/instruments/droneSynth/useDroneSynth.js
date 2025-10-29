import { useEffect, useState, useRef } from "react";
import { droneSynthDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import DroneSynth from "../../../services/droneSynth";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";

export default function useDroneSynth(init = defaultParametrs) {
  const droneSynth = useRef(null);
  const [volume, setVolume] = useState(init.volume)
  const [firstOscState, setFirstOscState] = useState(init.firstOsc)
  const [secondOscState, setSecondOscState] = useState(init.secondOsc)
  const [thirdOscState, setThirdOscState] = useState(init.thirdOsc)
  const [vibratoState, setVibratoState] = useState({freq: init.vibratoFreq, depth: init.vibratoDepth})
  const [filterState, setFilterState] = useState({freq: init.filterFreq, Q: init.filterQ})
  const [delayState, setDelayState] = useState({time: init.delayTime, feedback: init.delayFeedback})

  useEffect(() => {
    droneSynth.current = new DroneSynth(init);
    return () => {
      if (droneSynth.current) {
        droneSynth.current.stopSound();
      }
    };
  }, [droneSynth]);

  useEffect(()=> {
    droneSynth.current.setGainVolume(volume)
  }, [volume])

  useEffect(() => {
    droneSynth.current.setOscillator("firstOsc", {freq: firstOscState.freq})
  }, [firstOscState])

  useEffect(() => {
    droneSynth.current.setOscillator("secondOsc", {freq: secondOscState.freq})
  }, [secondOscState])

  useEffect(() => {
    droneSynth.current.setOscillator("thirdOsc", {freq: thirdOscState.freq})
  }, [thirdOscState])

  useEffect(() => {
    droneSynth.current.setFilter(filterState)
  },[filterState])

  useEffect(() => {
    droneSynth.current.setVibrato(vibratoState)
  }, [vibratoState])

  useEffect(()=>{
    droneSynth.current.setDelay(delayState)
    
  }, [delayState])

  const start = () => droneSynth.current?.startSound();
  const stop = () => droneSynth.current?.stopSound();

    return { start,
       stop,
      setFirstOscState,
      setSecondOscState,
      setThirdOscState,
      setVibratoState,
      setFilterState,
      setDelayState,
      firstOscState,
      secondOscState,
      thirdOscState,
      vibratoState,
      filterState,
      delayState,
      volume,
      setVolume};
}