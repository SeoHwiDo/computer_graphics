var gl;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    var vertices = [
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5),
        vec2(0,-1)
    ];

    // Configure WebGL
    gl.viewport(100, 100, 0, canvas.width/2, canvas.height/2);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_LOOP,0,5);
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);//첫번째 점과 마지막 2개점 연결
    // gl.drawArrays(gl.TRIANGLES, 0, 4);//점 3개씩 끊어서 연결
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);//3개 이후 점 추가 될떄 지난 마지막 2개 점과 함께 삼각형 그림
}
