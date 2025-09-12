import useNoiseGenerator from "./useNoiseGenerator";

export default function noiseGeneratorComponent() {
    const {
        xRatio,
        yRatio,
        setXratio,
        setYratio} = useNoiseGenerator()
    const handlerNumberXRatio = (e)=> {
        setXratio(e)
    }
    const handlerNumberYRatio = (e)=> {
        setYratio(e)
    }

    return (
        <>
        
        <input type="number"/> 
        <input type="number"/> 
        
        
        </>
    )
}