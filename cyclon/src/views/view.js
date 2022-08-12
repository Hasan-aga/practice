class View {
  map;
  constructor() {
    this.bodyElement = document.querySelector("body");
    this.addButtonElement = document.querySelector(".content-input--add");
    this.locationButton = document.querySelector(".map-search--button");
    this.mapSearchElement = document.querySelector(".map-search--input");
  }

  listenToAddButton(handleChangedCursor) {
    this.state.currentCursorIsLocation = true;
    this.addButtonElement.addEventListener("click", () => {
      this.changeCursorIcon();
      setTimeout(handleChangedCursor, 50);
    });
  }

  listenToAnyClickOutsideOf(selector) {
    //simplify adding and removing event handler that was added using bind
    const refrenceToResetCursorHandler = this.resetCursor.bind(this);
    this.refrenceToResetCursorHandler = refrenceToResetCursorHandler;
    this.bodyElement.addEventListener("click", function (event) {
      if (event.target.closest(selector) === null) {
        refrenceToResetCursorHandler();
      }
    });
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

  resetCursor() {
    if (this.state.currentCursorIsLocation) {
      this.state.currentCursorIsLocation = false;
      console.log("actually reset the style of cursor");
      this.bodyElement.classList.remove("location-cursor");
      this.bodyElement.removeEventListener(
        "click",
        this.refrenceToResetCursorHandler
      );
    }
    // this.mapElement.removeEventListener("click", this.addMarker);
    // this.map.off("click", this.referenceToMapClickHandler);
  }

  getElement(selector) {
    return document.querySelector(`${selector}`);
  }

  changeCursorIcon() {
    this.bodyElement.classList.add("location-cursor");
  }
}

export default new View();
