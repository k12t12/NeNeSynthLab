export default function parseHexToRGB(hexColor) {
    const rgb = [0, 0, 0, 1]
    for (let i in rgb) {
        rgb[i] = parseInt(hexColor[i*2 + 1] + hexColor[i*2 + 2], 16) / 255
        
    }
    
    return rgb
}
