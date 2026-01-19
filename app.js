import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const LOTTIE_SRC =
  "https://lottie.host/19bce180-f6ad-42fc-a289-89aea9f4a408/LWhFGXz2z0.lottie"; 
const MAX_LIVES = 7;

const POKEMON_LIST = [
  "bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard",
  "squirtle","wartortle","blastoise","caterpie","metapod","butterfree",
  "weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot",
  "rattata","raticate","spearow","fearow","ekans","arbok",
  "pikachu","raichu","sandshrew","sandslash","nidoran","nidorina","nidoqueen",
  "nidorino","nidoking","clefairy","clefable","vulpix","ninetales",
  "jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume",
  "paras","parasect","venonat","venomoth","diglett","dugtrio",
  "meowth","persian","psyduck","golduck","mankey","primeape",
  "growlithe","arcanine","poliwag","poliwhirl","poliwrath",
  "abra","kadabra","alakazam","machop","machoke","machamp",
  "bellsprout","weepinbell","victreebel","tentacool","tentacruel",
  "geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro",
  "magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong",
  "grimer","muk","shellder","cloyster","gastly","haunter","gengar",
  "onix","drowzee","hypno","krabby","kingler","voltorb","electrode",
  "exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan",
  "lickitung","koffing","weezing","rhyhorn","rhydon","chansey",
  "tangela","kangaskhan","horsea","seadra","goldeen","seaking",
  "staryu","starmie","mrmime","scyther","jynx","electabuzz","magmar",
  "pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee",
  "vaporeon","jolteon","flareon","porygon","omanyte","omastar",
  "kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos",
  "moltres","dratini","dragonair","dragonite","mewtwo","mew"
];

// --------- STATE ----------
let secretWord = "";
let revealedLetters = [];
let guessedLetters = new Set();
let remainingLives = MAX_LIVES;
let enemyHp = MAX_LIVES;
let gameOver = false;

// --------- DOM ----------
const wordDisplayEl = document.getElementById("word-display");
const messageEl = document.getElementById("message");
const keyboardEl = document.getElementById("keyboard");
const artworkImg = document.getElementById("artwork-img");
const artworkWrapper = document.getElementById("artwork-wrapper");
const pokemonNameReveal = document.getElementById("pokemon-name-reveal");
const newGameBtn = document.getElementById("new-game-btn");
const enemyHpLabel = document.getElementById("enemy-hp-label");
const pokeballsWrapper = document.getElementById("pokeballs-wrapper");

// --------- LOTTIE ----------
const canvas = document.getElementById("pokeball-canvas");

let pokeballLottie = null;
let lottieReady = false;
let playQueued = false;

function initLottie() {
  if (!canvas) return;

  try {
    pokeballLottie = new DotLottie({
      autoplay: false,
      loop: false,
      canvas,
      src: LOTTIE_SRC
    });

    pokeballLottie.addEventListener("ready", () => {
      lottieReady = true;
      console.log("[Lottie] ready ✅");

      if (playQueued) {
        playQueued = false;
        showPokeballAnimation();
      }
    });

    pokeballLottie.addEventListener("load", () => {
      console.log("[Lottie] load ✅");
    });

    pokeballLottie.addEventListener("loadError", (e) => {
      console.error("[Lottie] loadError ❌", e?.error || e);
    });

  } catch (err) {
    console.error("[Lottie] init failed ❌", err);
  }
}

function showPokeballAnimation() {
  if (!pokeballLottie || !canvas) return;

  if (!lottieReady) {
    playQueued = true;
    canvas.style.display = "block";
    return;
  }

  canvas.style.display = "block";

  try {
    pokeballLottie.stop();
    pokeballLottie.play();
  } catch (err) {
    console.error("[Lottie] play failed ❌", err);
  }
}

function hidePokeballAnimation() {
  if (!pokeballLottie || !canvas) return;
  playQueued = false;
  canvas.style.display = "none";

  try {
    pokeballLottie.stop();
  } catch (err) {
    console.error("[Lottie] stop failed ❌", err);
  }
}

initLottie();

// --------- HELPERS ----------
function chooseRandomPokemon() {
  const index = Math.floor(Math.random() * POKEMON_LIST.length);
  return POKEMON_LIST[index];
}

