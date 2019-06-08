export default function PosControl(id) {
	const posControl = document.getElementById(id);
	const mainInput = posControl.querySelector('input');
	const arrowDown = posControl.querySelector('.pos-control__arrow-down');
	const dropdownMenu = posControl.querySelector('.dropdown-menu');
	const minuses = dropdownMenu.getElementsByClassName('position-number__minus');
	const pluses = dropdownMenu.getElementsByClassName('position-number__plus');
	const valueElements = dropdownMenu.getElementsByClassName('position-number__value-view');
	const valueInputElements = dropdownMenu.getElementsByClassName('position-number__value');
	const buttonClear = posControl.querySelector('.buttons__btn-clear');
	const buttonApply = posControl.querySelector('.buttons__btn-apply');

	(function addEvents() {
		for (let i = 0; i < pluses.length; i++) {
			pluses[i].addEventListener('click', () => {
				valueElements[i].textContent++;
				valueInputElements[i].value++;
				if (valueElements[i].textContent === '1') minuses[i].classList.remove('position-number__minus_non-active');
			});

			minuses[i].addEventListener('click', () => {
				if (valueElements[i].textContent > 0) {
					valueElements[i].textContent--;
					valueInputElements[i].value--;
				}
				if (valueElements[i].textContent === '0') minuses[i].classList.add('position-number__minus_non-active');
			});
		}

		mainInput.addEventListener('focus', () => {
			dropdownMenu.classList.remove('hidden');
			mainInput.classList.add('pos-control__content_opened')
		});

		buttonClear.addEventListener('click', clear);

		buttonApply.addEventListener('click', () => {
			mainInput.value = getTotalCount();
			dropdownMenu.classList.add('hidden');
			mainInput.classList.remove('pos-control__content_opened');
			for (let i = 0; i < pluses.length; i++) {
				if (valueInputElements[i].dataset.isshow === "true" && valueInputElements[i].value > 0) {
					mainInput.value += ((mainInput.value !== '') ? ', ' : '') + valueInputElements[i].value + ' ' + numToWord(+valueInputElements[i].value, JSON.parse(valueInputElements[i].dataset.wordforms));
				}
			}
		});

		arrowDown.addEventListener('click', () => {
			if (dropdownMenu.classList.contains('hidden')) {
				dropdownMenu.classList.remove('hidden');
				mainInput.classList.add('pos-control__content_opened')
			} else {
				dropdownMenu.classList.add('hidden');
				mainInput.classList.remove('pos-control__content_opened');
			}
		});
	})();

	addEventListener('click', function (e) {
		let i = e.target;
		let bool = true;

		while (i.parentNode) {
			if (i === posControl) bool = false;
			i = i.parentNode;
		}

		if (bool && !dropdownMenu.classList.contains('hidden')) {
			buttonApply.dispatchEvent(new Event('click'));
		}
	});

	function getTotalCount() {
		const values = Array.from(valueInputElements).map(a => (a.dataset.isshow === "true") ? 0 : a.value);
		const reducer = (accumulator, currentValue) => +accumulator + (+currentValue);
		const count = values.reduce(reducer);
		if (count === 0) return "";
		return count + ' ' + numToWord(count, JSON.parse(dropdownMenu.dataset.wordforms))
	}

	function clear() {
		for (let i = 0; i < valueElements.length; i++) {
			valueElements[i].textContent = '0';
			valueInputElements[i].value = 0;
		}
		mainInput.value = '';
	}

	function numToWord(number, wordForms) {
		number = Math.abs(number) % 100;
		let num = number % 10;

		if (number > 10 && number < 20) return wordForms[2];

		if (num > 1 && num < 5) return wordForms[1];

		if (num === 1) return wordForms[0];

		return wordForms[2];
	}

}
