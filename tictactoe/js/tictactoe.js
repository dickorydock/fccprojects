

var arrayXO = [["", "", ""], ["", "", ""], ["", "", ""]];
var playerLetter, computerLetter, gameWonDummy; 
var gameWon = function(letter){
  gameWonDummy = 1; 
  $(".winnerRow").html(letter+" won! Click here to play again.")
};

$(".winnerRow").click(function(){
  gameStart();
});

var gameStart = function(){
  gameWonDummy = 0 ; 
  $(".winnerRow").html("");
 $(".victoryCol").hide();
 $(".victoryRow").hide();
 $(".victoryDiag0").hide();
 // $(".victoryDiag1").hide();
 for (i = 0 ; i < 3; i++){
  for (j=0;j<3;j++){
    arrayXO[i][j] = "";
   }
}
showXO(); 
}
var showXO = function(){
for (i = 0 ; i < 3; i++){
  for (j=0;j<3;j++){
    $("#box"+i+j).html(arrayXO[i][j]);
    if (i==0&j==0){
    $("#box"+i+j).html('<div class="victoryCol victoryCol0" style="display: none;"></div><div class="victoryDiag0" style="display: none;"></div><div class="victoryDiag1" style="display: none;"></div>'+arrayXO[i][j]);
    }
    if (i==0&j!=0){
    $("#box"+i+j).html('<div class="victoryCol victoryCol'+j+'" style="display: none;"></div>'+arrayXO[i][j]);
    }
   }
}

};

var checkXO = function(){
  //check rows
  for (i=0; i<3; i++){
    if (arrayXO[i][0] != "" && (arrayXO[i][0]==arrayXO[i][1]) && (arrayXO[i][0]==arrayXO[i][2])){
      console.log(".victoryRow"+i);
      $(".victoryRow"+i).show();
      gameWon(arrayXO[i][0]);
    }
  }

  //check columns
  for (i=0; i<3; i++){
    if (arrayXO[0][i] != "" && (arrayXO[0][i]==arrayXO[1][i]) && (arrayXO[0][i]==arrayXO[2][i])){
      console.log("columns!"+i);
      $(".victoryCol"+i).show();
      gameWon(arrayXO[0][i]);
    }
  }

  //check diagonals
  if (arrayXO[0][0] != "" && (arrayXO[0][0]==arrayXO[1][1]) && (arrayXO[0][0]==arrayXO[2][2])){
      $(".victoryDiag0").show();
      gameWon(arrayXO[1][1]);
    }

  if (arrayXO[0][2] != "" && (arrayXO[0][2]==arrayXO[1][1]) && (arrayXO[0][2]==arrayXO[2][0])){
      $(".victoryDiag1").show();
      gameWon(arrayXO[1][1]);
     }  
};


//going to have the computer play randomly for now
var computerPlays = function(){
//pick one random number between 0 and 2;
var attempts = 0 ;
var blankFound = 0;
while (attempts<40 && blankFound == 0){
attempts++;
var checkI = Math.floor(Math.random()*3);
var checkJ = Math.floor(Math.random()*3);
console.log(checkI+" "+checkJ)
if (arrayXO[checkI][checkJ]==""){
  blankFound = 1; 
  setTimeout(function(){
  arrayXO[checkI][checkJ] = computerLetter;
  showXO();
  checkXO();
    }, 1000);
}
}
};

setTimeout(function(){
  console.log("whats is up")
}, 1000)
//showXO();

 $("#playX").click(function(){
   playerLetter = "X";
   console.log("you're playing X");
   computerLetter = "O";
   $("#tttTable").show();
   gameStart();
   });

 $("#playO").click(function(){
   playerLetter = "O";
   computerLetter = "X";
   $("#tttTable").show();
  gameStart();
   });

 $(".column").click(function(){
  console.log("you clicked!");
   var clickedBox = this.id;
   var clicked_i = clickedBox.substr(3,1);
   var clicked_j =  clickedBox.substr(4,1);
   if (gameWonDummy == 0 && arrayXO[clicked_i][clicked_j] == ""){
         arrayXO[clicked_i][clicked_j] = playerLetter;
        showXO();
        checkXO();
        if (gameWonDummy==0){computerPlays();}
        }
   });
