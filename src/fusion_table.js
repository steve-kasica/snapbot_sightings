var fusion_table = fusion_table || {};

fusion_table.table_id = '1ffadHIK9sqiWw3mzuZrAkcTQHsYLsgpt7dyWY1bT';

fusion_table.add_row = function(lat, long) {
  var now = new Date();
  var sql = 'INSERT INTO ' + this.table_id + '(Latitude, Longitude, Date) ';
  sql += 'VALUES ('+ lat + ',' + long + ',\'' + now.toISOString() + '\')';
  return FusionTables.Query.sql(sql);
};

fusion_table.get_row_by_id = function(rowid) {
  var sql = 'SELECT * FROM' + this.table_id + ' WHERE ROWID = ' + rowid;
  return FusionTables.Query.sql(sql);
}

fusion_table.remove_row_by_id = function(rowid) {
  var sql = 'DELETE FROM ' + this.table_id + ' WHERE ROWID = ' + rowid;
  return FusionTables.Query.sql(sql);
}