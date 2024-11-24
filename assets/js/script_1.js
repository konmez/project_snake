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

let  key_pressed ='';

/**
 * set up initial direction for the snake to start moving
 */
    // right: [ 1, 0],
    // left:  [-1, 0],
    // up :   [ 0,-1],
    // down:  [ 0, 1],
var direction = [1, 0];

document.addEventListener('DOMContentLoaded',function(){ console.log("loaded")});      
      
let buttons = document.getElementsByTagName('button');    

for (let button of buttons) {
        button.addEventListener('click', function(){            
            if (this.getAttribute("data-type") === "pause"){ 
                  console.log('pause pressed'); 
                  pause_game = !pause_game;   
                  console.log('pause_game: ', pause_game);              
                } else { control_button = this.getAttribute("data-type");                
                        // console.log('control_button: ', control_button);
                        // console.log('direction: ', direction); 
                    }
        
            if (direction[1]===0){                
                if ( control_button === 'up'){ direction = [0, -1];
                } else if ( control_button === 'down') { direction = [0, 1];}               
            } else if (direction[0]===0) {
                if ( control_button === 'right'){ direction = [1, 0];
                } else if ( control_button === 'left') { direction = [-1, 0];}
            } 
        })
 };


//   })

/**
 * move and display moved snake, repeat every timeLapse msec
 */
const myInterval = setInterval(run_game, timeLapse);

function run_game() { 
    if (pause_game ===false){
        snakeShift( direction) ;
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

/**
 * responds to "keydown" event for window object and sets the value for direction array
 * if correct key pressed, prevent moving backwards
 */
function keyCheck(event) {
  
    //(pressing left while moving
  // left isn't doing anything, and pressing right while moving left
  // shouldn't let you hit your own body)
    let mkey = event.key;   
    
    if (mkey ===' ') {
        console.log('from key check; pressed :', mkey ,'Space!!'); 
        pause_game = !pause_game;
    } 
    
    if (direction[1]===0){
        //console.log('from key check111; pressed :', mkey ,'dirction', direction);
        if (mkey ==='ArrowUp' ){ direction = [0, -1];
        } else if (mkey ==='ArrowDown') { direction = [0, 1];}
       // console.log('from key check22222; pressed :', mkey ,'dirction', direction);
    }

    if (direction[0]===0){
        if (mkey ==='ArrowRight'){ direction = [1, 0];
        } else if (mkey ==='ArrowLeft') { direction = [-1, 0];}
    }     

    if (mkey ==='Escape') {
        console.log('from key check; pressed :', mkey ,'Escape!!'); 
    }

    
    key_pressed =  mkey;
    //console.log('from key check; pressed :', mkey ,'direc:', direction);   
}

/**
 * creates new array from mySnake, representing move 1 step in proper direction
 */
function snakeShift( vector) {   
    let snArray = [...mySnake];
    let x = snArray[snArray.length-1][0]; let y = snArray[snArray.length-1][1];
    console.log('From snakeShift:  vector ', vector);
    console.log('From snakeShift: head before ', snArray[snArray.length-1]);
   //let head = [mySnake[mySnake.length-1][0], mySnake[mySnake.length-1][1] ] ;   
    x = x+ linkLength*vector[0];console.log('From snakeShift: head x ',x);
    y = y+ linkLength*vector[1];console.log('From snakeShift: head y ', y);
    let head = [x,y];

    mySnake.shift();
    mySnake.push(head); 
    console.log('From snakeShift:  snArr ', snArray, 'From snakeShift:  mySn ',mySnake, 'key:', key_pressed) ;  
}

function hitEdgeOrSelf(){
    let head = mySnake[mySnake.length -1]; 
    //check if hits the wall   
    if ((head[0] < linkLength)||(head[0]>canvas.width-linkLength)||
        (head[1]< linkLength)||(head[1]>canvas.height-linkLength) ){ 
        //console.log('From hitEdge: ', head[0], head[1])      
        return true;
    }  
    //check if hits self    
    for(let i = 0; i< mySnake.length -2; i++){
        let link = mySnake[i];       
        // console.log('From hit self before if : ',link[0], link[1]);
        // console.log('From hit self before if : ',key_pressed);
        if ( (Math.abs(head[0]-link[0])<linkLength)&&(Math.abs(head[1]-link[1])<linkLength)) {
            // console.log('From hit self: ','dx: ', (head[0]-link[0]), 'dy: ',
            //  (head[1]-link[1]), 'i' , i); 
            //  console.log('From hit self: ',mySnake); 
           return true;
        }   
    }
    return  false;    
}   

/**
 * set canvas 
 */      
function setCanvas(){    
    S(canvas).background = canvasColor;    
    //console.log('from setCanvas');
    }

/**
 * self explainatory
 */
function makeSnake() {
    let snArray = [];
    let xStrt = linkLength*3; let yStrt = linkLength*3;    
    for (let j = 1 ; j < 5 ; j=j+1){
        let newlink = [xStrt + linkLength*j, yStrt];
        snArray.push(newlink);        
    } 
    //console.log('from makeSnake');
    return snArray;
}

/**
 * self explainatory
 */
function drawSnake(snArray) {
    //clear canvas before painting:
    context.clearRect(0, 0, canvas.width, canvas.height); 

    context.strokeStyle  = snakeBody;
    context.lineWidth    = linkLength-2;  
    context.lineCap  = 'round';
    context.lineJoin = 'round';
//draw snake body
    context.beginPath();
    context.moveTo(snArray[0][0],snArray[0][1] );

    for (let j = 0 ; j < snArray.length-1 ; j=j+1){   
        context.lineTo(snArray[j][0], snArray[j][1]);       
        }      
    context.stroke();
    context.closePath();
//add snake head
    context.beginPath();
    context.lineTo(snArray[snArray.length-2][0], snArray[snArray.length-2][1]);
    context.lineTo(snArray[snArray.length-1][0], snArray[snArray.length-1][1]);
    context.strokeStyle  = snakeHead;
    context.stroke();
    context.closePath();
}

/**
 * self explainatory
 */
function makeApple() {
    let apArray = [];
//randomly chose apple coordinates, make sure they are in the same grid as snake
// and its path    
    let x = Math.floor(Math.random() * (canvas.width - 2*linkLength )/linkLength+1)*linkLength; 
    let y = Math.floor(Math.random() * (canvas.height- 2*linkLength )/linkLength+1)*linkLength;     
    //console.log('from makeApple', x, y);
    apArray.push(x);apArray.push(y);
    //console.log('from makeApple', apArray);
    return apArray;
}

/**
 * self explainatory
 */
function drawApple(app_arr) {
    context.strokeStyle  = 'yellow';
    context.lineWidth    = linkLength;  
    context.lineCap  = 'round';
    context.beginPath();
    context.moveTo(app_arr[0],app_arr[1] );   
    context.lineTo(app_arr[0],app_arr[1]);       
    context.stroke();
    context.closePath();
} 

/**
 * self explainatory
 */
function hitApple(){
    let head = mySnake[mySnake.length -1]; 
    if ((Math.abs(head[0]-apple[0])<linkLength)&&(Math.abs(head[1]-apple[1])<linkLength)) {
           console.log('HIT!!');
           return true;          
    }
    return  false;    
}   








function chIime(){       
              setInterval(function(){ 
              let timerElement = document.getElementById('timer');
              let currentTime = timerElement.innerHTML;
              currentTime++;
              timerElement.innerHTML = currentTime;
              }, 1000);
            }
chIime()            ;