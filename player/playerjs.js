const musicList = ['hey', 'sum mer', 'ukulele']
let index = 0

const music = new Audio(`./music/${musicList[index]}.mp3`)

const playBtn = document.querySelector(".player__pause");
const currentTime = document.querySelector(".player__current-time");
const duration = document.querySelector(".player__duration-time");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const next = document.querySelector(".player__next");
const prev = document.querySelector(".player__prev");
const speed = document.querySelector(".player__speed");
const title = document.querySelector('.player__title')
const info = document.querySelector('.player__info')
const volumeBtn = document.querySelector(".player__volume");
const volumeNoneBtn = document.querySelector(".player__volume-none");
const volumeRange = document.querySelector(".player__volume-range");


function setTitle(index) {
  title.textContent = musicList[index].toUpperCase()
}

setTitle(index)

// function getIndex() {
//   console.log(musicList.findIndex(el => music.src.includes(el)));
  
//   return musicList.findIndex(el => music.src.includes(el))
// }

next.addEventListener('click', () => {
  //index = getIndex()
  if (index < musicList.length - 1) {
    index++
  } 
  else {
    index = 0
  }
  music.src = `./music/${musicList[index]}.mp3`
  setTitle(index)
  musicPlay();
});

prev.addEventListener('click', () => {
  //index = getIndex()
  if (index > 0) {
    index--
  } 
  else {
    index = musicList.length - 1
  }
  music.src = `./music/${musicList[index]}.mp3`
  setTitle(index)
  musicPlay();
});

function musicPlay() {
  music.play();
  playBtn.classList.add("player__play");
  playBtn.classList.remove("player__pause");
}

function musicPause() {
  music.pause();
    playBtn.classList.add("player__pause");
    playBtn.classList.remove("player__play");
}

function handlePlay() {
  if (music.paused) {
    musicPlay()
  } else {
    musicPause()
  }
}

music.onloadeddata = function () {
  let ds = parseInt(music.duration % 60);
  let dm = parseInt((music.duration / 60) % 60);
  duration.textContent = dm.toString().padStart(2, "0") + ":" + ds;
};

music.ontimeupdate = function () {
  progress.style.width = `${music.currentTime}%`;
};

music.addEventListener("timeupdate", function () {
  const cs = parseInt(music.currentTime % 60);
  const cm = parseInt((music.currentTime / 60) % 60);
  currentTime.innerHTML =
    cm.toString().padStart(2, "0") + ":" + cs.toString().padStart(2, "0");
});

function updateProgress(evt) {
  const { duration, currentTime } = evt.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";
}

function setProgress(evt) {
  const width = this.clientWidth;
  const clickX = evt.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

music.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

playBtn.addEventListener("click", () => {
  handlePlay();
});

volumeBtn.addEventListener("click", vol);

function vol() {
  volumeNoneBtn.classList.toggle('active')
  volumeBtn.classList.toggle('active')
  if (volumeNoneBtn.classList.contains('active')) {
    music.volume = 0;
  } else {
    music.volume = volumeRange.value / 100;
  }
}

volumeNoneBtn.addEventListener("click", vol);

info.addEventListener('click', setShowTooltip)

function setShowTooltip(evt) {
  evt.stopPropagation();
  info.querySelector('.info-tooltip').classList.toggle('active')
}

speed.addEventListener('click', setSpeedValue)

function setSpeedValue(evt) {
  const speedList = [0.2,0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]
  let speedIndexValue
  if (speedList.findIndex(el => el === parseFloat(evt.target.textContent)) + 1 < speedList.length) {
    speedIndexValue = speedList.findIndex(el => el === parseFloat(evt.target.textContent)) + 1
  } else {
    speedIndexValue = 0
  }
  speed.textContent = speedList[speedIndexValue] + 'x'
  music.playbackRate = speedList[speedIndexValue]
}

document.querySelector('.player__replay').addEventListener('click', () => {
  if (music.currentTime > 0) {
    music.currentTime -= 10
  } else {
    music.currentTime = 0
  }
})

document.querySelector('.player__forward').addEventListener('click', () => {
  if (music.currentTime < music.duration) {
    music.currentTime += 10
  } else {
    music.currentTime = music.duration
  }
})

volumeRange.addEventListener('input', handleVolumeChange);

function handleVolumeChange() {
  music.volume = volumeRange.value / 100
}

document.addEventListener('click', (evt) => {
  if(info.querySelector('.player__info-tooltip').classList.contains('active')) {
    info.querySelector('.player__info-tooltip').classList.remove('active')
  }
})

music.addEventListener('ended', nextSong)

function nextSong() {
  index++;
  console.log(index);
  
  if (index > musicList.length - 1) {
    index = 0;
  }
  setTitle(index)

  musicPlay();
}


