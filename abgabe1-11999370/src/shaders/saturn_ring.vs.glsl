#version 300 es
precision highp float;

// Implementation of the vertex shader for saturn ring texture mapping (total: 1p)

// TODO: pass vertex position to fragment shader


out vec2  uvCoordinates;


void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // TODO: pass vertex position to out variable
    

     uvCoordinates = uv;
        
    

}