
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
          // console.log('from hitApple:  HIT!!');
           return true;          
    }
    return  false;    
}   

// show time spent
function chIime(){       
              setInterval(function(){ 
              let timerElement = document.getElementById('timer');
              let currentTime = timerElement.innerHTML;
              currentTime++;
              timerElement.innerHTML = currentTime;
              }, 1000);
            }
chIime()            ;