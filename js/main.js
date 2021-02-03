let video = document.getElementById('video');
let playButton = $('.video__play');
let timer = $('.video__timer');
let progressLine = $('.video__progress-line');

playButton.on('click', function (event) {
  event.preventDefault();

  if(video.paused) {
    video.play();
    playButton.html('<i class="far fa-pause-circle"></i>')
  } else {
    video.pause();
    playButton.html('<i class="far fa-play-circle"></i>')
  }
});
  
function setTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - (minutes * 60));
  timer.text(minutes + ":" + seconds);
}

$(video).on('canplay', function () {
  let time = video.duration;
  setTime(time);
});

$(video).on('timeupdate', function () {
  let time = video.duration - video.currentTime;
  setTime(time);
});

let progression = video.currentTime / video.duration * 100;
progressLine.css({
  width:progression + "%"
});

$('.video__progress').on('click', function (event) {
  let position = event.pageX - $(this).offset().left;
  let timeLineWidth = $(this).width();
  let percent = position / timeLineWidth * 100;
  let trackPosition = video.duration / 100 * percent;

  video.currentTime = trackPosition
});

