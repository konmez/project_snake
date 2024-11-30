

sound = function(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'block';
    document.body.appendChild(this.sound);
    this.play = function() {
        console.log('before .play', );
        this.sound.play();
        console.log('after .play', );
    }
    this.stop = function() {
        this.sound.pause();
    }
}

const sound1 = new sound('./assets/audio/music2.mp3');

let playB = O('play');
let stopB = O('stop');

sound1.sound.setAttribute('loop', 'true');
//sound1.sound.setAttribute('volume', 0.00);
//sound1.sound.volume = 0.05;

playB.addEventListener('click',  ()=>{console.log('clicked');sound1.play(); });
sound1.sound.volume = 0.00;


// sound1.play();
console.log('after sound1', playB);

console.log('after sound');