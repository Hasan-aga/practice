const heroTitle = document.querySelector(".hero-title");
console.log(heroTitle.textContent.length);
document.documentElement.style.setProperty(
  "--steps",
  heroTitle.textContent.length
);
