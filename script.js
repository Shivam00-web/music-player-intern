const playlist = [
  {
    name: "song1",
    title: "Saiyaara",
    artist: "Tanishk & Faheem",
    cover: "img/image.png",
    file: "songs/saiyara song.mp3"
  },
  {
    name: "song2",
    title: "Khatola 2",
    artist: "Aditya Rikhari",
    cover: "img/khatola 2.jpg",
    file: "songs/2 Khatole.mp3"
  },
  {
    name: "song3",
    title: "Bedardi",
    artist: "Jubin Nautiyal",
    cover: "img/bedardi.jpg",
    file: "songs/Bedardi.mp3"
  },
  {
    name: "song4",
    title: "Byah Ke Lavange",
    artist: "The Weeknd",
    cover: "img/byah ke lavege.jpg",
    file: "songs/BYAH KE LAVANGE.mp3"
  },
  {
    name: "song5",
    title: "Fitoor",
    artist: "Arijit Singh",
    cover: "img/tera fitoor image copy.jpg",
    file: "songs/Fitoor.mp3"
  },
  {
    name: "song6",
    title: "Kabutar",
    artist: "Arijit Singh",
    cover: "img/kabutar image.jpg",
    file: "songs/kabutar.mp3"
  },
  {
    name: "song7",
    title: "laal pari",
    artist: "Arijit Singh",
    cover: "img/laal pari.jpg",
    file: "songs/laal pari.mp3"
  },
  {
    name: "song8",
    title: "Vaaste",
    artist: "Dhvani Bhanushali",
    cover: "img/vaste-image.jpg",
    file: "songs/vaaste.mp3"
  }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const cover = document.getElementById("song-cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

function loadSong(index) {
  const song = playlist[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.file;
  highlightSong(index);
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  playSong();
});

// Render playlist in main section
const playlistContainer = document.getElementById("playlist");
function renderPlaylist(list) {
  playlistContainer.innerHTML = "";
  list.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song-card";
    div.innerHTML = `
      <img src="${song.cover}" alt="">
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
    `;
    div.addEventListener("click", () => {
      currentSong = playlist.findIndex(s => s.title === song.title);
      loadSong(currentSong);
      playSong();
    });
    playlistContainer.appendChild(div);
  });
}

// Highlight current song
function highlightSong(index) {
  document.querySelectorAll(".song-card").forEach((card, i) => {
    card.style.background = i === index ? "#4caf50" : "#222";
  });
}

// Format time like 1:03
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

// Sidebar buttons
const homeBtn = document.getElementById("homeBtn");
const trendingBtn = document.getElementById("trendingBtn");
const libraryBtn = document.getElementById("libraryBtn");

function setActiveTab(activeBtn) {
  document.querySelectorAll(".menu li").forEach(btn => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

homeBtn.addEventListener("click", () => {
  setActiveTab(homeBtn);
  document.getElementById("main-title").textContent = "All Songs";
  renderPlaylist(playlist);
});

trendingBtn.addEventListener("click", () => {
  setActiveTab(trendingBtn);
  document.getElementById("main-title").textContent = "Trending Songs";
  const trendingSongs = playlist.slice(0, 4); // first 4 songs
  renderPlaylist(trendingSongs);
});

libraryBtn.addEventListener("click", () => {
  setActiveTab(libraryBtn);
  document.getElementById("main-title").textContent = "Your Library";
  const myLibrary = playlist.filter(song => song.artist === "Arijit Singh");
  renderPlaylist(myLibrary);
});

// Sidebar mini playlist
const sidebarPlaylist = document.getElementById("sidebarPlaylist");
playlist.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
  sidebarPlaylist.appendChild(li);
});

loadSong(currentSong);
renderPlaylist(playlist); // default
