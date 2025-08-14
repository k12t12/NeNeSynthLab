export default function interpolateToNewRange(value, min, max, newMin, newMax) {
    let newValue = ((value - min) * (newMax - newMin) + newMin * max - newMin * min) / (max - min)
    return newValue

}