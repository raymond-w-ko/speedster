var $ = require("jquery");
var dom = require("./dom.js");

var $root;

var measurementStarted = false;
var GlyphWidths = {};

exports.GlyphsMeasured = false;

var CharCodes = [];
for (var i = 0; i <= 255; ++i) {
  CharCodes.push(i);
}
var PauseChars = {
  ",": true,
  ".": true,
  "?": true,
  "!": true,
  ":": true,
  "\"": true,
  "“": true,
  "”": true,
  "—": true,
}
for (var k in PauseChars) {
  var code = k.charCodeAt(0);
  CharCodes.push(code);
}

var glyphIndex = 0;
function MeasureLoop() {
  if (glyphIndex >= CharCodes.length) {
    exports.GlyphsMeasured = true;
    return;
  }
  if (!dom.IsDomAttached) {
    setTimeout(MeasureLoop, 500);
    return;
  }
  var code = CharCodes[glyphIndex];
  var letter = String.fromCharCode(code);
  var $ruler = dom.$ruler;
  $ruler.empty();
  var $span = $("<span/>").text(letter).appendTo($ruler);
  $span.ready(function() {
    var w = $span[0].getBoundingClientRect().width;
    // console.log("char: " + code + " width: " + w);
    GlyphWidths[code] = w;
    $span.remove();

    glyphIndex += 1;
    setImmediate(MeasureLoop);
  });
}

exports.startMeasurements = function() {
  if (measurementStarted) return;
  measurementStarted = true;
  setImmediate(MeasureLoop);
}

exports.getGlyphWidth = function(charCode) {
  return GlyphWidths[charCode];
}

exports.getStringWidth = function(s) {
  var w = 0;
  for (var i = 0; i < s.length; ++i) {
    var code = s.charCodeAt(i);
    w += GlyphWidths[code] || 0;
  }
  return w
}
