var fusion_table = fusion_table || {};

// Unique ID for Fusion Table holding sightings data.
fusion_table.table_id = '1ffadHIK9sqiWw3mzuZrAkcTQHsYLsgpt7dyWY1bT';

/**
 * add_row
 * ------------------------------------------------------------------------------
 * Add a row to the Fusion Table with new lat, long and date.
 *
 * Params:
 *     lat {float} Latitude
 *     long {float} Longitude
 *
 * Returns:
 *     The response from Fusion Table's query.
 */
fusion_table.add_row = function(lat, long) {
    var now = new Date();
    var sql = 'INSERT INTO ' + this.table_id + '(Latitude, Longitude, Date) ';
        sql += 'VALUES ('+ lat + ',' + long + ',\'' + now.toISOString() + '\')';
    return FusionTables.Query.sql(sql);
};
