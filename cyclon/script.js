"use strict";

class Workout {
  constructor(type, marker) {
    this.type = type;
    this.marker = marker;
  }
}
class Model {
  workouts = [];
  constructor(workout) {
    this.workouts.push(workout);
  }
}

class View {
  constructor() {
    this.addButtonElement = document.querySelector(".content-input--add");
    this.bodyElement = document.querySelector("body");
  }

  createMap() {
    let map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }

  createListItem(workout) {
    const listLocation = document.querySelector(".content-list");
    const listHtmlCode = `<li class="list-item">${workout}</li>`;
    listLocation.insertAdjacentHTML("afterbegin", listHtmlCode);
  }
  getElement(selector) {
    return document.querySelector(`${selector}`);
  }

  changeCursorToLocationIcon() {
    this.bodyElement.classList.add("location-cursor");
  }

  resetCursorStyle() {
    this.bodyElement.classList.remove("location-cursor");
  }
}

class Controller {
  pickingLocationFlag = false;
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.createMap();

    this.view.addButtonElement.addEventListener(
      "click",
      this.handleAddButton.bind(this)
    );

    this.view.bodyElement.addEventListener(
      "click",
      this.handleResetCursorStyle.bind(this)
    );
  }

  handleAddButton() {
    this.view.changeCursorToLocationIcon();
    setTimeout(this.togglePickingLocationFlag.bind(this), 300);
  }

  handleResetCursorStyle() {
    if (this.pickingLocationFlag) {
      this.view.resetCursorStyle();
      this.togglePickingLocationFlag();
    }
  }

  togglePickingLocationFlag() {
    this.pickingLocationFlag = !this.pickingLocationFlag;
  }
}

const app = new Controller(new Model(), new View());
app.view.createListItem("hello");
