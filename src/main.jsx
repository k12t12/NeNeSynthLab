import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {getTransport, getContext, Player, Time} from 'tone'
import DrumMachine from './services/drumMachine.js'
import { drumMachineDefaultParametrs } from './utils/defaultParametrs.js'
import KickSynth from './services/kickSynth.js'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(

    <App />
 
)


getTransport().bpm.value = 140;
getTransport().start()
