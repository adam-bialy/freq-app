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
    $("#freqrange").prop("disabled", false)
    $("#freqrange").prop("max", dirList.length-1)
    $("#freqrange").prop("value", index)
  }
})

$("#play").on("click", function(event) {
  if (isOn) {
    sound.stop()
    isOn = false
    this.innerHTML = "SOUND ON"
    $("#play").toggleClass("pressed")
  } else {
    sound.play()
    isOn = true
    this.innerHTML = "SOUND OFF"
    $("#play").toggleClass("pressed")
  }
})

$("#volrange").on("change", function(event) {
  sound.setVolume(this.value/10)
})

$("#freqrange").on("change", function(event) {
  index = Number(this.value)
  console.log(index)
  sound.gotoTrack(index)
})

$("#report").on("click", function(event) {
  var url = "https://freq-report.herokuapp.com/?"
  var name = "A G"
  var lower = "20"
  var upper = "15000"
  window.open(
    url + "name=" + name + "&lower=" + lower + "&upper=" + upper,
    "_blank"
  );
})
