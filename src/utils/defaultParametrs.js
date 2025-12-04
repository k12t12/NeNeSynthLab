import getNoteFromInterval from "./getNoteFromInterval";
import { gainToDb } from "tone";

const masterDefaultParametrs = {
  reverbWet: 1,
  reverbDecay: 0.2,
  bpm: 100
}

const droneSynthDefaultParametrs = {
  firstOsc: {
    interval: -9,
    freq: getNoteFromInterval(-9).freq,
    noteName: getNoteFromInterval(-9).name,
  },

  secondOsc: {
    interval: -29,
    freq: getNoteFromInterval(-29).freq,
    noteName: getNoteFromInterval(-29).name,
  },

  thirdOsc: {
    interval: -19,
    freq: getNoteFromInterval(-19).freq,
    noteName: getNoteFromInterval(-19).name,
  },
  volume: 1,
  filterFreq: 1000,
  filterQ: 10,
  vibratoFreq: 1,
  vibratoDepth: 1,
  delayTime: 0.1,
  delayFeedback: 0.1,
};

const noiseGeneratorDefaultParametrs = {
  volume: 1,
  xRatio: 0.03,
  yRatio: 0.3,
  filterFreq: 2000,
  filterQ: 10,
  delayTime: 0.1,
  delayFeedback: 0.1,
  lfoFreq: 1,
  lfoAmp: 1000,
};

const seqSynthDefaultParametrs = {
  seq: {
    seqLen: 8,
    sequences: [
      ["C4", "C4", "C4", "C4", "C4", "C4", "C4", "C4"],
      ["C4", "C4", "C4", "C4", "C4", "C4", "C4", "C4"],
      ["C4", "C4", "C4", "C4", "C4", "C4", "C4", "C4"],
      ["C4", "C4", "C4", "C4", "C4", "C4", "C4", "C4"],
    ],
    currentSequenceIndex: 0,
    interval: "4n",
  },
  volume: 1,
  filterFreq: 1000,
  filterQ: 0,
  delayTime: 0.1,
  delayFeedback: 0.1,
  attack: 0,
  release: 0.1,
};

const drumMachineDefaultParametrs = {
  volume: 1,
  kickSeq: {
    seqLen: 16,
    sequences: [
      [
        "play",
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
      ],
    ],
    currentSequenceIndex: 0,
    interval: "16n",
  },
  closeHatSeq: {
    seqLen: 16,
    sequences: [
      [
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
        "play",
      ],
    ],
    currentSequenceIndex: 0,
    interval: "16n",
  },
  snareSeq: {
    seqLen: 16,
    sequences: [
      [
        null,
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
      ],
    ],
    currentSequenceIndex: 0,
    interval: "16n",
  },
  openHatSeq: {
    seqLen: 16,
    sequences: [
      [
        "play",
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
        "play",
        null,
        null,
        null,
      ],
    ],
    currentSequenceIndex: 0,
    interval: "16n",
  },

  kick: {
    volume: 1,
    tone: 0,
  },

  snare: {
    volume: 1,
    tone: 0
  },

  openHat: {
    volume: 1,
    tone: 0,
  },

  closeHat: { 
    volume: 1,
    tone: 0,
  }

};

export {
  masterDefaultParametrs,
  droneSynthDefaultParametrs,
  seqSynthDefaultParametrs,
  noiseGeneratorDefaultParametrs,
  drumMachineDefaultParametrs,
};
