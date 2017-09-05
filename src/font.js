var $ = require("jquery");
var dom = require("./dom.js");

var $root;

var measurementStarted = false;
var GlyphWidths = {};

exports.GlyphsMeasured = false;

var glyphIndex = 0;
function MeasureLoop() {
  if (glyphIndex >= 512) {
    exports.GlyphsMeasured = true;
    return;
  }
  if (!dom.IsDomAttached) {
    setTimeout(MeasureLoop, 500);
    return;
  }
  var letter = String.fromCharCode(glyphIndex);
  var $ruler = dom.$ruler;
  $ruler.empty();
  var $span = $("<span/>").text(letter).appendTo($ruler);
  $span.ready(function() {
    var w = $span[0].getBoundingClientRect().width;
    console.log("char: " + glyphIndex + " width: " + w);
    GlyphWidths[glyphIndex] = w;
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
