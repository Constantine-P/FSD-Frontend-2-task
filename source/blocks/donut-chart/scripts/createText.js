function createText(params) {
  const {
    x, y, text, baseline, svgClass, textAnchor, name,
  } = params;
  return `<text x = "${x}" y = "${y}" text-anchor="${textAnchor}" dominant-baseline="${baseline}"
    class="${svgClass}" data-name = "${name}">${text}</text>`;
}

export default createText;
