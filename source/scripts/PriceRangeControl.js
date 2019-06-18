export default function PriceRangeControl(id, min, max, transition = 300) {
	const html = document.querySelector('html');
	const control = document.getElementById(id);
	const line = control.querySelector('.line-wrapper');
	const fillLine = control.querySelector('.fill-line');
	const values = control.querySelector('.price-range-control__values');
	const priceRange = {
		minPrice: min,
		maxPrice: max,
		get length() {
			return this.maxPrice - this.minPrice;
		}
	};
	const priceValues = {
		minPrice: priceRange.minPrice,
		maxPrice: priceRange.maxPrice
	};
	const abs = Math.abs;
	const lineWidth = line.getBoundingClientRect().width;
	let fillWidth = fillLine.getBoundingClientRect().width;
	let marginLeft = getCoordsRegBlock(fillLine, line).left;
	const rem = parseFloat((html.currentStyle || window.getComputedStyle(html, null)).fontSize);

	values.textContent = `${formatPrice(priceValues.minPrice)}₽ - ${formatPrice(priceValues.maxPrice)}₽`;

	line.addEventListener('click', function (e) {
		let xLine = getCoordsRegBlock(e, line).left;
		if (xLine < 0) xLine = 0;
		if (xLine > lineWidth) xLine = lineWidth;

		let distToLeft = getCoordsRegBlock(fillLine, line).left - xLine;
		let distToRight = getCoordsRegBlock(fillLine, line).right - xLine;

		if (fillWidth < 0) fillWidth = 0;
		if (fillWidth > lineWidth) fillWidth = lineWidth;

		if (abs(distToLeft) < abs(distToRight)) {
			fillWidth += distToLeft;
			marginLeft -= distToLeft;
			fillLine.style.marginLeft = marginLeft / rem + 'rem';
			fillLine.style.width = fillWidth / rem + 'rem';
		} else {
			fillWidth -= distToRight;
			fillLine.style.width = fillWidth / rem + 'rem';
		}

		priceValues.minPrice = rnd(marginLeft / lineWidth * priceRange.length, 50);
		priceValues.maxPrice = rnd((marginLeft + fillWidth) / lineWidth * priceRange.length, 50);

		values.textContent = `${formatPrice(priceValues.minPrice)}₽ - ${formatPrice(priceValues.maxPrice)}₽`;
	});

	line.addEventListener('mousedown', () => {
		addEventListener('mousemove', click);
	});

	addEventListener('mouseup', () => {
		removeEventListener('mousemove', click);
		fillLine.style.transition = transition + 'ms';
	});

	function click(e) {
		fillLine.style.transition = '0ms';
		let event = new Event('click');
		event.pageX = e.pageX;
		event.pageY = e.pageY;

		if (getCoordsRegBlock(e, line).left < 0) event.pageX = line.getBoundingClientRect().left;

		line.dispatchEvent(event);
	}

	function getCoordsRegBlock(elem, base) {
		let elemBox = {};
		let baseBox = {};

		if (elem.pageX) {
			elemBox = {
				top: elem.pageY - pageYOffset,
				left: elem.pageX - pageXOffset,
				right: elem.pageX - pageXOffset,
				bottom: elem.pageY - pageYOffset
			}
		} else {
			elemBox = elem.getBoundingClientRect();
		}

		if (base.pageX) {
			baseBox = {
				top: base.pageY - pageYOffset,
				left: base.pageX - pageXOffset
			}
		} else {
			baseBox = base.getBoundingClientRect();
		}

		return {
			top: elemBox.top - baseBox.top,
			left: elemBox.left - baseBox.left,
			right: elemBox.right - baseBox.left,
			bottom: elemBox.bottom - baseBox.top
		}
	}

	function rnd(num, n = 50) {
		return Math.round(num / n) * n;
	}

	function formatPrice(num) {
		const str = num.toString();
		let s = "";

		for (let i = str.length - 1; i >= 0; i--) {
			s = str[i] + s;
			if ((str.length - i) % 3 === 0) {
				s = " " + s;
			}
		}

		return s;
	}
}
