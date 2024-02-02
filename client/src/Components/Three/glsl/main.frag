uniform sampler2D uTexture;
uniform float uNbLines;
uniform float uNbColumns;
uniform float uProgress;
varying vec2 vTexCoords;

float circle(vec2 uv, float border) {
    float radius = 0.5;
    float dist = radius - length(uv - vec2(0.5));
    return smoothstep(0.0, border, dist);
}

void main() {
    vec2 uv = gl_PointCoord;
    uv.y *= -1.0; // Flip UV vertically
    uv /= vec2(uNbColumns, uNbLines);

    float texOffsetU = vTexCoords.x / uNbColumns;
    float texOffsetV = vTexCoords.y / uNbLines;
    uv += vec2(texOffsetU, texOffsetV);
    uv += vec2(0.5);

    vec4 textureColor = texture2D(uTexture, uv);

    gl_FragColor = textureColor;
    gl_FragColor.a *= circle(gl_PointCoord, 0.2); // Apply circle function to alpha

    gl_FragColor.a *= uProgress; // Apply progress uniform to alpha
}
