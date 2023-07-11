/** Accion para cerrar el los popups de la pagina **/
$(".btn-cerrar-popup").click(function (e) {
	e.preventDefault()
	$(".popup").removeClass("active")
})

/** Accion para inicializar los selects **/
$('select').formSelect();

/**
 * Genera una notificacion
 * Param @id String -> Id del elemento sobre el que se va ubicar
 * Param @text String -> Texto que se desea mostrar
 * Param @arg_focus String -> elemento al que se le debe dar el foco
 * Param @position String ["y x"] {"bottom center"}
 * Param @classColor String {success/error/info/warn}
*/
function notificacion(arg_id, arg_text, arg_focus, arg_position, arg_classColor, arg_segundos) {

	if (arg_focus != "") {
		$(arg_id).focus();
	}

	if (arg_segundos == undefined) {
		arg_segundos = 1800;

	}

	$(arg_id).notify(arg_text, {
		position: arg_position,
		className: arg_classColor,
		autoHideDelay: arg_segundos
	});
}

/** Funcion para inicializar la libreria de dataTables **/
function initializeDataTable() {
	$('.datatable').dataTable({
		dom: "<'hiddensearch'f'>" +
			"tr" +
			"<'table-footer'lip'>",
		renderer: 'material',
		sWrapper: "dataTables_wrapper",
		sFilterInput: "form-control input-sm",
		sLengthSelect: "form-control input-sm",
		language: {
			"processing": "Procesando...",
			"lengthMenu": '<span>Filas por página:</span>' +
				'<div class="input-field">' +
				'<select class="dttable-select">' +
				'<option value="5">5</option>' +
				'<option value="10">10</option>' +
				'<option value="20">20</option>' +
				'<option value="30">30</option>' +
				'<option value="40">40</option>' +
				'<option value="50">50</option>' +
				'<option value="-1">All</option>' +
				'</select></div>',
			"zeroRecords": "¡No se encontraron resultados!",
			"emptyTable": "¡La tabla está vacía!",
			"info": "_START_ al _END_ de _TOTAL_",
			"infoEmpty": "¡No hay datos para mostrar!",
			"infoFiltered": "(filtrado de un total de MAX registros)",
			"infoPostFix": "",
			"search": "Buscar:",
			"thousands": ",",
			"loadingRecords": "Por Favor Espera - Cargando...",
			"paginate": {
				"first": "Primero",
				"last": "Último",
			},
			"aria": {
				"sortAscending": ": Activar para ordenar la columna de manera ascendente",
				"sortDescending": ": Activar para ordenar la columna de manera descendente"
			}
		},
	});

	$(".dttable-select").formSelect();
}


/** Funcion para validar campo de fecha con el format YYYY-MM-DD **/
$('#fecha-vuelo').on('input', function (event) {
	let inputValue = $(this).val();
	let formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

	// Validar el formato de fecha
	if (!formatoFecha.test(inputValue)) {
		// Remover cualquier carácter que no sea un número
		let newValue = inputValue.replace(/\D/g, '');

		// Validar la longitud del valor
		if (newValue.length > 8) {
			newValue = newValue.slice(0, 8);
		}

		// Formatear automáticamente el valor
		let formattedValue = '';
		for (let i = 0; i < newValue.length; i++) {
			formattedValue += newValue[i];
			if (i === 3 || i === 5) {
				formattedValue += '-';
			}
		}

		// Asignar el valor formateado al campo
		$(this).val(formattedValue);
	}
});

/** Funcion para validar campo de hora con el format HH-MM-SS **/
$('.hora').on('input', function (event) {
	let inputValue = $(this).val();
	let formatoHora = /^\d{0,2}(:\d{0,2}(:\d{0,2})?)?$/;

	// Validar el formato de hora
	if (!formatoHora.test(inputValue)) {
		// Remover cualquier carácter que no sea un número
		let newValue = inputValue.replace(/\D/g, '');

		// Agregar los dos puntos automáticamente
		let formattedValue = '';
		if (newValue.length > 0) {
			formattedValue += newValue.slice(0, 2);
			if (newValue.length >= 3) {
				formattedValue += ':' + newValue.slice(2, 4);
				if (newValue.length >= 5) {
					formattedValue += ':' + newValue.slice(4, 6);
				}
			}
		}

		// Asignar el valor formateado al campo
		$(this).val(formattedValue);
	}
});
