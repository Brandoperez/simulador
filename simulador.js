
let listado_usuarios = [];

function nuevoUsuario(){
    let nombre = document.getElementById("txtNombre");
    let apellido = document.getElementById("txtApellido");
    let edad = document.getElementById("txtEdad");

    let usuario = {nombre:nombre.value, apellido:apellido.value, edad:edad.value}
        

        listado_usuarios.push(usuario)

        let usuario_json = JSON.stringify(listado_usuarios);
        localStorage.setItem("listado_usuarios", usuario_json);
}

let btn_registarse = document.getElementById("btn_registarse");
btn_registarse.addEventListener("click", nuevoUsuario);
btn_registarse.addEventListener("click", validarUsuario);


function validarUsuario(){
    let arrUsuario = localStorage.getItem("listado_usuarios");
    arrUsuario = JSON.parse(arrUsuario);

    let nombre = document.getElementById("txtNombre").value;
    let apellido = document.getElementById("txtApellido").value;
    let edad = document.getElementById("txtEdad").value;


    let msg = document.getElementById("mensaje")

        if(nombre != "" && apellido != "" && edad >= 18 & edad != ""){
            let mensaje = document.createElement("div");
            Toastify({
                text: "Registro Exitoso",
                duration: 2000,
                gravity: "bottom",
                position: "right",
                style: {
                  background: "#0d6efd",
                  color: "#ffffff",
                }
              }).showToast();

                msg.append(mensaje);

        }else{
            let mensaje = document.createElement("div");
            Toastify({
                text: "Debes ser mayor de edad para Continuar.",
                duration: 2000,
                gravity: "bottom",
                position: "right",
                style: {
                  background: "#de1b02",
                  color: "#ffffff",
                }
              }).showToast();

                msg.append(mensaje);

        }
}
	
$(document).ready(function() {
  $('#btn_registarse').click(function() {
      $('input[type="text"').val('');
  });
});


function calcularPrestamo(monto, cuotas){
    if(cuotas == 3){
        let interes = monto * 0.10;
        return interes;
    }
    else if(cuotas == 6){
        let interes = monto * 0.20;
        return interes;
    }
    else if(cuotas == 9){
        let interes = monto * 0.45;
        return interes;
    }
    else if(cuotas == 12){
        let interes = monto * 0.70;
        return interes;
    }

}

let consulta = [];
function consultarPrestamo(e){
    let monto = parseInt(document.getElementById("txtCantidad").value);
    let cuotas = parseInt(document.getElementById("selCuotas").value);
    let total = monto + calcularPrestamo(monto, cuotas);
    let pago_total = total * cuotas;

    let resultadoConsulta = {
        monto: monto,
        cuotas: cuotas,
        total: total,
        pago_total: pago_total
    };

    let msj_consultar = document.getElementById("msj-consultar");
    if(monto != "" && cuotas != ""){
        let mensaje = document.createElement("div");
            mensaje.innerHTML = ""
            Toastify({
                text: "Consulta Exitosa",
                duration: 2000,
                gravity: "bottom",
                position: "right",
                style: {
                  background: "#0d6efd",
                  color: "#ffffff",
                }
              }).showToast();

            msj_consultar.append(mensaje);

    }else{
        let mensaje = document.createElement("div");
            mensaje.innerHTML = ""
            Toastify({
                text: "Debe ingresar datos para Continuar.",
                duration: 2000,
                gravity: "bottom",
                position: "right",
                style: {
                  background: "#de1b02",
                  color: "#ffffff",
                }
              }).showToast();

            msj_consultar.append(mensaje);

    }

    consulta.push(resultadoConsulta);
    mostrarConsulta();
}


function mostrarConsulta(){
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = ""
    for(resultadoConsulta of consulta){
        let fila = document.createElement("tr");
        fila.innerHTML = `
                          <td>${listado_usuarios[0].nombre}</td>
                          <td>${listado_usuarios[0].apellido}</td>
                          <td>${listado_usuarios[0].edad}</td>
                          <td>${resultadoConsulta.monto}</td>
                          <td>${resultadoConsulta.cuotas}</td>
                          <td>${resultadoConsulta.total}</td>
                          <td>${resultadoConsulta.pago_total}</td>
                          <a href="#" class="btn btn-prestamo">¡Lo quiero!</a>
                          <a href="index.html" class="btn btn-prestamo">Nueva Consulta</a>
                          <p>También podés llevar tu prestamo en dólares.</p>`;
                          
                          tabla.append(fila);
        }


}

    


let btn_consultar = document.getElementById("btn_consultar");
btn_consultar.addEventListener("click", consultarPrestamo);

$(document).ready(function() {
  $('#btn_consultar').click(function() {
      $('input[type="text"').val('');
  });
});


fetch("https://api.bluelytics.com.ar/v2/latest")
.then(response => response.json())
  .then(data => {

    let dolar_oficial = document.getElementById("dolar-oficial");
    let contenido_dolar = document.createElement("ul");
        contenido_dolar.innerHTML = `<li class="dolar-li">Compra:<span>$${data.oficial.value_buy}</span></li>
                                     <li class="dolar-li">Venta:<span>$${data.oficial.value_sell}</span></li>`;

                    dolar_oficial.append(contenido_dolar);
    
    let dolar_blue = document.getElementById("dolar-blue");
    let contenido_dolar_blue = document.createElement("ul");
        contenido_dolar_blue.innerHTML = `<li class="dolar-li">Compra:<span>$${data.blue.value_buy}</span></li>
                                     <li class="dolar-li">Venta:<span>$${data.blue.value_sell}</span></li>`;
                
                    dolar_blue.append(contenido_dolar_blue);
  })


/*fetch("https://api.estadisticasbcra.com/usd_of", {
  headers: {
    Authorization: "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTAyOTA5OTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJicmFuZG9wZXJlemluY2lhcnRlQGdtYWlsLmNvbSJ9.9R70IY5_8MosO4_3HqdLzCOCrgfPH2ryJBJJu6qKpyWQn8PN3xYnPFqCZmBPpxECvXE69veM9NOEcH5uKag5PA"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))

*/