#version 300 es
precision highp float;

// Implementation of the fragment shader for saturn ring texture mapping (total: 2p)

// TODO: receive uniforms from three.js
uniform sampler2D ringTexture;






// TODO: receive vertex position from vertex shader
in  vec2 uvCoordinates;



// TODO: out variable for the fragment color

out vec4 I;



void main() {
    // TODO: UV mapping for the saturn ring texture
     I = texture2D(ringTexture,uvCoordinates);


    
     //do something with tingTexture and out positon
    

}