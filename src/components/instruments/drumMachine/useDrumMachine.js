import { useEffect, useState, useRef } from "react";
import { drumMachineDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import DrumMachine from "../../../services/drumMachine";


export default function useDrumMachine(init = defaultParametrs) {
  const drumMachine = useRef(null);

  const [kickSequence, setKickSequence] = useState([
    ...init.kickSeq.sequences[0],
  ]);

  const [snareSequence, setSnareSequence] = useState([
    ...init.snareSeq.sequences[0],
  ]);

   const [openHatSequence, setOpenHatSequence] = useState([
    ...init.openHatSeq.sequences[0],
  ]);

  const [closeHatSequence, setCloseHatSequence] = useState([
    ...init.closeHatSeq.sequences[0],
  ]);

  const [kickState, setKickState] = useState({
    volume: init.kick.volume,
    tone: init.kick.tone
  })

  const [snareState, setSnareState] = useState({
    volume: init.snare.volume,
    tone: init.snare.tone
  })

  const [openHatState, setOpenHatState] = useState({
    volume: init.openHat.volume,
    tone: init.openHat.tone
  })

   const [closeHatState, setCloseHatState] = useState({
    volume: init.closeHat.volume,
    tone: init.closeHat.tone
  })

  const [currentStep, setCurrentStep] = useState(0);
  const [volume, setVolume] = useState(init.volume)
 

  useEffect(() => {
    const onStepUpdate = (stepIndex) => {
      setCurrentStep(stepIndex);
    };

    drumMachine.current = new DrumMachine(init, onStepUpdate);
    return () => {
      if (drumMachine.current) {
        drumMachine.current.stopSound();
      }
    };
  }, []);

  useEffect(() => {
    drumMachine.current.setGainVolume(volume)
  },[volume])

  useEffect(() => {
    drumMachine.current.kick.setVolume(kickState.volume)
    drumMachine.current.kick.setTone(kickState.tone)
  }, [kickState])

  useEffect(() => {
    drumMachine.current.snare.setVolume(snareState.volume)
    drumMachine.current.snare.setTone(snareState.tone)
  }, [snareState])

  useEffect(() => {
    drumMachine.current.openHat.setVolume(openHatState.volume)
    drumMachine.current.openHat.setTone(openHatState.tone)
  }, [openHatState])

  useEffect(() => {
    drumMachine.current.closeHat.setVolume(closeHatState.volume)
    drumMachine.current.closeHat.setTone(closeHatState.tone)
  }, [closeHatState])

  useEffect(() => {
      drumMachine.current.kickSequencer.setSequence(
      0,
      kickSequence
    );
  }, [kickSequence]);

  useEffect(() => {
      drumMachine.current.snareSequencer.setSequence(
      0,
      snareSequence
    );
  }, [snareSequence]);

  useEffect(() => {
      drumMachine.current.openHatSequencer.setSequence(
      0,
      openHatSequence
    );
  }, [openHatSequence]);

  useEffect(() => {
      drumMachine.current.closeHatSequencer.setSequence(
      0,
      closeHatSequence
    );
  }, [closeHatSequence]);


  const start = () => drumMachine.current?.startSound();
  const stop = () => drumMachine.current?.stopSound();

  return {
    start,
    stop,
    kickSequence,
    setKickSequence,
    snareSequence,
    setSnareSequence,
    openHatSequence,
    setOpenHatSequence,
    closeHatSequence,
    setCloseHatSequence,
    currentStep,
    kickState,
    setKickState,
    snareState,
    setSnareState,
    openHatState,
    setOpenHatState,
    closeHatState,
    setCloseHatState,
    volume,
    setVolume
  };
}
