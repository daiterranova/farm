//<<Stage 1>>

//<< Creation of canvas >>
var myFarm = document.getElementById("my_farm"); // getting from the html file the element with the id my_farm
var ctx = myFarm.getContext("2d"); // creating a canvas context in two dimensions;

//<<Creating objects>>
//field
var field = {
  url: "/images/tile.webp",
  chargeOk: false,
};
//cow
var cow = {
  url: "/images/vaca.webp",
  chargeOk: false,
  x: 0,
  y: 0,
};
//chicken
var chicken = {
  url: "/images/chicken.webp",
  chargeOk: false,
  x: [],
  y: [],
};
//pig
var pig = {
  url: "/images/cerdo.webp",
  chargeOk: false,
  x: [],
  y: [],
};
//an object that has the keyCode values of the keyboard arrows
const keyboards = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
};

//<< adding properties to the objects>>

field.image = new Image();
field.image.src = field.url;
field.image.addEventListener("load", chargefield);

cow.image = new Image();
cow.image.src = cow.url;
cow.image.addEventListener("load", chargeCows);
cow.audio = new Audio("cow_mooing.mp3");
cow.audio.preload = "auto";

chicken.image = new Image();
chicken.image.src = chicken.url;
chicken.image.addEventListener("load", chargeChickens);

pig.image = new Image();
pig.image.src = pig.url;
pig.image.addEventListener("load", chargePigs);

//creates a random number between a minimun an a maximum value
function randomNumber(min, max) {
  var result = Math.floor(Math.random() * max - min + 1) + min;
  return result;
}
var quantity = randomNumber(1, 3);
document.addEventListener("keyup", movingAnimal);

//<<STAGE 2>>

//drawing the farm
function chargefield() {
  field.chargeOk = true;
  drawing();
}

function chargeCows() {
  cow.chargeOk = true;
  drawing();
}

function chargePigs() {
  pig.chargeOk = true;
  drawing();
}

function chargeChickens() {
  chicken.chargeOk = true;
  drawing();
}

function drawing() {
  if (field.chargeOk) {
    ctx.drawImage(field.image, 0, 0);
  }
  if (cow.chargeOk) {
    {
      var x = randomNumber(0, 7) * 60;
      var y = randomNumber(0, 7) * 60;
      cow.x = x;
      cow.y = y;
      ctx.drawImage(cow.image, x, y);
    }
  }
  if (pig.chargeOk) {
    for (var p = 0; p < quantity; p++) {
      var x = randomNumber(0, 7) * 60;
      var y = randomNumber(0, 7) * 60;
      pig.x[p] = x;
      pig.y[p] = y;
      ctx.drawImage(pig.image, x, y);
    }
  }
  if (chicken.chargeOk) {
    for (var c = 0; c < quantity; c++) {
      var x = randomNumber(0, 7) * 60;
      var y = randomNumber(0, 7) * 60;
      chicken.x[c] = x;
      chicken.y[c] = y;
      ctx.drawImage(chicken.image, x, y);
    }
  }
  console.log("dibuje");
}
function reDrawing() {
  if (field.chargeOk) {
    ctx.drawImage(field.image, 0, 0);
  }
  if (pig.chargeOk) {
    for (var v = 0; v < quantity; v++) {
      ctx.drawImage(pig.image, pig.x[v], pig.y[v]);
    }
  }
  if (chicken.chargeOk) {
    for (var c = 0; c < quantity; c++) {
      ctx.drawImage(chicken.image, chicken.x[c], chicken.y[c]);
    }
  }
}

function movingCow(x, y) {
  ctx.drawImage(cow.image, x, y);
  cow.audio.play();
}

function movingAnimal(event) {
  let movement = 5;
  reDrawing();
  movingCow(cow.x, cow.y);
  switch (event.keyCode) {
    case keyboards.down:
      cow.y = cow.y + movement;
      break;
    case keyboards.up:
      cow.y -= movement;
      break;
    case keyboards.left:
      cow.x -= movement;
      break;
    case keyboards.right:
      cow.x += movement;
      break;
    default:
  }
}
