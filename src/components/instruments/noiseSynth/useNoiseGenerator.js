import { useState, useEffect, useRef } from "react"
import NoiseGenerator from "../../../services/noiseGenerator"
export default function useNoiseGenerator() {

    const noiseGenerator = useRef(null)
    const [xRatio, setXratio] = useState(0.3)
    const [yRatio, setYratio] = useState(0.002)

     useEffect(() => {
        noiseGenerator.current = new NoiseGenerator()

    return () => {
      if (noiseGenerator.current) {
        noiseGenerator.current.stopSound()
        noiseGenerator.current.player.dispose()

      }
    };
  }, []);

    useEffect(()=>{

        noiseGenerator.current.updateNoise(xRatio, yRatio)
    }, [xRatio, yRatio])

    return {
        xRatio,
        yRatio,
        setXratio,
        setYratio

    }
}