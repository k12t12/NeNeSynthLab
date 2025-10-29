import { useEffect, useState, useRef } from "react";
import { seqSynthDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import SeqSynth from "../../../services/seqSynth";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import { Frequency } from "tone";

export default function useSeqSynth(init = defaultParametrs) {
  const seqSynth = useRef(null);
  const [interval, setInterval] = useState(init.seq.interval);
  const [volume, setVolume ] = useState(init.volume)
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(
    init.seq.currentSequenceIndex
  );
  const [currentSequence, setCurrentSequence] = useState([
    ...init.seq.sequences[init.seq.currentSequenceIndex],
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [envelopeState, setEnvelopeState] = useState({
    attack: init.attack,
    release: init.release,
  });
  const [filterState, setFilterState] = useState({
    frequency: init.filterFreq,
    Q: init.filterQ
 })
 const [delayState, setDelayState] = useState({
  time: init.delayTime,
  feedback: init.delayFeedback
 })
 

  useEffect(() => {
    const onStepUpdate = (stepIndex) => {
      setCurrentStep(stepIndex);
    };
    seqSynth.current = new SeqSynth(init, onStepUpdate);
    return () => {
      if (seqSynth.current) {
        console.log("deletedelte")
        seqSynth.current.sequencer.stopSound();
        seqSynth.current.dispose()
      }
    };
  }, []);

  useEffect(() => {
    seqSynth.current.setGainVolume(volume)
  },[volume])

  useEffect(() => {
    seqSynth.current.setEnvelope(envelopeState.attack, envelopeState.release);
  }, [envelopeState]);

   useEffect(() => {
    seqSynth.current.setFilter(filterState.frequency, filterState.Q)
  }, [filterState])

  useEffect(() => {
    seqSynth.current.setDelay(delayState.feedback, delayState.time)
  }, [delayState])

  useEffect(() => {
    seqSynth.current.sequencer.setSequence(
      currentSequenceIndex,
      currentSequence
    );
  }, [currentSequence]);

  useEffect(() => {
    seqSynth.current.sequencer.setSequencer(currentSequenceIndex, interval);
  }, [currentSequenceIndex, interval]);

  useEffect(() => {
    setCurrentSequence(
      seqSynth.current.sequencer.sequences[currentSequenceIndex]
    );
  }, [currentSequenceIndex]);

  const start = () => seqSynth.current?.sequencer.startSound();
  const stop = () => seqSynth.current?.sequencer.stopSound();

  return {
    start,
    stop,
    currentSequence,
    setCurrentSequence,
    currentSequenceIndex,
    setCurrentSequenceIndex,
    currentStep,
    interval,
    setInterval,
    envelopeState,
    setEnvelopeState,
    filterState,
    setFilterState,
    delayState,
    setDelayState,
    volume,
    setVolume
  };
}
