import createCircle from './createCircle';
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
    const partMouseOverHandler = (e) => {
      [textNumber.innerHTML, textWord.innerHTML] = e.target.dataset.hoverText.split(' ');
      textNumber.classList.remove(textNumber.classList[0]);
      textWord.classList.remove(textWord.classList[0]);
      textNumber.classList.add(`${e.target.dataset.class}-number`);
      textWord.classList.add(`${e.target.dataset.class}-word`);
    };
    this.donut.querySelectorAll('path').forEach((item) => {
      item.addEventListener('mouseover', partMouseOverHandler);
    });

    const dotMouseOverHandler = (e) => {
      this.donut.querySelectorAll('path').forEach((arc) => {
        if (arc.dataset.name === e.target.dataset.name) {
          arc.dispatchEvent(new Event('mouseover'));
        }
      });
    };

    const dotMouseOutHandler = (e) => {
      this.donut.querySelectorAll('path').forEach((arc) => {
        if (arc.dataset.name === e.target.dataset.name) {
          arc.dispatchEvent(new Event('mouseout'));
        }
      });
    };

    this.legend.querySelectorAll('circle').forEach((item) => {
      item.addEventListener('mouseover', dotMouseOverHandler);
      item.addEventListener('mouseout', dotMouseOutHandler);
    });

    this.legend.querySelectorAll('text').forEach((item) => {
      item.addEventListener('mouseover', dotMouseOverHandler);
      item.addEventListener('mouseout', dotMouseOutHandler);
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
    const {
      width, height, rowGap, textGap, dotSize,
    } = this.params.legend;
    const {
      fontSize, fontFamily, fontWeight, color,
    } = this.params.styles.legend;
    const { parts } = this.params;

    let svg = `<svg class="donut-legend" width = "${width}" height = "${height}">`;

    svg += createStyle({
      name: 'legend',
      fontSize,
      fontFamily,
      fontWeight,
      gradientName: color,
    });

    parts.forEach((item, i) => {
      svg += createCircle({
        x: dotSize,
        y: dotSize + rowGap * (i + 0.5),
        radius: dotSize,
        gradient: item.gradient.name,
        name: item.title,
      });

      svg += createText({
        x: dotSize + textGap,
        y: dotSize + rowGap * (i + 0.5),
        text: item.title,
        baseline: 'middle',
        textAnchor: 'start',
        svgClass: 'legend',
        name: item.title,
      });
    });

    svg += '</svg>';

    this.legend.innerHTML = svg;
  }
}

export default DonutChart;
