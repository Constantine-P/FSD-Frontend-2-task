import createArcPath from './createArcPath';
import createGradient from './createGradient';
import createStyle from './createStyle';
import createText from './createText';

class DonutChart {
  constructor(container, params) {
    this.container = container;
    this.donut = container.querySelector('.js-donut');
    this.legend = container.querySelector('.js-legend');
    this.params = params;
    this.draw();
    this.drawLegend();
    this.addHandlers();
  }

  addHandlers() {
    const [textNumber, textWord] = this.container.querySelectorAll('text');
    const handlePartMouseOver = (e) => {
      [textNumber.innerHTML, textWord.innerHTML] = e.target.dataset.hoverText.split(' ');
      textNumber.classList.remove(textNumber.classList[0]);
      textWord.classList.remove(textWord.classList[0]);
      textNumber.classList.add(`${e.target.dataset.class}-number`);
      textWord.classList.add(`${e.target.dataset.class}-word`);
    };
    this.donut.querySelectorAll('path').forEach((item) => {
      item.addEventListener('mouseover', handlePartMouseOver);
    });

    const handleDotMouseOver = (e) => {
      this.donut.querySelectorAll('path').forEach((arc) => {
        const isTarget = (arc.dataset.name === e.currentTarget.dataset.name)
          && e.target.classList.contains('donut-chart__legend-row')
          && !e.target.contains(e.relatedTarget);
        if (isTarget) arc.dispatchEvent(new Event('mouseover'));
      });
    };

    const handleDotMouseOut = (e) => {
      this.donut.querySelectorAll('path').forEach((arc) => {
        const isTarget = (arc.dataset.name === e.currentTarget.dataset.name)
          && e.target.classList.contains('donut-chart__legend-row')
          && !e.target.contains(e.relatedTarget);
        if (isTarget) arc.dispatchEvent(new Event('mouseout'));
      });
    };

    this.legend.querySelectorAll('.donut-chart__legend-row').forEach((item) => {
      item.addEventListener('mouseover', handleDotMouseOver);
      item.addEventListener('mouseout', handleDotMouseOut);
    });
  }

  draw() {
    const {
      width, height, radius,
      strokeWidth,
      gap,
      animStrokeWidth, animDuration,
    } = this.params.donut;
    const { parts, styles } = this.params;

    let svg = `<svg class="donut" width = "${width}" height = "${height}">`;

    let sumAngle = 0;

    parts.slice().reverse().forEach((part) => {
      const {
        value, title, gradient, hoverText,
      } = part;

      svg += createGradient(gradient);

      svg += createStyle({
        name: `${part.gradient.name}-number`,
        fontSize: styles.number.fontSize,
        fontFamily: styles.number.fontFamily,
        fontWeight: styles.number.fontWeight,
        color: `url(#${gradient.name})`,
      });

      svg += createStyle({
        name: `${part.gradient.name}-word`,
        fontSize: styles.word.fontSize,
        fontFamily: styles.word.fontFamily,
        fontWeight: styles.word.fontWeight,
        color: `url(#${gradient.name})`,
      });

      svg += createArcPath({
        x: width * 0.5,
        y: height * 0.5,
        radius,
        stroke: `url(#${gradient.name})`,
        strokeWidth,
        animStrokeWidth,
        animDuration,
        startAngle: sumAngle + ((value !== 0) ? gap / 2 : 0),
        endAngle: value - ((value !== 0) ? gap / 2 : 0) + sumAngle,
        name: title,
        hoverText,
        svgClass: gradient.name,
      });

      sumAngle += value;
    });

    svg += createText({
      x: width / 2,
      y: height / 2,
      text: parts[0].hoverText.split(' ')[0],
      baseline: 'baseline',
      textAnchor: 'middle',
      svgClass: `${parts[0].gradient.name}-number`,
    });

    svg += createText({
      x: width / 2,
      y: height / 2,
      text: parts[0].hoverText.split(' ')[1],
      baseline: 'hanging',
      textAnchor: 'middle',
      svgClass: `${parts[0].gradient.name}-word`,
    });

    svg += '</svg>';

    this.donut.innerHTML = svg;
  }

  drawLegend() {
    this.params.parts.forEach((item) => {
      const row = document.createElement('li');
      row.classList.add('donut-chart__legend-row');
      row.dataset.name = item.title;

      const text = document.createElement('span');
      text.classList.add('donut-chart__legend-text');
      text.textContent = item.title;

      const circle = document.createElement('div');
      circle.classList.add('donut-chart__legend-circle');
      circle.classList.add(`donut-chart__legend-circle_${item.gradient.name}`);

      row.append(circle, text);
      this.legend.append(row);
    });
  }
}

export default DonutChart;
