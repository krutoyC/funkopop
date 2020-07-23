import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../css/style.css';
import Funko from './funko.js';
import $ from 'jquery';

//inicializo variables
let listaProductos = [];
leerProductos();
let productoExistente= false; // cuando producto existente sea = false quiero agregar un producto y cuando sea =true quiero modificar un producto

window.agregarProducto = function () {
	
	console.log('desde funcion agregar producto');
	//tomar los valores de los input
	let codigo = document.getElementById('codigo').value;
	let nombre = document.getElementById('nombre').value;
	let numSerie = document.getElementById('numSerie').value;
	let categoria = document.getElementById('categoria').value;
	let descripcion = document.getElementById('descripcion').value;
	let imagen = document.getElementById('imagen').value;

	//validar datos
   
	//crear un objeto
	let productoNuevo = new Funko(codigo, nombre, numSerie, categoria, descripcion, imagen);
	console.log(productoNuevo);
	//agregar objeto al arreglo
	listaProductos.push(productoNuevo);
	//guarda arreglo en localstorage
	localStorage.setItem('funkoKey', JSON.stringify(listaProductos));
	//mostrar el arreglo
	leerProductos();
	limpiarFormulario();
};
	
	function leerProductos() {
		//pregunto si el localstorage tiene datos
		if (localStorage.length > 0) {
			let arregloLCS = JSON.parse(localStorage.getItem('funkoKey'));
			if(listaProductos.length==0){
				listaProductos=arregloLCS;
			}	
			
			//borrar filas de la tabla
			borrarFilasDeLaTabla();
			
			//dibujar filas de la tabla
			dibujarFilas(arregloLCS);
			
		}
		
};

function borrarFilasDeLaTabla() {
	let tablatbody = document.getElementById(`tablaProdructo`);
	if (tablatbody.children.length > 0) {
		while (tablatbody.firstChild) {
			tablatbody.removeChild(tablatbody.firstChild)
		}
	}
}




function dibujarFilas(arregloLCS) {
	let tablapadre = document.getElementById("tablaProdructo");
	for (let i in arregloLCS) {
		let codHTML = ` <tr class="shadow-none p-3 mb-5 bg-secondary rounded text-light">
	<th scope="row">${arregloLCS[i].codigo}</th>
	<td>${arregloLCS[i].nombre}</td>
	<td>${arregloLCS[i].numSerie}</td>
	<td>${arregloLCS[i].categoria}</td>
	<td>${arregloLCS[i].descripcion}</td>
	<td>${arregloLCS[i].imagen}</td>
	<td>
		<button class="btn btn-danger" onclick="eliminarProducto(${arregloLCS[i].codigo})">Eliminar</button>
		<button class="btn btn-primary" onclick="prepararProducto(${arregloLCS[i].codigo})">Modificar</button>
	</td>
</tr>`;
		tablapadre.innerHTML += codHTML;
	}
}

function limpiarFormulario(){
	let formulario= document.getElementById("formularioPadreNodo");
	formulario.reset();
	productoExistente = flase;

}
window.eliminarProducto= function(codigo){
	console.log(codigo);
	//buscar el funkopop el codigo que recibi por parametro y borrarlo
//podes hacer un for pero Emi muestra otra forma
let arregloFiltrado = listaProductos.filter(function(producto){
	return producto.codigo != codigo;       
})
   //actualizar el locaestorage
console.log(arregloFiltrado);
localStorage.setItem("funkoKey",JSON.stringify(arregloFiltrado))
listaProductos= arregloFiltrado;
   //volver a dibujar tabla
leerProductos();


}

window.validarCampos=function(input){
	let campo=input.value
	if(campo.length>0){
		input.className="form-control is-valid"
	}else{input.className="form-control is-invalid"}
}



window.prepararProducto=function(codigo){
	console.log(codigo);
	//buscar el objeto en el arreglo
	//for (let i in arreglo){
		// if{(aarregloo[i].codigo==codigo)
	// }
	// }

let objetoDevueltoPorFind = listaProductos.find(function(elementoDentroDelArreglo){
	return elementoDentroDelArreglo.codigo == codigo;
	productoExistente= true;
})
console.log(objetoDevueltoPorFind);



//en el formulario, en cada input mostrar la propiedad del objeto encontrado
document.getElementById("codigo").value= objetoDevueltoPorFind.codigo;
document.getElementById("nombre").value= objetoDevueltoPorFind.codigo;
document.getElementById("numSerie").value= objetoDevueltoPorFind.codigo;
document.getElementById("categoria").value= objetoDevueltoPorFind.codigo;
document.getElementById("descripcion").value= objetoDevueltoPorFind.codigo;
document.getElementById("imagen").value= objetoDevueltoPorFind.codigo;
//mostrar ventana modal
let ventanaModal = document.getElementById("exampleModal");
$(ventanaModal).modal("show");
}


window.decidision=function(){
	event.preventDefault();
	if(productoExistente==false){
		agregarProducto();
	}else{
		modificarProducto();
	}

}

function modificarProducto(){
	console.log("modificarProducto");
limpiarFormulario();
}