// Copyright (c) 2021, Simon Neutert
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/* README
Inspired by Steven Monson's magnificent article here:
https://www.launch2success.com/guide/display-google-reviews-website-2017/

Stevens code was based on peledies jquery plugin on github:
https://github.com/peledies/google-places

made me think and remix their work into the following lines.

Thank you guys!
*/

export default function googlePlaces(google, elem, options) {
  // This is the easiest way to have default options.
  let settings = {
    // These are the defaults.
    header: "<h3>Google Reviews</h3>",
    footer: "",
    maxRows: 6,
    minRating: 4,
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    textBreakLength: "90",
    shortenNames: true,
    replaceAnonymous: false,
    anonymousName: "A Google User",
    anonymousNameReplacement: "User chose to remain anonymous",
    showDate: false,
    showProfilePicture: false,
    placeId: "",
  };
  settings = { ...settings, ...options };
  const targetDiv = document.getElementById(elem);

  const renderHeader = (header) => {
    let html = "";
    html += `${header}<br>`;
    targetDiv.innerHTML += html;
  };

  const renderFooter = (footer) => {
    let html = "";
    html += `<br>${footer}<br>`;
    targetDiv.innerHTML += html;
  };

  const shortenName = (name) => {
    if (name === undefined) return settings.anonymousName;

    if (name.split(" ").length > 1) {
      const splitName = name.split(" ");
      const firstName = splitName[0];
      const lastNameFirstLetter = splitName[1][0];

      if (lastNameFirstLetter === ".") {
        return firstName;
      }
      return `${firstName} ${lastNameFirstLetter}.`;
    }
    if (name !== undefined) {
      return name;
    }
    return settings.anonymousName;
  };

  const renderStars = (rating) => {
    let stars = '<div class="review-stars"><ul>';
    // fill in gold stars

    for (let i = 0; i < rating; i += 1) {
      stars += '<li><i class="star"></i></li>';
    }
    // fill in empty stars
    if (rating < 5) {
      for (let i = 0; i < 5 - rating; i += 1) {
        stars += '<li><i class="star inactive"></i></li>';
      }
    }
    stars += "</ul></div>";
    return stars;
  };

  const convertTime = (unixTimestamp) => {
    const a = new Date(unixTimestamp * 1000);
    const { months } = settings;
    const time = `${a.getDate()}. ${months[a.getMonth()]} ${a.getFullYear()}`;
    return time;
  };

  const filterReviewsByMinRating = (reviews) => {
    // eslint-disable-next-line no-void
    if (reviews === void 0) {
      return [];
    }
    for (let i = reviews.length - 1; i >= 0; i -= 1) {
      if (reviews[i].rating < settings.minRating) {
        reviews.splice(i, 1);
      }
    }
    return reviews;
  };

  const sortReviewsByDateDesc = (reviews) => {
    if (
      typeof reviews !== "undefined" &&
      reviews != null &&
      reviews.length != null &&
      reviews.length > 0
    ) {
      return (
        reviews
          // eslint-disable-next-line no-nested-ternary
          .sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0))
          .reverse()
      );
    }
    return [];
  };

  const rescueAnonymousReviews = (review, name) => {
    if (
      settings.replaceAnonymous === true &&
      settings.anonymousName !== "" &&
      (review.author_name.toLowerCase() ===
        settings.anonymousName.toLowerCase() ||
        review.author_name === undefined) &&
      settings.anonymousNameReplacement !== ""
    ) {
      return settings.anonymousNameReplacement;
    }
    return name;
  };

  const renderReviews = (reviews) => {
    reviews.reverse();
    let html = "";
    let rowCount =
      settings.maxRows > 0 ? settings.maxRows - 1 : reviews.length - 1;

    // make sure the rowCount is not greater than available records
    rowCount = rowCount > reviews.length - 1 ? reviews.length - 1 : rowCount;

    for (let i = rowCount; i >= 0; i -= 1) {
      const review = reviews[i];
      if (!review) return;
      const stars = renderStars(review.rating);
      const date = convertTime(review.time);
      let name = settings.shortenNames
        ? shortenName(review.author_name)
        : review.author_name;
      const style =
        review.text.length > parseInt(settings.textBreakLength, 10)
          ? "review-item-long"
          : "review-item";
      let reviewText = review.text;
      if (settings.showDate === true) {
        reviewText = `<span class='review-date'>${date}</span> ${reviewText}`;
      }
      name = rescueAnonymousReviews(review, name);
      html =
        `${html}<div class=${style}><div class='review-meta'><span class='review-author'>${name}</span><span class='review-sep'></span>` +
        `</div>${stars}<p class='review-text'>${reviewText}</p></div>`;
    }
    targetDiv.innerHTML += html;
  };

  // GOOGLE PLACES API CALL STARTS HERE

  // initiate a Google Places Object
  const service = new google.maps.places.PlacesService(targetDiv);
  // set.getDetails takes 2 arguments: request, callback
  // see documentation here:  https://developers.google.com/maps/documentation/javascript/3.exp/reference#PlacesService
  const request = {
    placeId: settings.placeId,
  };
  // the callback is what initiates the rendering if Status returns OK
  const callback = (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const filteredReviews = filterReviewsByMinRating(place.reviews);
      const sortedReviews = sortReviewsByDateDesc(filteredReviews);
      if (sortedReviews.length > 0) {
        renderHeader(settings.header);
        renderReviews(sortedReviews);
        renderFooter(settings.footer);
      }
    }
  };

  if (settings.placeId === undefined || settings.placeId === "") {
    console.error("NO PLACE ID DEFINED");
    return true;
  }

  return service.getDetails(request, callback);
}
