var isSound = false;
var isOn;
var sound;
const listOfSounds = [];
var index;

$("#start").on("click", function(event) {
  if (!isSound) {
    sound = new Gapless5({
      tracks: ["sounds/350Hz.wav", "sounds/400Hz.wav", "sounds/450Hz.wav", "sounds/500Hz.wav"],
      loop: true,
      volume: 0.2,
      singleMode: true
    })
    isSound = true
    isOn = false
    index = sound.findTrack("sounds/400Hz.wav")
    sound.gotoTrack(1)
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

$('#range').range('init');
