// document.querySelector(".top-btn")
const top_btn = document.querySelector(".top-btn").style;
const top_header = document.querySelector(".top-header");
const menu = document.querySelector(".menu");
const cards = document.querySelectorAll(".card");
const stage1 = document.querySelector(".stage1");
const stage2 = document.querySelector(".stage2");
const stage3 = document.querySelector(".stage3");

let card_arr = ["#ff0000", "#ff0000", "#00ff00", "#00ff00", "#0000ff", "#0000ff", "#ffff00", "#ffff00"];
let first_card_is_open = false;
let first_card_index;
let first_card;
let counter = card_arr.length/2;

// MINIGAME
const shuffleArray = (array) => {
    for(var i=array.length - 1; i>0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

let shuffled_card_arr = shuffleArray(card_arr);

const resetFirstCard = () => {
    first_card_is_open = false;
    first_card = null;
    first_card_index = null;
}

const initGame = () => {
    shuffled_card_arr = shuffleArray(card_arr);
    counter = card_arr.length/2;
    [...document.querySelectorAll(".card")].forEach(element => {
            element.style.display = "block";
            element.style.backgroundColor = "#FFF";    
        });
}

const flipCardWithColor = (card, index) => {
    if(card == first_card) {
        return;
    }
    card.style.backgroundColor = shuffled_card_arr[index];
    if(first_card_is_open) {
        if(shuffled_card_arr[index] === shuffled_card_arr[first_card_index]) {
            setTimeout(() => {
            first_card.style.display = "none";
            card.style.display = "none";
            resetFirstCard();
            counter--;
            if(counter < 1) {
                stage2.style.display = "none";
                stage3.style.display = "flex";
            }
            }, 500);

        } else {
            setTimeout(() =>{
                first_card.style.backgroundColor = "#FFF";
                card.style.backgroundColor = "#FFF";
                resetFirstCard();
            }, 500);

        }
    } else {
        first_card_is_open = true;
        first_card = card;
        first_card_index = index;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    [...document.querySelectorAll(".card")].forEach(element => element.addEventListener('click', function(e) {
            flipCardWithColor(element, element.innerHTML);        
    }))
});

document.querySelector(".game-play-btn").addEventListener("click", () => {
    stage1.style.display = "none";
    stage2.style.display = "flex";
});

document.querySelector(".replay-btn").addEventListener("click", () => {
    stage3.style.display = "none";
    stage1.style.display = "flex"
    initGame();
})

// for (var i = cards.length - 1; i>0; i--){
//     cards[i].addEventListener("click", () => {
//         if(cards[i].classList.hasClass("open")) {
//             if(first_open){
//             cards[i].classList.removeClass("open");
//             first_open = false;
//             }else{
//                 first_open = true;
//             }
//         } else {
//             cards[i].classList.addClass("open");
//         }
//     });
// }


// GENERAL
document.querySelector(".mobile-btn").addEventListener('click', () => {
    top_header.classList.toggle("menu-clicked");
})

document.addEventListener('scroll', function() {
    let scroll_Y = document.scrollingElement.scrollTop;

    if (scroll_Y ==0) {
        top_header.style.backgroundColor = "transparent";
        menu.style.backgroundColor = "transparent";
    } else {
        top_header.style.backgroundColor = "burlywood";
        menu.style.backgroundColor = "burlywood";
    }
    if (scroll_Y >= 80) {
        top_btn.display = "block";
    } else { 
        top_btn.display = "none";
    }
    console.log(scroll_Y);
})

