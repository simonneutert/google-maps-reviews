import googlePlaces from "google-maps-reviews";
// eslint-disable-next-line no-unused-vars
import style from "google-maps-reviews/google-maps-reviews.css";

document.addEventListener(window.google, "DOMContentLoaded", (event) => {
  console.log(`Plugin loaded: ${event}`);
  // Find a placeID via https://developers.google.com/places/place-id
  googlePlaces("google-reviews", {
    placeId: "ChIJZa6ezJa8j4AR1p1nTSaRtuQ",
  });
});
