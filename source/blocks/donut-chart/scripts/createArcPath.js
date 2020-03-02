import getArcPathData from './getArcPathData';
import createAnimation from './createAnimation';

function createArcPath(params) {
  const {
    x, y, radius,
    startAngle, endAngle,
    stroke, strokeWidth,
    animStrokeWidth, animDuration,
    name,
    hoverText,
    svgClass,
  } = params;

  const d1 = getArcPathData(
    x, y, radius - (animStrokeWidth - strokeWidth) / 2,
    startAngle, endAngle,
  );

  const d = getArcPathData(
    x, y, radius,
    startAngle, endAngle,
  );

  let svg = `<path stroke = "${stroke}" stroke-width = "${(startAngle !== endAngle) ? strokeWidth : 0}" d = "${d}" fill = "none"
      data-name = "${name}" data-hover-text = "${hoverText}" data-class = "${svgClass}">`;

  if (startAngle !== endAngle) {
    svg += createAnimation({
      attributeName: 'd',
      from: d,
      to: d1,
      duration: animDuration,
      begin: 'mouseover',
    });

    svg += createAnimation({
      attributeName: 'd',
      from: d1,
      to: d,
      duration: animDuration,
      begin: 'mouseout',
    });

    svg += createAnimation({
      attributeName: 'stroke-width',
      from: strokeWidth,
      to: animStrokeWidth,
      duration: animDuration,
      begin: 'mouseover',
    });

    svg += createAnimation({
      attributeName: 'stroke-width',
      from: animStrokeWidth,
      to: strokeWidth,
      duration: animDuration,
      begin: 'mouseout',
    });
  }
  svg += '</path>';

  return svg;
}

export default createArcPath;
