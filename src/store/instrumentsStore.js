import {create} from "zustand"

const useInstrumentsStore = create((set) => ({
    instruments: [],
    addInstrument: (ins) => set((state) => ({ instruments: [...state.instruments, ins] })),
    removeInstrument: (id) => set((state) => ({ instruments: state.instruments.filter(ins => ins.id !== id) })),
    setInstrument: (id, updates) => set((state) => ({
    instruments: state.instruments.map(instrument =>
      instrument.id === id ? { ...instrument, ...updates } : instrument
    )
  })),
  loadInstruments: (newIns) => set(()=> ({instruments: newIns}))
    



}))

export default useInstrumentsStore