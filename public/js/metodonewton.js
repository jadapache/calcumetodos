function Newton() {
	var tabla = document.getElementById("tabla");		// Se define la tabla donde serán cargados los valores
	eliminarFilasTabla(tabla);
	var _funcion = $('#funcion').val();				// Se recogen los datos del html
	var xactual = $('#valor_xl').val();
    var ncifras = $('#cifras').val();

	function parse(_function, x) {
		var parser = math.parser();
		parser.eval('f(x) = '.concat(_function));
		parser.set('x', x);
		parser.set('e',Math.E);
		return parser.eval(_function);
	}

	function derivada(valor) {
		const parsear = math.parse(_funcion);
		let scope = {
			x: valor,
			e: Math.E
		}
		derv.innerHTML = math.derivative(parsear,'x').toString();
		return math.derivative(parsear,'x').eval(scope);
	}
    // Se definen las variables a usar en el método
	var iteraccion = 0;
	var f_xa, d_xa;
	var orig_xl = xactual;
	var precision = parseInt(8);
	xactual = parseFloat(xactual);
    var es = (0.5 * Math.pow(10, -ncifras) * 100);
	var ea = 100;
	while(ea > es && iteraccion < 1000) {
		var xa=xactual;
		f_xa = parse(_funcion, xactual);	// f_xl = f(xl).
		d_xa = derivada(xactual);
		if (d_xa == 0){
			alert("La derivida es igual a cero");
			break;
		}else if (d_xa != 0) {
				xactual = xactual - (f_xa / d_xa);
				ea = obtener_ea(xa, xactual);
				iteraccion++;
				nuevaTabla(tabla, iteraccion, xa, xactual, f_xa, d_xa, ea, precision);	// Se crean e insertan datos en la tabla.
		}else{
			alert("Se superó el limite de iteracciones");
			break;
		}

	}
	//se imprime el output
	$("#output").show();
	final(orig_xl, parse(_funcion, orig_xl));	// Se dibuja la grafíca final
	return false;
}


// Se crea e insertan datos en la tabla
function nuevaTabla(tabla, iteraccion, xa, xactual, f_xa, d_xa, ea, precision) {
	var row = tabla.insertRow(-1);
	var cols = [];

	for(var i = 0; i < 6; i++) {
		cols[i] = row.insertCell(i);
	}

	cols[0].innerHTML = iteraccion;
	cols[1].innerHTML = xa.toPrecision(precision)*1;
	cols[2].innerHTML = xactual.toPrecision(precision)*1;
	cols[3].innerHTML = f_xa.toPrecision(precision)*1;
	cols[4].innerHTML = d_xa.toPrecision(precision)*1;
	cols[5].innerHTML = ea.toFixed(precision);
}

function eliminarFilasTabla(tabla) {
	while(tabla.rows.length > 1) {
		tabla.deleteRow(1);
	}	
}

function obtener_ea(xa, xactual) {
	return  Math.abs((xa - xactual) / xa) * 100;
}

