import StaySelector from './scripts/StaySelector';

($(document).ready(() => {
  $('.stay-selector').each(function f() {
    new StaySelector($(this));
  });
}));
