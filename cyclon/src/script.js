import view from "./views/view.js";
import model from "./model.js";

function controlMap() {
  view.createMap.call(view);
}

function controlChangedCursor() {
  console.log("listen to any click");
  //reset on new clicks
  view.listenToAnyClick();

  // listen to click on map only after add button is clicked
  view.listenToMapClick(controlMapClick);
}

function controlGettingLocation() {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      view.centerMapOn.bind(view),
      function () {
        console.log("could not obtain location, displaying default map ");
      }
    );
}

function controlMapClick(event) {
  const latlng = Object.values(event.latlng);
  view.addMarker(latlng, view.map, "success");
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
  view.addOnLoadHandler(controlMap);
  view.listenToAddButton(controlChangedCursor);
  view.listenToLocationButton(controlGettingLocation);
  view.listenToLocationSearch(controlGetLocation);
}

init();
