import 'air-datepicker/dist/js/datepicker.min.js';
import defaultOptions from './defaultOptions';

class StaySelector {
  constructor(staySelector, options = {}) {
    options = { ...defaultOptions, ...options };
    this.staySelector = staySelector;
    this.options = options;
    this.init(options);
    this.addHandlers();
    this.appendButtonApply();
    this.selectDates();
  }

  init(options) {
    this.arrivalInput = this.staySelector.querySelector('.js-arrival-day');
    this.departureInput = this.staySelector.querySelector('.js-departure-day');
    if (this.arrivalInput && this.departureInput) {
      this.datepicker = $(this.arrivalInput).datepicker({
        ...options,
        onSelect: this.onDateSelect.bind(this),
      }).data('datepicker');
    } else {
      this.arrivalInput = this.staySelector.querySelector('.js-stay-dates');
      this.datepicker = $(this.staySelector.querySelector('.js-stay-dates')).datepicker({
        ...options,
        dateFormat: 'd M',
      }).data('datepicker');
    }

    this.buttons = this.datepicker.$datepicker.get(0).querySelector('.datepicker--buttons');
    this.days = this.datepicker.$datepicker.get(0).querySelector('.datepicker--days');
  }

  onDateSelect() {
    let [arrivalDate, departureDate] = this.arrivalInput.value
      .split(this.options.multipleDatesSeparator);
    if (arrivalDate === undefined) arrivalDate = '';
    if (departureDate === undefined) departureDate = '';
    this.arrivalInput.value = arrivalDate;
    if (this.departureInput) {
      this.departureInput.value = departureDate;
    }
  }

  addHandlers() {
    const handleDepartureInputFocus = (e) => {
      e.preventDefault();
      this.datepicker.show();
    };

    if (this.departureInput) {
      this.departureInput.addEventListener('click', handleDepartureInputFocus);
    }

    const handleDatepickerClick = (e) => {
      if (e.target.classList.contains('datepicker--nav-title')) {
        this.days.classList.add('datepicker--days_hidden');
      } else if (e.target.classList.contains('datepicker--cell-month')) {
        this.days.classList.remove('datepicker--days_hidden');
      }
    };

    this.datepicker.$datepicker.get(0).addEventListener('click', handleDatepickerClick);
  }

  appendButtonApply() {
    const buttonApply = document.createElement('span');
    buttonApply.textContent = 'Применить';
    buttonApply.classList.add('datepicker--button-apply');
    this.buttons.append(buttonApply);
    const handleClick = () => this.datepicker.hide();
    buttonApply.addEventListener('click', handleClick);
  }

  selectDates() {
    const arrivalDate = JSON.parse(this.staySelector.dataset.arrivalDate || '""');
    const departureDate = JSON.parse(this.staySelector.dataset.departureDate || '""');
    if (arrivalDate) this.datepicker.selectDate(new Date(arrivalDate));
    if (departureDate) this.datepicker.selectDate(new Date(departureDate));
  }
}

export default StaySelector;
