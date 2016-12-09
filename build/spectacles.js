// spectacles namespace
var spectacles = spectacles || {};

/**
 * get_hours
 * --------------------------------------------------------------------
 * Calculate the difference of hours between now and Snapbot drop time.
 *
 * Params:
 *     droptime {DateTime} the date object of when the Snapbot drops.
 *     now {DateTime} the date object of the current time.
 *
 * Returns:
 *    {int} The number of hours until the countdown finishes.
 *
 */
spectacles.get_hours = function(droptime, now) {
    return Math.floor((droptime.getTime() - now.getTime()) / (1000 * 60 * 60));
};

/**
 * get_minutes
 * ------------------------------------------------------------------------
 * Calculate the difference of minutes between now and Snapbot drop time.
 *
 * Params:
 *     droptime {DateTime} the date object of when the Snapbot drops.
 *     now {DateTime} the date object of the current time.
 *
 * Returns:
 *    {int} The number of minutes until the countdown finishes.
 *
 */
spectacles.get_minutes = function(droptime, now) {
    var minutes = (droptime.getTime() - now.getTime()) / (1000 * 60);
    return Math.round(minutes % 60);
};

/**
 * get_hours
 * -----------------------------------------------------------------
 * Get the current countdown and coordinates from this JSON endpoint 
 * I found on the Snapchat website, which powers the Snapbot map. 
 *
 * Return: 
 *     the JSON response as a JavaScript object literal. 
 *
 */
spectacles.get_data = function() {
    var url = 'https://www.spectacles.com/locations';
    var res = UrlFetchApp.fetch(url);
    return JSON.parse(res.getContentText());
};
