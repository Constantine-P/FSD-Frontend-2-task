function createCircle(params) {
  const {
    x, y, radius, gradient, name,
  } = params;
  return `<circle cx="${x}" cy="${y}" r="${radius}" fill="url(#${gradient})" data-name = "${name}"></circle>`;
}

export default createCircle;
