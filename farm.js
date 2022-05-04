
//<< definiendo el contexto canvas >>
var myFarm = document.getElementById('my_farm');// getting from the html file the element with the id my_farm
var ctx = myFarm.getContext('2d'); // creating a canvas context in two dimensions;
var quantity = randomNumber(1,3)
//console.log('soy el nro random' + quantity)
//<<creando los objetos>>

    //campo
var field = { //field of my farm
    url: 'tile.webp',
    chargeOk: false,
}

    //vaca
var cow ={
    url: 'vaca.webp',
    chargeOk: false,
    x:0,
    y:0
}

    //pollo
var chicken ={
    url: 'chicken.webp',
    chargeOk: false,
    x:[],
    y:[]
            }
    //chancho

var pig = {
    url: 'cerdo.webp',
    chargeOk: false,
    x: [],
    y:[]            
}


//<< agregando propiedades a los objetos>>

field.image = new Image();
field.image.src = field.url;
field.image.addEventListener('load',chargefield);


cow.image = new Image();
cow.image.src = cow.url;
cow.image.addEventListener('load',chargeCows);
cow.audio = new Audio('cow_mooing.mp3');
cow.audio.autoplay = true;

console.log(cow)
 
chicken.image = new Image();
chicken.image.src = chicken.url;
chicken.image.addEventListener('load',chargeChickens); 

pig.image = new Image();
pig.image.src = pig.url;
pig.image.addEventListener('load',chargePigs);

//<<creacion de funciones que seran llamadas en los eventos de carga en el canvas>>


function chargefield(){
    field.chargeOk = true;
    drawing();
}


function chargeCows(){
    cow.chargeOk = true;
    drawing();
}

function chargePigs(){
    pig.chargeOk = true;
    drawing();
}

function chargeChickens(){
    chicken.chargeOk = true;
    drawing();
}


function drawing(){
    if(field.chargeOk){
        ctx.drawImage(field.image,0,0);
    }
        if(cow.chargeOk){
            {
            var x = (randomNumber(0, 7)*60);
            //console.log('soy x' + x)
            var y = (randomNumber(0, 7)*60);
            //console.log('soy y' + y)
            cow.x = x;
            cow.y = y;  
            ctx.drawImage(cow.image, x, y);
           /*  //console.log('soy la coordenada x de cow'+cow.x)
            ////console.log('soy la coordenada y de cow' +cow.y) */
            }
        }
            if(pig.chargeOk){
                for(var p=0; p < quantity; p++)
            {
            var x = (randomNumber(0, 7)*60);
            var y = (randomNumber(0, 7)*60);
            pig.x[p] = x;
            pig.y[p] = y;  
            ctx.drawImage(pig.image, x, y);
            }
        }
            if(chicken.chargeOk){
                for(var c=0; c < quantity; c++)
            {
            var x = (randomNumber(0, 7)*60);
            var y = (randomNumber(0, 7)*60);
            chicken.x[c] = x;
            chicken.y[c] = y;  
            ctx.drawImage(chicken.image, x, y);
            }
        }

}

//<<moviendo a la vaca dentro del canvas>>



const keyboards = {
    up: 38,
    down:40,
    left:37,
    right: 39,
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

function movingCow(x,y){
    ctx.drawImage(cow.image,x,y);
   play();
}
document.addEventListener('keyup',movingAnimal);

function movingAnimal(event){
    //cuando alguien aprete flecha para arriba,abajo,derecha,izquierda,se mueva la vaca en esa direccion
    let movement = 5;
    switch(event.keyCode){
        case keyboards.down:
            reDrawing();  
            movingCow(cow.x,cow.y);
            cow.y= cow.y + movement;
         //console.log('soy y' + cow.y)
            break;
        case keyboards.up :
            reDrawing();  
            movingCow(cow.x,cow.y)
            cow.y -= movement;
        break;
        case keyboards.left :
            reDrawing();  
            movingCow(cow.x,cow.y)
            cow.x -= movement;
            break;
            case keyboards.right :
                reDrawing();  
                movingCow(cow.x,cow.y)
            cow.x += movement;
            break; 
        default: 
        console.log('other keyboard')
}
}

function randomNumber(min,max) { //creates a random number between a minimun an a maximum value
    var result = Math.floor(Math.random() * max - min + 1) + min;
    return result;
}    


function play() {
    var audio = new Audio('cow_mooing.mp3');
    audio.play();
  }