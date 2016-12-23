/**
 * check_for_snapbots
 * ------------------------------------------------------
 * The main access point for the notifications trigger.
 */
function check_for_snapbots() {
    var now = new Date(),
    prev = PropertiesService.getScriptProperties().getProperty('countdown'),
    data = spectacles.get_data(),
    curr = data.countdown,
    loc = data.coordinates;

    if (curr > prev) {
        PropertiesService.getScriptProperties().setProperty('countdown', curr);    
        // Countdown has begun.
        var dropTime = new Date(now.getTime() + curr),
            hoursDelta = spectacles.get_hours(dropTime, now),
            minutesDelta = spectacles.get_minutes(dropTime, now);
        
        // email.send_countdown(dropTime.toString(), hoursDelta.toString(), minutesDelta.toString());
    } else if (curr < prev && curr === 0) {
        // Countdown has concluded.
        if (loc.length > 0) {
          // Don't assume that location data is going to be there when it should.
          PropertiesService.getScriptProperties().setProperty('countdown', curr);          
          data.coordinates.forEach(function(pair) {
            var lat = pair.lat,
                lng = pair.lng;
        
            // email.send_location(lat, lng);
            fusion_table.add_row(lat, lng);
          });
        } else {
          throw new Error( "Countdown concluded, but location data wasn't avaliable.");
          // Don't set countdown until that location data is available.          
        }
    } else {
        PropertiesService.getScriptProperties().setProperty('countdown', curr);
    }
}