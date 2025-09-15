export default function findZeroCrossing(buffer, startIndex = 1) {
  const data = buffer.getChannelData(0);
  
  for (let i = startIndex; i < data.length - 1; i++) {
    if (Math.abs(data[i] - data[data.length-1]) < 0.001) {
      return i/buffer.sampleRate
      
    }
  }
  return 0;
}
