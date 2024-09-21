const musicList = ['hey', 'sum mer', 'ukulele']
let index = 0

const music = new Audio(`./music/${musicList[index]}.mp3`)

const playBtn = document.querySelector(".play");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration-time");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const speed = document.querySelector(".speed");
const title = document.querySelector('.title')
const titleDesktop = document.querySelector('.title-desktop')
const info = document.querySelector('.info')
const volumeBtn = document.querySelector(".volume");
const volumeNoneBtn = document.querySelector(".volume-none");
const volumeRange = document.querySelector(".volume-range");

function setTitle(index) {
  title.textContent = musicList[getIndex()][0].toUpperCase() + musicList[index].slice(1)
  titleDesktop.textContent = musicList[getIndex()][0].toUpperCase() + musicList[index].slice(1)
}

setTitle(index)

function getIndex() {
  return musicList.findIndex(el => music.src.includes(el))
}

next.addEventListener('click', () => {
  index = getIndex()
  if (index < musicList.length - 1) {
    index++
  } 
  else {
    index = 0
  }
  music.src = `./music/${musicList[index]}.mp3`
  setTitle(index)
  musucPlay();
});

prev.addEventListener('click', () => {
  index = getIndex()
  if (index > 0) {
    index--
  } 
  else {
    index = musicList.length - 1
  }
  music.src = `./music/${musicList[index]}.mp3`
  setTitle(index)
  musucPlay();
});

function musucPlay() {
  music.play();
  playBtn.classList.add("pause");
  playBtn.classList.remove("play");
}

function musucPause() {
  music.pause();
    playBtn.classList.add("play");
    playBtn.classList.remove("pause");
}

function handlePlay() {
  if (music.paused) {
    musucPlay()
  } else {
    musucPause()
  }
}

let ds, dm;
music.onloadeddata = function () {
  ds = parseInt(music.duration % 60);
  dm = parseInt((music.duration / 60) % 60);
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

info.addEventListener('click', setShowTultip)

function setShowTultip(evt) {
  evt.stopPropagation();
  info.querySelector('.info-tultip').classList.toggle('active')
}

speed.addEventListener('click', setSpeedValue)

function setSpeedValue(evt) {
  const speedList = [1, 1.5, 2]
  let speedIndexValue
  if (speedList.findIndex(el => el === parseFloat(evt.target.textContent)) + 1 < speedList.length) {
    speedIndexValue = speedList.findIndex(el => el === parseFloat(evt.target.textContent)) + 1
  } else {
    speedIndexValue = 0
  }
  speed.textContent = speedList[speedIndexValue] + 'x'
  music.playbackRate = speedList[speedIndexValue]
}

document.querySelector('.replay').addEventListener('click', () => {
  if (music.currentTime > 0) {
    music.currentTime -= 10
  } else {
    music.currentTime = 0
  }
})

document.querySelector('.forward').addEventListener('click', () => {
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
  if(info.querySelector('.info-tultip').classList.contains('active')) {
    info.querySelector('.info-tultip').classList.remove('active')
  }
})

music.addEventListener('ended', nextSong)

function nextSong() {
  index++;

  if (index > musicList.length - 1) {
    index = 0;
  }

  music.src = `./music/${musicList[index]}.mp3`
  setTitle(index)

  musucPlay();
}


