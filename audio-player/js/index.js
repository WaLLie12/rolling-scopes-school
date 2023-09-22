addEventListener("DOMContentLoaded", () => {

const songs = [
  {
    name: "Never gonna give you up",
    artist: "Rick Astley",
    path: "audio/Never Gonna Give You Up (hardstyle).mp3",
    cover: "img/Nevergonnagiveyouup.webp",
  },
  {
    name: "RUNNIN THRU THE 7TH WITH MY WOADIES",
    artist: "$UICIDEBOY$ x POUYA",
    path: "audio/$UICIDEBOY$ x POUYA - RUNNIN THRU THE 7TH WITH MY WOADIES.mp3",
    cover: "img/Suicide.png",
  },
  {
    name: "black cotton.the realist killaz.dumpin(izza remix)",
    artist: "2Pac",
    path: "audio/2pac black cotton.the realist killaz.dumpin(izzamuzzic remix).mp3",
    cover: "img/2pac.jpg",
  },
  {
    name: "Air",
    artist: "Bones",
    path: "audio/Bones - Air.mp3",
    cover: "img/bones.jpg",
  },
  {
    name: "Premonition",
    artist: "Roberto Kan",
    path: "audio/Roberto Kan - Premonition.mp3",
    cover: "img/kan.jpg",
  },
];

const audio = document.querySelector(".audio");
const inputSlider = document.querySelector(".input__slider");
const inputVolume = document.querySelector(".input__volume");
const prevBtn = document.querySelector(".ri-rewind-fill");
const nextBtn = document.querySelector(".ri-speed-fill");
const pauseBtn = document.querySelector(".ri-pause-circle-fill");
const playBtn = document.querySelector(".ri-play-circle-fill");
const imgContainer = document.querySelector("img");

const time = (t) => {
    if (isNaN(t)) {
        return "02:05"; // Handle NaN gracefully
      }
      
  let min = Math.floor(t / 60);
  if (min < 10) min = "0" + min;

  let sec = Math.floor(t % 60);
  if (sec < 10) sec = "0" + sec;

  return `${min}:${sec}`;
};

let musicCounting = 0;

const listMusic = (key) => {
  const song = songs[key];
  document.querySelector(".img img").src = song.cover;
  audio.src = song.path;
  document.querySelector(".name h1").innerHTML = song.artist;
  document.querySelector(".name p").innerHTML = song.name;
  // const imgContainer = document.querySelector("img");
  let img = new Image();
  img.onload = () => {
    // Once the image has loaded, set it as the body background
    document.body.style.background = `url(${song.cover}) no-repeat center / cover`;
  };
  img.src = song.cover;
  
  setTimeout(() => {
    inputSlider.max = audio.duration;
    document.querySelector(".time-two").innerHTML = time(audio.duration);
  }, 300);

  audio.volume = inputVolume.value / 100;
};

const playMusic = () => {
  audio.play();
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
};

const pauseMusic = () => {
  audio.pause();
  pauseBtn.classList.add("hidden");
  playBtn.classList.remove("hidden");
};

playBtn.addEventListener("click", playMusic);
pauseBtn.addEventListener("click", pauseMusic);

inputVolume.addEventListener("input", () => {
  audio.volume = inputVolume.value / 100;
});

prevBtn.addEventListener("click", () => {
  musicCounting = (musicCounting - 1 + songs.length) % songs.length;
  listMusic(musicCounting);
  playMusic();
  imgContainer.classList.add('anime')
  document.body.classList.add('anime')
});

nextBtn.addEventListener("click", () => {
  musicCounting = (musicCounting + 1) % songs.length;
  listMusic(musicCounting);
  playMusic();
  imgContainer.classList.add('anime')
  document.body.classList.add('anime')
});

setInterval(() => {
    if (!isNaN(audio.duration)) {
        inputSlider.max = audio.duration;
        document.querySelector('.time-two').innerHTML = time(audio.duration);
    }
    if (!isNaN(audio.currentTime)) {
    inputSlider.value = audio.currentTime;
    document.querySelector('.time-one').innerHTML = time(audio.currentTime);
    }
  
    if (audio.currentTime >= inputSlider.max) {
      if (musicCounting >= songs.length - 1) musicCounting = 0;
      else musicCounting++;
      listMusic(musicCounting);
      playMusic();
    }
  }, 500);
  

inputSlider.addEventListener(('change'),()=>{
    audio.currentTime = inputSlider.value
})

listMusic(0)

});