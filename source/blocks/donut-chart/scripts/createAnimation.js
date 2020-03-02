function createAnimation(params) {
  const {
    attributeName, from, to, duration, begin,
  } = params;
  return `<animate attributeName="${attributeName}" from="${from}" to="${to}" dur="${duration}ms" begin="${begin}" fill="freeze"></animate>`;
}

export default createAnimation;
