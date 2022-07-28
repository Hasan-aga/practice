import { View } from "./view.js";
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
