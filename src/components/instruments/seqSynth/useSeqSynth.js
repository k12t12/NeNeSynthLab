import { useEffect, useState, useRef } from "react";
import { seqSynthDefaultParametrs as defaultParametrs } from "../../../utils/defaultParametrs";
import SeqSynth from "../../../services/seqSynth";
import getNoteFromInterval from "../../../utils/getNoteFromInterval";
import useInstrumentsStore from "../../../store/instrumentsStore";
import { Frequency } from "tone";

export default function useSeqSynth(id) {
  const seqSynth = useRef(null);
  const instrument = useInstrumentsStore(state => state.instruments.find(instr => instr.id === id))
  const setInstrument =  useInstrumentsStore((state) => state.setInstrument)
  const [currentStep, setCurrentStep] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)

  const updateInstrument = (changes) => {
    setInstrument(id, changes)
  }

  useEffect(() => {
    const onStepUpdate = (stepIndex) => {
      setCurrentStep(stepIndex);
    };
    seqSynth.current = new SeqSynth(defaultParametrs, onStepUpdate);
    return () => {
      if (seqSynth.current) {
       
        seqSynth.current.sequencer.stopSound();
        seqSynth.current.dispose()
      }
    };
  }, []);

  useEffect(() => {
    seqSynth.current.setGainVolume(instrument?.volume)
  },[instrument?.volume])

  useEffect(() => {
    seqSynth.current.setEnvelope(instrument?.attack, instrument?.release);
  }, [instrument?.attack, instrument?.release]);

   useEffect(() => {
    seqSynth.current.setFilter(instrument?.filterFreq, instrument?.filterQ)
  }, [instrument?.filterQ, instrument?.filterFreq])

  useEffect(() => {
    seqSynth.current.setDelay(instrument?.delayFeedback, instrument?.delayTime)
  }, [instrument?.delayTime, instrument?.delayFeedback])

  useEffect(() => {
 
    seqSynth.current.sequencer.setSequence(
      instrument?.seq.currentSequenceIndex,
      instrument?.seq.sequences[instrument?.seq.currentSequenceIndex]
    );
  }, [instrument?.seq.sequences]);

  useEffect(() => {
    seqSynth.current.sequencer.setSequencer(instrument?.seq.currentSequenceIndex, instrument?.seq.interval);
  }, [instrument?.seq.currentSequenceIndex, instrument?.seq.interval]);

  useEffect(() => {
    updateInstrument({seq: {...instrument?.seq, sequences: [...instrument?.seq.sequences, seqSynth.current.sequencer.sequences[instrument?.seq.currentSequenceIndex]]}})
  
  }, [instrument?.seq.currentSequenceIndex]);

  const start = () => {seqSynth.current?.sequencer.startSound(); setIsPlaying(true)}
  const stop = () => {seqSynth.current?.sequencer.stopSound(); setIsPlaying(false)}

  return {start, stop, instrument, updateInstrument, currentStep, isPlaying}
    
}
