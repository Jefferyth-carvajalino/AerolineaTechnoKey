<?php
date_default_timezone_set('America/Bogota');
session_start();
try {
	if (isset($_POST['req'])) {
		switch ($_POST['req']) {
			case 'getAllAeropuertos':
				getAllAeropuertos();
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
function getAllAeropuertos()
{
	require_once '../../model/Aeropuertos_model.php';
	try {
		$aeropuertos = Aeropuertos_model::getAllAeropuertos();
		$jsonResponse = array(
			'res' => "ok",
			'msg' => $aeropuertos,
		);
		print_r(json_encode($jsonResponse));
	} catch (Exception $e) {
		$codError = $e->getMessage();
		$mensajeError = $codError . " Lo sentimos, ha surgido un error al obtener los aeropuertos.";
		print_r(json_encode(array('res' => "error", 'msg' => $mensajeError)));
	}
}
?>