import { useState, useEffect, useRef } from "react";
import NoiseGenerator from "../../../services/noiseGenerator";
import { noiseGeneratorDefaultParametrs as defaultParametrs} from "../../../utils/defaultParametrs";
import useInstrumentsStore from "../../../store/instrumentsStore";

export default function useNoiseGenerator(id) {
  const noiseGenerator = useRef(null);
const instrument = useInstrumentsStore(state => state.instruments.find(instr => instr.id === id))
   const setInstrument =  useInstrumentsStore((state) => state.setInstrument)
  const updateInstrument = (changes) => {
    setInstrument(id, changes)
  }
  const [xRatioPrev, setXratioPrev] = useState(defaultParametrs.xRatio);
  const [yRatioPrev, setYratioPrev] = useState(defaultParametrs.yRatio);
  const [isPlaying, setIsPlaying] = useState(false)


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
    noiseGenerator.current.setGainVolume(instrument?.volume)
  },[instrument?.volume])

  useEffect(() => {
    noiseGenerator.current?.updateNoise(instrument?.xRatio, instrument?.yRatio);
    
  }, [instrument?.xRatio, instrument?.yRatio]);
  
  useEffect(() => {
    noiseGenerator.current?.setFilter(instrument?.filterFreq, instrument?.filterQ)
  }, [instrument?.filterFreq, instrument?.filterQ])

  useEffect(() => {
    noiseGenerator.current?.setDelay(instrument?.delayFeedback, instrument?.delayTime)
  }, [instrument?.delayTime, instrument?.delayFeedback])

  useEffect(() => {
    noiseGenerator.current?.setLFO(instrument?.lfoFreq, instrument?.lfoAmp)
  }, [instrument?.lfoAmp, instrument?.lfoFreq])

  const start = () => {noiseGenerator.current?.startSound(); setIsPlaying(true)}
  const stop = () =>  {noiseGenerator.current?.stopSound(); setIsPlaying(false)}

  return {
    instrument,
    updateInstrument,
    yRatioPrev,
    setYratioPrev,
    xRatioPrev,
    setXratioPrev,
    start,
    stop,
    isPlaying
  };
}
