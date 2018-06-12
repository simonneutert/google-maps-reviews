import googlePlaces from 'google-maps-reviews';
import 'google-maps-reviews/google-maps-reviews.css';

document.addEventListener("DOMContentLoaded", function(event) {
  //Find a placeID via https://developers.google.com/places/place-id
  googlePlaces("google-reviews", {
    placeId: 'ChIJZa6ezJa8j4AR1p1nTSaRtuQ',
  });

});
