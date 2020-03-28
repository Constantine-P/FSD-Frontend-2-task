class ImageSlider {
  constructor(slider) {
    this.slider = slider;
    this.images = [];
    this.index = 0;

    this.addElements();
    this.addHandlers();
    this.moveImage();
  }

  addElements() {
    const container = this.slider.querySelector('.js-container');
    this.images = container.querySelectorAll('.js-image');
    this.arrowBack = document.createElement('div');
    this.arrowForward = document.createElement('div');
    this.dots = document.createElement('div');

    this.arrowBack.classList.add('image-slider__arrow', 'image-slider__arrow_back');
    this.arrowForward.classList.add('image-slider__arrow', 'image-slider__arrow_forward');
    this.dots.classList.add('image-slider__dots');

    this.images.forEach(() => {
      const dot = document.createElement('div');
      dot.classList.add('image-slider__dot');
      this.dots.append(dot);
    });

    container.append(this.dots);
    this.slider.append(this.arrowBack);
    this.slider.append(this.arrowForward);
  }

  addHandlers() {
    const handleClick = (e) => {
      if (e.target === this.arrowBack) {
        this.index = (this.index < 1) ? this.images.length - 1 : this.index - 1;
        this.moveImage();
      } else if (e.target === this.arrowForward) {
        this.index = (this.index >= this.images.length - 1) ? 0 : this.index + 1;
        this.moveImage();
      } else if (e.target.parentNode === this.dots) {
        this.setIndexByDot(e.target);
        this.moveImage();
      }
    };
    this.slider.addEventListener('click', handleClick);
  }

  moveImage() {
    this.images.forEach((image, i) => {
      if (this.index !== i) {
        image.classList.add('image-slider__image_hidden');
      } else {
        image.classList.remove('image-slider__image_hidden');
      }
    });
    this.setDotByIndex();
  }

  setIndexByDot(dot) {
    this.dots.querySelectorAll('.image-slider__dot').forEach((item, i) => {
      if (dot === item) {
        this.index = i;
        item.classList.add('image-slider__dot_active');
      } else {
        item.classList.remove('image-slider__dot_active');
      }
    });
  }

  setDotByIndex() {
    this.dots.querySelectorAll('.image-slider__dot').forEach((item, i) => {
      if (this.index === i) {
        item.classList.add('image-slider__dot_active');
      } else {
        item.classList.remove('image-slider__dot_active');
      }
    });
  }
}

export default ImageSlider;
