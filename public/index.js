var isSound = false;
var isOn;
var sound;
var index;
var dirList;
var freqList;

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
    $("#start").prop("disabled", true)
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

$("#down").on("click", function(event) {
  if (index > 0) {
    index--
    sound.gotoTrack(index)
    console.log(index)
  }
})

$("#up").on("click", function(event) {
  if (index < sound.getTracks().length-1) {
    index++
    sound.gotoTrack(index)
    console.log(index)
  }
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
