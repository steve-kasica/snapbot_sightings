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
        // If the countdown has begun.
        var dropTime = new Date(now.getTime() + curr),
            hoursDelta = spectacles.get_hours(dropTime, now),
            minutesDelta = spectacles.get_minutes(dropTime, now);
        
        email.send_countdown(dropTime.toString(), hoursDelta.toString(), minutesDelta.toString());
    } else if (curr < prev && curr === 0) {
        // If countdown has concluded.
        var lat = data.coordinates[0].lat,
            lng = data.coordinates[0].lng;
        
        email.send_location(lat, lng); 
    }
    PropertiesService.getScriptProperties().setProperty('countdown', curr);
}
