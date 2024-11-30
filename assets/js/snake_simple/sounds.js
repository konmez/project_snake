
sound = function(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}





const sound_back1= new sound('./assets/audio/music1.mp3');
//sound_back1.sound.setAttribute('loop', 'true');
const sound_back2= new sound('./assets/audio/music2.mp3');
const sound_eat1 = new sound('./assets/audio/mixkit-martial-arts-fast-punch-2047.wav');
const sound_eat2 = new sound('./assets/audio/mixkit-chewing-something-crunchy-2244.wav');
const sound_game_over = new sound('./assets/audio/retro-game-over.wav');

let sound_back = sound_back2;
let sound_eat = sound_eat2;

sound_back.sound.setAttribute('loop', 'true');
sound_back.sound.volume= 0.01;