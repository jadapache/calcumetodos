function puntoFijo() {
	var tabla = document.getElementById("tabla");		// Se define la tabla donde serán cargados los valores
	eliminarFilasTabla(tabla);
	var _funcion = $('#funcion').val();				// Se recogen los datos del html
	var vActual = $('#valor_xl').val();
	var ncifras = $('#cifras').val();


	// Se definen las variables a usar en el método
	var iteraccion = 1;
	var f_x;
	var orig_xi = vActual;
	var precision = parseInt(8);
	vActual = parseFloat(vActual);
	var vAnterior = 0;
	var es = (0.5 * Math.pow(10, -ncifras) * 100);
	var ea = 100;
	while(es < ea) {
		vAnterior=vActual;
		f_x = parse(_funcion, vActual);	// f_xl = f(xl).
		vActual=f_x;
		ea = obtener_ea(vActual, vAnterior);		// Funcion para el error aproximado porcentual.
		iteraccion++;
		nuevaTabla(tabla, iteraccion, vAnterior, vActual, ea, precision);	// Se crean e insertan datos en la tabla.
	}
	// Show outputs.
	$("#output").show();
	punto(orig_xi, parse(_funcion, f_x));	// Se dibuja la grafíca final
	return false;
}

function parse(_function, x) {
	var parser = math.parser();

	parser.eval('f(x) = '.concat(_function));
	parser.set('x', x);
	parser.set('e',Math.E);
	return parser.eval(_function);
}

function nuevaTabla(tabla, iteraccion, vAnterior, vActual, ea, precision) {
	var row = tabla.insertRow(-1);
	var cols = [];

	for(var i = 0; i < 4; i++) {
		cols[i] = row.insertCell(i);
	}

	cols[0].innerHTML = iteraccion;
	cols[1].innerHTML = vAnterior.toPrecision(precision)*1;
	cols[2].innerHTML = vActual.toPrecision(precision)*1;
	cols[3].innerHTML = ea.toFixed(precision);
}

function eliminarFilasTabla(tabla) {
	while(tabla.rows.length > 1) {
		tabla.deleteRow(1);
	}
}

function obtener_ea(vActual, vAnterior) {
	return  Math.abs((vActual - vAnterior) / vActual) * 100;
}

