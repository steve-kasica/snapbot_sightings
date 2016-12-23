// maps namespace
var maps = maps || {};

maps.get_address_by_lat_lng = function(lat, lng) {
  var loc = Maps.newGeocoder().reverseGeocode(lat, lng);
  return loc.results[0].formatted_address;
};