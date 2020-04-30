#ifdef GL_ES
precision highp float;
#endif

varying vec4 normal;
varying vec4 coords;

uniform int supplies_dropped;

void main(){
    float limit = -0.6 + (1.2/5.0) * float(supplies_dropped);

    if (coords.x > limit)
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1);
    else {
        gl_FragColor.rgb =  vec3(1.0 - (0.6 + coords.x / 0.6), 0.6 + coords.x / 0.6, 0);
        gl_FragColor.a = 1.0;
    }
}