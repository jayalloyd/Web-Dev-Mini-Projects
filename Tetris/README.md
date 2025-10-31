# Tetris Game

A classic Tetris game implementation using HTML5 Canvas and vanilla JavaScript.


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [How to Play](#how-to-play)
- [Scoring](#scoring)
- [File Structure](#file-structure)
- [Technical Details](#technical-details)
- [Browser Compatibility](#browser-compatibility)
- [License](#license)
- [Credits](#credits)

## 🎮 Overview

This is a browser-based Tetris game featuring smooth gameplay, a next-piece preview, and score tracking. The game follows traditional Tetris mechanics where players must arrange falling blocks (Tetrominoes) to complete horizontal lines.

## ✨ Features

- **7 Classic Tetromino Shapes**: I, J, L, S, Z, T, and O pieces
- **Next Piece Preview**: See what piece is coming next
- **Score System**: Earn points by clearing lines
- **High Score Tracking**: Your best score persists during the session
- **Smooth Controls**: Responsive keyboard controls for piece movement and rotation
- **Color-Coded Pieces**: Each piece type has a unique color

## 🎯 Demo

Simply open `index.html` in your browser to play!


## 🎲 How to Play

### Starting the Game

1. Open `index.html` in a web browser
2. Read the instructions on the welcome screen
3. Click the **"Start Game"** button to begin

### Controls

| Key | Action |
|-----|--------|
| ⬆️ Arrow Up | Rotate the current piece clockwise |
| ⬇️ Arrow Down | Move piece down faster |
| ⬅️ Arrow Left | Move piece left |
| ➡️ Arrow Right | Move piece right |

### Objective

Arrange falling blocks (Tetrominoes) to form complete horizontal lines. When a line is complete, it disappears and you earn points. The game ends when the blocks reach the top of the playing field.

## 🏆 Scoring

| Lines Cleared | Points Awarded |
|---------------|----------------|
| 1 line | +10 points |
| 2 lines | +30 points |
| 3 lines | +50 points |
| 4+ lines | +100 points |

## 📁 File Structure

```
tetris-game/
│
├── index.html      # Main HTML file with game structure
├── style.css       # CSS styling for the game interface
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## 🔧 Technical Details

### Game Configuration

- **Grid Size**: 20 rows × 10 columns
- **Game Speed**: Pieces fall every 500ms
- **Canvas Rendering**: Uses HTML5 Canvas API with 30×30 pixel scaling

### Code Structure

#### Key Variables

```javascript
grid              // 2D array representing the game board
fallingPieceObj   // Current active piece being controlled
nextPieceObj      // Preview of the next piece
score             // Current game score
highScore         // Highest score achieved in the session
```

#### Main Functions

| Function | Description |
|----------|-------------|
| `newGameState()` | Updates game state each tick |
| `checkGrid()` | Checks for completed lines and updates score |
| `moveDown()`, `moveLeft()`, `moveRight()` | Handle piece movement |
| `rotate()` | Rotates the current piece 90° clockwise |
| `collision()` | Detects collisions with grid boundaries and placed pieces |
| `renderGame()` | Draws the game board and active piece |

### Piece Definitions

The game includes all 7 standard Tetromino shapes defined in the `SHAPES` array, each represented as a 2D binary array:

- **I-piece**: Straight line (4 blocks)
- **J-piece**: L-shape facing left
- **L-piece**: L-shape facing right
- **S-piece**: Z-shape (left)
- **Z-piece**: Z-shape (right)
- **T-piece**: T-shape
- **O-piece**: Square (2×2)

## 🌐 Browser Compatibility

This game works in all modern browsers that support:

- ✅ HTML5 Canvas
- ✅ ES6 JavaScript
- ✅ CSS3

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This is a learning project and is free to use and modify.

## 👏 Credits

Classic Tetris game mechanics and design inspired by the original Tetris created by **Alexey Pajitnov** in 1985.

---