const buttonGreen = document.querySelector('#green') as HTMLButtonElement;
const buttonRed = document.querySelector('#red') as HTMLButtonElement;
const buttonYellow = document.querySelector('#yellow') as HTMLButtonElement;
const buttonBlue = document.querySelector('#blue') as HTMLButtonElement;
const titleLevel = document.querySelector('h1') as HTMLHeadingElement;
const startButton = document.querySelector(
  '.eightbit-btn'
) as HTMLButtonElement;

const buttonColours: string[] = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern: string[] = [];
let gamePattern: string[] = [];
let level = 0;
let started = false;

// random Color
const nextSequence = () => {
  level++;
  userClickedPattern = [];
  titleLevel.innerText = `Level ${level}`;

  const randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  const buttonSelected = document.getElementById(randomChosenColour)!;
  buttonSelected.classList.add('blink_me');
  setTimeout(() => {
    buttonSelected.classList.remove('blink_me');
  }, 300);

  playSound(randomChosenColour);

  window.removeEventListener('keypress', nextSequence);
};

const handleClick = (e: Event) => {
  const userChosenColour = (e.target as Element).id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
};

const playSound = (name: string) => {
  const audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
};

const animatePress = (currentColour: string) => {
  const buttonSelected = document.getElementById(currentColour)!;
  buttonSelected.classList.add('pressed');
  setTimeout(() => {
    buttonSelected.classList.remove('pressed');
  }, 100);
};

const checkAnswer = (currentLevel: number) => {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound('wrong');
    document.body.classList.add('game-over');
    setTimeout(() => {
      document.body.classList.remove('game-over');
    }, 200);

    titleLevel.innerText =
      'Fim de jogo, clique no butão ou pressione qualquer tecla para jogar novamente';

    startButton.style.display = 'block';
    startButton.innerText = 'novamente';
    startButton.classList.replace(
      'eightbit-btn--proceed',
      'eightbit-btn--reset'
    );
    startOver();
  }
};

buttonGreen.addEventListener('click', handleClick);
buttonRed.addEventListener('click', handleClick);
buttonYellow.addEventListener('click', handleClick);
buttonBlue.addEventListener('click', handleClick);

window.addEventListener('keypress', () => {
  if (!started) {
    nextSequence();
  }
  started = true;
  startButton.style.display = 'none';
});
startButton.addEventListener('click', () => {
  if (!started) {
    nextSequence();
  }
  started = true;
  startButton.style.display = 'none';
});

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
