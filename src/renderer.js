var Font = require("./font.js");
var dom = require("./dom.js");

var NumLettersBeforeCenter = 5;
var CenterPointX = 210 + 2;

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

function repeat(letter, num) {
  if (num < 1) {
    return new Array(Math.abs(num) + 1).join(letter);
  }
  return new Array(num + 1).join(letter);
};

////////////////////////////////////////

var words = null;
var wordIndex = -1;

function ShowWord() {
  var word = words[wordIndex];
  if (!word) {
    exports.$wordPrefix.empty();
    exports.$wordCenter.empty();
    exports.$wordSuffix.empty();
    return;
  }

  var n = word.length;
  var bestLetterIndex = getBestLetterIndex(word);

  var prefix = word.substring(0, bestLetterIndex);
  // if (prefix.length < NumLettersBeforeCenter) {
  //   prefix = repeat("\xa0", NumLettersBeforeCenter - prefix.length) + prefix;
  // }
  var center = word.charAt(bestLetterIndex);
  var suffix = word.substring(bestLetterIndex + 1, n);

  var halfWidth = Font.getStringWidth(prefix)
  halfWidth += Font.getStringWidth(center) / 2;
  var spacing = CenterPointX - halfWidth;
  if (spacing < 0) spacing = 0;
  dom.$letters.css({marginLeft: spacing});

  dom.$wordPrefix.text(prefix);
  dom.$wordCenter.text(center);
  dom.$wordSuffix.text(suffix);
}

exports.LoadText = function(text) {
  if (!Font.GlyphsMeasured) {
    setTimeout(function() {
      exports.LoadText(text);
    }, 500);
    return;
  }

  words = text.split(/\s+/).filter(function(w) {
    return w && w.length > 0;
  });
  wordIndex = 0;

  ShowWord();
}

exports.TogglePlay = function() {

}

exports.RewindToPreviousSentence = function() {

}
