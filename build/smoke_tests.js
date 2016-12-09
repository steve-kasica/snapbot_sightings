// These are nothing better than smoke tests, smoke tests.

function sendLocationEmail() {
    var email = PropertiesService.getUserProperties().getProperty('email'),
        recipients = [ email ],
        latitude = 36.065226,
        longitude = -112.136893;
    
    email.send_location(latitude, longitude, recipients);
}

function testAddRow() {
    var testID = PropertiesService.getScriptProperties().getProperty('testid');
        fusion_table.table_id = testID;
    fusion_table.add_row(TEST_LAT, TEST_LNG);
}
