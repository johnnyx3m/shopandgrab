

export default function(result, total, options){
  var rows = result.rows;
  var data = [];
  for (var l = 0; l < rows.length; l++) {
    var row = rows[l].sanitizeForResponse();

    if(options){
      if(options.showToken){
        row.token = rows[l].generateToken();
      }
    }
    data[data.length] = row;
  }

  var ret = {
    meta: {
      count: total
    },
    data: data
  }

  return ret;
}
