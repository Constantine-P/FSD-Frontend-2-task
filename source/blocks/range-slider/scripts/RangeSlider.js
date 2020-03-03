import 'jquery-ui-slider/jquery-ui';

class RangeSlider {
  constructor(slider) {
    this.slider = slider;
    this.init();
    this.createSlider();
  }

  init() {
    this.container = this.slider.querySelector('.js-slider-container');
    this.hint = this.slider.querySelector('.js-hint');
    const data = this.container.dataset;
    this.min = Number(data.min);
    this.max = Number(data.max);
    this.startValue = Number(data.startValue);
    this.endValue = Number(data.endValue);
    this.step = Number(data.step);
    this.currency = data.currency;
  }

  setHintText() {
    const getPriceFormat = (value) => `${value.toLocaleString()}${this.currency}`;
    this.hint.textContent = `${getPriceFormat(this.min)} - ${getPriceFormat(this.max)}`;
  }

  createSlider() {
    const {
      min, max, step, startValue, endValue,
    } = this;
    const ths = this;
    $(this.container).slider({
      range: true,
      min,
      max,
      step,
      values: [startValue, endValue],
      slide(event, ui) {
        [ths.min, ths.max] = ui.values;
        ths.setHintText();
      },
    });
  }
}

export default RangeSlider;
