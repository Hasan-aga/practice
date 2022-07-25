"use strict";

const addButtonElement = document.querySelector(".content-input--add");
const bodyElement = document.querySelector("body");

let pickingLocationFlag = false;

let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

bodyElement.addEventListener("click", function () {
  if (pickingLocationFlag) {
    console.log(pickingLocationFlag);
    bodyElement.classList.remove("location-cursor");
    pickingLocationFlag = !pickingLocationFlag;
  }
});

addButtonElement.addEventListener("click", function () {
  bodyElement.classList.add("location-cursor");
  setTimeout(togglePickingLocationFlag, 300);
});

function togglePickingLocationFlag() {
  pickingLocationFlag = !pickingLocationFlag;
}
