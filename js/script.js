const canvas=document.getElementById('canvas');
canvas.style.marginLeft=30+'%';
canvas.style.marginTop=4+'%'
canvas.width= 640;
const anchoPos=32;
const altoPos=32;
canvas.height= 320
const ctx=canvas.getContext('2d');
const titleMap=document.createElement('IMG');
titleMap.src='./assets/img/tilemap.png'
let posAvatar;

class Personaje {
  constructor(alto, ancho, x, y) {
    this.alto = 32;
    this.ancho = 32;
    this.x = 0;
    this.y = 0;
  }
  
  dibujar(){
    ctx.clearRect(this.x * anchoPos, this.y * altoPos, this.ancho, this.alto);
    ctx.drawImage(
      titleMap,
      32,
      32,
      this.ancho,
      this.alto,
      this.x*anchoPos,
      this.y*altoPos,
      32,
      32          
    )
  }
  mover(x,y) {
    this.x = x;
    this.y = y;
  }
}
let personaje=new Personaje();
class Monstruo {
  constructor(alto, ancho, x, y) {
    this.alto = 32;
    this.ancho = 32;
    this.x = 8;
    this.y = 4;
  }
  
  dibujar(){
    ctx.clearRect(this.x * anchoPos, this.y * altoPos, this.ancho, this.alto);
    ctx.drawImage(
      titleMap,
      0,
      32,
      this.ancho,
      this.alto,
      this.x*anchoPos,
      this.y*altoPos,
      32,
      32          
    )
  }
    mover(x,y) {
    this.x = x;
    this.y = y;
    }
}
let monstruo=new Monstruo();

const moverMonstruo=()=>{
  let random=Math.floor(Math.random()*4)+1;
  let x = monstruo.x ; 
  let y = monstruo.y ; 
  switch (random) {
    case 1:
      casillaValida(x, y - 1,monstruo);
    break;
    case 2:
      casillaValida(x, y + 1,monstruo);
    break;
    case 3:
      casillaValida(x - 1, y,monstruo);
    break;
    case 4:
      casillaValida(x + 1, y,monstruo);
    break;
    default:
      break;
  }
  
}
let tableroMapa=[
  [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,1,1,0,1,1,0,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,0,0,1,0,0,0,0,0,0,1,1,0,0,1],
  [1,1,0,0,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1],
  [1,0,0,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,1],
  [1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
  [1,0,0,0,1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,0],
  [1,3,0,0,0,0,0,0,0,2,0,0,0,0,1,0,1,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1]
]
const generarMapa=()=>{
  for (let i = 0; i < tableroMapa.length; i++) {
    for (let j = 0; j < tableroMapa[i].length; j++) {
      if(tableroMapa[i][j]== 0){
        ctx.drawImage(
          titleMap,
          64,
          0,
          32,
          32,
          j*anchoPos,
          i*altoPos,
          32,
          32          
        )
      }
      if(tableroMapa[i][j]== 1){
        ctx.drawImage(
          titleMap,
          0,
          0,
          32,
          32,
          j*anchoPos,
          i*altoPos,
          32,
          32          
        )
      }
      if(tableroMapa[i][j]== 2){
        ctx.drawImage(
          titleMap,
          32,
          0,
          32,
          32,
          j*anchoPos,
          i*altoPos,
          32,
          32          
        )
      }
      if(tableroMapa[i][j]== 3){
        ctx.drawImage(
          titleMap,
          96,
          0,
          32,
          32,
          j*anchoPos,
          i*altoPos,
          32,
          32          
        )
      }
            
    }
    
  }
  
}

let llave=false;
const comprobarSalida=()=>{
  if(llave==true){
    personaje.x=0
    personaje.y=0
    tableroMapa[8][1]=3;
    llave=false
  }

}
const casillaValida = (x, y,clase) => {
  if(clase ==monstruo){
    if (tableroMapa[y] && tableroMapa[y][x] != null) {
      if (tableroMapa[y][x] != 1) {
          monstruo.mover(x, y);
      }
    }
  }else{
    if (tableroMapa[y] && tableroMapa[y][x] != null) {
      if (tableroMapa[y][x] == 0) {
          personaje.mover(x, y);
      }
      if (tableroMapa[y][x] == 3) {
        tableroMapa[8][1]=0;
        llave=true
        personaje.mover(x, y);
      }
      if (tableroMapa[y][x] == 2) {
        comprobarSalida();
      }
    }
  } 
};

const comprobarColisiones = (e) => {
  let tecla = e.key;
  let arr=[]
  let x = personaje.x ; 
  let y = personaje.y ;     
  switch (tecla) {
    case 'ArrowUp':
      casillaValida(x, y - 1);
      break;
    case 'ArrowDown':
      casillaValida(x, y + 1);
      break;
    case 'ArrowLeft':
      casillaValida(x - 1, y);
      break;
    case 'ArrowRight':
      casillaValida(x + 1, y);
      break;
    default:
      break;
  }
};




const update=()=>{
    generarMapa()
    personaje.dibujar()
    monstruo.dibujar()
    
}
const moverEnemigos=()=>{
 
  moverMonstruo();
}

const inicializar=()=>{
  setInterval(update,100)
  requestAnimationFrame(update);
  setInterval(moverEnemigos,1000)
}
document.addEventListener('DOMContentLoaded',inicializar)
document.addEventListener('keydown',comprobarColisiones)
requestAnimationFrame(update)