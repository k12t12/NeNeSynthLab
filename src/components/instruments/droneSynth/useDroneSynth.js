import { useEffect, useState, useRef } from "react";
import { droneSynthDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import DroneSynth from "../../../services/droneSynth";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";

export default function useDroneSynth(init = defaultParametrs) {
  const droneSynth = useRef(null);
  const [firstOscState, useFirstOscState] = useState(init.firstOsc)
  const [secondOscState, useSecondOscState] = useState(init.secondOsc)
  const [thirdOscState, useThirdOscState] = useState(init.thirdOsc)
  const [vibratoState, useVibratoState] = useState({freq: init.vibratoFreq, depth: init.vibratoDepth})
  const [filterState, useFilterState] = useState({freq: init.filterFreq, Q: init.filterQ})
  const [delayState, useDelayState] = useState({time: init.delayTime, feedback: init.delayFeedback})

  useEffect(() => {
    droneSynth.current = new DroneSynth(init);
    return () => {
      if (droneSynth.current) {
        droneSynth.current.stopSound();
      }
    };
  }, []);

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
    console.log(1)
  }, [delayState])

  const start = () => droneSynth.current?.startSound();
  const stop = () => droneSynth.current?.stopSound();
  const setDelay = (state) => useDelayState(state)
  const setFirstOsc = (state) => useFirstOscState(state)
  const setSecondOsc = (state) => useSecondOscState(state)
  const setThirdOsc = (state) => useThirdOscState(state)
  const setVibrato = (state) => useVibratoState(state)
  const setFilter = (state) => useFilterState(state)
    return { start, stop, setFirstOsc, setSecondOsc, setThirdOsc, setVibrato, setFilter, setDelay, firstOscState, secondOscState, thirdOscState, vibratoState, filterState, delayState};
}