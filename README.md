# Nested Squares WebGL Project

## Overview
This project demonstrates the creation and manipulation of nested squares using WebGL. Users can interactively add or remove inner squares through keyboard controls. Each new square is formed by connecting the midpoints of the previous square's sides.

## Author
Ethan Wight  

## Files Included
- **squares.html**: The HTML file containing the WebGL canvas and shader scripts
- **squares.js**: The JavaScript file containing all the WebGL initialization and rendering logic
- **webgl-utils.js**: Utility functions for WebGL (not included in this repository)
- **initShaders.js**: Shader initialization functions (not included in this repository)
- **MV.js**: Matrix/Vector mathematics library (not included in this repository)

## Features
- Displays a black square on a light gray background
- Allows adding inner squares by pressing the 'a' key
- Allows removing inner squares by pressing the 'z' key
- Each new square is created by connecting the midpoints of the sides of the previous square

## How It Works
1. The application starts with an initial square.
2. When the user presses 'a', a new square is created by finding the midpoints of each side of the innermost current square.
3. When the user presses 'z', the innermost square is removed (if there is more than one square).
4. All squares are rendered as wireframe outlines in black.

## Technical Implementation
- Uses WebGL for rendering the squares
- Implements vertex and fragment shaders for basic rendering
- Dynamically updates vertex buffers to add or remove squares
- Maintains an array of square vertices
- Uses the LINE_LOOP primitive to draw each square

## Setup and Running
1. Ensure all files (squares.html, squares.js, webgl-utils.js, initShaders.js, MV.js) are in the same directory.
2. Open squares.html in a WebGL-compatible browser.
3. Use the keyboard controls:
   - Press 'a' to add an inner square
   - Press 'z' to remove the innermost square

## Dependencies
- A modern web browser with WebGL support
- The following WebGL helper libraries:
  - webgl-utils.js
  - initShaders.js
  - MV.js

## Note
This project demonstrates the concept of recursive geometric transformation, where each new square is derived from the previous one by a simple transformation rule (connecting midpoints).
