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

var Words = [];
var WordIndex = -1;
var LoopActive = false;
var LoopTimer = null;

function SetWord() {
  var fullWord = Words[WordIndex];
  if (!fullWord) {
    dom.$wordPrefix.empty();
    dom.$wordCenter.empty();
    dom.$wordSuffix.empty();
    return;
  }

  var puncPrefix = "";
  var word = fullWord;
  var puncSuffix = "";
  var r = /(\W*)([a-zA-Z0-9—\-’']+)(\W*)/;
  var m = r.exec(fullWord);
  if (m) {
    puncPrefix = m[1];
    word = m[2];
    puncSuffix = m[3];
  }

  var bestLetterIndex = puncPrefix.length + getBestLetterIndex(word);

  var prefix = fullWord.substring(0, bestLetterIndex);
  var center = fullWord.charAt(bestLetterIndex);
  var suffix = fullWord.substring(bestLetterIndex + 1);

  var halfWidth = Font.getStringWidth(prefix)
  halfWidth += Font.getStringWidth(center) / 2;
  var spacing = CenterPointX - halfWidth;
  if (spacing < 0) spacing = 0;
  dom.$letters.css({marginLeft: spacing});

  dom.$wordPrefix.text(prefix);
  dom.$wordCenter.text(center);
  dom.$wordSuffix.text(suffix);
}

function GetWord() {
  return Words[WordIndex] || "";
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

function WordPresentLoop() {
  WordIndex += 1;
  SetWord();
  var word = GetWord();
  if (word.length === 0){
    LoopActive = false;
    return;
  }
  var wpm = dom.wpm 
  var wps = wpm / 60;
  var spw = 1 / wps;
  var ms = 1000 * spw;
  var n = word.length;
  var end = word.substring(n - 1);
  if (n > 8) {
    ms *= 1.5;
  }
  if (end in PauseChars) {
    ms *= 3;
  }
  LoopTimer = setTimeout(WordPresentLoop, ms);
}

////////////////////////////////////////

exports.LoadText = function(text) {
  if (!Font.GlyphsMeasured) {
    setTimeout(function() {
      exports.LoadText(text);
    }, 500);
    return;
  }

  Words = text.split(/\s+/).filter(function(w) {
    return w && w.length > 0;
  });
  WordIndex = 0;

  SetWord();
}

exports.TogglePlay = function() {
  if (!LoopActive) {
    if (WordIndex >= Words.length) {
      WordIndex = 0;
      SetWord();
    }
    LoopTimer = setTimeout(WordPresentLoop, 1);
    LoopActive = true;
  } else {
    if (LoopTimer) {
      clearTimeout(LoopTimer);
      LoopTimer = null;
      LoopActive = false;
    }
  }
}

exports.RewindToPreviousSentence = function() {

}
