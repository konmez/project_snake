

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



function checkButtons(event){
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

}


