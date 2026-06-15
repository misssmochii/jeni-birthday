// ================================
// OPENING SCREEN
// ================================

const enterBtn = document.getElementById("enter-btn");
const loadingScreen = document.getElementById("loading-screen");
const bgMusic = document.getElementById("bg-music");

enterBtn.addEventListener("click", () => {

    loadingScreen.style.opacity = "0";

    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 800);

    bgMusic.play().catch(() => {});

});

// ================================
// BEGIN JOURNEY
// ================================

const beginBtn = document.getElementById("begin-btn");

beginBtn.addEventListener("click", () => {

    document
        .getElementById("intro")
        .scrollIntoView({
            behavior: "smooth"
        });

});

// ================================
// SCROLL REVEAL
// ================================

const sections = document.querySelectorAll("section");

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "1s";

});

const revealObserver =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform =
            "translateY(0)";

        }

    });

},{
    threshold:0.15
});

sections.forEach(section => {

    revealObserver.observe(section);

});

// ================================
// MEMORY POPUP
// ================================

const popup =
document.getElementById("memory-popup");

const popupText =
document.getElementById("popup-text");

const closePopup =
document.getElementById("close-popup");

const memories = {

    1: "One of my favorite memories with you 💜",

    2: "A day filled with laughter and happiness ✨",

    3: "A moment I never want to forget 🌷",

    4: "Thank you for being part of my story ⭐"

};

document
.querySelectorAll(".memory-card")
.forEach(card => {

    card.addEventListener("click", () => {

        popup.style.display = "flex";

        popupText.innerHTML =
        memories[card.dataset.memory];

    });

});

closePopup.addEventListener("click", () => {

    popup.style.display = "none";

});

// ================================
// FLOWER QUEST
// ================================

let flowersFound = 0;

const flowerCounter =
document.getElementById("flower-counter");

const flowerArea =
document.getElementById("flower-area");

for(let i = 0; i < 5; i++){

    const flower =
    document.createElement("div");

    flower.className = "flower";

    flower.innerHTML = "🌷";

    flower.style.left =
    Math.random() * 90 + "%";

    flower.style.top =
    Math.random() * 85 + "%";

    flowerArea.appendChild(flower);

    flower.addEventListener("click", () => {

        flower.remove();

        flowersFound++;

        flowerCounter.innerHTML =
        flowersFound + " / 5";

        if(flowersFound === 5){

    flowerCounter.innerHTML = `

        <img
            src="images/bouquet.png"
            class="bouquet-reward-img"
            alt="Bouquet">

        <p class="bouquet-quote">

            Every flower you found became part of this bouquet.

            <br><br>

            Just like every little memory became part of our story. 💐✨

        </p>

    `;

}

        checkUnlock();

    });

}

// ================================
// GARDEN GAME
// ================================

const flowerStage =
document.getElementById("flower-stage");

const waterBtn =
document.getElementById("water-btn");

const gardenMessage =
document.getElementById("garden-message");

let waterCount = 0;

const stages = [

    "🌱",
    "🌿",
    "🌷",
    "🌸",
    "🌺"

];

let currentStage = 0;

waterBtn.addEventListener("click", () => {

    if(currentStage < 4){

        currentStage++;

        flowerStage.innerHTML =
        stages[currentStage];

    }

   if(currentStage === 4){

    waterBtn.innerHTML =
    "Bloomed 💜";

    gardenMessage.innerHTML =
    "Some flowers bloom in gardens. Some bloom in people's lives. Thank you for being one of them. 💜";

}

    checkUnlock();

});

// ================================
// SECRET LETTER
// ================================

const envelope =
document.getElementById("envelope");

const letterBox =
document.getElementById("letter-box");

let letterOpened = false;

const letterContent =

`Dear Jeni,

Happy Birthday 💜

Thank you for every laugh,
every conversation,
every memory,
and every moment.

I hope this year brings you
peace,
happiness,
and beautiful surprises.

Never forget how loved
and appreciated you are.

✨`;

