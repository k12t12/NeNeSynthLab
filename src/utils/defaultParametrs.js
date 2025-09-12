import getNoteFromInterval from "./getNoteFromInterval"

const droneSynthDefaultParametrs = {
  firstOsc: {
    interval: -9,
    freq: getNoteFromInterval(-9).freq,
    noteName: getNoteFromInterval(-9).name
  },

  secondOsc: {
    interval: -29,
    freq: getNoteFromInterval(-29).freq,
    noteName: getNoteFromInterval(-29).name
  },

  thirdOsc: {
    interval: -19,
    freq: getNoteFromInterval(-19).freq,
    noteName: getNoteFromInterval(-19).name
  },

  filterFreq: 1000,
  filterQ: 10,
  vibratoFreq: 1,
  vibratoDepth: 1,
  delayTime: 0.1,
  delayFeedback: 0.1
}

const seqSynthDefaultParametrs = {
  sequences: [
    ["C4", "C4", "C4", "C4", "C4", "C4", "C4","C4"],
    ["C4", "C4", "C4", "C4", "C4", "C4", "C4","C4"],
    ["C4", "C4", "C4", "C4", "C4", "C4", "C4","C4"],
    ["C4", "C4", "C4", "C4", "C4", "C4", "C4","C4"]
  ],
  currentSequenceIndex: 0,
  interval: "4n"

}
export {droneSynthDefaultParametrs, seqSynthDefaultParametrs}