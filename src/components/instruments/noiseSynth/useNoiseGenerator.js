import { useState, useEffect, useRef } from "react";
import NoiseGenerator from "../../../services/noiseGenerator";
import { noiseGeneratorDefaultParametrs as defaultParametrs} from "../../../utils/defaultParametrs";

export default function useNoiseGenerator(init = defaultParametrs) {
  const noiseGenerator = useRef(null);
  const [xRatio, setXratio] = useState(init.xRatio);
  const [yRatio, setYratio] = useState(init.yRatio);
  const [xRatioPrev, setXratioPrev] = useState(init.xRatio);
  const [yRatioPrev, setYratioPrev] = useState(init.yRatio);
  const [volume, setVolume] = useState(init.volume)

  const [filterState, setFilterState] = useState({
    frequency: init.filterFreq,
    Q: init.filterQ,
  });
  const [delayState, setDelayState] = useState({
    time: init.delayTime,
    feedback: init.delayFeedback,
  });

  const [lfoState, setlfoState] = useState({
    amp: init.lfoAmp,
    freq: init.lfoFreq,
  });

  useEffect(() => {
    noiseGenerator.current = new NoiseGenerator(defaultParametrs);

    return () => {
      if (noiseGenerator.current) {
        noiseGenerator.current?.stopSound();
        if (noiseGenerator.current?.player) {
          noiseGenerator.current?.player.dispose();
        }
      }
    };
  }, []);

  useEffect(() => {
    noiseGenerator.current.setGainVolume(volume)
  },[volume])

  useEffect(() => {
    noiseGenerator.current?.updateNoise(xRatio, yRatio);
    
  }, [xRatio, yRatio]);
  
  useEffect(() => {
    noiseGenerator.current?.setFilter(filterState.frequency, filterState.Q)
  }, [filterState])

  useEffect(() => {
    noiseGenerator.current?.setDelay(delayState.feedback, delayState.time)
  }, [delayState])

  useEffect(() => {
    noiseGenerator.current?.setLFO(lfoState.freq, lfoState.amp)
  }, [lfoState])

  const start = () => noiseGenerator.current?.startSound();
  const stop = () =>  noiseGenerator.current?.stopSound();

  return {
    volume,
    setVolume,
    xRatio,
    yRatio,
    setXratio,
    setYratio,
    yRatioPrev,
    setYratioPrev,
    xRatioPrev,
    setXratioPrev,
    setDelayState,
    delayState,
    setFilterState,
    filterState,
    setlfoState,
    lfoState,
    start,
    stop
  };
}
