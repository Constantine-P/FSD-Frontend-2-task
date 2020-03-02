function createGradient(gradient) {
  let svg = `<linearGradient id = "${gradient.name}" x1 = "0" x2 = "0" y1 = "0" y2 = "1">`;
  gradient.values.forEach((color) => {
    svg += `<stop offset = "${color.offset}%" stop-color = "${color.color}"></stop>`;
  });
  svg += '</linearGradient>';
  return svg;
}

export default createGradient;
