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
  map;
  constructor() {
    this.bodyElement = document.querySelector("body");
    this.addButtonElement = document.querySelector(".content-input--add");
    this.locationButton = document.querySelector(".map-search--button");
  }

  createMap() {
    this.map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
  }

  centerMapOn(position) {
    console.log(this);
    const latlng = [position.coords.latitude, position.coords.longitude];
    console.log(latlng);
    this.map.panTo(new L.LatLng(...latlng));
  }

  createListItem(workout) {
    const listLocation = document.querySelector(".content-list");
    const listHtmlCode = `<li class="list-item">${workout}</li>`;
    listLocation.insertAdjacentHTML("afterbegin", listHtmlCode);
  }

  listenToAddButton(handleChangedCursor) {
    this.addButtonElement.addEventListener("click", (event) => {
      this.changeCursorIcon();
      setTimeout(handleChangedCursor, 50);
    });
  }

  listenToAnyClick() {
    //simplify adding and removing event handler that was added using bind
    this.refrenceToResetCursorHandler = this.resetCursor.bind(this);
    this.bodyElement.addEventListener(
      "click",
      this.refrenceToResetCursorHandler
    );
  }

  resetCursor() {
    if (this.currentCursorIsLocation()) {
      console.log("actually reset the style of cursor");
      this.bodyElement.classList.remove("location-cursor");
      this.bodyElement.removeEventListener(
        "click",
        this.refrenceToResetCursorHandler
      );
    }
  }

  getElement(selector) {
    return document.querySelector(`${selector}`);
  }

  currentCursorIsLocation() {
    return this.bodyElement.classList.contains("location-cursor");
  }

  changeCursorIcon() {
    this.bodyElement.classList.add("location-cursor");
  }

  listenToLocationButton(handler) {
    this.locationButton.addEventListener("click", handler);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.createMap.call(this.view);

    this.view.listenToAddButton(this.handleChangedCursor.bind(this));

    this.view.listenToLocationButton(this.handleGettingLocation.bind(this));
  }

  handleChangedCursor() {
    console.log("listen to any click");
    //reset on new clicks

    this.view.listenToAnyClick();
  }

  handleGettingLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.view.centerMapOn.bind(this.view),
        function () {
          alert("please provide position.");
        }
      );
  }
}

const app = new Controller(new Model(), new View());
app.view.createListItem("hello");
