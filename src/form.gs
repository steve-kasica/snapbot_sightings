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
function get_subscribers_by_checkbox_(checkboxText, devMode) {
  var props = PropertiesService.getScriptProperties();
  var formId = (devMode) ? props.getProperty('dev_form_id') : props.getProperty('prod_form_id');
  return FormApp
    .openById(formId)
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
 * Params:
 *     {Bool} run this function on the development form.
 *
 * Returns:
 *     {Array} an of email address of those who want countdown notifications.
 */
function get_countdown_subscribers(devMode) {
    var countdownText = 'The date and time of the next Snapbot deployment when countdown begins.';
    return get_subscribers_by_checkbox_(countdownText, devMode);
}; 

/**
 * get_location_subscribers
 * ----------------------------------------------------------------
 * Get the email address of people who want location notification.
 *
 * Params:
 *     {Bool} run this function on the development form. 
 *
 * Returns:
 *     {Array} an of email address of those who want location notifications. 
 */
function get_location_subscribers(devMode) {
    var locationText = 'The location of the Snapbot when its location is revealed.';
    return get_subscribers_by_checkbox_(locationText, devMode);
};