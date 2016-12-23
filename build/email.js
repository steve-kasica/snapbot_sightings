// email namespace
 var email = email || {};

 /**
  * send_location
  * ----------------------------------------------------------------------------
  * Send email notification when the location of the Snapbot has been revealed.
  *
  * Params:
  *     latitude {float} The latitude coordiantes of the Snapbot location.
  *     longitude {float} The longitude coordiantes of the Snapbot location.
  *     testRecipients {Array} An array of recipients for testing this function.
  *
  * Returns:
  *     void
  */
email.send_location = function(lat, lng, testRecipients) {
    var address = maps.get_address_by_lat_lng(lat, lng),
        recipients = testRecipients || form.get_location_subscribers();

    recipients.forEach(function(emailAddr) {  
        var replyTo = 'Spectacles Location',
            subject = 'New Snapbot at ' + address,
            body = 'A new Snapbot selling Spectacles has appeared at ' + address + '. See more at https:spectacles.com/map';

        MailApp.sendEmail(emailAddr, replyTo, subject, body);
    });
};

 /**
  * send_countdown
  * ---------------------------------------------------------------------
  * Send email notification when the countdown to a new snapbot Location.
  *
  * Params:
  *     drop {string} The datetime of when the Snapbot drops in ISO 8601
  *     hours {int} The number of hours until the countdown finishes.
  *     minutes {int} The number of minutes until the countdown finishes.
  *
  * Returns:
  *     null 
  */
email.send_countdown = function(drop, hours, min) {
    var recipients = form.get_location_subscribers(),
        replyTo = 'Spectacles Countdown',
        body = '',
        subject = 'Snapbot Drops on ' + drop;

    recipients.forEach(function(email) {
        body = 'The new location of a Snapbot selling Spectacles will be announced in ' + hours + ' hours ';
        body += 'and ' + min + ' minutes. Visit the Spectacles map (https:www.spectacles.com/map).';

        MailApp.sendEmail(email, replyTo, subject, body);
    });
};
