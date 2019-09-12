const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    // video.paused is a property that lives on the video tag
    // if(video.paused) {
    //     video.play()
    // } else {
    //     video.pause()
    // }
    const method = video.paused ? 'play' : 'pause'
    video[method]() 
}

function updateButton() {
    // updates the icon when playing or paused
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip() {
    // dataset logs the values added to skipbutton
    // data-skip, THESE ARE ARBITRARY user defined properties!
    // console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    // console.log(this.value)
    // console.log(this.name)
    video[this.name] = this.value
}

function handleProgress() {
    // changes the flex basis of progress bar
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)