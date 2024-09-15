let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterplay');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let bar = document.getElementById('progbar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songname: "Love Ya", filepath: "1.mp3", coverpath: "1.webp" },
    { songname: "Phir Bhi", filepath: "2.mp3", coverpath: "2.webp" },
    { songname: "Rowdy Baby", filepath: "3.mp3", coverpath: "3.webp" },
    { songname: "Lover", filepath: "4.mp3", coverpath: "4.webp" },
    { songname: "opiya re", filepath: "5.mp3", coverpath: "5.webp" },
    { songname: "slame ishq", filepath: "6.mp3", coverpath: "6.webp" },
    { songname: "arka", filepath: "7.mp3", coverpath: "7.webp" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})

// play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else if (audioElement.played) {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
    }
})

// previous and next
next.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    } else {
        songIndex = songIndex + 1
    }
    audioElement.currentTime = 0;
    audioElement.src = songs[songIndex].filepath;
    audioElement.play();
})

prev.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1
    } else {
        songIndex = songIndex - 1
    }
    audioElement.currentTime = 0;
    audioElement.src = songs[songIndex].filepath;
    audioElement.play();
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    bar.value = progress;
})

bar.addEventListener('change', () => {
    audioElement.currentTime = bar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle')
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.currentTime = 0;
        const songIndex = Array.from(document.getElementsByClassName('songitemplay')).indexOf(e.target);
        audioElement.src = songs[songIndex].filepath;
        audioElement.play();
    })
})