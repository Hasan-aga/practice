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
}

class Controller {
  pickingLocationFlag = false;
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.createMap();

    this.view.bodyElement.addEventListener(
      "click",
      this.resetCursorStyle.bind(this)
    );

    this.view.addButtonElement.addEventListener(
      "click",
      this.handleAddButton.bind(this)
    );
  }

  handleAddButton() {
    this.view.bodyElement.classList.add("location-cursor");
    setTimeout(this.togglePickingLocationFlag.bind(this), 300);
  }

  togglePickingLocationFlag() {
    this.pickingLocationFlag = !this.pickingLocationFlag;
  }

  resetCursorStyle() {
    if (this.pickingLocationFlag) {
      console.log(this.pickingLocationFlag);
      this.view.bodyElement.classList.remove("location-cursor");
      this.togglePickingLocationFlag();
    }
  }
}

const app = new Controller(new Model(), new View());
app.view.createListItem("hello");
