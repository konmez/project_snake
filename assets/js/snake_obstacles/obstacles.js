


/**
 * self explainatory
 */
function makeObstcl() {
    let obArray = [];
//randomly chose apple coordinates, make sure they are in the same grid as snake
// and its path    
    let x = Math.floor(Math.random() * (canvas.width - 2*linkLength )/linkLength+1)*linkLength; 
    let y = Math.floor(Math.random() * (canvas.height- 2*linkLength )/linkLength+1)*linkLength;     
    //console.log('from makeApple', x, y);
    obArray.push(x);obArray.push(y);
    //console.log('from makeApple', obArray);
    return obArray;
} 

/**
 * self explainatory
 */
function drawObstcl(obArray) {
    context.strokeStyle  = obstacleColor;
    context.lineWidth    = linkLength;  
    context.lineCap  = 'square';

    for (obstacle of obArray){
            context.beginPath();
            context.moveTo(obstacle[0],obstacle[1] );   
            context.lineTo(obstacle[0],obstacle[1]);       
            context.stroke();
            context.closePath();
    }        
} 

/**
 * self explainatory
 */
function hitObstcl(obArray){
    let result = false;
    let head = mySnake[mySnake.length -1]; 
    for (obstacle of obArray){
      if ((Math.abs(head[0]-obstacle[0])<linkLength-5)&&(Math.abs(head[1]-obstacle[1])<linkLength-5)) {
          // console.log('from hitApple:  HIT!!');
          result =  true;          
        }
    }
    return  result;    
}   
