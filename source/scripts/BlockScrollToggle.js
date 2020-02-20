export default function BlockScrollToggle(id) {
	const toggle = document.getElementById(id);
	const body = document.querySelector('body');

	toggle.addEventListener('click', function () {
		if (toggle.checked === true) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'auto';
		}
	});
}
