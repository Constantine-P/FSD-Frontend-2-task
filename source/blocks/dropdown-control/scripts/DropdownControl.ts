// @ts-ignore
import numToWord from './numToWord.ts';

class DropdownControl {
  private model: ModelItem[];

  private elements: {
    content: HTMLInputElement;
    positions: Position[];
    menu: HTMLDivElement;
    btnClear: HTMLButtonElement;
    btnApply: HTMLButtonElement;
    arrow: HTMLDivElement;
  };

  private dropdown: HTMLElement;

  constructor(dropdown: HTMLElement) {
    this.dropdown = dropdown;
    this.initElements();
    this.updateModel();
    this.addHandlers();
    this.updateElements();
    this.elements.content.value = this.parseContent();
  }

  private initElements() {
    const { dropdown } = this;
    this.elements = {
      content: dropdown.querySelector('.js-content'),
      positions: Array.from(dropdown.querySelectorAll('.js-position'))
        .map((item: HTMLElement) => ({
          name: item.querySelector('.js-position-title'),
          quantity: item.querySelector('.js-position-value'),
          minus: item.querySelector('.js-minus'),
          plus: item.querySelector('.js-plus'),
        })),
      menu: dropdown.querySelector('.js-menu'),
      btnClear: dropdown.querySelector('.js-btn-clear'),
      btnApply: dropdown.querySelector('.js-btn-apply'),
      arrow: dropdown.querySelector('.js-arrow'),
    };
  }

  private updateModel(): void {
    this.model = this.elements.positions.map((item) => ({
      name: item.name.textContent,
      quantity: Number(item.quantity.value),
      wordForms: JSON.parse(item.quantity.dataset.wordforms || '[]'),
      isShow: Boolean(item.quantity.dataset.isShow),
    }));
  }

  private updateElements(): void {
    this.elements.positions.forEach((item, i) => {
      item.quantity.value = this.model[i].quantity.toString();
      if (this.model[i].quantity === 0) {
        item.minus.classList.add('dropdown-control__minus_inactive');
      } else {
        item.minus.classList.remove('dropdown-control__minus_inactive');
      }
    });
    const total = this.model
      .reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    if (total === 0 && this.elements.btnClear) {
      this.elements.btnClear.classList.add('hidden');
    } else if (this.elements.btnClear) {
      this.elements.btnClear.classList.remove('hidden');
    }
  }

  private addHandlers(): void {
    const {
      positions, content, menu, btnClear, btnApply, arrow,
    } = this.elements;

    positions.forEach((item: Position, i) => {
      const handleMinusClick = (): void => {
        this.model[i].quantity -= (this.model[i].quantity >= 1) ? 1 : 0;
        this.updateElements();
      };
      const handlePlusClick = (): void => {
        this.model[i].quantity += 1;
        this.updateElements();
      };
      item.minus.addEventListener('click', handleMinusClick);
      item.plus.addEventListener('click', handlePlusClick);
    });

    const handleContentFocus = (): void => {
      menu.classList.remove('dropdown-control__menu_hidden');
      content.classList.add('dropdown-control__content_active');
    };
    content.addEventListener('focus', handleContentFocus);

    const handleWindowClick = (e): void => {
      const shouldApply = !(
        content.contains(e.target)
        || menu.contains(e.target)
        || arrow.contains(e.target)
      ) || (e.target === btnApply);

      if (shouldApply) {
        content.value = this.parseContent();
        menu.classList.add('dropdown-control__menu_hidden');
        content.classList.remove('dropdown-control__content_active');
      }

      if (e.target === btnClear) {
        this.model.forEach((item) => {
          item.quantity = 0;
        });
        this.updateElements();
        content.value = '';
      }

      if (e.target === arrow) {
        if (menu.classList.contains('dropdown-control__menu_hidden')) {
          menu.classList.remove('dropdown-control__menu_hidden');
          content.classList.add('dropdown-control__content_active');
        } else {
          menu.classList.add('dropdown-control__menu_hidden');
          content.classList.remove('dropdown-control__content_active');
        }
      }
    };

    window.addEventListener('click', handleWindowClick);
  }

  private parseContent(): string {
    const wf = this.elements.content.dataset.wordforms;
    const hasWordForms = (wf !== '');
    const wordForms = (hasWordForms) ? JSON.parse(wf) : '';

    let totalAmount = 0;
    let content = '';

    this.model.forEach((item) => {
      totalAmount += (item.isShow) ? 0 : item.quantity;
    });

    if (hasWordForms) content += `${totalAmount} ${numToWord(totalAmount, wordForms)}`;

    content += this.model
      .map((item) => ((item.isShow && item.quantity > 0)
        ? `, ${item.quantity} ${numToWord(item.quantity, item.wordForms)}`
        : ''))
      .join('');

    if (content.slice(0, 2) === ', ') content = content.slice(2, content.length);

    return (totalAmount === 0 && hasWordForms) ? '' : content;
  }
}

interface Position {
  name: HTMLElement;
  quantity: HTMLInputElement;
  minus: HTMLElement;
  plus: HTMLElement;
}

interface ModelItem {
  name: string;
  quantity: number;
  wordForms: string[];
  isShow: boolean;
}

export default DropdownControl;
