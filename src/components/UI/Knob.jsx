import { useCallback, useRef, useEffect, useState, useLayoutEffect } from "react";
import interpolateToNewRange from "../../utils/interpolateToNewRange";
import "../../assets/knob.css"

export default function KnobComponent({onChange, max, min, step, initValue}) {
  const elementRef = useRef()
     const internalState = useRef({
    knobX: 0,
    knobY: 0,
    radius: 0
  });
  const [angle, useAngle] = useState(interpolateToNewRange(initValue, min, max, 0, 360)*(-1))
 
  
      const onMouseMove = 
    (ev) => {
    let angle = (Math.atan2(internalState.current.knobY - ev.clientY, internalState.current.knobX - ev.clientX) *180) / Math.PI - 180
    let value = interpolateToNewRange(angle*(-1),0,360,min/Number(step),max/Number(step))
    let afterPoint = ''
    if (step.indexOf('.')!=-1) {
      afterPoint = (step.slice([step.indexOf('.')+1],step.length))
    } else {
      afterPoint = ""
    }
    
   
    useAngle(angle)
    console.log(value)
    onChange((Math.round(value)*Number(step)).toFixed(afterPoint.length)*1)

    }
    const onMouseUp = (ev) => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

    }

    const onMouseDown = (ev) => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    useLayoutEffect(() => {
    let knobBoundaries = elementRef?.current?.getBoundingClientRect();

    internalState.current.radius = knobBoundaries.width / 2;
    internalState.current.knobX = knobBoundaries.x + internalState.current.radius;
    internalState.current.knobY = knobBoundaries.y + internalState.current.radius;
  
  }, []);
    return (<div  >
    <button 
      className="knob"
     ref = {elementRef}
     onMouseDown={onMouseDown}
     style={{
        transform: "rotate(" + angle + "deg"
        }} >  <div className="arrow"> - </div> </button>
    </div>)
}