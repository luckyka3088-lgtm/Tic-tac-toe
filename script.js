let com_btn = document.querySelector("#com");
let human_btn = document.querySelector("#human");
let cells = document.querySelectorAll(".button");
let score_board = document.querySelector("#scoreBox");
let reset_btn = document.querySelector("#reset");
let curr_X_score = document.querySelector("#Xscore");
let curr_O_score = document.querySelector("#Oscore");
let Xscore = 0;
let Oscore = 0;
let winLine = document.querySelector("#winLine");
let turn = "X";
let com = false;

function computerTurn() {
  let remaining = get_remaining();
  if (remaining.length > 0) {
    const randomchoice = remaining[Math.floor(Math.random() * remaining.length)];

    cells[randomchoice].innerText = turn;
    cells[randomchoice].classList.add(turn);
    cells[randomchoice].classList.remove("back");
    cells[randomchoice].disabled = true; 
    turn = "X";
    curr_O_score.innerText = Oscore;
    curr_X_score.innerText = Xscore;
    check();
  }
}
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.innerText = turn;
    cell.classList.add(turn);
    cell.classList.remove("back");
    turn = turn === "X" ? "O" : "X";
    cell.disabled = true;
    check();
    curr_O_score.innerText = Oscore;
    curr_X_score.innerText = Xscore;
    if(com && turn == "O"){
      setTimeout(computerTurn, 300);
    }
  }); 
});


const win_pat = [[0,1,2],
           [3,4,5],
           [6,7,8],
           [0,3,6],
           [1,4,7],
           [2,5,8],
           [0,4,8],
           [2,4,6]];

const check = () =>{
  for(pat of win_pat){
    let pos1 = cells[pat[0]].innerText;
    let pos2 = cells[pat[1]].innerText;
    let pos3 = cells[pat[2]].innerText;
    if(pos1 != "" && pos2 != "" && pos3 != ""){
      if(pos1 === pos2 && pos2 === pos3){
      
        let winner = pos1;
        if(winner === "X"){
          Xscore += 1;
        }else{
          Oscore += 1;
        }
        setTimeout(reset,500);
        return;
      }
    }
  }
  
}
function reset(){
  cells.forEach((cell)=>{
    cell.innerText = "";
    cell.disabled = false;
    cell.classList.add("back");
    cell.classList.remove("X");
    cell.classList.remove("O");
    
  })
}
human_btn.addEventListener("click",() =>{
  com = false;
  human_btn.style.border = "2px solid white";
  com_btn.style.border = "None";
  reset();
  Xscore = 0;
  Oscore = 0;
  curr_X_score.innerText = Xscore;
  curr_O_score.innerText = Oscore;
  
})

reset_btn.addEventListener("click",reset);

com_btn.addEventListener("click",() =>{
  com = true;
  com_btn.style.border = "2px solid white";
  reset();
  Xscore = 0;
  Oscore = 0;
  human_btn.style.border = "None";
})

function get_remaining() {

  let remaining_cell = [];
  cells.forEach((cell, index) => {
    if(cell.innerText == ""){
    remaining_cell.push(index);
    }
  });
  return remaining_cell; 
};

