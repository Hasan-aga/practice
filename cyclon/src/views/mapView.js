class MapView {
  state;
  constructor(parentElementSelector = "#map") {
    this.parentElement = document.querySelector(parentElementSelector);
    this.locationButton = document.querySelector(".map-search--button");
    this.mapSearchElement = document.querySelector(".map-search--input");
  }

  render() {
    console.log(this.state);
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

  listenToMapClick(handler) {
    this.referenceToMapClickHandler = handler; // to remove the listener later
    this.map.on("click", handler);
  }

  listenToAnyClickOutsideOfSelf() {
    //simplify adding and removing event handler that was added using bind
    const refrenceToResetCursorHandler = this.resetCursor.bind(this);
    this.refrenceToResetCursorHandler = refrenceToResetCursorHandler;
    document.body.addEventListener("click", function (event) {
      if (event.target.closest("#map") === null) {
        console.log("click outside map");
        refrenceToResetCursorHandler();
      }
    });
  }
  addMarker(latlng, map, popUp = false) {
    console.log("event", latlng);
    console.log("map", map);
    const marker = L.marker(latlng).addTo(this.map);
    if (popUp) {
      marker.bindPopup(`${popUp}`).openPopup();
    }
    return marker;
  }

  resetCursor() {
    console.log("actually reset the style of cursor");
    document.body.removeEventListener(
      "click",
      this.refrenceToResetCursorHandler
    );
    this.parentElement.removeEventListener("click", this.addMarker);
    this.map.off("click", this.referenceToMapClickHandler);
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
}

export default new MapView();
