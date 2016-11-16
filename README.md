# Snapbot (Spectacles) Notifications
Receive an email notification about Snapbot (Spectacles) when:

1. A new countdown begins, includes the date and time when the location will be revealed.
2. The Snapbot location has been revealed, includes the approximate address of the location in the email.

## Permissions
This script requires access to:
* Send email as you
* Connect to an external service
* View and manage data associated with the application

It's a good idea to run a couple of the functions manually in order to ensure that the script has the proper permissions before
you run it as a Trigger.

## About
`Code.gs` was written for Google Apps Script. It monitors this [JSON endpoint with countdown data](https://spectacles.com/locations) I found while sniffing around the Spectacles website. 
