class SuccessMessage {
  constructor() {
    this.setElement();
  }

  setElement() {
    this.element = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  }

  show() {
    document.body.appendChild(this.element);

    const removeElement = (evt) => {
      if (evt.type === 'click' ) {
        this.close(removeElement);
      }
      if (evt.key === 'Escape') {
        this.close(removeElement);
      }
    };

    document.addEventListener('click', removeElement);
    document.addEventListener('keydown', removeElement);
  }

  close(eventFunction) {
    document.body.removeChild(this.element);
    document.removeEventListener('click', eventFunction);
    document.removeEventListener('keydown', eventFunction);
  }

}

export {
  SuccessMessage
};
