<?php
require_once 'Database.php';
include_once 'LogNewError.php';

class Vuelos_model
{
	public function __construct()
	{
	}

	public static function getAllVuelos()
	{
		$sql = "select V.id, V.fecha_vuelo, V.hora_salida, V.hora_llegada, V.duracion, V.valor, P.nombre as nombre_pasajero, P.id as id_pasajero, S.nombre as aeropuerto_salida,L.nombre as aeropuerto_llegada
						from vuelos as V
						inner join pasajeros P
						on P.id = V.fk_pasajero
						inner join aeropuertos S
						on S.id = V.fk_aeropuerto_salida
						inner join aeropuertos L
						on L.id = V.fk_aeropuerto_llegada";

		try {
			$comand = Database::getInstance()->getDb()->prepare($sql);
			$comand->execute();

			$vuelos = $comand->fetchAll(PDO::FETCH_ASSOC);

			return $vuelos;
		} catch (PDOException $e) {
			logNewError($e);
			throw new Exception("¡Error al traerel vuelos!.");
		}
	}
}