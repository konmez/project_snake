
/**
 * creates new array from mySnake, representing move 1 step in proper direction
 */
function snakeShift( vector) {   
    let snArray = [...mySnake];
    let x = snArray[snArray.length-1][0]; let y = snArray[snArray.length-1][1];
    // console.log('From snakeShift:  vector ', vector);
    // console.log('From snakeShift: head before ', snArray[snArray.length-1]);
   //let head = [mySnake[mySnake.length-1][0], mySnake[mySnake.length-1][1] ] ;   
    x = x+ linkLength*vector[0];   //  console.log('From snakeShift: head x ',x);
    y = y+ linkLength*vector[1];     //console.log('From snakeShift: head y ', y);
    let head = [x,y];

    mySnake.shift();
    mySnake.push(head); 
    // console.log('From snakeShift:  snArr ', snArray, 'From snakeShift:  mySn ',mySnake, 'key:', key_pressed) ;  
}
/**
 * check if the snake hit itself or an obstacle
 * 
 */
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
