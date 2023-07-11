<?php
require_once 'Database.php';
include_once 'LogNewError.php';

class Aeropuertos_model
{
	public function __construct()
	{
	}

	public static function getAllAeropuertos()
	{
		$sql = "select *
						from aeropuertos";

		try {
			$comand = Database::getInstance()->getDb()->prepare($sql);
			$comand->execute();

			$vuelos = $comand->fetchAll(PDO::FETCH_ASSOC);

			return $vuelos;
		} catch (PDOException $e) {
			logNewError($e);
			throw new Exception("¡Error M al traer los aeropuertos!.");
		}
	}
}