var $ = require("jquery");

$(main);

var numLettersBeforeCenter = 5;
var $body;
var $root;
var $display, $tickTop, $tickBottom, $letters;
var $wordPrefix, $wordCenter, $wordSuffix;
var $controls, $speeds;

function repeat(letter, num) {
  if (num < 1) {
    return new Array(Math.abs(num) + 1).join(letter);
  }
  return new Array(num + 1).join(letter);
};

function main() {
  $body = $("body");
  createDOM();

  $body.on("keydown", function(e) {
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

function createDOM() {
  $root = $("<div/>").attr("id", "speedster-container");

  $display = $("<div/>").attr("class", "display").appendTo($root);
  $tickTop = $("<div/>").attr("class", "tick-top").appendTo($display);
  $tickBottom = $("<div/>").attr("class", "tick-bottom").appendTo($display);

  $letters = $("<div/>").attr("class", "letters").appendTo($display);
  $wordPrefix = $("<span/>").attr("class", "word-prefix").appendTo($letters);
  $wordCenter = $("<span/>").attr("class", "word-center red").appendTo($letters);
  $wordSuffix = $("<span/>").attr("class", "word-suffix").appendTo($letters);

  $controls = $("<div/>").attr("class", "controls").appendTo($root);
  $speeds = $("<select/>").attr("class", "speeds").appendTo($controls);

  for (var wpm = 300; wpm <= 1000; wpm += 50) {
    var $option = $("<option/>").val(wpm).text(wpm + " WPM").appendTo($speeds);
  }
  $speeds.val(500);

  $play = $("<button/>").text("Play").appendTo($controls);
}

function toggle() {
  var $sel = $("#speedster-container");
  if ($sel.length === 0) {
    $body.append($root);
    InstallKeyHandler();
    GetPrimaryText();
  } else {
    $root.detach();
    UninstallKeyHandler();
  }
}

function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

function GetPrimaryText() {
  var text = getSelectionText();
  ParseText(text);
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
      TogglePlay();
      break;
    case 37:
      // Left
      e.preventDefault();
      PreviousSentence();
    default:
      break;
  }
}

var words = null;
var wordIndex = -1;

function ParseText(text) {
  words = text.split(/\s+/).filter(function(w) {
    return w && w.length > 0;
  });
  wordIndex = 0;
  ShowWord();
}

function getBestLetterIndex(word) {
  var bestLetterIndex;
  switch (word.length) {
    case 1:
      bestLetterIndex = 0;
      break;
    case 2:
    case 3:
    case 4:
    case 5:
      bestLetterIndex = 1;
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      bestLetterIndex = 2;
      break;
    case 10:
    case 11:
    case 12:
    case 13:
      bestLetterIndex = 3;
      break;
    default:
      bestLetterIndex = 4;
      break;
  }
  return bestLetterIndex;
}

function ShowWord() {
  var word = words[wordIndex];
  if (!word) {
    $wordPrefix.empty();
    $wordCenter.empty();
    $wordSuffix.empty();
    return;
  }

  var n = word.length;
  var bestLetterIndex = getBestLetterIndex(word);

  var prefix = word.substring(0, bestLetterIndex);
  if (prefix.length < numLettersBeforeCenter) {
    prefix = repeat("\xa0", numLettersBeforeCenter - prefix.length) + prefix;
  }
  var center = word.charAt(bestLetterIndex);
  var suffix = word.substring(bestLetterIndex + 1, n);

  $wordPrefix.text(prefix);
  $wordCenter.text(center);
  $wordSuffix.text(suffix);
}

function TogglePlay() {
}

function PreviousSentence() {
}
