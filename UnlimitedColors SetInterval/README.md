# Unlimited Colors (setInterval)

A fun mini project that continuously changes the background color of the webpage at regular intervals using JavaScript’s **setInterval()** function.  
This is a great beginner project to understand how timing functions and DOM updates work together.

---

## Features

- Automatically changes background color every few milliseconds  
- Demonstrates use of `setInterval()` and random color generation  
- Simple and visually engaging  
- Lightweight, no frameworks used  
- Beginner-friendly JavaScript logic  

---

## Tech Stack

- **HTML5** – structure  
- **CSS3** – styling  
- **JavaScript (Vanilla)** – logic and timing function  

---

## preview

"./image.png"

---

## How It Works

The color is changed automatically by:
```javascript
setInterval(() => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  document.body.style.backgroundColor = randomColor;
}, 1000);
