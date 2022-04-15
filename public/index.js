var isSound = false;
var isOn;
var sound;
var index;
var dirList;
var freqList;

$("button").prop("disabled", true)
$(".form-range").prop("disabled", true)
$("#play").prop("disabled", false)

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

// $("#play").on("click", function() {
//   play()
// })

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
  var url = "https://freq-report.herokuapp.com/?"
  var name = $(".name-input").val()
  $(".name-input").val("")
  var lower = $("#lower").val().split(" ")[0]
  $("#lower").val("")
  var upper = $("#upper").val().split(" ")[0]
  $("#upper").val("")
  window.open(
    url + "name=" + name + "&lower=" + lower + "&upper=" + upper,
    "_blank"
  );
})

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

function animate(button) {
  $(button).toggleClass("pressed")
  setTimeout(function(){
    $(button).toggleClass("pressed")
  }, 100)
}

function updateFreqLabel(index) {
  $("h4").html(freqList[index] + " Hz")
}
