/* colour palette 1 */
// --color-1: #F0824F;
// --color-2: #7BB0AB;
// --color-3: #6EF0E3;
// --color-4: #A18B81;
// --color-5: #067066;
// --color-6: #471b06;   

let snakeBody ='#067066';
let snakeHead = '#471b06';
let canvasColor = '#F0824F';

/**
 * setting up a canvas for the game * 
 */
canvas   = O('mycanvas');

context = canvas.getContext('2d');
setCanvas();
context.save();

window.addEventListener("keydown", keyCheck);
document.focus;

/**
 * making a snake. Snake is represented by  array of its links: mySnake array.
 * linklength variable is used to set the length of link, the width of displayed snake 
 * and minimum step when snake moves. Snake head will be stored in the last element of array
 */
let linkLength = 20;
let mySnake = makeSnake();

drawSnake(mySnake);

let apple = makeApple();
drawApple(apple);

//set the score counter and time lapse for refreshing page(msec)
let counter = 0; 
let timeLapse = 300;

let pause_game = true;
let control_button = '';

let  key_pressed ='';

/**
 * set up initial direction for the snake to start moving
 */
    // right: [ 1, 0],
    // left:  [-1, 0],
    // up :   [ 0,-1],
    // down:  [ 0, 1],
var direction = [1, 0];


/**
 * set canvas 
 */      
function setCanvas(){    
    S(canvas).background = canvasColor;    
    //console.log('from setCanvas');
    }

document.addEventListener('DOMContentLoaded',function(){ console.log("loaded")});      
      
let buttons = document.getElementsByTagName('button');    

for (let button of buttons) {button.addEventListener('click', checkButtons);}
       

/**
 * move and display moved snake, repeat every timeLapse msec
 */
const myInterval = setInterval(run_game, timeLapse);

function run_game() { 
    if (pause_game ===false){
        snakeShift(direction) ;
        drawSnake(mySnake);
        drawApple(apple);
        if (hitApple()) {
            // increase snake from tail side
            let tail = mySnake[0];
            mySnake = [tail, ...mySnake];
            //make new apple, increase counter
            apple = makeApple();
            counter +=1;        
        }

        let scoreElmnt = O("snake-score");    
        scoreElmnt.innerHTML = counter;

        if (hitEdgeOrSelf()){
            // end of game
            clearInterval(myInterval);
            console.log('game over, Your score: ',counter);        

        }
   }
}
