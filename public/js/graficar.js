var xl = $('#valor_xl').val();
var xu = $('#valor_xu').val();
var xactual = $('#valor_xl').val();
var _funcion = $('#funcion').val();	
var f_xl, f_xu, f_xr;
xl = parseFloat(xl);
xu = parseFloat(xu);
xactual = parseFloat(xactual);
var orig_xl = xl;
var orig_xu = xu;
var orig_xa = xactual;
	
var width = 980;
var height = 560;
// Dominio deseado de la grafica
var xScale = [-10, 10]

function inicial() {
	try {
		functionPlot({
			width: width,
			height: height,
			xDomain: xScale,
			yDomain: computeYScale(width, height, xScale),
			target: '#plot',
			grid: true,
			data: [{
				fn: document.getElementById('funcion').value,
				sampler: 'builtIn',	// Usamos el evaluador de math.js en la graficacion
				graphType: 'polyline'
			}]
		});


	} catch (err) {
		// console.log(err);
		alert(err);
	}
}

function final(xl, f_xl, xu, f_xu) {
	try {
		functionPlot({
			width: width,
			height: height,
			xDomain: xScale,
			yDomain: computeYScale(width, height, xScale),
			target: '#plot',
			grid: true,
			data: [{
				fn: document.getElementById('funcion').value,
				sampler: 'builtIn',	// Usamos el evaluador de math.js en la graficacion
				graphType: 'polyline'
			}, {
				points: [
					[xl, f_xl],
					[xu, f_xu]
				],
				fnType: 'points',
    			graphType: 'scatter'
			}]
		});


	} catch (err) {
		// console.log(err);
		alert(err);
	}
}

function punto(xl, xi) {
	try {
		functionPlot({
			width: width,
			height: height,
			xDomain: xScale,
			yDomain: computeYScale(width, height, xScale),
			target: '#plot',
			grid: true,
			data: [{
				fn: document.getElementById('funcion').value,
				sampler: 'builtIn',	// Usamos el evaluador de math.js en la graficacion
				graphType: 'polyline'
			}, {
				points: [
					[xl, xi],
				],
				fnType: 'points',
				graphType: 'scatter'
			}]
		});


	} catch (err) {
		// console.log(err);
		alert(err);
	}
}

function computeYScale (width, height, xScale) {
	var xDiff = xScale[1] - xScale[0]
	var yDiff = height * xDiff / width
	return [-yDiff / 2, yDiff / 2]
}