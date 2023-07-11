<?php
require_once 'Database.php';
include_once 'LogNewError.php';

class Pasajeros_model
{
	public function __construct()
	{
	}

	public static function getAllPasajeros()
	{
		$sql = "select *
						from pasajeros";

		try {
			$comand = Database::getInstance()->getDb()->prepare($sql);
			$comand->execute();

			$vuelos = $comand->fetchAll(PDO::FETCH_ASSOC);

			return $vuelos;
		} catch (PDOException $e) {
			logNewError($e);
			throw new Exception("¡Error M al traer los pasajeros!.");
		}
	}
}