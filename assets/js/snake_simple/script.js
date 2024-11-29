

/* colour palette 1 */
// --color-1: #F0824F;
// --color-2: #7BB0AB;
// --color-3: #6EF0E3;
// --color-4: #A18B81;
// --color-5: #067066;
// --color-6: #471b06;   

//setting colors for the game
let snakeBody ='#067066';
let snakeHead = '#471b06';
let canvasColor = '#F0824F';

//langht of 1 link in snake body, used also in set up coordinates of snake, apple, 
//snake move and field size, can be changed in canvasSet
let linkLength = 20;

/**
 * initialize up a canvas for the game * 
 */
let canvas = O('mycanvas');
let context = canvas.getContext('2d');
setCanvas();
context.save();

/**
 * set canvas size, according to the screen 
 */      
function setCanvas(){       
    let new_w =0;  
    S(canvas).background = canvasColor; 
    console.log('from setCanvas',"canvas",canvas, "Cw",canvas.width);
    console.log('from setCanvas',"canvas",canvas, "CH",canvas.height);

    let w = window.innerWidth;
    //let h = window.innerHeight;
    if (w<560){
        // linkLength = 20;
        new_w = linkLength*Math.floor((w-4*linkLength)/linkLength);       
        
    } else {
        // linkLength = 20;
        new_w = linkLength*Math.floor((560-4*linkLength)/linkLength);
    }   
    
    canvas.height = new_w;
    canvas.width =  new_w;
    context.save();  
    console.log('from setCanvas', 'canvas.height',  canvas.height);

}


// setting globals for the game
let is_game_paused = true;
let game_started = false;
let is_game_over =false;


//next 2 variables esed for debugging count calls for functions called by event listener
//(pressed control button or key )
// let key_counter = 0;
// let btn_counter = 0;


window.addEventListener("keyup", keyCheck);



//array keeps coordinates of snake body links, head-last item n array
let mySnake =[];
//array of coordinates of apple
let apple = [];

//score counter
let counter = 0; 

//time for refrashing frames, msec
let timeLapse = 300;

//initial direction
    // right - [1, 0],
    // up    - [0, -1],
    // down   - [0, 1],
    // left   - [-1, 0]
let direction = [1, 0];

// initialising myInterval for setup, allowing to implement leter stop and restart
let myInterval=null;


//let myInterval=0;
//


// /**
//  * set canvas 
//  */      
// function setCanvas(){    
//     S(canvas).background = canvasColor;    
//     //console.log('from setCanvas');
// }

document.addEventListener('DOMContentLoaded',function(){ console.log("loaded, from doc. add listener")});      
      
let buttons = document.getElementsByTagName('button');   
//console.log('buttons:', buttons);

for (let button of buttons) {button.addEventListener('click',buttonCheck);}
       

function startingScene(){
   // console.log('starting!!, from starting scene');
    // linkLength = 20;

    console.log('starting!!, from starting scene', 'linkLength',linkLength);
    mySnake = makeSnake();
    apple = makeApple();
    drawSnake(mySnake);
    drawApple(apple);
    counter = 0; 
    timeLapse = 300;    
    is_game_over =false;   
    direction = [1, 0];   
    clearInterval(myInterval);  
}





function startGame(){    

    //let myInterval=null;
    // clearInterval(myInterval);  

    startingScene();   
    
    game_started = true;  
    //console.log('2 from startGame', 'game_started:',  game_started, myInterval);
       
    is_game_paused = false;        
    
    myInterval = setInterval(game_frame, timeLapse);

   // console.log('3 from startGame ', 'game_started:',  game_started, myInterval);
    //console.log('4 from startGame timeLapse', timeLapse);

   //}
    function game_frame() { 
       // console.log('from game_frame');
        if (is_game_paused ===false){
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
                //console.log('game over, From game_frame, Your score:',counter);  
                is_game_over = true;
                game_started = false;
                is_game_paused = true;
            }
        }
    }
}

