class ListView {
  constructor(parentClassSelector = ".section-list") {
    this.parentElement = document.querySelector(parentClassSelector);
  }

  render() {
    const markup = this._createListMarkup();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _createListMarkup() {
    return `
    <ul class="content-list">
        <li class="list-item">list item</li>
      </ul>
    `;
  }

  _createListElementMarkup(workout) {
    return `<li class="list-item">${workout}</li>`;
  }

  createListItem(workout) {
    const markup = this._createListElementMarkup(workout);
    const listHtmlCode = this.parentElement
      .querySelector("ul")
      .insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ListView();
