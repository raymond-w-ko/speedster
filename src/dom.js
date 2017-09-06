var $ = require("jquery");

var Renderer = require("./renderer.js");
var TextExtracter = require("./text-extracter.js");

exports.IsDomAttached = false;

exports.createDOM = function() {
  exports.$body = $("body");
  var $root = $("<div/>").attr("id", "speedster");
  exports.$root = $root;

  var $display = $("<div/>").addClass("display").appendTo($root);
  exports.$display = $display;
  exports.$tickTop = $("<div/>").addClass("tick-top").appendTo($display);
  exports.$tickBottom = $("<div/>").addClass("tick-bottom").appendTo($display);

  // exports.$spacer = $("<div/>").addClass("spacer").appendTo($display);
  var $letters = $("<div/>").addClass("letters").appendTo($display);
  exports.$letters = $letters;

  exports.$wordPrefix = $("<span/>").addClass("word-prefix").appendTo($letters);
  exports.$wordCenter = $("<span/>").addClass("word-prefix red").appendTo($letters);
  exports.$wordSuffix = $("<span/>").addClass("word-prefix").appendTo($letters);

  var $controls = $("<div/>").attr("class", "controls").appendTo($root);
  exports.$controls = $controls;

  exports.$speeds = $("<select/>").attr("class", "speeds").appendTo($controls);
  for (var wpm = 300; wpm <= 1000; wpm += 50) {
    var $option = $("<option/>").val(wpm).text(wpm + " WPM").appendTo(exports.$speeds);
  }
  exports.$speeds.val(500);
  exports.wpm = 500;
  exports.$speeds.on("change", function() {
    exports.wpm = this.value;
  });

  exports.$play = $("<button/>").text("Play").appendTo($controls);
  exports.$play.on("click", function() {
    Renderer.TogglePlay();
  });
  exports.$ruler = $("<div/>").addClass("ruler").appendTo($root);

  exports.$body.on("keydown", function(e) {
    switch (e.which) {
      case 118:
      case 119:
        toggle();
        break;
      default:
        break;
    }
  })
}

function toggle() {
  var $sel = $("#speedster");
  if ($sel.length === 0) {
    exports.$body.append(exports.$root);
    exports.IsDomAttached = true;
    InstallKeyHandler();

    var text = TextExtracter.getText();
    Renderer.LoadText(text);
  } else {
    exports.IsDomAttached = false;
    exports.$root.detach();
    UninstallKeyHandler();
  }
}

function InstallKeyHandler() {
  $(document).on("keydown", KeyHandler);
}
function UninstallKeyHandler() {
  $(document).off("keydown", KeyHandler);
}

function KeyHandler(e) {
  switch (e.which) {
    case 32:
    case 8:
      // Space
      // Backspace
      e.preventDefault();
      Renderer.TogglePlay();
      break;
    case 37:
      // Left
      e.preventDefault();
      Renderer.RewindToPreviousSentence();
    default:
      break;
  }
}

