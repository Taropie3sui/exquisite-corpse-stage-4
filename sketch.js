let currentState;
let storyDiv, choicesDiv, storyImage;
let garden, hapi, sad, bloom, music, dead;
let images = {};

const storyData = {
  start: {
    text: "You find yourself in a garden with a small plant! WHat could it be?",
    image: "hapi",
    choices: [
      { text: "Water the plant", nextState: "water" },
      { text: "Leave it alone", nextState: "leave" }
    ]
  },
  water: {
    text: "The plant looks happy! What do you want to do next?",
    image: "hapi",
    choices: [
      { text: "Give it fertilizer", nextState: "fertilizer" },
      { text: "Play music for it", nextState: "music" }
    ]
  },
  leave: {
    text: "The plant looks sad and starts to wither. What do you want to do next?",
    image: "sad",
    choices: [
      { text: "Water it", nextState: "water" },
      { text: "Leave it alone", nextState: "end_bad" }
    ]
  },
  fertilizer: {
    text: "The plant grows bigger and blooms beautifully! It's a tulip! Good job! :)",
    image: "bloom",
    choices: []
  },
  music: {
    text: "The plant turns out to be a tulip! It seems to enjoy the music very much! :D",
    image: "music",
    choices: []
  },
  end_bad: {
    text: "The plant died:( Maybe next time you'll take better care of it:)",
    image: "dead",
    choices: []
  }
};

function preload() {
  garden = loadImage("images/garden.png");
  
  hapi = loadImage("images/hapi.png");
  
  sad = loadImage("images/sad.png");
  
  bloom = loadImage("images/bloom.png");
  
  music = loadImage("images/music.png");
  
  dead = loadImage("images/dead.png");

  images['hapi'] = hapi;
  images['sad'] = sad;
  images['bloom'] = bloom;
  images['music'] = music;
  images['dead'] = dead;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  storyDiv = createDiv('').style('color', 'white').style('font-size', '20px').style('width', '60%').style('margin', 'auto').style('text-align', 'center').style('position', 'absolute').style('top', '70%').style('left', '50%').style('transform', 'translateX(-50%)');
  choicesDiv = createDiv('').style('width', '60%').style('margin', '20px auto').style('text-align', 'center').style('position', 'absolute').style('top', '80%').style('left', '50%').style('transform', 'translateX(-50%)');
  storyImage = createImg('').style('max-width', '30%').style('display', 'block').style('margin', '20px auto').style('position', 'absolute').style('top', '50%').style('left', '50%').style('transform', 'translate(-50%, -50%)');

  currentState = 'start';
  showState(currentState);
}

function showState(state) {
  const story = storyData[state];
  currentState = state; 
  storyDiv.html(story.text);
 
 
if (images[story.image]) {
 storyImage.attribute('src', images[story.image].src);
storyImage.style('display', 'block');
  
} else {
    storyImage.style('display', 'none');
  }

  choicesDiv.html('');
  story.choices.forEach(choice => {
    const button = createButton(choice.text);
    button.parent(choicesDiv);
    button.mousePressed(() => showState(choice.nextState));
  });
}

function draw() {
  background(120,200,10,1);
  let scaleFactor = min(windowWidth / garden.width, windowHeight / garden.height);
  let imgWidth = garden.width * scaleFactor;
  let imgHeight = garden.height * scaleFactor;
  let imgX = (windowWidth - imgWidth) / 2;
  let imgY = (windowHeight - imgHeight) / 2;

  image(garden, imgX, imgY, imgWidth, imgHeight);

  drawStoryImageAndText();
}

function drawStoryImageAndText() {
  const story = storyData[currentState];
  if (images[story.image]) {
    let scaleFactor = min(windowWidth / images[story.image].width, windowHeight / images[story.image].height);
    let imgWidth = images[story.image].width * scaleFactor;
    let imgHeight = images[story.image].height * scaleFactor;
    let imgX = (windowWidth - imgWidth) / 2;
    let imgY = (windowHeight - imgHeight) / 2;

    image(images[story.image], imgX, imgY, imgWidth, imgHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
