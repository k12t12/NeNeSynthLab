//load and compile shader (fragment or vertex) from string
export default function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (ok) {
    return shader;
  }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader); //delete if not ok(
}