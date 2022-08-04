import view from "./view.js";
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

const getJsonFromFetch = async function (name) {
  const apiKey = "2693514c6f184c17ac5785c2da27facb";
  const url = `https://api.geoapify.com/v1/geocode/search?text=${name}&format=json&apiKey=${apiKey}`;
  console.log(url);
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    throw e;
  }
};

const getLocationFromName = async function (countryName) {
  try {
    console.log(`fetching info for ${countryName}`);
    const countryData = await getJsonFromFetch(countryName);
    const latlng = [countryData.results[0].lat, countryData.results[0].lon];
    console.log(latlng);
    view.centerMapOn(latlng);
    return await latlng;
  } catch (e) {
    console.error(e);
  }
};

function init() {
  view.addOnLoadHandler(controlMap);
  view.listenToAddButton(controlChangedCursor);
  view.listenToLocationButton(controlGettingLocation);
  view.listenToLocationSearch(getLocationFromName);
}

init();
