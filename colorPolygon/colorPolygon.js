var gl;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    var vertices = [
        //left_ear
        vec2(-0.8,0.8),
        vec2(-0.5,0.8),
        vec2(-0.1,0.35),
        vec2(-0.1,0.2),
        vec2(-0.7,0.6),

        //right_ear
        vec2(0.8,0.8),
        vec2(0.5,0.8),
        vec2(0.1,0.35),
        vec2(0.1,0.2),
        vec2(0.7,0.6),
        
        //head_01
        vec2(-0.2,0.35),
        vec2(-0.25,0.3),
        vec2(-0.35,0),
        vec2(0.35,0),
        vec2(0.25,0.3),
        vec2(0.2,0.35),

        //head_02
        vec2(-0.35,0),
        vec2(-0.45,-0.125),
        vec2(-0.45,-0.3),
        vec2(-0.2,-0.4),
        vec2(0.2,-0.4),
        vec2(0.45,-0.3),
        vec2(0.45,-0.125),
        vec2(0.35,0),

        //mouth_1
        vec2(-0.2,-0.4),
        vec2(-0.1,-0.05),
        vec2(0,-0.1),
        vec2(0.1,-0.05),
        vec2(0.2,-0.4),

        //nose
        vec2(-0.08,-0.16),
        vec2(-0.08,-0.07),
        vec2(0,-0.12),
        vec2(0.08,-0.07),
        vec2(0.08,-0.16),

        //mouth_2
        vec2(-0.025,-0.24),
        vec2(0,-0.16),
        vec2(0.025,-0.24),
        vec2(0,-0.32),

        //left_eye
        vec2(-0.2,0.25),
        vec2(-0.25,0.185),
        vec2(-0.26,0.11),
        vec2(-0.2,0.05),
        
        vec2(-0.21,0.23),
        vec2(-0.24,0.184),
        vec2(-0.24,0.174),
        vec2(-0.21,0.164),
        //right_eye
        vec2(0.2,0.25),
        vec2(0.25,0.185),
        vec2(0.26,0.11),
        vec2(0.2,0.05),
   
        vec2(0.21,0.23),
        vec2(0.24,0.184),
        vec2(0.24,0.174),
        vec2(0.21,0.164),

    ];

    var colors =[
        vec4(0.6,0.4,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.6,0.4,0,1),
        vec4(0.6,0.4,0,1),
        
        vec4(0.6,0.4,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.6,0.4,0,1),
        vec4(0.6,0.4,0,1),

        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),

        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),
        vec4(0.7,0.5,0,1),

        vec4(0.9,0.7,0.4,1),
        vec4(0.9,0.7,0.4,1),
        vec4(0.9,0.7,0.4,1),
        vec4(0.9,0.7,0.4,1),
        vec4(0.9,0.7,0.4,1),

        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),

        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),
        vec4(0,0,0,1),

        vec4(0.2,0.2,0.2,1),
        vec4(0.2,0.2,0.2,1),
        vec4(0.2,0.2,0.2,1),
        vec4(0.2,0.2,0.2,1),
        
        vec4(1,1,1,1),
        vec4(1,1,1,1),
        vec4(1,1,1,1),
        vec4(1,1,1,1),
       
        vec4(0.2,0.2,0.2,1),
        vec4(0.2,0.2,0.2,1),
        vec4(0.2,0.2,0.2,1),
        vec4(0.2,0.2,0.2,1),

        vec4(1,1,1,1),
        vec4(1,1,1,1),
        vec4(1,1,1,1),
        vec4(1,1,1,1),

    ];
    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);//색 결정

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);//flatten:데이터를 32비트로 변환해줌(gpu는 데이터를 32비트로 읽음)

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cbufferId=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program,"vColor");
    gl.vertexAttribPointer(vColor,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vColor);

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);//결정한 색 칠함
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);//첫번째 점과 마지막 2개점 연결
    gl.drawArrays(gl.TRIANGLE_FAN,5,5);
    gl.drawArrays(gl.TRIANGLE_FAN,10,6);
    gl.drawArrays(gl.TRIANGLE_FAN,16,8);
    gl.drawArrays(gl.TRIANGLE_FAN,24,5);
    gl.drawArrays(gl.TRIANGLE_FAN,29,5);
    gl.drawArrays(gl.TRIANGLE_FAN,34,4);
    gl.drawArrays(gl.TRIANGLE_FAN,38,4);
    gl.drawArrays(gl.TRIANGLE_FAN,42,4);
    gl.drawArrays(gl.TRIANGLE_FAN,46,4);
    gl.drawArrays(gl.TRIANGLE_FAN,50,4);
    //(그리는 방식,시작할 인덱스번호,번호부터 그릴 개수)

}