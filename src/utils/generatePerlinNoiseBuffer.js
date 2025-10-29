import Perlin from "./perlin";

onmessage = function (e) {

const {xRatio, yRatio, length} = e.data
const perlin = new Perlin();
const data = []
console.log(xRatio, yRatio)

for (let i = 0; i < length; i++) {
    data[i] = Math.abs(perlin.get((i * xRatio) / 1000, i * yRatio));
}

postMessage(data)
}
