function Secante() {
	var tabla = document.getElementById("tabla");		// Se define la tabla donde serán cargados los valores
	eliminarFilasTabla(tabla);
	var _funcion = $('#funcion').val();				// Se recogen los datos del html
	var xanterior = $('#valor_xanterior').val();
	var xactual = $('#valor_xactual').val();
    var ncifras = $('#cifras').val();


    // Se definen las variables a usar en el método
	var iteraccion = 0;
	var f_xactual, f_xanterior, f_xnuevo;		// f_xl = f(xl), f_xu = f(xu), f_m = f(m)
	var orig_xanterior = xanterior;
	var orig_xactual = xactual;
	var xnuevo=xactual;
	var precision = parseInt(8);
	xanterior = parseFloat(xanterior);
	xactual = parseFloat(xactual);
    var es = (0.5 * Math.pow(10, -ncifras) * 100);
	var ea = 100;
	while(ea > es && iteraccion <=1000) {
		f_xactual = parse(_funcion, xactual);
		f_xanterior = parse(_funcion, xanterior);
		if (xanterior-xactual ==0){
			alert("¡La división es igual a cero!");
			break;
		}else if (xanterior-xactual !=0){
		xnuevo = xactual - (f_xactual *(xanterior - xactual)/(f_xanterior - f_xactual));
		f_xnuevo = parse(_funcion, xnuevo);
		xanterior=xactual;
		xactual=xnuevo;
		ea = obtener_ea(xnuevo, xanterior); //Funcion para el error aproximado porcentual.
		iteraccion++;
		nuevaTabla(tabla, iteraccion, xanterior, f_xanterior, xactual, f_xactual, xnuevo, f_xnuevo, ea, precision);	// Se crean e insertan datos en la tabla.
		} else{
			alert("¡Se superó el número de iteracciones permitidas!");
			break;
	}
	}

	// Show outputs.
	$("#output").show();
	final(orig_xanterior, parse(_funcion, orig_xanterior), orig_xactual, parse(_funcion, orig_xactual));	// Se dibuja la grafíca final
	return false;
}


function parse(_function, x) {
	var parser = math.parser();
	parser.eval('f(x) = '.concat(_function));
	parser.set('x', x);
	parser.set('e',Math.E);
	return parser.eval(_function);
}

// Create and insert values in new table row.
function nuevaTabla(tabla, iteraccion, xanterior, f_xanterior, xactual, f_xactual, xnuevo, f_xnuevo, ea, precision) {
	var row = tabla.insertRow(-1);
	var cols = [];

	for(var i = 0; i < 9; i++) {
		cols[i] = row.insertCell(i);
	}

	cols[0].innerHTML = iteraccion;
	cols[1].innerHTML = xanterior.toPrecision(precision)*1;		// .toPrecision(n), Formats a number to significant digits length.
	cols[2].innerHTML = f_xanterior.toPrecision(precision)*1;
	cols[3].innerHTML = xactual.toPrecision(precision)*1;
	cols[4].innerHTML = f_xactual.toPrecision(precision)*1;
	cols[5].innerHTML = xnuevo.toPrecision(precision)*1;
	cols[6].innerHTML = f_xnuevo.toPrecision(precision)*1;
	cols[7].innerHTML = ea.toFixed(precision);	// .toFixed, Formats a number to a fixed length of decimals.
}

function eliminarFilasTabla(tabla) {
	while(tabla.rows.length > 1) {
		tabla.deleteRow(1);
	}	
}

// Return relative percent approximate error (ea).
function obtener_ea(xnuevo, xanterior) {
	return  Math.abs((xnuevo - xanterior) / xnuevo) * 100;
}

