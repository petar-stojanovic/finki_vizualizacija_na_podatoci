export const getRandomColor = (count) => {
    var colors = [];
    for (var i = 0; i < count; i++) {
      // Generate lighter shades by limiting the range of RGB values
      var r = Math.floor(Math.random() * 156) + 100; // Red component (100-255)
      var g = Math.floor(Math.random() * 156) + 100; // Green component (100-255)
      var b = Math.floor(Math.random() * 156) + 100; // Blue component (100-255)
  
      // Convert RGB values to hexadecimal
      var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  
      colors.push(color);
    }
    return colors;
  };