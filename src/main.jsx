import { createRoot } from 'react-dom/client'
import {getTransport} from 'tone'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(

    <App />
 
)


getTransport().bpm.value = 140;
getTransport().start()
