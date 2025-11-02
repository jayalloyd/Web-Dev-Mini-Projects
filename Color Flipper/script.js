const flipBtn = document.getElementById('flipBtn');
    const colorBox = document.getElementById('colorBox');

    // Function to generate random hex color
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // Change color on button click
    flipBtn.addEventListener('click', () => {
      const newColor = getRandomColor();
      document.body.style.backgroundColor = newColor;
      colorBox.textContent = newColor;
      colorBox.style.background = newColor;
      colorBox.style.color = getTextColor(newColor);
    });

    // Function to make text readable (white/black based on background)
    function getTextColor(bgColor) {
      const color = bgColor.substring(1);
      const rgb = parseInt(color, 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 125 ? '#000' : '#fff';
    }