
/** Creación de variables globales para poder editar los vuelos **/
let vuelos;
let vuelosToEdit;



/** Funcion para crear vuelos **/
function createVuelo() {
	let idPasajero = $("#nombres-list").val();
	let aeroLlegada = $("#aero-llegada-list").val();
	let aeroSalida = $("#aero-salida-list").val();
	let fecha = $("#fecha-vuelo").val();
	let llegada = $("#hora-llegada").val();
	let salida = $("#hora-salida").val();
	let duracion = $("#duracion").val();
	let valor = $("#valor").val();

	if (idPasajero == "seleccionar") {
		notificacion("#nombres-list", "Seleccione un nombre", "#nombres-list", "bottom center", "error");
	} else if (aeroLlegada == "seleccionar") {
		notificacion("#aero-llegada-list", "Seleccione un aeropuerto de llegada", "#aero-llegada-list", "bottom center", "error");
	} else if (aeroSalida == "seleccionar") {
		notificacion("#aero-salida-list", "Seleccione un aeropuerto de salida", "#aero-salida-list", "bottom center", "error");
	} else if (fecha.length <= 9) {
		notificacion("#fecha-vuelo", "Ingresa la fecha completa", "#fecha-vuelo", "bottom center", "error");

	} else if (llegada.length <= 7) {
		notificacion("#hora-llegada", "Ingresa un hora de llegada", "#hora-llegada", "bottom center", "error");

	} else if (salida.length <= 7) {
		notificacion("#hora-salida", "Ingresa una hora de salida", "#hora-salida", "bottom center", "error");

	} else if (duracion.length <= 7) {
		notificacion("#duracion", "Ingresa una duracion", "#duracion", "bottom center", "error");

	} else if (valor == "") {
		notificacion("#valor", "Ingresa un valor", "#valor", "bottom center", "error");

	} else {
		$.ajax({
			url: "../controller/vuelos-controller.php",
			data: {
				req: "createVuelo",
				idPasajero,
				aeroLlegada,
				aeroSalida,
				fecha,
				llegada,
				salida,
				duracion,
				valor
			},
			method: "POST",
			dataType: "JSON",
			cache: false

		}).done(function (sRes) {

			if (sRes['res'] == "ok") {
				Swal.fire({
					position: 'top-end',
					icon: "success",
					title: "Hecho",
					text: "El vuelo se actualizo correctamente",
					showConfirmButton: false,
					timer: 1500
				});

				$('#table-vuelos').html('');
				if ($.fn.DataTable.isDataTable('.datatable')) {
					$('.datatable').DataTable().clear().destroy();
				}

				getAllVuelos()
				$('.popup').removeClass("active");
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: sRes['msg']
				});
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
	}
}

/** Funcion para actualizar vuelos vuelos **/
function updateVuelo() {
	let fecha = $("#edit-fecha-vuelo").val();
	let llegada = $("#edit-hora-llegada").val();
	let salida = $("#edit-hora-salida").val();
	let duracion = $("#edit-duracion").val();
	let valor = $("#edit-valor").val();

	if (fecha == "") {
		notificacion("#edit-fecha-vuelo", "Ingresa una fecha", "#edit-fecha-vuelo", "bottom center", "error");

	} else if (llegada == "") {
		notificacion("#edit-hora-llegada", "Ingresa un hora de llegada", "#edit-hora-llegada", "bottom center", "error");

	} else if (salida == "") {
		notificacion("#edit-hora-salida", "Ingresa una hora de salida", "#edit-hora-salida", "bottom center", "error");

	} else if (duracion == "") {
		notificacion("#edit-duracion", "Ingresa una duracion", "#edit-duracion", "bottom center", "error");

	} else if (valor == "") {
		notificacion("#edit-valor", "Ingresa un valor", "#edit-valor", "bottom center", "error");

	} else {
		$.ajax({
			url: "../controller/vuelos-controller.php",
			data: {
				req: "updateVuelo",
				vueloId: vuelosToEdit.id,
				fecha,
				llegada,
				salida,
				duracion,
				valor
			},
			method: "POST",
			dataType: "JSON",
			cache: false

		}).done(function (sRes) {

			if (sRes['res'] == "ok") {
				Swal.fire({
					position: 'top-end',
					icon: "success",
					title: "Hecho",
					text: "El vuelo se actualizo correctamente",
					showConfirmButton: false,
					timer: 1500
				});

				$('#table-vuelos').html('');
				if ($.fn.DataTable.isDataTable('.datatable')) {
					$('.datatable').DataTable().clear().destroy();
				}

				getAllVuelos()
				$('.popup').removeClass("active");
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: sRes['msg']
				});
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
	}
}

/** Funcion para traer todos los vuelos **/
function getAllVuelos() {
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
			localStorage.setItem('vuelos', JSON.stringify(data));
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
						<td>$${vuelo.valor.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")}</td>
						<td>
							<a href="#" class="btn btn-info btn-xs btn-edit-admin tooltipped" data-position="top" data-tooltip="Editar" onclick="editVuelo(${vuelo.id})">
								<i class="fa fa-pencil"></i>
							</a>
							<a href="#" class="btn btn-error btn-xs btn-edit-admin tooltipped" data-position="top" data-tooltip="Editar" onclick="deleteVuelo(${vuelo.id})">
								<i class="fa fa-trash"></i>
							</a>
						</td>
					</tr>`);
			});
			initializeDataTable();

		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: sRes['msg']
			});
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
}

/** Funcion para traer todos los aeropuertos **/
function getAllAeropuertos() {
	$.ajax({
		url: "../controller/aeropuertos-controller.php",
		data: {
			req: "getAllAeropuertos",
		},
		method: "POST",
		dataType: "JSON",
		cache: false

	}).done(function (sRes) {

		if (sRes['res'] == "ok") {
			let data = sRes["msg"];

			data.forEach(({ ciudad, id }) => {
				$('#aero-salida-list').append(`<option value="${id}">${ciudad}</option>`);
			});

			data.forEach(({ ciudad, id }) => {
				$('#aero-llegada-list').append(`<option value="${id}">${ciudad}</option>`);
			});
			$("#aero-llegada-list").formSelect();
			$("#aero-salida-list").formSelect();

		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: sRes['msg']
			});
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
}

/** Funcion para traer todos los pasajeros **/
function getAllPasajeros() {
	$.ajax({
		url: "../controller/pasajeros-controller.php",
		data: {
			req: "getAllPasajeros",
		},
		method: "POST",
		dataType: "JSON",
		cache: false

	}).done(function (sRes) {

		if (sRes['res'] == "ok") {
			let data = sRes["msg"];
			console.log("pasa", data);

			data.forEach(({ nombre, id }) => {
				$('#nombres-list').append(`<option value="${id}">${nombre}</option>`);
			});
			$("#nombres-list").formSelect();

		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: sRes['msg']
			});
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
}

/** funcion para activar el popup el cual permite editar el vuelo seleccionado **/
function editVuelo(vueloId) {
	$("#popup-edit-vuelo").addClass('active');

	vuelos = JSON.parse(localStorage.getItem("vuelos"));
	vuelosToEdit = vuelos.find(vuelo => vuelo.id == vueloId);

	$("#edit-name").val(vuelosToEdit.nombre_pasajero);
	$("#edit-fecha-vuelo").val(vuelosToEdit.fecha_vuelo);
	$("#edit-hora-llegada").val(vuelosToEdit.hora_llegada);
	$("#edit-hora-salida").val(vuelosToEdit.hora_salida);
	$("#edit-duracion").val(vuelosToEdit.duracion);
	$("#edit-valor").val(vuelosToEdit.valor);

}

/** Funcion para eliminar un vuelo **/
function deleteVuelo(vueloId) {
	Swal.fire({
		icon: "warning",
		title: "¿Desea eliminar este vuelo?",
		showCancelButton: true,
		confirmButtonText: "Eliminar",
		cancelButtonText: "Cancelar",
		reverseButtons: true,
	}).then(({ value }) => {
		if (value) {

			$.ajax({
				url: "../controller/vuelos-controller.php",
				data: {
					req: "deleteVuelo",
					vueloId
				},
				method: "POST",
				dataType: "JSON",
				cache: false

			}).done(function (sRes) {

				if (sRes['res'] == "ok") {
					Swal.fire({
						position: 'top-end',
						icon: "success",
						title: "Hecho",
						text: "El vuelo se eliminado correctamente",
						showConfirmButton: false,
						timer: 1500
					});

					$('#table-vuelos').html('');
					if ($.fn.DataTable.isDataTable('.datatable')) {
						$('.datatable').DataTable().clear().destroy();
					}

					getAllVuelos()
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: sRes['msg']
					});
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
		};
	});


}

$("#btn-edit-vuelo").click(function (event) {
	event.preventDefault();
	updateVuelo();
});

$('#btn-add-vuelo').click(function () {
	getAllAeropuertos()
	getAllPasajeros()
	$('#popup-add-vuelo').addClass("active");
});

$('#btn-create-vuelo').click(function () {
	createVuelo()
});

getAllVuelos()
