import 'air-datepicker/dist/js/datepicker.min.js';

class StaySelector {
  constructor(staySelector) {
    this.staySelector = staySelector;
    this.init();
    this.addHandlers();
    this.appendButtonApply();
    this.selectDates();
  }

  init() {
    this.departureInput = this.staySelector.get(0).querySelector('.js-departure-day');
    if (this.departureInput) {
      this.arrivalInput = this.staySelector.get(0).querySelector('.js-arrival-day');
      this.datepicker = this.staySelector.find('.js-arrival-day').datepicker({
        navTitles: { days: 'MM yyyy' },
        startDate: new Date(2019, 7, 8),
        clearButton: true,
        range: true,
        onSelect: this.onDateSelect.bind(this),
      }).data('datepicker');
    } else {
      this.arrivalInput = this.staySelector.get(0).querySelector('.js-stay-dates');
      this.datepicker = this.staySelector.find('.js-stay-dates').datepicker({
        navTitles: { days: 'MM yyyy' },
        startDate: new Date(2019, 7, 8),
        dateFormat: 'd M',
        clearButton: true,
        range: true,
        multipleDatesSeparator: ' - ',
      }).data('datepicker');
    }

    this.buttons = this.datepicker.$datepicker.get(0).querySelector('.datepicker--buttons');
  }

  onDateSelect() {
    let [arrivalDate, departureDate] = this.arrivalInput.value.split(',');
    if (arrivalDate === undefined) arrivalDate = '';
    if (departureDate === undefined) departureDate = '';
    this.arrivalInput.value = arrivalDate;
    if (this.departureInput) {
      this.departureInput.value = departureDate;
    }
  }

  departureInputFocusHandler(e) {
    e.preventDefault();
    this.datepicker.show();
  }

  addHandlers() {
    if (this.departureInput) {
      this.departureInput.addEventListener('click', this.departureInputFocusHandler.bind(this));
    }
  }

  appendButtonApply() {
    const btnApply = document.createElement('span');
    btnApply.textContent = 'Применить';
    btnApply.classList.add('datepicker--button-apply');
    this.buttons.append(btnApply);
    const clickHandler = () => this.datepicker.hide();
    btnApply.addEventListener('click', clickHandler);
  }

  selectDates() {
    this.datepicker.selectDate([new Date(2019, 7, 19)]);
    this.datepicker.selectDate([new Date(2019, 7, 23)]);
  }
}

export default StaySelector;
