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

// Verificar si el formulario ha sido enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si los campos name y email están definidos en $_POST
    if (isset($_POST['name']) && isset($_POST['email'])) {
        // Recoger los datos del formulario
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);

        // Consulta para insertar el nuevo registro
        $sql = "INSERT INTO users (name, email, created) VALUES ('$name', '$email', NOW())";

        if (mysqli_query($conn, $sql)) {
            $message = "Registro insertado correctamente.";
        } else {
            $message = "Error al insertar el registro: " . mysqli_error($conn);
        }
    } else {
        $message = "Por favor, complete todos los campos.";
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
    <title>Insertar Registro</title>
    <link rel="stylesheet" href="./css/insertar.css">
</head>
<body>
    <h1>Insertar un nuevo registro</h1>

    <!-- Mostrar mensaje de éxito o error -->
    <?php if (!empty($message)): ?>
        <p><?php echo $message; ?></p>
    <?php endif; ?>

    <!-- Formulario para ingresar los datos -->
    <div>
        <form action="insertar.php" method="POST">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required><br><br>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>

            <input type="submit" value="Insertar Registro">
        </form>
    </div>

    <br>
    <a href="index.html"><button>Regresar</button></a>
</body>
</html>
