export default function getNoteFromInterval(interval){
  //interval from base note (440H, A4) to current note
  const offset = 57;
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ]
  const note = {
    name: notes[((interval + offset) % 12)] + '' + (Math.floor((interval + offset) / 12)),
    freq: 440 * (2 ** (interval/12))
  }
  return note
}


