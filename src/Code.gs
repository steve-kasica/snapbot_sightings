/**
 * check_for_snapbots
 * ------------------------------------------------------
 * The main access point for the notifications trigger.
 */
function check_for_snapbots() {
    var now = new Date();
    var props = PropertiesService.getScriptProperties();
    var data = spectacles.get_data();
    var sheetId = props.getProperty('sheetid');
    var log = SpreadsheetApp.openById(sheetId).getSheetByName('log');
    
    // Update script's internal countdown clock.
    var prev = props.getProperty('countdown');
    var curr = data.countdown;
    props.setProperty('countdown', curr);
    
    log.appendRow([now.toString(), prev, curr, JSON.stringify(data.coordinates)]);
    
    if (curr > prev) {
        // Countdown has begun.
        var dropTime = new Date(now.getTime() + curr);
        var hoursDelta = spectacles.get_hours(dropTime, now);
        var minutesDelta = spectacles.get_minutes(dropTime, now);
        
        email.send_countdown(dropTime.toString(), hoursDelta.toString(), minutesDelta.toString());
    } else if (curr < prev && curr === 0) {
        // Countdown has concluded.
        if (data.coordinates.length > 0) {
          // Don't assume that location data is going to be there when it should.
          data.coordinates.forEach(function(pair) {            
            email.send_location(pair.lat, pair.lng);
            fusion_table.add_row(pair.lat, pair.lng);
          });
        } else {
          throw new Error( "Countdown concluded, but location data wasn't avaliable.");
        }
    }
}