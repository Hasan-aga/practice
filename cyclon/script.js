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
    this.mapElement = this.bodyElement.querySelector("#map");
    this.mapSearchElement = document.querySelector(".map-search--input");
  }

  createMap() {
    this.map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
  }

  centerMapOn(position) {
    if (typeof position instanceof Object) {
      console.log("object", position);
      position = [position.coords.latitude, position.coords.longitude];
    }
    this.map.panTo(new L.LatLng(...position));
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

  listenToMapClick(handler) {
    this.referenceToMapClickHandler = handler; // to remove the listener later
    this.map.on("click", handler);
  }

  listenToLocationButton(handler) {
    this.locationButton.addEventListener("click", handler);
  }

  listenToLocationSearch(handler) {
    this.mapSearchElement.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        console.log("search location", this.value);
        handler(this.value);
      }
    });
  }

  addMarker(latlng, map, popUp = false) {
    console.log("event", latlng);
    console.log("map", map);
    const marker = L.marker(latlng).addTo(map);
    if (popUp) {
      marker.bindPopup(`${popUp}`).openPopup();
    }
    return marker;
  }

  resetCursor() {
    if (this.currentCursorIsLocation()) {
      console.log("actually reset the style of cursor");
      this.bodyElement.classList.remove("location-cursor");
      this.bodyElement.removeEventListener(
        "click",
        this.refrenceToResetCursorHandler
      );
      this.mapElement.removeEventListener("click", this.addMarker);
      this.map.off("click", this.referenceToMapClickHandler);
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
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.createMap.call(this.view);

    this.view.listenToAddButton(this.handleChangedCursor.bind(this));

    this.view.listenToLocationButton(this.handleGettingLocation.bind(this));

    this.view.listenToLocationSearch(this.getLocationFromName.bind(this));
  }

  handleChangedCursor() {
    console.log("listen to any click");
    //reset on new clicks
    this.view.listenToAnyClick();

    // listen to click on map only after add button is clicked
    this.view.listenToMapClick(this.handleMapClick.bind(this));
  }

  handleGettingLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.view.centerMapOn.bind(this.view),
        function () {
          console.log("could not obtain location, displaying default map ");
        }
      );
  }

  handleMapClick(event) {
    const latlng = Object.values(event.latlng);
    this.currentWorkoutPosition = latlng;
    console.log(this.currentWorkoutPosition);
    this.view.addMarker(latlng, this.view.map, "success");
  }

  async getJsonFromFetch(name) {
    const apiKey = "2693514c6f184c17ac5785c2da27facb";
    const url = `https://api.geoapify.com/v1/geocode/search?text=${name}&format=json&apiKey=${apiKey}`;
    console.log(url);
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async getLocationFromName(countryName) {
    try {
      console.log(`fetching info for ${countryName}`);
      const countryData = await this.getJsonFromFetch(countryName);
      const latlng = [countryData.results[0].lat, countryData.results[0].lon];
      console.log(latlng);
      this.view.centerMapOn(latlng);
      return await latlng;
    } catch (e) {
      console.error(e);
    }
  }
}

const app = new Controller(new Model(), new View());
app.view.createListItem("hello");
