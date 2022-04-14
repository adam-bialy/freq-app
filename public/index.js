var isSound = false;
var isOn;
var sound;
var index;
var dirList;
var freqList;

$("button").prop("disabled", true)
$("#start").prop("disabled", false)

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

$("#start").on("click", function(event) {
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
    $("button").prop("disabled", false)
    $("#start").prop("disabled", true)
    $("#volrange").prop("disabled", false)
    $("#volrange").prop("value", 2)
    $("#freqrange").prop("disabled", false)
    $("#freqrange").prop("max", dirList.length-1)
    $("#freqrange").prop("value", index)
  }
})

$("#play").on("click", function(event) {
  if (isOn) {
    sound.stop()
    isOn = false
    // this.innerHTML = "SOUND ON"
    $("#play").toggleClass("pressed")
  } else {
    sound.play()
    isOn = true
    // this.innerHTML = "SOUND OFF"
    $("#play").toggleClass("pressed")
  }
})

$("#volrange").on("change", function(event) {
  sound.setVolume(this.value/10)
})

$("#freqrange").on("change", function(event) {
  index = Number(this.value)
  sound.gotoTrack(index)
  $("h6").html(freqList[index] + " Hz")
})

$(".lower-button").on("click", function(event) {
  $(".lower").html($("h6").text())
})

$(".upper-button").on("click", function(event) {
  $(".upper").html($("h6").text())
})

$("#report").on("click", function(event) {
  var url = "https://freq-report.herokuapp.com/?"
  var name = $(".name-input").val()
  var lower = $(".lower").text().split(" ")[0]
  var upper = $(".upper").text().split(" ")[0]
  window.open(
    url + "name=" + name + "&lower=" + lower + "&upper=" + upper,
    "_blank"
  );
})
