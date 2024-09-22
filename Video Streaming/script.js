const video = document.querySelector('#myVideo');
const playPauseBtn = document.querySelector('#playPauseBtn');
const isChecked = document.querySelector('#check');
const volumeUp = document.querySelector('#volumeUp');
const volume = document.querySelector('#volume');
const playNext = document.querySelector('#playNext');
const playBack = document.querySelector('#playBack');
const volumeDown = document.querySelector('#volumeDown');
const forward = document.querySelector('#moveForword');
const backward = document.querySelector('#moveBackward');
const timeLine = document.querySelector('#timeLine');
const videoSpeed = document.querySelector('#videoSpeed');
const loopVideo =document.querySelector('#loopVideo');
const mute = document.querySelector('#mute');
const fullScreen = document.querySelector('#fullScreen');
const videoCurrentTime = document.querySelector('#current-time');
const videoDuration = document.querySelector('#duration');
const volumeImage =document.querySelector('.volume-img');
const videoLable = document.querySelector('.my-video-label');
const loopLabel = document.querySelector('.loop-video-lable');
const menu = document.querySelector('.menu');
const menuDiv = document.querySelector('.menu-div');
const downloadBtn = document.querySelector('.download');


let currentVideo = 0;
const videos = [
    'video1.mp4',
    'video2.mp4',
    'video3.mp4',
    'video4.mp4',
    'video5.mp4'
];

loadVideo(currentVideo);

function loadVideo(index){ 
    video.src = `./videos/${videos[index]}`;
    updateTime();
    speedShift();
}

// *** Pause and Play ***
function togglePlayPause(){
    if(!isChecked.checked){
        video.play();
        playPauseBtn.style.backgroundImage = 'url("./images/pause.png")';
    }else{
        video.pause();
        playPauseBtn.style.backgroundImage = 'url("./images/play.png")';
    }
}

// *** Volume control ***
function toggleVolumeImage(){
    video.muted = false;
    mute.checked = false;
    if(!video.volume <= 0.1){
        volumeImage.style.backgroundImage = 'url("./images/volume-up.png")';
    }else{
        volumeImage.style.backgroundImage = 'url("./images/mute.png")';
    }
}

function toggleMute(){
    if(!video.muted){
        volumeImage.style.backgroundImage = 'url("./images/volume-up.png")';
    }else{
        volumeImage.style.backgroundImage = 'url("./images/mute.png")';
    }

}

function increaseVolume(){
    if(video.volume >= 0.9){
        
        video.volume = 1;
    }else{
        if(video.volume < 1)
            video.volume += 0.1;
    }
    toggleVolumeImage();
    volume.value = video.volume;
    updateSlider(volume);
}

function decreaseVolume(){
    if(video.volume <= 0.1){
        video.volume = 0;
    }else{
        if(video.volume > 0 )
            video.volume -= 0.1;
    }
    toggleVolumeImage();
    volume.value = video.volume;
    updateSlider(volume);
}

// ** Playlist Navigation **
function nextVideo(){
    if(currentVideo === videos.length-1){
        currentVideo = 0;
        loadVideo(currentVideo);
    }else{
        currentVideo++;
        loadVideo(currentVideo);
    }
     isChecked.checked = false;
     togglePlayPause();
}

function previousVideo(){
    if (currentVideo === 0){
        currentVideo = videos.length-1;
        loadVideo(currentVideo);
    }else{
        currentVideo--;
        loadVideo(currentVideo);
    }
    isChecked.checked = false;
    togglePlayPause();
}

// *** Loop ***
function toggleLoop() {
    if (video.loop) { 
        loopLabel.style.backgroundColor = '#ff9100'; 
    } else {
        loopLabel.style.backgroundColor = 'transparent'; 
    }
}

// *** Video TimeLine ***
function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function updateTime(){
    const currentTime = video.currentTime;
    let duration = video.duration;
    if(isNaN(duration)){
        duration = 0;
    }
    videoCurrentTime.textContent =`${formatTime(currentTime)}`
    videoDuration.textContent = `${formatTime(duration)}`
}

function updateSlider(slider) {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #ff9100 ${percentage}%, #ddd ${percentage}%)`;
}

function move(direction){
    if(direction == 'forward'){
        video.currentTime += 10;
    }else{
        video.currentTime -= 10;
    }
}

// *** FlowSpeed ***
function speedShift(){
    video.playbackRate = parseFloat(videoSpeed.value);
}

// *** Download ***
function downloadVideo(){
    video.src = `./videos/${videos[currentVideo]}`;
    downloadBtn.href = video.src;
    downloadBtn.download = video.src;
}


// **** EventListener ****

// *** Pause and Play ***
videoLable.addEventListener('click', togglePlayPause);

playPauseBtn.addEventListener('click', togglePlayPause);


// ** Playlist Navigation **
playNext.addEventListener('click', nextVideo);

playBack.addEventListener('click', previousVideo);


// ** Full Screen **
fullScreen.addEventListener('click', () => {
    video.requestFullscreen();
});

// *** Volume control ***
volume.value = video.volume;
updateSlider(volume);
volume.addEventListener('input', () => {
    video.volume = volume.value;
    updateSlider(volume);
    toggleVolumeImage();
});

video.muted = mute.checked;
mute.addEventListener('change', () => {
    video.muted = mute.checked;
    toggleMute();
});

volumeUp.addEventListener('click', increaseVolume);

volumeDown.addEventListener('click', decreaseVolume);


// *** Loop ***
video.loop = loopVideo.checked;
loopVideo.addEventListener('change', () => {
    video.loop = loopVideo.checked;
    toggleLoop();
});


// *** Video speed ***
videoSpeed.addEventListener('change', speedShift);


// *** Video TimeLine ***
video.addEventListener('timeupdate', () => {
    timeLine.max = video.duration;
    timeLine.value = video.currentTime;
    updateTime();
    updateSlider(timeLine);
      if(video.currentTime == video.duration){
        nextVideo();
        isChecked.checked = true;
      }
});

timeLine.addEventListener('input', () => {
    video.currentTime = timeLine.value;
    updateSlider(timeLine);
});

backward.addEventListener('click',() => {
    move('backward');
});


forward.addEventListener('click',() => {
    move('forward');
});

// *** Display Menu ***
menu.addEventListener('click', () => {
    if (menuDiv.classList.contains('visible')) {
        menuDiv.classList.remove('visible');
        display = true;
    } else {
        menuDiv.classList.add('visible');
        display = false;
    }
});

// *** Download ***
downloadBtn.addEventListener('click', downloadVideo)