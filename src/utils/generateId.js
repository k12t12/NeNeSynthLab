export default function generateId() {
    const array = new Uint32Array(2);
    const random = self.crypto.getRandomValues(array);
    return Number("" + random[0] + random[1])
}