import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {getTransport, getContext, Player, Time} from 'tone'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

getTransport().bpm.value = 100;
getTransport().start()

