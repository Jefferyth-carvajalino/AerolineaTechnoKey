<?php
	function logNewError($arg_msg) {
		$bt = debug_backtrace();
		$caller = array_shift($bt);

		$error_file = $caller['file'];
		$error_line = $caller['line'];
		$error_function = $caller['function'];
		$error_msg = $arg_msg;

		$error_txt = "ERROR EN '{$error_file}' - LÍNEA: {$error_line} - FUNCIÓN: {$error_function} - MESSAGE => {$error_msg}";

		if (!file_exists('./my-errors-log.txt')) {
			$my_errors_log = fopen('./my-errors-log.txt', 'w');
			fwrite($my_errors_log, $error_txt);
			fclose($my_errors_log);

		} else {
			$error_txt = "\n\n" . $error_txt;

			$my_errors_log = fopen('./my-errors-log.txt', 'a');
			fwrite($my_errors_log, $error_txt);
			fclose($my_errors_log);
		}
	}
?>