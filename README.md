# NeNeSynthLab
Minimalistic synth sandbox running in web. 
The core idea of this program was to make the process of creating live electronic music fun, simple, and accessible, making it feel more like working on a table with real instruments than is usually the case.

The program is still in the early stages of development, but I will try to add more features and instruments in a future version if this idea interests anyone.
<img width="1006" height="814" alt="image" src="https://github.com/user-attachments/assets/47e562b5-65ac-4cc9-ab70-911d299c1ff1" />
## Instruments info 🎛️
### Drone synth
A synthesizer using classic types of synthesis to create atmospheric drones. It consists of 3 oscillators (pulse), connected to a filter and an effects chain (vibrato and delay). For each oscillator, the pitch can be set according to notes. Perhaps in the future there will be a version of the instrument where the frequency can be set arbitrarily.
### Sequencer synth
Like the drone synth, this is also based on classic subtractive synthesis. It consists of a single oscillator (pulse wave), controlled by a classic 8-step sequencer and an AR envelope. The signal also runs through a filter and a delay.
### Noise Generator
A more specialized instrument for creating interesting sound effects. It generates noise using a Perlin algorithm. Initially, 2D noise is generated, from which a 1D signal (i.e., sound, logically) is extracted based on Xratio and Yratio coefficients. Visually, you can imagine it as cutting a strip of fixed size from a noise image, while being able to stretch that image. This can result in interesting textures. The noise itself passes through a filter, whose frequency is modulated by an LFO, and then through a delay.
### Drum machine
An instrument for rhythmic parts. It consists of a set of basic drum samples (kick, hi-hat, open hat, snare), controlled by a matrix sequencer. Each column in it represents a 1/16th note of a measure. For each sample, you can change the volume and pitch.

## Usage for devs
This part assumes you already have Node.js and npm installed.
Before start:
```bash
npm install
```
To debug:
```bash
npm run dev
```

To build:
```bash
npm run build
```
## License

This project is open source and available under the [MIT License](LICENSE).
