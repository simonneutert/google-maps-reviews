# Display Google Reviews of a Place on Google Maps on your website

project on npm: https://www.npmjs.com/package/google-maps-reviews

## Credits
Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/ or check out [Steven's github](https://github.com/stevenmonson/googleReviews). Steven's code is based on [peledies jquery plugin repo](https://github.com/peledies/google-places). So, I simply remixed their work into this repo. *Thank you guys!*

#### Dear beginners and copy-pasters

:octocat: *For those of you, who are new in programming or can only copy-paste, please make sure, that the Google Maps API and the .js-file of this plugin are successfully loaded before you call this script in the body your html page.*

*under demo/index.html is a working demo, the comments will guide you :wink:*

## Prerequisites

__either__

* add the .js and .css of this repo to your project (see index.html for inspiration :wink:)

__or__

* `$ npm install -i google-maps-reviews`

__then__

* __if you do not have a working Google Maps API key already:__ create a Google API Key: [https://console.developers.google.com/apis/](https://console.developers.google.com/apis/)

* add the following line with your Google Maps API key with the key param:

  ``` html
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=YourApiKeyHere"></script>
  ```

* add an empty ***div*** element in your html's body with an unique ID, where the reviews should show up. In this case:

  `<div id="google-reviews"></div>`

## Call the Plugin

[Grab your place's ID (https://developers.google.com/places/place-id) and call it as ***placeId*** parameter, when calling the plugin. ](https://developers.google.com/places/place-id)

``` html
<!-- add this before </body> -->
<script>
  // Find a placeID via https://developers.google.com/places/place-id
  googlePlaces("google-reviews", {
    placeId: 'ChIJZa6ezJa8j4AR1p1nTSaRtuQ',
    // the following params are optional (default values)
    header: "<h3>Google Reviews</h3>", // html/text over Reviews
    footer: '', // html/text under Reviews block
    max_rows: 6, // max rows of reviews to be displayed
    min_rating: 4, // minimum rating of reviews to be displayed
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    text_break_length: "90", // length before a review box is set to max width
    show_date: false, // renders the date of the review before the review itself
    shorten_names: true, // example: "Max Mustermann" -> "Max M.""
    replace_anonymous: false, // do not replace anonymous author_name from JSON
    anonymous_name: "A Google User", // Google's default value depending on language used (en: "A Google User")
    anonymous_name_replacement: "User chose to remain anonymous", // replacement for default (never shortens)
  });
});
</script>
```

## Are Pull Requests welcome?
Yes, of course :octocat:
