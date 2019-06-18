export default function StayPeriodControlToggle(id, animDuration) {
	const stayPeriodControl = document.getElementById(id);
	const dateControlArrival = stayPeriodControl.querySelector('.date-control_arrival');
	const dateControlDeparture = stayPeriodControl.querySelector('.date-control_departure');
	const dateControlArrDep = stayPeriodControl.querySelector('.date-control_arrival-departure');
	const inputArrDep = dateControlArrDep.querySelector('input');
	const inputArrival = dateControlArrival.querySelector('input');
	const inputDeparture = dateControlDeparture.querySelector('input');
	const calendar = stayPeriodControl.querySelector('.calendar');
	const buttonApply = calendar.querySelector('.buttons__btn-apply');
	const body = document.querySelector('body');

	inputArrDep.addEventListener('focus', cOpen);

	buttonApply.addEventListener('click', cClose);

	document.addEventListener('click', function (e) {
		let i = e.target;
		let bool = true;

		while (i.parentNode) {
			if (i === stayPeriodControl) bool = false;
			i = i.parentNode;
		}

		if (bool && dateControlArrDep.classList.contains('c-open-anim')) {
			setTimeout(function () {
				calendar.classList.add('hidden');
			}, animDuration);

			cClose();
		}
	});

	function formatDate(date) {
		return date.split('.')[0] + ' ' + getMonthName(+date.split('.')[1]);
	}

	function getMonthName(num) {
		const textMonths = ["", "янв", "фев", "мар", "апр", "мая", "июня", "июля", "авг", "сен", "окт", "ноя", "дек"];
		return textMonths[num];
	}

	function cOpen() {
		dateControlArrDep.classList.add('c-open-anim');
		//calendar.classList.add('visible-anim');
		setTimeout(function () {
			inputArrival.focus();
		}, animDuration);
	}

	function cClose() {
		dateControlArrDep.classList.add('c-close-anim');
		//calendar.classList.remove('visible-anim');
		//calendar.classList.add('transparent-anim');

		setTimeout(function () {
			dateControlArrDep.classList.remove('c-open-anim');
			dateControlArrDep.classList.remove('c-close-anim');
			//calendar.classList.remove('transparent-anim');
		}, animDuration);

		if (inputArrival.validity.valid && inputDeparture.validity.valid) {
			inputArrDep.value = `${formatDate(inputArrival.value)} - ${formatDate(inputDeparture.value)}`;
		}
	}
}
