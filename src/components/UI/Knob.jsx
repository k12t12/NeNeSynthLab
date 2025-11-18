import { useCallback, useRef, useEffect, useState, useLayoutEffect } from "react";
import interpolateToNewRange from "../../utils/interpolateToNewRange";
import useInstrumentsStore from "../../store/instrumentsStore";

import styles from "../../assets/knob.module.css"

export default function KnobComponent({onChange, max, min, step, initValue}) {

  const instruments = useInstrumentsStore((state)=> state.instruments)

  const elementRef = useRef()
     const internalState = useRef({
    knobX: 0,
    knobY: 0,
    radius: 0
  });
  const [angle, useAngle] = useState(interpolateToNewRange(initValue, min, max, 0, 360)*(-1))
  useEffect(()=>{
    useAngle(interpolateToNewRange(initValue, min, max, 0, 360 * (-1)))
  },[initValue])
  
      const onMouseMove = 
    (ev) => {
      let clientX, clientY;
  
  if (ev.clientX !== undefined) {
    clientX = ev.clientX;
    clientY = ev.clientY;
  }
  
  else if (ev.touches && ev.touches.length > 0) {
    clientX = ev.touches[0].clientX;
    clientY = ev.touches[0].clientY;
  }
    let angle = (Math.atan2(internalState.current.knobY - clientY, internalState.current.knobX - clientX) *180) / Math.PI - 180
    let value = interpolateToNewRange(angle*(-1),0,360,min/Number(step),max/Number(step))
    let afterPoint = ''
    if (step.indexOf('.')!=-1) {
      afterPoint = (step.slice([step.indexOf('.')+1],step.length))
    } else {
      afterPoint = ""
    }
    
   
    useAngle(angle)
    onChange((Math.round(value)*Number(step)).toFixed(afterPoint.length)*1)

    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);

    }

    const onMouseDown = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
    }

    useLayoutEffect(() => {
    let knobBoundaries = elementRef?.current?.getBoundingClientRect();

    internalState.current.radius = knobBoundaries.width / 2;
    internalState.current.knobX = knobBoundaries.x + internalState.current.radius;
    internalState.current.knobY = knobBoundaries.y + internalState.current.radius;
  
  }, [instruments]);
    return (<div  >
    <button 
      className={styles.knob}
     ref = {elementRef}
     onTouchStart={onMouseDown}
     onMouseDown={onMouseDown}
     style={{
        transform: "rotate(" + angle + "deg"
        }} >  <div className={styles.arrow}> - </div> </button>
    </div>)
}