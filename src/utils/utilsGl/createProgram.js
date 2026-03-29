//create program from vertex and fragment shaders (created by createShader util)
export default function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
     return program;
    }
     
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}