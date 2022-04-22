// declare variables
let isSound = false;
let isOn;
let sound;
let index;
let dirList;
let freqList;


// set disable the form
$("button").prop("disabled", true)
$(".form-range").prop("disabled", true)
$("#play").prop("disabled", false)


// fetch list of files from backend
fetch("/xdirsxlistx").then(function(response) {
  return response.json()
}).then(function(data) {
  dirList = data
})

fetch("/xfreqsxlistx").then(function(response) {
  return response.json()
}).then(function(data) {
  freqList = data
})


// initialize sound object and form
$("#play").on("click", function(event) {
  if (!isSound) {
    sound = new Gapless5({
      tracks: dirList,
      loop: true,
      volume: 0.2,
      singleMode: true
    })
    isSound = true
    isOn = false
    index = sound.findTrack("sounds/440Hz.wav")
    sound.gotoTrack(index)
    updateFreqLabel(index)
    $("button").prop("disabled", false)
    $("#play").html("SOUND<i class='fa-solid fa-play fa-right'></i>")
    $("#volrange").prop("disabled", false)
    $("#volrange").prop("value", 2)
    $("#freqrange").prop("disabled", false)
    $("#freqrange").prop("max", dirList.length-1)
    $("#freqrange").prop("value", index)
  } else {
    play()
  }
})


// add on-click functions to html elements

$("#volrange").on("change", function(event) {
  sound.setVolume(this.value/10)
})

$("#freqrange").on("change", function(event) {
  index = Number(this.value)
  sound.gotoTrack(index)
  updateFreqLabel(index)
})

$(".lower-button").on("click", function(event) {
  // $("#lower").html($("h6").text())
  $("#lower").val($("h4").text())
  animate(".lower-button")
})

$(".upper-button").on("click", function(event) {
  // $("#upper").html($("h6").text())
  $("#upper").val($("h4").text())
  animate(".upper-button")
})

$("#report").on("click", function(event) {
  animate("#report")
  let url = "https://freq-report.herokuapp.com/?"
  let name = $(".name-input").val()
  $(".name-input").val("")
  let lower = $("#lower").val().split(" ")[0]
  $("#lower").val("")
  let upper = $("#upper").val().split(" ")[0]
  $("#upper").val("")
  window.open(
    url + "name=" + name + "&lower=" + lower + "&upper=" + upper,
    "_blank"
  );
})


// play sound function
function play() {
  if (isOn) {
    sound.stop()
    isOn = false
    $("#play").html("SOUND<i class='fa-solid fa-play fa-right'></i>")
    $("#play").toggleClass("pressed")
  } else {
    sound.play()
    isOn = true
    $("#play").html("SOUND<i class='fa-solid fa-pause fa-right'></i>")
    $("#play").toggleClass("pressed")
  }
}

// animate pressed button function
function animate(button) {
  $(button).toggleClass("pressed")
  setTimeout(function(){
    $(button).toggleClass("pressed")
  }, 100)
}

// function for updating current frequency display
function updateFreqLabel(index) {
  $("h4").html(freqList[index] + " Hz")
}
