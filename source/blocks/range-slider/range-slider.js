import 'jquery-ui-slider/jquery-ui';

($(document).ready(() => {
  $('.range-slider__slider').each(function f() {
    const min = Number($(this).attr('data-min'));
    const max = Number($(this).attr('data-max'));
    const startValue = Number($(this).attr('data-start-value'));
    const endValue = Number($(this).attr('data-end-value'));
    const step = Number($(this).attr('data-step'));

    function getPriceFormat(value) {
      return (value).toLocaleString();
    }

    function setHintText(elem, values) {
      const rangeSlider = $(elem).closest('.range-slider');
      const hint = rangeSlider.find('.js-range-slider__hint');
      const hintText = `${getPriceFormat(values[0])}₽ - ${getPriceFormat(values[1])}₽`;
      hint.html(hintText);
    }

    setHintText(this, [startValue, endValue]);

    $(this).slider({
      range: true,
      min,
      max,
      step,
      values: [startValue, endValue],
      slide(event, ui) {
        setHintText(event.target, ui.values);
      },
    });
  });
}));
