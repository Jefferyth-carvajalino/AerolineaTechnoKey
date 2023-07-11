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
			throw new Exception("¡Error M al traer los vuelos!.");
		}
	}

	public static function updateVuelo($arg_idVuelo, $arg_fechaVuelo, $arg_horaLlegada, $arg_horaSalida, $arg_duracion, $arg_valor)
	{
		$sql = "UPDATE vuelos
					SET fecha_vuelo = :fechaVuelo, hora_salida = :horaSalida, hora_llegada = :horaLlegada, duracion = :duracion, valor = :valor
					WHERE id = :idVuelo";

		try {
			$comando = Database::getInstance()->getDb()->prepare($sql);
			$comando->bindParam(":idVuelo", $arg_idVuelo);
			$comando->bindParam(":fechaVuelo", $arg_fechaVuelo);
			$comando->bindParam(":horaSalida", $arg_horaSalida);
			$comando->bindParam(":horaLlegada", $arg_horaLlegada);
			$comando->bindParam(":duracion", $arg_duracion);
			$comando->bindParam(":valor", $arg_valor);
			$comando->execute();

			return true;

		} catch (PDOException $e) {
			throw new Exception("Error M al editar el vuelo");

		}
	}

	public static function createVuelo($arg_idPasajero, $arg_aeroLlegada, $arg_aeroSalida, $arg_fecha, $arg_llegada, $arg_salida, $arg_duracion, $arg_valor)
	{
		$sql = "INSERT INTO vuelos (fecha_vuelo, hora_salida, hora_llegada, duracion, valor, fk_aeropuerto_salida, fk_aeropuerto_llegada, fk_pasajero)
            VALUES (:fecha, :salida, :llegada, :duracion, :valor, :aeroSalida, :aeroLlegada, :idPasajero);";

		try {
			$comando = Database::getInstance()->getDb()->prepare($sql);
			$comando->bindParam(":fecha", $arg_fecha);
			$comando->bindParam(":salida", $arg_salida);
			$comando->bindParam(":llegada", $arg_llegada);
			$comando->bindParam(":duracion", $arg_duracion);
			$comando->bindParam(":valor", $arg_valor);
			$comando->bindParam(":aeroSalida", $arg_aeroSalida);
			$comando->bindParam(":aeroLlegada", $arg_aeroLlegada);
			$comando->bindParam(":idPasajero", $arg_idPasajero);
			$comando->execute();

			return true;
		} catch (PDOException $e) {
			throw new Exception("Error al crear el vuelo: " . $e->getMessage());
		}
	}
	public static function deleteVuelo($arg_idVuelo)
	{
		$sql = "DELETE FROM vuelos
						WHERE id = :idVuelo;";

		try {
			$comando = Database::getInstance()->getDb()->prepare($sql);
			$comando->bindParam(":idVuelo", $arg_idVuelo);
			$comando->execute();

			return true;

		} catch (PDOException $e) {
			throw new Exception("Error M al editar el vuelo");

		}
	}
}