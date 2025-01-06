const html = document.querySelector("html");
const displayTimer = document.querySelector("#timer");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const iniciarBtn = document.querySelector("#start-pause");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.querySelector("#start-pause");
const musicFocoInput = document.querySelector("#alternar-musica");
const startOrPauseBtn = document.querySelector("#start-pause span");
const StartPauseBtnIcon = document.querySelector(
  ".app__card-primary-butto-icon"
);
const timerOnScreen = document.querySelector("#timer");
const music = new Audio("/sons/luna-rise-part-one.mp3");
const startSound = new Audio("/sons/play.wav");
const pauseSound = new Audio("/sons/pause.mp3");
const endSound = new Audio("/sons/beep.mp3");

let interval = 1500;
let intervalId = null;

music.loop = true;

musicFocoInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

const timerFoco = 1500;
const timerDescansoCurto = 300;
const timerDescansoLongo = 900;

function changeContext(context) {
  ShowTime();
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `/imagens/${context}.png`);
  switch (context) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada?,<br />
      <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      title.innerHTML = `Hora de voltar à superfície.<br />
      <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
}

focoBtn.addEventListener("click", () => {
  interval = 1500;
  changeContext("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  interval = 300;
  changeContext("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  interval = 900;
  changeContext("descanso-longo");
  longoBtn.classList.add("active");
});

const timer = () => {
  if (interval === 0) {
    alert("Tempo finalizado!");
    Clear();
    endSound.play();
    return;
  }
  displayTimer.innerHTML = interval;
  interval -= 1;
  ShowTime();
};

startPauseBtn.addEventListener("click", () => {
  StartOrPause();
  if (intervalId) {
    startSound.play();
  } else if (!intervalId) {
    pauseSound.play();
  }
});

function StartOrPause() {
  if (intervalId) {
    Clear();
    return;
  }

  startSound.play();
  intervalId = setInterval(timer, 1000);
  startOrPauseBtn.textContent = "Pausar";
  StartPauseBtnIcon.setAttribute("src", `/imagens/pause.png`);
}

function Clear() {
  clearInterval(intervalId);
  startOrPauseBtn.textContent = "Retomar";
  StartPauseBtnIcon.setAttribute("src", `/imagens/play_arrow.png`);
  intervalId = null;
}

function ShowTime() {
  const time = new Date(interval * 1000);
  const timeFormated = time.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  timerOnScreen.innerHTML = timeFormated;
  // const time = interval;
  // timerOnScreen.innerHTML = `${Math.floor(time / 60)
  //   .toString()
  //   .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
}

ShowTime();
