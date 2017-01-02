// maps namespace
var maps = maps || {};

maps.get_address_by_lat_lng = function(lat, lng) {
  var loc = Maps.newGeocoder().reverseGeocode(lat, lng);
  return loc.results[0].formatted_address;
};

maps.get_static_map = function(lat, lng) {
    var zoom = 11;
    var format = 'jpg';
    var maptype = 'hybrid';
    var width = 400;
    var height = width;

    return Maps.newStaticMap()
        .addMarker(lat, lng)
        .setZoom(zoom)
        .setFormat(format)
        .setMapType(maptype)
        .setSize(width, height);
}
