// These are nothing better than smoke tests, smoke tests

function sendLocationEmail() {
    var email = PropertiesService.getUserProperties().getProperty('email'),
        recipients = [ email ],
        latitude = 36.065226,
        longitude = -112.136893;
    
    email.send_location(latitude, longitude, recipients);
}
