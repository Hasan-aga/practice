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
    if (!(position instanceof Array)) {
      position = [position.coords.latitude, position.coords.longitude];
    }
    this.map.setView(position, 13, { animate: true });
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
        this.value = "";
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

  addOnLoadHandler(handler) {
    window.addEventListener("load", handler);
  }
}

export default new View();
