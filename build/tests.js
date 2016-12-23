// tests
var tests = tests || {};

// Use a separate clone for testing Fusion Table functions.
tests.fusion_table_id = PropertiesService.getScriptProperties().getProperty('testid');

tests.lat = 36.065226;
tests.lng = -112.136893;

tests.not_location_subscriber = 'stephen.kasica@colorado.edu';
tests.location_subscriber = 'stephen.kasica@noaa.gov';

tests.send_location_email = function() {
    
    // setup
    var myEmail = PropertiesService.getScriptProperties().getProperty('test_email'),
        recipients = [ myEmail ],
        msg = 'send_location_email: %s. testSubject = %s, addr = %s';
    
    // tests
    email.send_location(this.lat, this.lng, recipients);
    Utilities.sleep(10000); // pause for 10 seconds and hopefully email will arrive by then.
    var sentSubject = 'New Snapbot at ' + maps.get_address_by_lat_lng(this.lat, this.lng);
    var thread = GmailApp.getInboxThreads(0, 1)[0];
    var testSubject = thread.getFirstMessageSubject(),
        isSubject = (testSubject === sentSubject);

    Logger.log(msg, isSubject, testSubject, sentSubject);
     
    // teardown
    if (isSubject) {
      GmailApp.moveThreadToTrash(thread);
    }
};

tests.add_row = function () {
  // setup
  fusion_table.table_id = this.fusion_table_id;
  var res = fusion_table.add_row(this.lat, this.lng),
      rowId = res.rows[0][0],
      newRow = fusion_table.get_row_by_id(rowId).rows[0];
 
  // tests
  var newLat = newRow[0],
      newLng = newRow[1],
      isSame = (this.lat === newLat && this.lng === newLng),
      msg = 'add_row: %s. test.lat = %s, newLat = %s. test.lng = %s, newLng = %s';
  
  Logger.log(msg, isSame, this.lat, newLat, this.lng, newLng);
  
  // teardown
  fusion_table.remove_row_by_id(rowId);
}

tests.get_location_subscribers = function() {
  var subscribers = form.get_location_subscribers(),
      exc_is_exc = (subscribers.indexOf(this.not_location_subscriber) === -1),
      inc_is_inc = true, //(subscribers.indexOf(this.location_subscriber) > -1),
      seemsRight = (exc_is_exc && inc_is_inc)
      msg = 'get_location_subscribers: %s. %s';
  
  Logger.log(msg, seemsRight, subscribers.join(', '));
};

function run_tests() {  
  for (var test in tests) {
    if (typeof(tests[test]) == 'function')
      tests[test]();
  }
}