function get_hours_(droptime, now) {
  // Get the number of hours until the countdown finishes.
  return Math.floor((droptime.getTime() - now.getTime()) / (1000 * 60 * 60));
}

function get_minutes_(droptime, now) {
  // Get the remaining minutes left in the number of hours until the countdown finishes.
  var minutes = (droptime.getTime() - now.getTime()) / (1000 * 60);
  
  return Math.round(minutes % 60);
}

function get_data_() {
  // Get the current countdown and coordinates from this JSON endpoint I found on the Snapchat 
  // website, which powers the Snapbot map. 
  // Returns the JSON response as a JavaScript object literal. 
  var url = 'https://www.spectacles.com/locations';
  var res = UrlFetchApp.fetch(url);
  
  return JSON.parse(res.getContentText());
}

function location_email_(latitude, longitude) {
  // Get email notification when the location of the Snapbot has been revealed.
  var loc = Maps.newGeocoder().reverseGeocode(latitude, longitude),
      address = loc.results[0].formatted_address;
  
  var props = PropertiesService.getScriptProperties(),
      to = props.getProperty('send_to'),
      replyTo = 'Spectacles Countdown',
      subject = 'New Snapbot at ' + address,
      body = 'A new Snapbot selling Spectacles has appeared at ' + address + '. See more at https://spectacles.com/map';
  
  return MailApp.sendEmail(to, replyTo, subject, body);
}

function countdown_email_(drop, hours, min) {
  // Get email notification when a countdown begins.
  
  var props = PropertiesService.getScriptProperties(),
      to = props.getProperty('send_to'),
      replyTo = 'Spectacles Countdown',
      subject = 'Snapbot Drops on ' + drop;
      
  var body = 'The new location of a Snapbot selling Spectacles will be announced in ' + hours + ' hours ';
  body += 'and ' + min + ' minutes. Visit the Spectacles map (https://www.spectacles.com/map) on ' + drop + ' ';
  body += 'to see where it landed.';
  
  return MailApp.sendEmail(to, replyTo, subject, body);
}

function main() {
  // Main access point for the trigger
  
  var now = new Date(),
      prev = PropertiesService.getScriptProperties().getProperty('countdown'),
      data = get_data_(),
      curr = data.countdown,
      loc = data.coordinates;

  if (curr > prev) {
    // If the countdown has begun.
    
    var dropTime = new Date(now.getTime() + curr),
        hoursDelta = get_hours_(dropTime, now),
        minutesDelta = get_minutes_(dropTime, now);
    
    countdown_email_(dropTime.toString(), hoursDelta.toString(), minutesDelta.toString());
    
  } else if (curr < prev && curr === 0) {
    // If countdown has concluded.
    
    var lat = data.coordinates[0].lat,
        lng = data.coordinates[0].lng;
        
    location_email_(lat, lng);
  }
  
  PropertiesService.getScriptProperties().setProperty('countdown', curr);
}
