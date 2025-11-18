import { useEffect, useState, useRef } from "react";
import { drumMachineDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import DrumMachine from "../../../services/drumMachine";
import useInstrumentsStore from "../../../store/instrumentsStore";

export default function useDrumMachine(id) {
  const drumMachine = useRef(null);
  const instrument = useInstrumentsStore(state => state.instruments.find(instr => instr.id === id))
  const setInstrument =  useInstrumentsStore((state) => state.setInstrument)
  const updateInstrument = (changes) => {
    setInstrument(id, changes)
  }

  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
 

  useEffect(() => {
    const onStepUpdate = (stepIndex) => {
      setCurrentStep(stepIndex);
    };

    drumMachine.current = new DrumMachine(defaultParametrs, onStepUpdate);
    return () => {
      if (drumMachine.current) {
        drumMachine.current.stopSound();
      }
    };
  }, []);

  useEffect(() => {
    drumMachine.current.setGainVolume(instrument?.volume)
  },[instrument?.volume])

  useEffect(() => {
    drumMachine.current.kick.setVolume(instrument?.kick.volume)
    drumMachine.current.kick.setTone(instrument?.kick.tone)
  }, [instrument?.kick])

  useEffect(() => {
    drumMachine.current.snare.setVolume(instrument?.snare.volume)
    drumMachine.current.snare.setTone(instrument?.snare.tone)
  }, [instrument?.snare])

  useEffect(() => {
    drumMachine.current.openHat.setVolume(instrument?.openHat.volume)
    drumMachine.current.openHat.setTone(instrument?.openHat.tone)
  }, [instrument?.openHat])

  useEffect(() => {
    drumMachine.current.closeHat.setVolume(instrument?.closeHat.volume)
    drumMachine.current.closeHat.setTone(instrument?.closeHat.tone)
  }, [instrument?.closeHat])

  useEffect(() => {
      drumMachine.current.kickSequencer.setSequence(
      0,
      instrument?.kickSeq.sequences[0]
    );
  }, [instrument?.kickSeq]);

  useEffect(() => {
      drumMachine.current.snareSequencer.setSequence(
      0,
      instrument?.snareSeq.sequences[0]
    );
  }, [instrument?.snareSeq]);

  useEffect(() => {
      drumMachine.current.openHatSequencer.setSequence(
      0,
      instrument?.openHatSeq.sequences[0]
    );
  }, [instrument?.openHatSeq]);

  useEffect(() => {
      drumMachine.current.closeHatSequencer.setSequence(
      0,
      instrument?.closeHatSeq.sequences[0]
    );
  }, [instrument?.closeHatSeq]);


  const start = () => {drumMachine.current?.startSound(); setIsPlaying(true)};
  const stop = () => {drumMachine.current?.stopSound(); setIsPlaying(false)};

  return {
    start,
    stop,
    instrument,
    updateInstrument,
    currentStep,
    setCurrentStep,
    isPlaying
  };
}
