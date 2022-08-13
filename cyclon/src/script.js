import MenuView from "./views/menuView.js";
import model from "./model.js";
import ListView from "./views/listView";
import MapView from "./views/mapView.js";

const mapView = new MapView(model.state);
const view = new MenuView(model.state);
const listView = new ListView(model.state);

function controlChangedCursor() {
  model.state.currentCursorIsLocation = true;

  //reset on new clicks
  view.listenToAnyClickOutsideOf("#map");

  // listen to click on map only after add button is clicked
  mapView.listenToMapClick(controlMapClick);
}

function controlGettingLocation() {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      mapView.centerMapOn.bind(mapView),
      function () {
        console.log("could not obtain location, displaying default map ");
      }
    );
}

function controlMapClick(event) {
  const latlng = Object.values(event.latlng);
  mapView.addMarker(latlng, view.map, "success");
}

const controlGetLocation = async function (countryName) {
  try {
    // console.log(`fetching info for ${countryName}`);
    // const countryData = await getJsonFromFetch(countryName);
    // const latlng = [countryData.results[0].lat, countryData.results[0].lon];
    // console.log(latlng);
    const latlng = await model.getLocationFromName(countryName);
    mapView.centerMapOn(latlng);
  } catch (e) {
    console.error(e);
  }
};

function init() {
  view.listenToAddButton(controlChangedCursor);
  mapView.listenToLocationButton(controlGettingLocation);
  mapView.listenToLocationSearch(controlGetLocation);
  listView.render();
  listView.createListItem("cycling");

  mapView.render();
  mapView.listenToAnyClickOutsideOfSelf();
  console.log(mapView);
}

init();