function initKeyboard() {
  keyboardEl.innerHTML = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const char of alphabet) {
    const btn = document.createElement("button");
    btn.className = "key-btn";
    btn.textContent = char;
    btn.dataset.letter = char.toLowerCase();
    btn.addEventListener("click", () => handleGuess(char.toLowerCase(), btn));
    keyboardEl.appendChild(btn);
  }
}

function updateWordDisplay() {
  wordDisplayEl.textContent = revealedLetters.join(" ");
}

function updateStatusBars() {
  enemyHpLabel.textContent = `${enemyHp}/${MAX_LIVES}`;

  pokeballsWrapper.innerHTML = "";
  for (let i = 0; i < MAX_LIVES; i++) {
    const ball = document.createElement("div");
    ball.className = "pokeball" + (i < remainingLives ? "" : " empty");
    pokeballsWrapper.appendChild(ball);
  }
}

function setMessage(text, type = "") {
  messageEl.textContent = text;
  messageEl.classList.remove("win", "lose");
  if (type) messageEl.classList.add(type);
}

function revealPokemonName() {
  pokemonNameReveal.textContent = secretWord.toUpperCase();
}

async function fetchArtwork(pokemonName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Pokémon data");
    const data = await res.json();

    const imgUrl =
      data.sprites?.other?.["official-artwork"]?.front_default ||
      data.sprites?.front_default ||
      "";

    if (imgUrl) {
      artworkImg.src = imgUrl;
      artworkWrapper.classList.remove("placeholder");
    } else {
      artworkImg.removeAttribute("src");
      artworkWrapper.classList.add("placeholder");
    }
  } catch (err) {
    console.error(err);
    artworkImg.removeAttribute("src");
    artworkWrapper.classList.add("placeholder");
  }
}

function checkWin() {
  return revealedLetters.join("") === secretWord;
}

function endGame(win) {
  gameOver = true;
  document.querySelectorAll(".key-btn").forEach((btn) => (btn.disabled = true));
  artworkImg.classList.add("reveal");
  revealPokemonName();

  if (win) {
    setMessage(`You caught ${secretWord.toUpperCase()}! 🎉`, "win");
    showPokeballAnimation();
  } else {
    setMessage(`The wild ${secretWord.toUpperCase()} escaped! 💥`, "lose");
    hidePokeballAnimation();
  }
}

// --------- GAMEPLAY ----------
function handleGuess(letter, btnElement) {
  if (gameOver || guessedLetters.has(letter)) return;

  guessedLetters.add(letter);

  const occurrences = [];
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) occurrences.push(i);
  }

  if (occurrences.length > 0) {
    occurrences.forEach((idx) => {
      revealedLetters[idx] = letter;
    });

    enemyHp = Math.max(0, enemyHp - occurrences.length);
    setMessage(
      `Nice! The letter "${letter.toUpperCase()}" is in the name. You hit the enemy ${occurrences.length} time(s)!`
    );

    btnElement.classList.add("correct");
    btnElement.disabled = true;
  } else {
    remainingLives = Math.max(0, remainingLives - 1);
    setMessage(
      `Oh no! "${letter.toUpperCase()}" is not in the name. The wild Pokémon strikes back!`
    );

    btnElement.classList.add("wrong");
    btnElement.disabled = true;
  }

  updateWordDisplay();
  updateStatusBars();

  if (checkWin()) {
    endGame(true);
  } else if (remainingLives === 0) {
    endGame(false);
  }
}

function startNewGame() {
  gameOver = false;

  secretWord = chooseRandomPokemon().toLowerCase();
  revealedLetters = Array.from(secretWord, (ch) => (/[a-z]/.test(ch) ? "_" : ch));
  guessedLetters = new Set();

  remainingLives = MAX_LIVES;
  enemyHp = MAX_LIVES;

  setMessage("");
  updateWordDisplay();
  updateStatusBars();
  initKeyboard();

  pokemonNameReveal.textContent = "???????";
  artworkImg.classList.remove("reveal");
  artworkWrapper.classList.add("placeholder");

  hidePokeballAnimation();
  fetchArtwork(secretWord);
}

newGameBtn.addEventListener("click", startNewGame);
startNewGame();
