export default function getIntervalFromNote(note) {
  const offset = 57;
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];

  if (note.length === 2) {
  return notes.indexOf(note[0]) + (12 * note[1]) - offset;
  }
  if (note.length === 3) {
    return notes.indexOf(note.slice(0,2)) + (12 * note[2]) - offset
  }
}
