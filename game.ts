const buttonGreen = document.querySelector('#green') as HTMLButtonElement;
const buttonRed = document.querySelector('#red') as HTMLButtonElement;
const buttonYellow = document.querySelector('#yellow') as HTMLButtonElement;
const buttonBlue = document.querySelector('#blue') as HTMLButtonElement;
const titleLevel = document.querySelector('h1') as HTMLHeadingElement;

const buttonColours: string[] = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern: string[] = [];
const gamePattern: string[] = [];
let level = 0;
let started = false;

// random COlor

const nextSequence = () => {
  level++;

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

const checkAnswer = (userChosenColour: number) => {
  if (userClickedPattern[userChosenColour] == gamePattern[userChosenColour]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log('game over');
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
});

// const blink = () => {
//   const buttonSelected = document.getElementById(
//     `${buttonColours[randomChosenColour]}`
//   )!;
//   buttonSelected.classList.add('blink_me');
//   const audio = new Audio(`/sounds/${buttonColours[randomChosenColour]}.mp3`);
//   audio.play();
// };

// const handleClick = (e: Event) => {
//   const userChosenColour = (e.target as Element).id;
//   console.log(userChosenColour);
// };

// buttonGreen.addEventListener('click', handleClick);
// buttonRed.addEventListener('click', handleClick);
// buttonYellow.addEventListener('click', handleClick);
// buttonBlue.addEventListener('click', handleClick);
