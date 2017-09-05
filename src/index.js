require("setimmediate");
var $ = require("jquery");

var Font = require("./font.js");
var dom = require("./dom.js");

$(main);

function main() {
  dom.createDOM();
  Font.startMeasurements();
}
