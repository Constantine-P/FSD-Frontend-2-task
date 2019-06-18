export default function ImageSlider(id) {
	const slidersWrapper = document.getElementById(id);
	const sliders = slidersWrapper.querySelectorAll('.image-slider');

	for (let k = 0; k < sliders.length; k++) {
		const images = sliders[k].getElementsByClassName('image-wrapper__item');
		const arrowBack = sliders[k].querySelector('.image-slider__arrow-back');
		const arrowForward = sliders[k].querySelector('.image-slider__arrow-forward');
		let i = images.length-1;

		images[images.length-1].classList.add('visible');
		sliders[k].addEventListener('click', function (e) {
			if (e.target === arrowBack || e.target.parentNode === arrowBack) {
				images[i].classList.add('invisible');
				images[i].classList.remove('visible');
				i++;
				if (i === images.length) i = 0;
				images[i].classList.remove('invisible');
				images[i].classList.add('visible');
			}

			if (e.target === arrowForward || e.target.parentNode === arrowForward) {
				images[i].classList.add('invisible');
				images[i].classList.remove('visible');
				i--;
				if (i === -1) i = images.length - 1;
				images[i].classList.remove('invisible');
				images[i].classList.add('visible');
			}
		})
	}
}
