/*
Ethan Wight
March 30, 2025
CMSC 410
Project 2
*/

var gl;
var program;
var bufferId;
var cBuffer;
var vPosition;
var vColor;

// Store all squares vertices
var squares = [];
var initialSize = 1.5;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);

    // Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Create buffers
    bufferId = gl.createBuffer();
    cBuffer = gl.createBuffer();

    // Get attribute locations
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");

    // Create initial square
    createInitialSquare();

    // Setup keyboard event listeners
    window.addEventListener("keydown", function(event) {
        if (event.key === 'a') {
            addInnerSquare();
        } else if (event.key === 'z') {
            removeInnerSquare();
        }
    });

    // Initial render
    render();
};

function createInitialSquare() {
    var halfSize = initialSize / 2;
    squares = [[
        -halfSize, -halfSize,
        halfSize, -halfSize,
        halfSize, halfSize,
        -halfSize, halfSize
    ]];
}

function getMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function addInnerSquare() {
    if (squares.length === 0) return;

    var lastSquare = squares[squares.length - 1];
    var newSquare = [];

    // Get midpoints of each side
    for (var i = 0; i < 4; i++) {
        var x1 = lastSquare[i * 2];
        var y1 = lastSquare[i * 2 + 1];
        var x2 = lastSquare[((i + 1) % 4) * 2];
        var y2 = lastSquare[((i + 1) % 4) * 2 + 1];
        
        var midpoint = getMidpoint(x1, y1, x2, y2);
        newSquare.push(midpoint[0], midpoint[1]);
    }

    squares.push(newSquare);
    render();
}

function removeInnerSquare() {
    if (squares.length > 1) {  // Keep at least the outer square
        squares.pop();
        render();
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Combine all squares into one vertex array
    var vertices = [];
    var colors = [];
    
    squares.forEach((square, index) => {
        vertices.push(...square);
        
        // Add colors for each vertex (4 vertices per square)
        for (var i = 0; i < 4; i++) {
            colors.push(0.0, 0.0, 0.0, 1.0); // Black color
        }
    });

    // Load vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Load colors
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Draw each square
    squares.forEach((square, index) => {
        gl.drawArrays(gl.LINE_LOOP, index * 4, 4);
    });
}
