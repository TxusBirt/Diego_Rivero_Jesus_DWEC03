'use strict'

// ---------funciones..............
function cargarusuariosJSON () {
    let path = '../model/usuarios.json'
  
    let request = new Request(path, {
      headers: new Headers({
        'Content-Type': 'text/json'
      }),
      method: 'GET'
    })
  
    fetch(request).then(response => {
      response.text().then(data => {
        console.log(data);
        localStorage.setItem("datos", data);
      })
    })
  }
function limpiarFormulario(elemento1, elemento2) {
  elemento1.val("");
  elemento2.val("");
};
function borrar_entrada(elemento) {
  if(elemento) {
    elemento.remove();
  }
};
//Cargo los datos en el localstorage
cargarusuariosJSON();

$(document).ready(function(){
    // Recupero datos del locasSorage y lo parseo a objeto
    var usuariosObjeto = JSON.parse(localStorage.getItem("datos"));
    
    // variable globales
    // booleano que indica si se puede acceder al juego
    var permitePaso = false;
    // string que envia el mensaje de los caracteres especiales introducidos
    var simb="Caracteres no validos: ";
    // Evento al pulsar boton enviar
    $("#boton_enviar").click(function(){
        // contraseña introducida
        let password = $("#contrasena").val();
        // usuario introducido
        let usuario = $("#usuario").val();
        // expresion regular que sólo permite strings con letras y numeros
        let regexExp = /^[A-Za-z0-9]+$/;
        // expresion regular con todos los caracteres especiales
        let regexSimbolos =/[-\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{]+/;
        // validación formato de contraseña
        if(regexExp.test(password)){
            // comprobación si usuario y contraseña coinciden con los guardados en el localstorage 
            for (let i = 0; i < usuariosObjeto.length; i++) {
                if ((password == usuariosObjeto[i].contraseña) && (usuario == usuariosObjeto[i].usuario)) {
                    // si coinicde se permite acceso
                    permitePaso=true      
            } 
        }
        // opciones
        // se permite acceso
        if (permitePaso) {
            $(location).attr('href','../../view/juego.html');
        //No se permite acceso
        } else {
            borrar_entrada($("#no_entra"));
            $("#boton_enviar").after("<div id='no_entra'>El usuario no está registrado</div>");
            $("#no_entra").css({"backgroundColor":"red"});
            $("#no_entra").css({"font-size":"3em"})
            
            limpiarFormulario($("#contrasena"), $("#usuario"));
        }
       // si no pasa validacion de formato
       } else {
            borrar_entrada($("#no_entra"));
            // array con todos los caracteres especiales introducidos
            let simbolos=(password.match(regexSimbolos));
            // opciones si hay carcateres especiales o si no los hay
            if (simbolos) {
                for (let i = 0; i < simbolos.length; i++) {
                  simb += simbolos[i];
    
                }
                alert(simb);
                limpiarFormulario($("#contrasena"), $("#usuario"));
            } else {
                alert("Introduzca una contraseña valida");
                limpiarFormulario($("#contrasena"), $("#usuario"));
            }
       }
    });
  });



