"use strict";

const addButtonElement = document.querySelector(".content-input--add");
const bodyElement = document.querySelector("body");

let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

addButtonElement.addEventListener("click", function () {
  bodyElement.classList.toggle("location-cursor");
});
