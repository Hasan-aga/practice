import view from "./views/menuView.js";
import model from "./model.js";
import listView from "./views/listView";
import mapView from "./views/mapView.js";

function controlChangedCursor() {
  console.log("listen to any click");
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
    view.centerMapOn(latlng);
  } catch (e) {
    console.error(e);
  }
};

function init() {
  view.state = model.state;
  // view.addOnLoadHandler(controlMap);
  view.listenToAddButton(controlChangedCursor);
  mapView.listenToLocationButton(controlGettingLocation);
  // view.listenToLocationSearch(controlGetLocation);
  listView.render();
  listView.createListItem("cycling");

  mapView.state = model.state;
  mapView.render();
  mapView.listenToAnyClickOutsideOfSelf();
  console.log(mapView);
}

init();
