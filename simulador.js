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

        if(nombre != "" && apellido != "" && edad >= 18){
            let mensaje = document.createElement("div");
                mensaje.innerHTML = `<p class="alert alert-success">Registro exitoso</p>`;

                msg.append(mensaje);

        }else{
            let mensaje = document.createElement("div");
                mensaje.innerHTML = `<p class="alert alert-danger">Debes ser mayor de edad para continuar</p>`;

                msg.append(mensaje);

        }
}


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
    let pago_total = total + cuotas;

    let resultadoConsulta = {
        monto: monto,
        cuotas: cuotas,
        total: total,
        pago_total: pago_total
    };

    let msj_consultar = document.getElementById("msj-consultar");
    if(monto != "" && cuotas != ""){
        let mensaje = document.createElement("div");
            mensaje.innerHTML = `<p class="alert alert-success">Consulta exitosa</p>`;

            msj_consultar.append(mensaje);

    }else{
        let mensaje = document.createElement("div");
            mensaje.innerHTML = `<p class="alert alert-danger">Debes ingresar datos para continuar</p>`;

            msj_consultar.append(mensaje);

    }

    consulta.push(resultadoConsulta);
    mostrarConsulta();
}


function mostrarConsulta(){
    let tabla = document.getElementById("tabla");

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
                          <a href="#" class="btn btn-primary btn-prestamo" id="btn_consultar">¡Lo quiero!</a>`;
                          
                          tabla.append(fila);
        }
    console.log(listado_usuarios[apellido]);


}

    


let btn_consultar = document.getElementById("btn_consultar");
btn_consultar.addEventListener("click", consultarPrestamo);


let msj_consultar = document.getElementById("msj-consultar");
        if(monto != "" && cuotas != ""){
            let mensaje = document.createElement("div");
                mensaje.innerHTML = `<p class="alert alert-success">Consulta exitosa</p>`;

                msg.append(mensaje);

        }else{
            let mensaje = document.createElement("div");
                mensaje.innerHTML = `<p class="alert alert-danger">Debes ingresar datos para continuar</p>`;

                msg.append(mensaje);

        }


