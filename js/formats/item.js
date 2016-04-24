function item(filename) {
  // TODO: Make the changes here that chrome suggests.
  var req = new XMLHttpRequest();
  req.open("GET", filename, false);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.send(null);
  
  var item  = JSON.parse(req.responseText);
  
  return item;
}

