import { useEffect, useState, useRef } from "react";
import { seqSynthDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import SeqSynth from "../../../services/seqSynth";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import { Frequency } from "tone";

export default function useSeqSynth(init = defaultParametrs) {
  const seqSynth = useRef(null);
  const [interval, setInterval] = useState(init.interval);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(
    init.currentSequenceIndex
  );
  const [currentSequence, setCurrentSequence] = useState([
    ...init.sequences[init.currentSequenceIndex],
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [envelopeState, setEnvelopeState] = useState({
    attack: 0,
    release: 0.1,
  });
  const [filterState, setFilterState] = useState({
    frequency: 1100,
    Q: 1
 })
 const [delayState, setDelayState] = useState({
  time: 0.1,
  feedback: 0.2
 })
 

  useEffect(() => {
    const onStepUpdate = (stepIndex) => {
      setCurrentStep(stepIndex);
    };
    seqSynth.current = new SeqSynth(defaultParametrs, onStepUpdate);
    return () => {
      if (seqSynth.current) {
        seqSynth.current.sequencer.stopSound();
      }
    };
  }, []);


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
    setDelayState
  };
}
