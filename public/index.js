// declare variables
let isSound = false;
let isOn;
let sound;
let index;
let dirList;
let freqList;

// set disable the form
$("button").prop("disabled", true);
$(".form-range").prop("disabled", true);
$("#play").prop("disabled", false);

// set host url
let hostUrl = "http://localhost:3000/";

// fetch list of files from backend
fetch(hostUrl + "xdirsxlistx")
  .then((response) => response.json())
  .then((data) => {
    dirList = data;
  });

fetch(hostUrl + "xfreqsxlistx")
  .then((response) => response.json())
  .then((data) => {
    freqList = data;
  });

// initialize sound object and form
$("#play").on("click", (event) => {
  if (!isSound) {
    sound = new Gapless5({
      tracks: dirList,
      loop: true,
      volume: 0.2,
      singleMode: true,
    });
    isSound = true;
    isOn = false;
    index = sound.findTrack("sounds/440Hz.wav");
    sound.gotoTrack(index);
    updateFreqLabel(index);
    $("button").prop("disabled", false);
    $("#play").html("SOUND<i class='fa-solid fa-play fa-right'></i>");
    $("#volrange").prop("disabled", false);
    $("#volrange").prop("value", 2);
    $("#freqrange").prop("disabled", false);
    $("#freqrange").prop("max", dirList.length - 1);
    $("#freqrange").prop("value", index);
  } else {
    play();
  }
});

// add on-click functions to html elements

$("#volrange").on("change", (event) => {
  const vol = Number(event.target.value);
  sound.setVolume(vol / 10);
});

$("#freqrange").on("change", (event) => {
  index = Number(event.target.value);
  sound.gotoTrack(index);
  updateFreqLabel(index);
});

$(".lower-button").on("click", (event) => {
  $("#lower").val($("h4").text());
  $("#lowerInput").val($("h4").text().split(" ")[0]);
  animate(".lower-button");
});

$(".upper-button").on("click", (event) => {
  // $("#upper").html($("h6").text())
  $("#upper").val($("h4").text());
  $("#upperInput").val($("h4").text().split(" ")[0]);
  animate(".upper-button");
});

$("#report").on("click", (event) => {
  animate("#report");
  setTimeout(() => {
    $(".name-input").val("");
    $("#lower").val("");
    $("#upper").val("");
    $("#lowerInput").val("");
    $("#upperInput").val("");
  }, 100);
});

// play sound function
const play = () => {
  if (isOn) {
    sound.stop();
    isOn = false;
    $("#play").html("SOUND<i class='fa-solid fa-play fa-right'></i>");
    $("#play").toggleClass("pressed");
  } else {
    sound.play();
    isOn = true;
    $("#play").html("SOUND<i class='fa-solid fa-pause fa-right'></i>");
    $("#play").toggleClass("pressed");
  }
};

// animate pressed button function
const animate = (button) => {
  $(button).toggleClass("pressed");
  setTimeout(function () {
    $(button).toggleClass("pressed");
  }, 100);
};

// function for updating current frequency display
const updateFreqLabel = (index) => {
  $("h4").html(freqList[index] + " Hz");
};