envelope.addEventListener("click", () => {

    if(letterOpened) return;

    letterOpened = true;

    letterBox.style.display = "block";

    let i = 0;

    const typing =
    setInterval(() => {

        letterBox.innerHTML +=
        letterContent.charAt(i);

        i++;

        if(i >= letterContent.length){

            clearInterval(typing);

        }

    }, 35);

});

// ================================
// WISH JAR
// ================================

let starsCollected = 0;
let wishGameActive = false;
let goldenStarClicked = false;

const starCounter =
document.getElementById("star-counter");

const wishJar =
document.getElementById("wish-jar");

const wishMessage =
document.getElementById("wish-message");

const goldenArea =
document.getElementById("golden-star-area");

const jarImage =
document.getElementById("jar-image");

const wishObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        wishGameActive =
        entry.isIntersecting;

    });

},{
    threshold:0.4
});

wishObserver.observe(wishJar);

function createStar(){

    if(!wishGameActive) return;

    if(starsCollected >= 10) return;

    const star =
    document.createElement("div");

    star.innerHTML = "⭐";

    star.style.position = "fixed";
    star.style.left =
    Math.random()*90 + "vw";
    star.style.top = "-50px";

    star.style.fontSize = "2rem";
    star.style.cursor = "pointer";
    star.style.zIndex = "100";

    document.body.appendChild(star);

    let y = -50;

    const fall =
    setInterval(()=>{

        y += 3;

        star.style.top =
        y + "px";

        if(y > window.innerHeight){

            clearInterval(fall);
            star.remove();

        }

    },16);

    star.addEventListener("click",()=>{

        clearInterval(fall);

        star.remove();

        starsCollected++;

        starCounter.innerHTML =
        starsCollected + " / 10";

        if(starsCollected === 10){

            spawnGoldenStar();

        }

    });

}

setInterval(createStar,1200);

function spawnGoldenStar(){

    jarImage.src =
    "images/jar-full.png";

    jarImage.animate(
[
    {transform:"scale(1)"},
    {transform:"scale(1.15)"},
    {transform:"scale(1)"}
],
{
    duration:800
}
);
    wishMessage.innerHTML =
    "✨ Your wish jar is full ✨";

    const golden =
    document.createElement("div");

    golden.className =
    "golden-star";

    golden.innerHTML = "🌟";

    goldenArea.appendChild(golden);

    golden.addEventListener("click",()=>{

        golden.remove();

        goldenStarClicked = true;

        wishMessage.innerHTML =

        "May all your wishes find their way to you 💜";

        checkUnlock();

    });

}

// ================================
// FINAL UNLOCK
// ================================

const unlockBtn =
document.getElementById("unlock-btn");

function checkUnlock(){

    if(
        flowersFound === 5 &&
        currentStage === 4 &&
        goldenStarClicked
    ){

        unlockBtn.disabled = false;

        unlockBtn.innerHTML =
        "Open Final Surprise 🎂";

    }

}

unlockBtn.addEventListener("click",()=>{

    document
    .getElementById("final-modal")
    .style.display = "flex";

    launchConfetti();

});

// ================================
// CLOSE FINAL MODAL
// ================================

document
.getElementById("final-modal")
.addEventListener("click",()=>{

    document
    .getElementById("final-modal")
    .style.display = "none";

});

// ================================
// CONFETTI
// ================================

function launchConfetti(){

    for(let i=0;i<150;i++){

        const confetti =
        document.createElement("div");

        confetti.style.position =
        "fixed";

        confetti.style.width = "8px";
        confetti.style.height = "8px";

        confetti.style.left =
        Math.random()*100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.background =
        `hsl(${Math.random()*360},
        90%,70%)`;

        confetti.style.zIndex =
        "9999";

        document.body.appendChild(
        confetti
        );

        let y = -20;

        const drop =
        setInterval(()=>{

            y += 5;

            confetti.style.top =
            y + "px";

            if(y >
            window.innerHeight){

                clearInterval(drop);

                confetti.remove();

            }

        },16);

    }

}
