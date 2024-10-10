<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'Mostrar Registro':
            // Lógica para mostrar el registro
            echo "Mostrando registros...";
            include 'leer.php';
            break;
        case 'Insertar Registro':
            // Lógica para insertar un registro
            // echo "Insertando registro...";
            include 'insertar.php';
            break;
        case 'Actualizar Registro':
            // Lógica para actualizar un registro
            echo "Actualizando registro...";
            include 'update.php';
            break;
        case 'Eliminar Registro':
            // Lógica para eliminar un registro
            echo "Eliminando registro...";
            include 'delete.php';
            break;
        default:
            echo "Acción no válida.";
            break;
    }
}
?>
