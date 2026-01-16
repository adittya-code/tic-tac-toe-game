let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_btn"); 
let new_btn = document.querySelector("#new_btn"); 
let msg = document.querySelector("#msg"); 
let msgc = document.querySelector(".msgc");
let click_sound = new Audio("click.mp3"); 
let win_sound = new Audio("win.wav");
let draw_sound = new Audio("draw.mp3");


let turnO = true;  

const winpatterns = [
    [0 , 1 , 2],
    [0 , 3 , 6],
    [0 , 4 , 8],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [2 , 4 , 6],
    [3 , 4 , 5],
    [6 , 7 , 8],

];

const resetgame = () => {
    turnO = true;
    enabledboxes();
    msgc.classList.add("hide");
    win_sound.pause();
    win_sound.currentTime = 0;
    draw_sound.pause(); 
    draw_sound.currentTime = 0;
}



boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        click_sound.play()
        console.log("box was clicked");
        if (turnO) {
            //playerO
            box.innerText = "O";

            turnO = false;
        }else {
            //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkwinner();
    })
})  


const disabledboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

 
const enabledboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};




const showwinner = (winner) => {
    win_sound.play()
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgc.classList.remove("hide");
    disabledboxes();
};





const checkwinner = () => {
    let winnerfound = false;
    
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if  ( pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val){
                console.log("winner" , pos1val)
                showwinner(pos1val);
                winnerfound = true;
                break;
            } 
        }
    }

    if (!winnerfound){
        let allfilled = true;
        for (let box of boxes){
            if (box.innerText === ""){
                allfilled = false;
                break;
            }
        }

        if (allfilled){
            console.log("Match draw!");
            draw();
        }
    }
};


const draw = () => {
    draw_sound.play();
    msg.innerText = "Match drawn!";
    msgc.classList.remove("hide");
    disabledboxes();

}



reset_btn.addEventListener("click" , resetgame);
new_btn.addEventListener("click" , resetgame);


