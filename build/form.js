// form namespace
var form = form || {};

/**
 * get_subscribers_by_checkbox
 * ----------------------------------------------------------------
 * Get the email address of people by which checkbox they checked.
 *
 * Params:
 *   checkboxText {stirng} The text string describing the checkbox.
 *
 * Returns:
 *   {Array} an array of email address from form submitters who
 *   selected the specific checkbox.
 */
form.get_subscribers_by_checkbox = function(checkboxText) {
    return FormApp
    .getActiveForm()
    .getResponses()
    .filter(function(formResponse) {
        var checkboxResponse = formResponse.getItemResponses()[0].getResponse();
        return (checkboxResponse.indexOf(checkboxText) > -1);
    })
    .map(function(formResponse) {
        return formResponse.getRespondentEmail();
    });  
};

/**
 * get_countdown_subscribers
 * ----------------------------------------------------------------
 * Get the email address of people who want countdown notification.
 *
 * Returns:
 *     {Array} an of email address of those who want countdown notifications.
 */
form.get_countdown_subscribers = function() {
    var countdownText = 'The date and time of the next a Snapbot deployment when countdown begins.';
    return this.get_subscribers_by_checkbox(countdownText);
};

/**
 * get_location_subscribers
 * ----------------------------------------------------------------
 * Get the email address of people who want location notification.
 *
 * Returns:
 *     {Array} an of email address of those who want location notifications. 
 */
form.get_location_subscribers = function() {
    var locationText = 'The location of the Snapbot when its location is revealed.';
    return this.get_subscribers_by_checkbox(locationText);
};
