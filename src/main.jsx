import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Tone from 'tone'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
Tone.getTransport().bpm.value = 100;
const synth = new Tone.Synth().toDestination();
const seq = new Tone.Sequence((time, note, index) => {
  console.log(Tone.getTransport().position)
    synth.triggerAttackRelease(note.name, "16n", time,note.volume);
    
}, [{name:"C3", volume:0.8}, {name:"C4", volume:0.5}], "16n").start(0);

Tone.getTransport().start()

