$.ajax({
	url: "../controller/vuelos-controller.php",
	data: {
		req: "getAllVuelos",
	},
	method: "POST",
	dataType: "JSON",
	cache: false

}).done(function (sRes) {

	if (sRes['res'] == "ok") {
		let data = sRes["msg"];
		console.log(data);
		// localStorage.setItem('specialties', JSON.stringify(data));
		data.forEach(vuelo => {

			$('#table-vuelos').append(
				`<tr>
						<td style="font-family: 'Quicksand Bold'">${vuelo.id}</td>
						<td>${vuelo.nombre_pasajero}</td>
						<td>${vuelo.fecha_vuelo}</td>
						<td>${vuelo.duracion}</td>
						<td>${vuelo.aeropuerto_llegada}</td>
						<td>${vuelo.aeropuerto_salida}</td>
						<td>${vuelo.hora_llegada}</td>
						<td>${vuelo.hora_salida}</td>
						<td>${vuelo.valor}</td>
						<td>
							<a href="#" class="btn btn-info btn-xs btn-edit-admin tooltipped" data-position="top" data-tooltip="Editar" onclick="editSpecialties(${vuelo.id})">
								<i class="fa fa-pencil"></i>
							</a>
						</td>
						</td>
					</tr>`);
		});
		initializeDataTable();

	} else {
		// Swal.fire({
		// 	icon: 'error',
		// 	title: 'Oops...',
		// 	text: sRes['msg']
		// });
	}

}).fail(function (jqXHR, textStatus, errorThrown) {

	if (jqXHR.status === 0) {
		console.log('Not connect: Verify Network.');

	} else if (jqXHR.status == 404) {
		console.log('Requested page not found [404]');

	} else if (jqXHR.status == 500) {
		console.log('Internal Server Error [500].');

	} else if (textStatus === 'parsererror') {
		console.log('Requested JSON parse failed.');

	} else if (textStatus === 'timeout') {
		console.log('Time out error.');

	} else if (textStatus === 'abort') {
		console.log('Ajax request aborted.');

	} else {
		console.log('Uncaught Error: ' + jqXHR.responseText);

	}

}).always(function () {
});


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
}