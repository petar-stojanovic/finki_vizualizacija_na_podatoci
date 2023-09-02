export const getRandomColor = (count) => {
  var colors = [];
  for (var i = 0; i < count; i++) {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var x = 0; x < 6; x++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  return colors;
};
