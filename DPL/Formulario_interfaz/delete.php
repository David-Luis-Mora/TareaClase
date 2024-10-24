<?php
// Conexión a la base de datos
// $conn = mysqli_connect('localhost', 'root', '', 'prueba');
// $conn = mysqli_connect('localhost', 'David', 'root', 'prueba');
include 'conexion.php';
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Variable para mostrar mensajes de éxito o error
$message = '';

// Verificar si se ha enviado el formulario de eliminación
if (isset($_POST['eliminar'])) {
    if (isset($_POST['id']) && !empty($_POST['id'])) {
        $id = mysqli_real_escape_string($conn, $_POST['id']);

        // Consulta para eliminar el registro
        $sql = "DELETE FROM users WHERE id='$id'";

        if (mysqli_query($conn, $sql)) {
            $message = "Registro eliminado correctamente.";
        } else {
            $message = "Error al eliminar el registro: " . mysqli_error($conn);
        }
    } else {
        $message = "Por favor, proporcione un ID válido.";
    }
}

// Cerrar la conexión
mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eliminar Registro</title>
    <link rel="stylesheet" href="./css/delete.css"> <!-- Incluye el archivo CSS -->
</head>
<body>
    <h1>Eliminar Registro</h1>

    <!-- Mostrar mensaje de éxito o error -->
    <?php if (!empty($message)): ?>
        <p><?php echo $message; ?></p>
    <?php endif; ?>

    <!-- Formulario para eliminar un registro por ID -->
    <form action="delete.php" method="POST">
        <label for="id">Introduzca el ID del usuario que desea eliminar:</label>
        <input type="text" id="id" name="id" required>
        <input type="submit" name="buscar" value="Buscar Usuario">
    </form>

    <!-- Confirmación de eliminación -->
    <?php if (isset($_POST['buscar'])): ?>
        <h2>¿Está seguro de que desea eliminar el registro con ID: <?php echo htmlspecialchars($_POST['id']); ?>?</h2>
        <form action="delete.php" method="POST">
            <input type="hidden" name="id" value="<?php echo htmlspecialchars($_POST['id']); ?>">
            <input type="submit" name="eliminar" value="Eliminar Registro">
        </form>
    <?php endif; ?>

    <br>
    <a href="index.html"><button>Regresar</button></a>
</body>
</html>
