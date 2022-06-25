// eslint-disable-next-line no-unused-vars
import style from "google-maps-reviews/google-maps-reviews.css";

import googlePlaces from "../../google-maps-reviews";

document.addEventListener("DOMContentLoaded", (event) => {
  console.log(`Plugin loaded!`);
  console.log(event);
  console.log(window.google);
  // Find a placeID via https://developers.google.com/places/place-id
  googlePlaces(window.google, "google-reviews", {
    placeId: "ChIJVdY0sviWvUcRnd0aYxo1RxU",
  });
});
