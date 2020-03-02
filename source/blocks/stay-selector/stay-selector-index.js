import StaySelector from './scripts/StaySelector';

($(document).ready(() => {
  $('.js-stay-selector').each(function f() {
    new StaySelector($(this));
  });
}));
