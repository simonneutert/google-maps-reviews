# Display Google Reviews of a Place on Google Maps on your website

project on npm: https://www.npmjs.com/package/google-maps-reviews

jQuery Version here: https://github.com/simonneutert/jquery-google-reviews

## Credits

Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/ or check out [Steven's github](https://github.com/stevenmonson/googleReviews). Steven's code is based on [peledies jquery plugin repo](https://github.com/peledies/google-places). So, I simply remixed their work into this repo. _Thank you guys!_

#### Dear beginners and copy-pasters

:octocat: _For those of you, who are new in programming or can only copy-paste, please make sure, that the Google Maps API and the .js-file of this plugin are successfully loaded before you call this script in the body your html page._

_under demo/index.html is a working demo, the comments will guide you :wink:_

## Prerequisites

**either**

- add the .js and .css of this repo to your project (see index.html for inspiration :wink:)

**or**

- `$ npm install -i google-maps-reviews`

**then**

- **if you do not have a working Google Maps API key already:** create a Google API Key: [https://console.developers.google.com/apis/](https://console.developers.google.com/apis/)

- add the following line with your Google Maps API key with the key param:

  ```html
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=YourApiKeyHere"></script>
  ```

- add an empty **_div_** element in your html's body with an unique ID, where the reviews should show up. In this case:

  `<div id="google-reviews"></div>`

## Call the Plugin

[Grab your place's ID (https://developers.google.com/places/place-id) and call it as **_placeId_** parameter, when calling the plugin. ](https://developers.google.com/places/place-id)

```html
<!-- add this before </body> -->
<script>
    // Find a placeID via https://developers.google.com/places/place-id
    googlePlaces("google-reviews", {
      placeId: 'ChIJZa6ezJa8j4AR1p1nTSaRtuQ',
      // the following params are optional (default values)
      header: "<h3>Google Reviews</h3>", // html/text over Reviews
      footer: '', // html/text under Reviews block
      maxRows: 6, // max rows of reviews to be displayed
      minRating: 4, // minimum rating of reviews to be displayed
      months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      textBreakLength: "90", // length before a review box is set to max width
      showDate: false, // renders the date of the review before the review itself
      shortenNames: true, // example: "Max Mustermann" -> "Max M.""
      replaceAnonymous: false, // do not replace anonymous author_name from JSON
      anonymousName: "A Google User", // Google's default value depending on language used (en: "A Google User")
      anonymousNameReplacement: "User chose to remain anonymous", // replacement for default (never shortens)
    });
  });
</script>
```

## Are Pull Requests welcome?

Yes, of course :octocat:
