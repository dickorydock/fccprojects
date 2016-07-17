$(document).ready(function(){
//declare variables
var fullPattern = [], 
  levelNumber=1, 
  correctMoves = [],
  showDone = 0,
  nextMove = 0,
  noteNumber = 0,
  showTime = 500,
  //Strict Mode?: 0 = not strict, 1 = strict
  strictMode = 0,
  //Number of Levels
  numLevels = 20,
  //Set interval variable to use with setTimeout
  interval = 0 ;

var showPattern = function(levelPattern) {
    showDone = 0 ; 
    $("#winnerRow").html("");
    $("#levelNumberBox").html(('0' + levelNumber).slice(-2));
    levelPattern = fullPattern.slice(0,levelNumber); 
    var $buttons = $('.simonButton');
    var $active =  $('#button'+levelPattern[noteNumber]) ; 
    $buttons.removeClass('simonButton1on simonButton2on simonButton3on simonButton4on'); 
    $active.addClass('simonButton'+levelPattern[noteNumber]+'on');

    setTimeout(function(){ 
    $buttons.removeClass('simonButton1on simonButton2on simonButton3on simonButton4on'); 
    },200);
    
    if ([1,2,3,4].indexOf(levelPattern[noteNumber])>-1){
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound"+levelPattern[noteNumber]+".mp3").play();
    }
    
    noteNumber++;
    
    //clear interval at the end of a pattern
    if (noteNumber == levelPattern.length) {
        clearInterval(interval);
        showDone = 1 ; 
    }

    
};

var showCurrent = function(thisGroup){
noteNumber = 0 ;
if (levelNumber<=fullPattern.length){
interval = setInterval(function(){showPattern(thisGroup)}, showTime);
}
};


$("#startButton").click(function(){
//regenerate fullPattern here
  for (i=0; i<numLevels; i++){
    fullPattern[i]= Math.floor(Math.random()*4)+1;
  }
clearInterval(interval);
levelNumber = 1 ;
correctMoves = fullPattern.slice(0,levelNumber);
showCurrent(fullPattern.slice(0,levelNumber));
});

$("#strictButton").click(function(){
  if (strictMode==1){
     strictMode = 0 ;
     $("#strictButton").removeClass("strictOn").addClass("strictOff");
     }
 else if (strictMode==0){
     strictMode = 1;
     $("#strictButton").removeClass("strictOff").addClass("strictOn");     }
});


//CLICKING
 $(".simonButton").click(function(){
   var clickedID = this.id;
   
   //only take action if we're all through showing a pattern -- else JS may mess up the checking process
   if (showDone == 1){

    //highlight what they clicked...
    $("#"+clickedID)
          .removeClass('simonButton'+clickedID.substr(6,1)+'off')
          .addClass('simonButton'+clickedID.substr(6,1)+'on');

    //...and unhighlight it shortly thereafter
    setTimeout(function(){
    $("#"+clickedID) 
         .removeClass('simonButton'+clickedID.substr(6,1)+'on')
         .addClass('simonButton'+clickedID.substr(6,1)+'off');
    },.2*showTime);
    
    //this is the move they made
    nextMove = parseInt(clickedID.substr(6,1));
    
    //play the sound for the move they made

    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound"+nextMove+".mp3").play();
    
    //Check if the move was correct. If correct, advance to next level or win game.
    if (nextMove==correctMoves[0]){
      correctMoves.shift(1);
      if (correctMoves.length<1){
        if (levelNumber ==fullPattern.length){
          $("#winnerRow").html("You won!<br/> Press 'Start' to play again.");
        }
        //level up
        levelNumber++;
        correctMoves=fullPattern.slice(0,levelNumber);
        showCurrent(correctMoves);
      }
    }

    //If the move was incorrect, let them try again or (for strict mode) start again with a new pattern
    else if (nextMove!=correctMoves[0] ) {
      clearInterval(interval);
      $("#winnerRow").html("<br/>Try this level again!");
      if (strictMode == 1){
          for (i=0; i<numLevels; i++){
            fullPattern[i]= Math.floor(Math.random()*4)+1;
          }
          $("#winnerRow").html("");
          levelNumber = 1;
      }
      correctMoves=fullPattern.slice(0,levelNumber);
      showCurrent(correctMoves);
    }
      }
  });

  });


