
vec3 coords = normal;
coords.y += uTime;
vec3 noisePattern = vec3(noise(coords / 1.5));
float pattern = wave(noisePattern + uTime);

// varyings
vDisplacement = pattern;


float displacement = vDisplacement / 5.0;

transformed += normalize(objectNormal) * displacement;