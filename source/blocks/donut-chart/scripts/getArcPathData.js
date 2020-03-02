import polarToCartesian from './polarToCartesian';

function getArcPathData(x, y, radius, startAngle, endAngle) {
  const isCircle = Math.round(endAngle - startAngle) % 360 === 0;
  endAngle = isCircle ? endAngle - 0.01 : endAngle;
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
  ];
  return d.join(' ');
}

export default getArcPathData;
