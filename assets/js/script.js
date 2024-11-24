




let canvas   = O('mycanvas');
let context = canvas.getContext('2d');
let linkLength = 20;


window.addEventListener("keydown", keyCheck);

let snBody = makeSnake();
var direction = 'right'    ;
setCanvas();
context.save();
drawSnake(snBody);


function keyCheck(event) {
    let mkey = event.key;
    console.log('from keyCheck', mkey);
    if (mkey ==='ArrowUp' && direction != 'down' ) { console.log('pressed up'); direction = 'up';};
    if (mkey ==='ArrowDown' && direction != 'up') {console.log('pressed down'); direction = 'down'};
    if (mkey ==='ArrowRight' && direction != 'left'){console.log('pressed right'); direction = 'right'};
    if (mkey ==='ArrowLeft' && direction != 'right'){console.log('pressed left'); direction = 'left'};
    // return mkey; 
    console.log('pressed 1111');   
}

console.log('pressed right');

// setInterval(function(){ 
//     console.log('pressed right');
//     if (direction ==='right') { moveRight(snBody); console.log('pressed right')};
//     if (direction ==='left'){ moveLeft(snBody); };
//     if (direction ==='up'){ moveUp(snBody); };
//     if (direction ==='down') { moveDown(snBody); };
 
//     drawSnake(snBody);
//   }, 500);


function moveDown(snArray) {
    let head = [snArray[snArray.length-1][0] , snArray[snArray.length-1][1] +linkLength ] ;
    snArray.shift();
    snArray.push(head);
    return snArray;
}

function moveUp(snArray) {
    let head = [snArray[snArray.length-1][0] , snArray[snArray.length-1][1] - linkLength ] ;
    snArray.shift();
    snArray.push(head);
    return snArray;
}

function moveRight(snArray) {
    console.log('from moveRight');

    let head = [snArray[snArray.length-1][0]+linkLength , snArray[snArray.length-1][1]] ;
    snArray.shift();
    snArray.push(head);
    return snArray;
}

function moveLeft(snArray) {
    let head = [snArray[snArray.length-1][0]-linkLength , snArray[snArray.length-1][1]] ;
    snArray.shift();
    snArray.push(head);
    return snArray;
}

function setCanvas(){    
    S(canvas).background = 'lightblue';
    
    console.log('from setCanvas');
    }


function makeSnake() {
    let snArray = [];
    let xStrt = 50;
    let yStrt = 50;
    let snHead = [xStrt,yStrt];
    snArray.push(snHead);    
    for (let j = 1 ; j < 4 ; j=j+1){
        let newlink = [xStrt + linkLength*j, yStrt];
        snArray.push(newlink);        
    } 
    console.log('from makeSnake');
    
    return snArray;

}


function drawSnake(snArray) {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    
    context.strokeStyle  = 'blue';
    context.lineWidth    = linkLength;  
    context.lineCap  = 'round';
    context.beginPath();
    context.moveTo(snArray[0][0],snArray[0][1] );

    for (let j = 0 ; j < snArray.length ; ++j){   
    context.lineTo(snArray[j][0], snArray[j][1]);
    console.log('from drawSnake', j,  snArray[j][0], snArray[j][1]);
    } 

    context.stroke();
    context.closePath();
}


// let vector ={
//     right: [1,0],
//     left: [-1,0],
//     up : [0,1],
//     down: [0,-1],
// }
