let Cards = [
    {
        name: "apple",
        img: "apple.png",
    },
    {
        name: "banana",
        img: "bananas.png",
    },
    {
        name: "broccoli",
        img: "broccoli.png",
    },
    {
        name: "dragon-fruit",
        img: "dragon-fruit.png",
    },
    {
        name: "grape",
        img: "grapes.png",
    },
    {
        name: "lemon",
        img: "lemon.png",
    },
    {
        name: "orange",
        img: "orange-juice.png",
    },
    {
        name: "strawberry",
        img: "strawberry.png",
    },
    {
        name: "watermelon",
        img: "watermelon.png",
    }
];
function StartGame(){
    ClearBoard();
    DrawCards();
}

let CardPress_n = 0;
let CardPress_1 = 0;
let CardPress_2 = 0;

let PreviousCard = 0;

//Card Flip + check how many are pressed
const Card_Flip = function(){
		PreviousCard = this;
		CardPress_n++;

		this.classList.remove("CardNotFlipped");
		this.style.backgroundImage = this.img;
		this.classList.add("CardFlipped");
		this.removeEventListener("click",Card_Flip,false);
		this.addEventListener("click",Card_UnFlip,false);

		if(CardPress_n == 2){
			CardPress_2 = this;
			CardPair(CardPress_1, CardPress_2);
		}
		else{
			CardPress_1 = this;
		}
}

//Card unflip
const Card_UnFlip = function(){
		if(PreviousCard == this)
			return;
		
		this.classList.remove("CardFlipped");
        this.classList.add("CardNotFlipped");
        this.style = null;
        this.removeEventListener("click",Card_UnFlip,false);
        this.addEventListener("click",Card_Flip,false);
		
		PreviousCard = 0;
}

//Remove listeners in cards
function removeListeners(){
    let GameBoard = document.getElementById("game");
    if(GameBoard.hasChildNodes()){
        let tab = GameBoard.querySelectorAll("*");
        for(const a of tab){
            a.removeEventListener("click",Card_Flip,false);
            a.removeEventListener("click",Card_UnFlip,false);
        }
    }
}
//Restore listeners in cards
function restoreListeners(){
    let GameBoard = document.getElementById("game");
    if(GameBoard.hasChildNodes()){
        let tab = GameBoard.querySelectorAll("*");
        for(const a of tab){
            a.addEventListener("click",Card_Flip,false);
        }
    }
}


let CardsPaired = 0;

function WinScreen(){
    let GameBoard = document.getElementById("game");
    let WinScreen = document.createElement("div");
    WinScreen.classList.add("WinScreen");
    WinScreen.innerHTML = "You Won!";
    GameBoard.appendChild(WinScreen);
    console.log("You Won!");
}

function CardPair(Card1, Card2){
    CardPress_n = 0;
    if(Card1.name === Card2.name && Card1.number != Card2.number){
        console.log("Para!");
        CardsPaired++;
        setTimeout(function(){
            Card1.style.visibility = "hidden";
            Card2.style.visibility = "hidden";
            if(CardsPaired == CardQuantity)
                WinScreen();
        }, 750);
    }
    else{
        removeListeners();
        setTimeout(function(){
            Card1.addEventListener("click",Card_UnFlip,false);
            Card1.removeEventListener("click",Card_Flip,false);
            Card2.addEventListener("click",Card_UnFlip,false);
            Card2.removeEventListener("click",Card_Flip,false);
            Card1.click();
            Card2.click();
            restoreListeners();
        }, 750);
    }
}

//Clearing the board
function ClearBoard(){
    let GameBoard = document.getElementById("game");
    if(GameBoard.hasChildNodes()){
        let tab = GameBoard.querySelectorAll("*");
        for(const a of tab){
            a.remove();
        }
    }
    CardPress_1 = 0;
    CardPress_2 = 0;
    CardPress_n = 0;
    CardsPaired = 0;
}

let CardQuantity = 0;

function CheckCardQuantity(){
    let input = document.getElementById("input_number");
    return input.value;
}

//Creating Cards in Random Order and Displaing them
function DrawCards(){

    let CardsArray = [];
    let GameBoard = document.getElementById("game");

    CardQuantity = CheckCardQuantity();

    //Randomize order of cards
    for(let i=0;i<CardQuantity;i++){
        for(let j=0;j<2;j++){
            let isset = true;
            while(isset){
                let rand = (Math.floor(Math.random() * (CardQuantity*2)) + 1)-1;
                if(CardsArray[rand] == null){
                    CardsArray[rand] = Cards[i];
                    isset = false;
                }
            }
        }
    }
    
    let CardId = 1;

    //Create Cards and Display them
    for(const CardCreator of CardsArray){
        let GameCard = document.createElement("div");
        GameCard.img = "url('./img/"+CardCreator.img+"')";
        GameCard.name = CardCreator.name;
        GameCard.number = CardId;

        GameCard.classList.add("Card", "CardNotFlipped");
        GameCard.addEventListener("click",Card_Flip,false);

        GameBoard.appendChild(GameCard);
        CardId++;
    }   
    console.log(CardsArray);
}