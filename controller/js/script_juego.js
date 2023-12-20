/*
  Autor: Jesus Diego Rivero
  Fecha:20/12/2023
  Modulo: Desarrollo web entorno cliente
  Unidad Didactica: 03
  script del juego Makergame
*/
// Tablero
var contenedor = document.getElementById("contenedor");

// MOVIMIENTO FIGURAS

// inicio arrastre
contenedor.addEventListener("dragstart", (e) => {
    for (let i = 1; i <= contenedor.children.length + 1; i++){
        if (e.target.id=="figura" + i) {
            e.dataTransfer.setData("idfigura", e.target.id);
        };
    }
});
contenedor.addEventListener("dragover", (e) => {
    e.preventDefault();
});
// soltar figura
contenedor.addEventListener("drop", (e) => soltar(e));

function soltar (e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("idfigura");
    var figuraindiv=document.getElementById(data);
    var mousePos = oMousePos(contenedor, e);
    // determino posicion relativa al tablero
    function oMousePos(element, e) {
        var ClientRect = element.getBoundingClientRect();
        return { 
            x: Math.round(e.clientX - ClientRect.left),
            y: Math.round(e.clientY - ClientRect.top)
        }
    }
    // limito  movimiento de las figuras al interior del tablero de dibujo
    function moveAt(a, b) {
        // limito movimento en horizontal
        if ((figuraindiv.offsetWidth/2) > a) {
            figuraindiv.style.left = "0px";
            } else if (a > (contenedor.offsetWidth - figuraindiv.offsetWidth/2)) {
                figuraindiv.style.right  = 0 + "px";
            } else {
                figuraindiv.style.left = a - figuraindiv.offsetWidth/2 + "px";
            }
        // limito movimento en vertical
        if ((figuraindiv.offsetHeight/2) > b) {
            figuraindiv.style.top =  0 + "px";
            } else if (b < (contenedor.offsetHeight - figuraindiv.offsetHeight/2)) {
                figuraindiv.style.top = b  - figuraindiv.offsetHeight/2 + "px";
            } else {
                figuraindiv.style.bottom  = 0 - (figuraindiv.offsetHeight/2) + "px";
            };
    };
    // estblezco zona donde si la figura es movida se elimina (papelera)
    if ((mousePos.x > 0 && mousePos.x < 100) && (mousePos.y > 0 && mousePos.y < 100)) {
        figuraindiv.remove();
    // en caso de moverse a otra zona establezco donde se suelta
    } else {
        moveAt(mousePos.x, mousePos.y);
    }
    
};

// GENERACION DE FIGURAS

// se selecciona el elemento que activará el evento
var botones = document.querySelectorAll(".boton");
//se genera un elemento div (una figura) dentro del contenedor
const cuandoClikas = function() {
    //creo el elemento
    let fig = document.createElement("div");
    // se establece el tipo de figura a crear
    fig.className="figuras " + this.value;
    // será arrastable
    fig.draggable="true";
    // se le asigna un identificador único
    fig.id="figura" + (contenedor.children.length + 1);
    // se añade al contenedor
    contenedor.appendChild(fig);
}
// se ejecuta para cada boton
botones.forEach(boton => {
    boton.addEventListener("click", cuandoClikas);});

// COLORES

// variable de activación del color
var activarColor = false;
var botones_color = document.querySelectorAll(".boton_color");
var activar = document.getElementById("activacion");
var rueda = document.getElementById("color");
// funcionamiento de recuadro que inidca activación de color
const cuandoPulsas = function(e) {
    if (activarColor==false) {
        activarColor=true;
        color = this.value;
        activar.style.backgroundColor=color;
        activar.textContent="Color Activado";
    } else {
        //opción de cambiar de color cuando el color esta activado mediante un click
        if (activarColor==true) {
            color = this.value;
            activar.style.backgroundColor=color;
            activar.textContent="Color Activado";
            botones_color.forEach(botones => {
                botones.addEventListener("dblclick", function(){
                    activarColor=false;
                    activar.textContent="Color Desactivado";
                    activar.style.backgroundColor="white";
                })
            })
        } else {
            activarColor=false;
            activar.textContent="Color desactivado";
            activar.style.backgroundColor="white";
        };
    }
}
// se establece para todos los botones el evento de activación/desactivacion
botones_color.forEach(boton => {
    boton.addEventListener("click", cuandoPulsas);
});
// Evento de colorear pasando el ratón por encima de las figuras.
// El evento se establece para el contenedor para que por derivación se aplique en las figuras ya que si no 
// las nuevas figuras que se fueran creando no reponderían al evento
contenedor.addEventListener("mouseover", (e) => {
    for (let i = 1; i <= contenedor.children.length + 1; i++){
        if ((e.target.id == "figura" + i) && activarColor && e.target.className != "figuras triangulo") {
            e.target.style.backgroundColor = color;
        } else if ((e.target.id == "figura" + i) && activarColor && e.target.className == "figuras triangulo") {
            e.target.style.borderBottomColor = color;
        };
    }
});

