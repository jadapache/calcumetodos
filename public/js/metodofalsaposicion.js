function FalsaPosicion() {
	var tabla = document.getElementById("tabla");		// Se define la tabla donde serán cargados los valores
	eliminarFilasTabla(tabla);
	var _funcion = $('#funcion').val();				// Se recogen los datos del html
	var xl = $('#valor_xl').val();
	var xu = $('#valor_xu').val();
    var ncifras = $('#cifras').val();


    // Se definen las variables a usar en el método
	var iteraccion = 1;
	var f_xl, f_xu, f_xr;		// f_xl = f(xl), f_xu = f(xu), f_m = f(m)
	var orig_xl = xl;
	var orig_xu = xu;
	var xr=xu;
	var precision = parseInt(8);
	xl = parseFloat(xl);
	xu = parseFloat(xu);
    var es = (0.5 * Math.pow(10, -ncifras) * 100);
	var ea = 100;
	while(ea > es) {
		var xa=xr;
		f_xl = parse(_funcion, xl);	// f_xl = f(xl).
		f_xu = parse(_funcion, xu);	// f_xu = f(xu).
		xr = xu - (f_xu * (xl - xu) / (f_xl - f_xu));
		f_xr = parse(_funcion, xr);		// f_x = f(x).
		ea = obtener_ea(xr, xa);		// Funcion para el error aproximado porcentual.
		nuevaTabla(tabla, iteraccion, xl, f_xl, xu, f_xu, xr, f_xr, ea, precision);	// Se crean e insertan datos en la tabla.
		if(f_xr * f_xl > 0) {
			xl = xr;
		} else if(f_xr * f_xu > 0) {
			xu = xr;
		} else {
			alert("¡El intervalo ingresado no está dentro de la raíz!");
			ea=0;
		}
		iteraccion++;
	}

	$("#output").show();
	final(orig_xl, parse(_funcion, orig_xl), orig_xu, parse(_funcion, orig_xu));	// Se dibuja la grafíca final
	return false;
}

function parse(_function, x) {
	var parser = math.parser();

	parser.eval('f(x) = '.concat(_function));
	parser.set('x', x);
	parser.set('e', Math.E);
	return parser.eval(_function);
}

function nuevaTabla(tabla, iteraccion, xl, f_xl, xu, f_xu, xr, f_xr, ea, precision) {
	var row = tabla.insertRow(-1);
	var cols = [];

	for(var i = 0; i < 9; i++) {
		cols[i] = row.insertCell(i);
	}

	cols[0].innerHTML = iteraccion;
	cols[1].innerHTML = xl.toPrecision(precision)*1;
	cols[2].innerHTML = f_xl.toPrecision(precision)*1;
	cols[3].innerHTML = xu.toPrecision(precision)*1;
	cols[4].innerHTML = f_xu.toPrecision(precision)*1;
	cols[5].innerHTML = xr.toPrecision(precision)*1;
	cols[6].innerHTML = f_xr.toPrecision(precision)*1;
	cols[7].innerHTML = ea.toFixed(precision);
}

function eliminarFilasTabla(tabla) {
	while(tabla.rows.length > 1) {
		tabla.deleteRow(1);
	}	
}

function obtener_ea(xr, xa) {
	return  Math.abs((xr - xa) / xr) * 100;
}

