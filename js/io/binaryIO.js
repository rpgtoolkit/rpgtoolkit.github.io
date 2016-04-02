function binaryIO(filename) {
  // synchronous request for binary
  var req = new XMLHttpRequest();
  req.open("GET", filename, false);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.send(null);

  // create buffer
  var binary = req.responseText;
  var buffer = new ArrayBuffer(binary.length);

  // create data view
  this.dataview = new DataView(buffer);
  this.offset = 0;

  // load binary data into buffer via view
  for (var i = 0; i < binary.length; i++) {
    this.dataview.setUint8(i, binary.charCodeAt(i) & 0xFF);
  }
}

binaryIO.prototype.readString = function () {
  var str = '';
  chr = this.readChar();
  while (chr) {
    str += chr;
  }
  
  return str;
};

binaryIO.prototype.readChar = function () {
  var chrCode = this.readInt8();
  return (chrCode) ? String.fromCharCode(chrCode) : "";
};

binaryIO.prototype.readInt8 = function () {
  this.offset += 1;
  return this.dataview.getInt8(this.offset - 1);
};

binaryIO.prototype.readUint8 = function () {
  this.offset += 1;
  return this.dataview.getUint8(this.offset - 1);
};

binaryIO.prototype.readInt16 = function () {
  this.offset += 2;
  return this.dataview.getInt16(this.offset - 2, true);
};

binaryIO.prototype.readUint16 = function () {
  this.offset += 2;
  return this.dataview.getUint16(this.offset - 2, true);
};