// UTILES

// variable de activación/desactivación de la barra de Utiles
var activar_herramientas=false;
// util activado
var herramientaOn;
var botones_herramientas = document.querySelectorAll(".herramientas");
var utilesOn=document.getElementById("activacion_herramientas");
// funcionamiento de recuadro de activación/desactivación
const utiles = function(e) {

    if (activar_herramientas==false){
        activar_herramientas=true;
        herramientaOn = this.value;
        utilesOn.style.backgroundColor="green";
        utilesOn.textContent=herramientaOn;
    } else {
        activar_herramientas=false;
        utilesOn.style.backgroundColor="red";
        utilesOn.textContent="OFF";
    }
}

botones_herramientas.forEach(boton1 => {
    boton1.addEventListener("click", utiles);
});

var contador=0;
var numCapa = document.querySelector("#numeroCapa");
// eventos con raton. Se aplican por derivación a las figuras del interior del contenedor
contenedor.addEventListener("wheel", (e) => {
    for (let i = 1; i <= contenedor.children.length + 1; i++){    
        // rotacion   
        if ((e.target.id == "figura" + i)  && activar_herramientas && herramientaOn=="rotacion") {
            e.target.style.transform += "rotate(45deg)";
        // ampliacion
        } else if ((e.target.id == "figura" + i)  && activar_herramientas && herramientaOn=="ampliacion") {
            e.target.style.transform += "scale(1.05)";
        // reduccion
        } else if ((e.target.id == "figura" + i)  && activar_herramientas && herramientaOn=="reduccion") {
            e.target.style.transform += "scale(0.95)";
        // aumento numero capa
        } else if ((e.target.id == "figura" + i)  && activar_herramientas && herramientaOn=="capaUp") {
            if (contador > 4) {
                contador = 5;
            } else {
                contador++;
            }
            e.target.style.zIndex=contador;
            numCapa.textContent="Capa Nº: " + contador;
        // reduccion numero capa
        } else if ((e.target.id == "figura" + i)  && activar_herramientas && herramientaOn=="capaDown") {
            
            if (contador < 2) {
                contador = 1;
            } else {
                contador--;
            }
            e.target.style.zIndex=contador;
            numCapa.textContent="Capa Nº: " + contador;
        } 
    }  
});
// Información numero capa de figura
contenedor.addEventListener("dblclick", (e) => {
    for (let i = 1; i <= contenedor.children.length + 1; i++){
        if ((e.target.id == "figura" + i)  && activar_herramientas) {
            if (e.target.style.zIndex!=""){
                alert("Orden de capa: " + e.target.style.zIndex);
            } else {
                alert("No se ha establecido el orden de esta figura.\n" +
                "Si quiere que coincida con el nº de capa establecdido actualmente\n" +
                "acepte y vuelva a clickar en la figura. Si no hay un nº capa\n" +
                "establecido se le asignará 0)");
                e.target.addEventListener('click', () =>{
                    e.target.style.zIndex=contador;
                })
            }
        }
    }
});

// Resetear tablero dibujo
var reseteo = document.getElementById("reseteo");
reseteo.addEventListener("click", () => {
    var figuras = document.querySelectorAll(".figuras");
    for (let i = 0; i <figuras.length; i++) {
        figuras[i].remove();
        }
});
//cambiar color fondo tablero dibujo
var fondo_contenedor = false;
var fondo = document.getElementById("fondo");
fondo.addEventListener("click", () =>{
    if (fondo_contenedor == false) {
        fondo_contenedor = true;
        fondo.textContent="fondo ON";
    } else {
        fondo_contenedor = false;
        fondo.textContent="fondo OFF";
    }
});
contenedor.addEventListener("click", () => {
    if (fondo_contenedor && activarColor) {
        contenedor.style.backgroundColor=color;
    } 
});

