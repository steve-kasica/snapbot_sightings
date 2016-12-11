# Snapbot Sightings
Receive an email notification about Snapbot, those vending machines that sell [Spectacles](https://spectacles.com) when:

* A new countdown begins, includes the date and time when the location will be revealed.
* The Snapbot location has been revealed, includes the approximate address of the location in the email.

## Signing up
You can signup through this project's [GitHub Pages page](https://stvkas.github.io/snapbot_sightings) or directly through the [form embedded in the webpage](https://goo.gl/forms/3igqSTafILJqHl1j1).

## How it Works
This [Google Apps](https://developers.google.com/google-apps/) project uses [Forms](https://www.google.com/forms/about/) to collection subscriber info, [Fusion Tables](https://support.google.com/fusiontables/answer/2571232?hl=en) to gather and display Snapbot data, and [Apps Script](https://developers.google.com/apps-script/) tie everything together.

The script monitors this [JSON endpoint](https://spectacles.com/locations), which always provides the seconds until a new Snapbot location is revealed and location data when the countdown has concluded. In the code, the `check_for_snapbots` function is running on a minute trigger and compares how many seconds are on the clock, `curr` against that value the last time the function, `prev`. All decisions are based on these two values, for example

| `curr` | `prev` | `curr > prev` | `curr < prev && curr === 0` |        Event        |
| ------ | ------ | ------------- | --------------------------- | ------------------- |
|    2   |  null  |       NA      |              NA             |                     |
|    1   |    2   |       F       |              F              |                     |
|    0   |    1   |       F       |              T              |  Location revealed  |
|    0   |    0   |       F       |              F              |                     |
|    0   |    0   |       F       |              F              |                     |
|    2   |    0   |       T       |              F              | New countdown begun |
|    1   |    2   |       F       |              F              |                     |

In addition to collection subscriber's email addresses, the form also allows users to select which events they want email notifications about. Countdown subscribers receive an email from me with the date of when the Snapbot location will be revealed. Location subscribers are then emailed the address of the Snapbot.

The JSON endpoint provides a latitude, longitude coordinates, and the program pases those through the Google Maps Geolocation API to get an address. This location data is also recorded in a [Google Fusion Table](https://www.google.com/fusiontables/DataSource?docid=1ffadHIK9sqiWw3mzuZrAkcTQHsYLsgpt7dyWY1bT), which powers [the map on the website](https://stvkas.github.io/snapbot_sightings/locations.html).
