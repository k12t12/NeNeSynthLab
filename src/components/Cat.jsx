import {useRef, useEffect} from "react"
import createShader from "../utils/utilsGl/createShader"
import createProgram from "../utils/utilsGl/createProgram"
import { OBJ } from "webgl-obj-loader"
import catModel from "../assets/cat_model/model.obj?raw"
import {m4} from "../utils/utilsGl/matrix3d"
import textureURL from "../assets/cat_model/texture.png?url"
import { getTransport } from "tone"

export default function CatComponent() {
    const catCanvas = useRef(null)
    
    useEffect(() => {
        function parseOBJ(objText) {
            const vertices = [];
            const texCoords = [];
            const normals = [];
            
 
            const outVertices = [];
            const outTexCoords = [];
            const outNormals = [];
            const indices = [];
            
            const lines = objText.split('\n');
            
    
            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                if (parts[0] === 'v') {
                    vertices.push(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    );
                } else if (parts[0] === 'vt') {
                    texCoords.push(
                        parseFloat(parts[1]),
                        parseFloat(parts[2])
                    );
                } else if (parts[0] === 'vn') {
                    normals.push(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    );
                }
            });
            
            console.log('Найдено вершин:', vertices.length / 3);
            console.log('Найдено текстур:', texCoords.length / 2);
            console.log('Найдено нормалей:', normals.length / 3);
            
         
            const vertexMap = new Map();
            let nextIndex = 0;
            

            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                if (parts[0] === 'f') {
       
                    for (let i = 1; i < parts.length; i++) {
                        const indices_str = parts[i].split('/');
                        const vIdx = parseInt(indices_str[0]) - 1;
                        const vtIdx = parseInt(indices_str[1]) - 1;
                        const vnIdx = parseInt(indices_str[2]) - 1;
                        
                  
                        const key = `${vIdx}/${vtIdx}/${vnIdx}`;
                        
                        if (!vertexMap.has(key)) {
                        
                            vertexMap.set(key, nextIndex);
                            
                           
                            outVertices.push(
                                vertices[vIdx * 3],
                                vertices[vIdx * 3 + 1],
                                vertices[vIdx * 3 + 2]
                            );
                            
                           
                            outTexCoords.push(
                                texCoords[vtIdx * 2],
                                texCoords[vtIdx * 2 + 1]
                            );
                            
                            outNormals.push(
                                normals[vnIdx * 3],
                                normals[vnIdx * 3 + 1],
                                normals[vnIdx * 3 + 2]
                            );
                            
                            nextIndex++;
                        }
                        
                        indices.push(vertexMap.get(key));
                    }
                    
          
                    if (parts.length - 1 === 4) {
                        const i1 = indices[indices.length - 4];
                        const i2 = indices[indices.length - 3];
                        const i3 = indices[indices.length - 2];
                        const i4 = indices[indices.length - 1];
                        
               
                        indices.splice(indices.length - 4, 4);
                        
                       
                        indices.push(i1, i2, i3);
                        indices.push(i1, i3, i4);
                    }
                }
            });
            
            console.log('Распаковано вершин:', outVertices.length / 3);
            console.log('Распаковано текстур:', outTexCoords.length / 2);
            console.log('Индексов:', indices.length);
            
            return {
                vertices: outVertices,
                texCoords: outTexCoords,
                normals: outNormals,
                indices: indices
            };
        }

    
        const modelData = parseOBJ(catModel);
        
        const vertexShaderCode = `
            attribute vec4 a_position;
            attribute vec2 a_texture_coords;
            uniform mat4 u_matrix;
            varying vec2 v_texture_coords;
            void main() {
                gl_PointSize = 2.0;
                gl_Position = u_matrix * a_position;
                v_texture_coords = a_texture_coords;
            }
        `;

        const fragmentShaderCode = `
            precision mediump float; 
            varying vec2 v_texture_coords;
            uniform sampler2D u_texture;
            void main() {
                vec4 color = texture2D(u_texture, v_texture_coords);
                if (color.r < 0.5) {
                    gl_FragColor = vec4(1,1,1,1);
                } else {
                    gl_FragColor = vec4(0,0,0,1);
                    }
                
            }
        `;

      
        const gl = catCanvas.current.getContext("webgl");
        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        
     
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);
        const program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        
      
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelData.vertices), gl.STATIC_DRAW);
        
        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelData.texCoords), gl.STATIC_DRAW);
        
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelData.indices), gl.STATIC_DRAW);
        
      
        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        
        const texCoordLocation = gl.getAttribLocation(program, "a_texture_coords");
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        
       
        const texture = gl.createTexture();
        const image = new Image();
        image.src = textureURL;
        
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
      
            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            const textureLocation = gl.getUniformLocation(program, "u_texture");
            gl.uniform1i(textureLocation, 0);
            
            
            window.requestAnimationFrame(draw);
        };
        
        const matrixLocation = gl.getUniformLocation(program, "u_matrix");
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        let r = 0;
        let prevTime = 0;
        
        const draw = (time) => {
            if (prevTime === 0) prevTime = time;
            const delta = (time - prevTime) / 1000;
            prevTime = time;
            
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
            const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            const projection = m4.orthographic(-0.4 * aspect, 0.7 * aspect, -0.1, 2, 4, -4);
            const modelMatrix = m4.multiply(
                m4.translation(0.2, 0.3, 0),
                m4.yRotation(r)
            );
            
            const matrix = m4.multiply(projection, modelMatrix);
            gl.uniformMatrix4fv(matrixLocation, false, matrix);
            
            r += delta * 2;
            
            gl.drawElements(gl.TRIANGLES, modelData.indices.length, gl.UNSIGNED_SHORT, 0);
            window.requestAnimationFrame(draw);
        };
        
    }, []);
    
    return (
        <>
            <canvas style = {{width: "24vh"}} id="3dcat" ref={catCanvas} width="300px" height="200px"></canvas>
        </>
    );
}