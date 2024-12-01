
/**
 * responds to "keydown" event for window object and sets the value for direction array
 * if correct key pressed,
 */
function keyCheck(event) { 

    // next 2 lines prevent calling event response twice(from stack ovrflaw)
        event.stopPropagation();
        event.preventDefault();
    
       // console.log('from keyCheck; event :', event); 
      //  key_counter ++;
    
        let key_pressed = event.key;    
        let control = '';
       
        if (key_pressed ===' ')          {control = 'pause'};
        if (key_pressed ==='ArrowRight'|| key_pressed ==='d'|| key_pressed ==='D') {control = 'right'};
        if (key_pressed ==='ArrowUp'|| key_pressed ==='w'|| key_pressed ==='W')   {control = 'up'   };
        if (key_pressed ==='ArrowDown'|| key_pressed ==='s'|| key_pressed ==='S')  {control = 'down' };
        if (key_pressed ==='ArrowLeft'|| key_pressed ==='a'|| key_pressed ==='A')  {control = 'left' };
        if (key_pressed ==='r'||key_pressed ==='R')          {control = 'start'};
        
        //console.log('from key check; pressed :', key_pressed ,'key_counter:  ', key_counter);        
        
        reactToEvent(control);
       
    }
    
    //console.log('after key check; pressed :',  key_pressed );   
    
    function buttonCheck(event){
        
       // btn_counter ++;
       //console.log('frombuttonCheck; btn_counter :', btn_counter, 'control:', control); 

        let control = '';
    
        //console.log('frombuttonCheck; event :',event); 
    
    
    // next 2 lines prevent calling event response twice(from stack ovrflaw)
        event.stopPropagation();
        event.preventDefault();
    
          
    
        if (this.getAttribute("data-type") === "pause"){control = 'pause';
            // console.log('frombuttonCheck; pressed :', control,'direc:', direction); 
        } 
    
        if (this.getAttribute("data-type") === "up"){control = 'up';
            // console.log('frombuttonCheck; pressed :', control,'direc:', direction);
        }
    
        if (this.getAttribute("data-type") === "down"){control = 'down';
            // console.log('frombuttonCheck; pressed :', control,'direc:', direction);
        }
    
        if (this.getAttribute("data-type") === "right"){control = 'right';
            // console.log('frombuttonCheck; pressed :', control,'direc:', direction);
        }
    
        if (this.getAttribute("data-type") === "left"){control = 'left';
            // console.log('frombuttonCheck; pressed :', control,'direc:', direction);
        }
    
        if (this.getAttribute("data-type") === "start"){ control = 'start';
            // console.log('frombuttonCheck; pressed :', control,'direc:', direction);
        }
    
        //console.log('frombuttonCheck; pressed :', control,'direc:', direction);
      
        reactToEvent(control);
    }
    
    
    /**
     * change direction according to key or button pressed or start/pause game
     */
    function reactToEvent(my_control) {
    
        let control = my_control;
    
       // console.log('from reactToEvent :', control,'direc:', direction);
    
        if (control === "pause"){ 
                //console.log('from reactToEvent, pause pressed,', 'is game over :  ', is_game_over) ; 
               // console.log('from reactToEvent, pause pressed', 'game_started :  ', game_started) ; 
    
                if (game_started) {is_game_paused = !is_game_paused; }
    
                //console.log('from reactToEvent, is_game_paused: ', is_game_paused);              
        } 
    
        if (control === "start") {             
            // console.log('from reactToEvent :  game_started: ', game_started);      
            // console.log('from reactToEvent :  LET"S start !!!');
            
            startGame();            
        } 
    
    
        // prevent moving backwards
        if (direction[1]===0){                
            if ( control === 'up'){ direction = [0, -1];
            } else if ( control === 'down') { direction = [0, 1];}      
        }     
    
        if (direction[0]===0) {
            if ( control === 'right'){ direction = [1, 0];
            } else if ( control === 'left') { direction = [-1, 0];}
        }    
    }
    
    
    
    