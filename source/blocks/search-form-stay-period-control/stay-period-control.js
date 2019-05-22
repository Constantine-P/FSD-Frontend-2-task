function StayPeriodControl(id) {

	class Day {
		constructor(oldDate) {
			this.oldDate = new Date(oldDate);
			this.isArrivalDay = false;
			this.isDepartureDay = false;
			this.isCurrentDay = false;
		}

		get date() {
			return `${this.day}.${this.month}.${this.year}`;
		}

		get day() {
			return this.oldDate.getDateDMY().day;
		}

		get month() {
			return this.oldDate.getDateDMY().month;
		}

		get year() {
			return this.oldDate.getFullYear();
		}
	}

	Date.prototype.getDateDMY = function () {
		return {
			day: addZero(this.getDate()),
			month: addZero(this.getMonth() + 1),
			year: this.getFullYear(),
		}
	};

	Date.prototype.toDateDMYString = function () {
		return `${this.getDateDMY().day}.${this.getDateDMY().month}.${this.getFullYear()}`;
	};

	Date.prototype.getDayOfCurMonthDate = function (num) {
		return new Date(this.setDate(num));
	};

	Date.prototype.getRusDayOfTheWeekNumber = function () {
		return (this.getDay() === 0) ? 6 : (this.getDay() - 1);
	};

	Date.prototype.changeDate = function (num) {
		return new Date(this.setDate(this.getDate() + num));
	};

	const searchFormStayPeriodControl = document.getElementById(id);

	const dateControlArrival = searchFormStayPeriodControl.querySelector('.date-control_arrival');
	const dateControlDeparture = searchFormStayPeriodControl.querySelector('.date-control_departure');

	const inputArrival = dateControlArrival.querySelector('input');
	const inputDeparture = dateControlDeparture.querySelector('input');

	const calendar = searchFormStayPeriodControl.querySelector('.calendar');
	const calendarYear = calendar.querySelector('.month-year__year');
	const calendarMonth = calendar.querySelector('.month-year__month');

	const arrowBack = calendar.querySelector('.month-year__arrow-back');
	const arrowForward = calendar.querySelector('.month-year__arrow-forward');

	const daysOfTheMonth = calendar.querySelectorAll('.days-of-the-month__item');

	const buttonClear = calendar.querySelector('.buttons__btn-clear');
	const buttonApply = calendar.querySelector('.buttons__btn-apply');

	const arrowDownArrival = dateControlArrival.querySelector('.date-control__arrow-down');
	const arrowDownDeparture = dateControlDeparture.querySelector('.date-control__arrow-down');

	let focusedInput = inputArrival;
	let focusedDay;

	let fdPos = 0; // First Day Position (top-left day)

	const calendarLength = 365;
	const dateBase = [];
	const curDate = new Date().getDateDMY();

	fillDateBase();
	draw();
	addEvents();

	function addEvents() {
		arrowDownArrival.addEventListener('click', (e) => {
			hideShowCalendar(e);
		});

		arrowDownDeparture.addEventListener('click', (e) => {
			hideShowCalendar(e);
		});

		arrowBack.addEventListener('click', () => {
			if (fdPos > 0) {
				moveFDPosToNextMonth(-1);
				draw();
			}
		});

		arrowForward.addEventListener('click', () => {
			if (fdPos < calendarLength - 42) {
				moveFDPosToNextMonth(1);
				draw();
			}
		});

		inputArrival.addEventListener('focus', (e) => {
			calendar.classList.remove('hidden');
			focusedInput = e.target;
			focusedInput.classList.add('date-control__content_active');
			inputDeparture.classList.remove('date-control__content_active');
		});

		inputDeparture.addEventListener('focus', (e) => {
			calendar.classList.remove('hidden');
			focusedInput = e.target;
			focusedInput.classList.add('date-control__content_active');
			inputArrival.classList.remove('date-control__content_active');
		});

		for (let i = 0; i < daysOfTheMonth.length; i++) {
			daysOfTheMonth[i].addEventListener('click', mark)
		}

		inputArrival.addEventListener('change', (e) => {
			resetArrivalDay();
			for (let i = 0; i < dateBase.length; i++) {
				if (dateBase[i].date === inputArrival.value) {
					dateBase[i].isArrivalDay = true;
					draw();
				}
			}
		});

		inputDeparture.addEventListener('change', (e) => {
			resetDepartureDay();
			for (let i = 0; i < dateBase.length; i++) {
				if (dateBase[i].date === inputDeparture.value) {
					dateBase[i].isDepartureDay = true;
					draw();
				}
			}
		});

		buttonClear.addEventListener('click', () => {
			resetArrivalDay();
			resetDepartureDay();
			draw();
		});

		buttonApply.addEventListener('click', () => {
			calendar.classList.add('hidden');
			calendar.focus();
			focusedInput.classList.remove('date-control__content_active');
		});
	}

	function fillDateBase() {
		let curMonthFirstDayDate = new Date().getDayOfCurMonthDate(1);
		let curMonthFirstDayPosition = curMonthFirstDayDate.getRusDayOfTheWeekNumber();
		let date = curMonthFirstDayDate.changeDate(-curMonthFirstDayPosition);

		for (let i = 0; i < calendarLength + 42; i++) {
			let day = new Day(date);
			if (new Date().toDateDMYString() === day.date) day.isCurrentDay = true;
			dateBase.push(day);
			date = date.changeDate(1);
		}
	}

	function draw() {
		if (fdPos + 7 > calendarLength) return;

		calendarMonth.textContent = getMonthName(+(dateBase[fdPos + 7].month));
		calendarYear.textContent = dateBase[fdPos + 7].year;

		for (let i = 0; i < daysOfTheMonth.length; i++) {
			daysOfTheMonth[i].classList.remove('current-day');
			daysOfTheMonth[i].classList.remove('arrival-day');
			daysOfTheMonth[i].classList.remove('departure-day');
			daysOfTheMonth[i].classList.remove('previous-month-day');
			daysOfTheMonth[i].classList.remove('next-month-day');

			let daysOfTheMonthText = daysOfTheMonth[i].querySelector('em');
			if (i + fdPos < calendarLength) {
				daysOfTheMonthText.textContent = dateBase[i + fdPos].day;
			}

			//if (i + fdPos >= calendarLength) return;

			if (dateBase[i + fdPos].month < curDate.month) {
				daysOfTheMonth[i].classList.add('previous-month-day')
			} else if (dateBase[i + fdPos].month > curDate.month) {
				daysOfTheMonth[i].classList.add('next-month-day')
			}

			if (dateBase[i + fdPos].isCurrentDay) {
				daysOfTheMonth[i].classList.add('current-day')
			}
			if (dateBase[i + fdPos].isArrivalDay) {
				daysOfTheMonth[i].classList.add('arrival-day')
			}
			if (dateBase[i + fdPos].isDepartureDay) {
				daysOfTheMonth[i].classList.add('departure-day')
			}
		}
		clearFillDays();
		fillPeriodOfStay();
	}

	function mark(e) {
		detectFocusedDay();
		clearMarkedFocusedDay();
		clearFillDays();
		changeMarkedDay(e);
		addMarkedClass(e);
		fillPeriodOfStay();
		swapArrDepDays();
	}

	function detectFocusedDay() {
		if (focusedInput === inputArrival) {
			focusedDay = 'arrival-day';
		} else if (focusedInput === inputDeparture) {
			focusedDay = 'departure-day';
		}
	}

	function addMarkedClass(e) {
		if (e.target.classList[0] === 'days-of-the-month__item') {
			e.target.classList.add(focusedDay);
		} else {
			e.target.parentNode.classList.add(focusedDay);
		}
	}

	function clearMarkedFocusedDay() {
		for (let i = 0; i < daysOfTheMonth.length; i++) {
			daysOfTheMonth[i].classList.remove(focusedDay);
		}
	}

	function clearFillDays() {
		for (let i = 0; i < daysOfTheMonth.length; i++) {
			daysOfTheMonth[i].classList.remove('stay-day_fill');
			daysOfTheMonth[i].classList.remove('arrival-day_fill');
			daysOfTheMonth[i].classList.remove('departure-day_fill');
		}
	}

	function changeMarkedDay(e) {
		if (focusedDay === 'arrival-day') {
			resetArrivalDay();
		} else {
			resetDepartureDay();
		}

		for (let i = 0; i < daysOfTheMonth.length; i++) {
			if ((focusedDay === 'arrival-day') && (e.target === daysOfTheMonth[i] || e.target.parentNode === daysOfTheMonth[i])) {
				dateBase[i + fdPos].isArrivalDay = true;
			}
			if ((focusedDay === 'departure-day') && (e.target === daysOfTheMonth[i] || e.target.parentNode === daysOfTheMonth[i])) {
				dateBase[i + fdPos].isDepartureDay = true;
			}
			if ((e.target === daysOfTheMonth[i]) || (e.target.parentNode === daysOfTheMonth[i])) {
				focusedInput.value = dateBase[i + fdPos].date;
			}
		}
	}

	function moveFDPosToNextMonth(x) {
		fdPos += 7 * x;
		let b = true;

		while (b) {
			fdPos += 7 * x;
			for (let i = 0; i < 7; i++) {
				if (fdPos + i >= calendarLength) return;
				if (dateBase[fdPos + i].day === '01') b = false;
			}
		}

		if (fdPos < calendarLength) {
			curDate.month = +dateBase[fdPos + 7].month;
		}
	}

	function resetArrivalDay() {
		for (i = 0; i < dateBase.length; i++) {
			dateBase[i].isArrivalDay = false;
		}
	}

	function resetDepartureDay() {
		dateBase.forEach((item) => {
			item.isDepartureDay = false;
		})
	}

	function fillPeriodOfStay() {
		if (!inputArrival.validity.valid || !inputDeparture.validity.valid || inputArrival.value === '' || inputDeparture.value === '') return;

		let arrivalDay;
		let departureDay;

		dateBase.forEach((item) => {
			if (item.isArrivalDay) {
				arrivalDay = item;
			}

			if (item.isDepartureDay) {
				departureDay = item;
			}
		});

		if (arrivalDay === undefined || departureDay === undefined) return;

		let arrDateReverse = arrivalDay.date.split('.').reverse().join('');
		let depDateReverse = departureDay.date.split('.').reverse().join('');

		for (i = 0; i < daysOfTheMonth.length; i++) {
			let iDateReverse = dateBase[i + fdPos].date.split('.').reverse().join('');

			if (iDateReverse > arrDateReverse && iDateReverse < depDateReverse) {
				daysOfTheMonth[i].classList.add('stay-day_fill');
			}

			if (dateBase[i + fdPos].isArrivalDay) {
				daysOfTheMonth[i].classList.add('arrival-day_fill');
			}

			if (dateBase[i + fdPos].isDepartureDay) {
				daysOfTheMonth[i].classList.add('departure-day_fill');
			}
		}

	}

	function swapArrDepDays() {
		if (inputArrival.value === '' || inputDeparture.value === '') return;

		let arrivalDay;
		let departureDay;

		dateBase.forEach((item) => {
			if (item.isArrivalDay) {
				arrivalDay = item;
			}

			if (item.isDepartureDay) {
				departureDay = item;
			}
		});

		let arrDateReverse = arrivalDay.date.split('.').reverse().join('');
		let depDateReverse = departureDay.date.split('.').reverse().join('');

		if (arrDateReverse <= depDateReverse) return;
		arrivalDay.isArrivalDay = false;
		arrivalDay.isDepartureDay = true;
		departureDay.isArrivalDay = true;
		departureDay.isDepartureDay = false;
		inputArrival.value = departureDay.date;
		inputDeparture.value = arrivalDay.date;

		if (focusedInput === inputDeparture) {
			inputArrival.focus();
			focusedInput = inputArrival;
		} else {
			inputDeparture.focus();
			focusedInput = inputDeparture;
		}

		draw();
	}

	function getMonthName(num) {
		const textMonths = ["", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
		return textMonths[num];
	}

	function hideShowCalendar(e) {

		if (calendar.classList.contains('hidden')) {
			calendar.classList.remove('hidden');
		} else {
			calendar.classList.add('hidden');
			calendar.focus();
			focusedInput.classList.remove('date-control__content_active');
			return;
		}

		if (e.target === arrowDownArrival) {
			inputArrival.focus();
			focusedInput = inputArrival;
		}

		if (e.target === arrowDownDeparture) {
			inputDeparture.focus();
			focusedInput = inputDeparture;
		}

	}

	function addZero(num) {
		if ((num.toString()).length === 1) return ('0' + num);
		return num
	}

}

new StayPeriodControl('search-form-stay-period-control');
