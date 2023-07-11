<?php
date_default_timezone_set('America/Bogota');
session_start();
try {
	if (isset($_POST['req'])) {
		switch ($_POST['req']) {
			case 'getAllVuelos':
				getAllVuelos();
				break;
			default:
				throw new Exception("Lo sentimos, NO tiene permiso para acceder a este área.");
				break;
		}
	} else {
		throw new Exception("Lo sentimos, al parecer eres un robot.");
	}
} catch (Exception $e) {
	$errorMessage = $e->getMessage();
	print_r(json_encode(array('res' => "error", 'msg' => $errorMessage)));
}
function getAllVuelos()
{
	require_once '../../model/Vuelos_model.php';
	try {
		$vuelos = Vuelos_model::getAllVuelos();
		$jsonResponse = array(
			'res' => "ok",
			'msg' => $vuelos,
		);
		print_r(json_encode($jsonResponse));
	} catch (Exception $e) {
		$codError = $e->getMessage();
		$mensajeError = $codError . " Lo sentimos, ha surgido un error al obtener el vuelos.";
		print_r(json_encode(array('res' => "error", 'msg' => $mensajeError)));
	}
}
?>