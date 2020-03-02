function createStyle(params) {
  const {
    name, fontSize, fontFamily, fontWeight, color,
  } = params;

  return `<style>
              .${name} { font: ${fontWeight} ${fontSize} ${fontFamily}; fill: ${color}; }
          </style>`;
}

export default createStyle;
