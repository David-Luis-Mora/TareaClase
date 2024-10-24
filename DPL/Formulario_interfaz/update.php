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
$user = null;

// Verificar si se ha enviado el formulario de búsqueda por ID
if (isset($_POST['buscar'])) {
    if (isset($_POST['id'])) {
        $id = mysqli_real_escape_string($conn, $_POST['id']);

        // Obtener el registro de la base de datos
        $sql = "SELECT * FROM users WHERE id='$id'";
        $result = mysqli_query($conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
        } else {
            $message = "No se encontró el registro con ID: $id";
        }
    } else {
        $message = "Por favor, introduzca un ID.";
    }
}

// Verificar si se ha enviado el formulario de actualización
if (isset($_POST['update'])) {
    if (isset($_POST['id']) && !empty($_POST['id'])) {
        $id = mysqli_real_escape_string($conn, $_POST['id']);
        
        // Preparar las partes de la consulta dependiendo de qué campos se actualicen
        $updates = [];

        if (!empty($_POST['name'])) {
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $updates[] = "name='$name'";
        }

        if (!empty($_POST['email'])) {
            $email = mysqli_real_escape_string($conn, $_POST['email']);
            $updates[] = "email='$email'";
        }

        // Si hay campos que actualizar
        if (!empty($updates)) {
            $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id='$id'";

            if (mysqli_query($conn, $sql)) {
                $message = "Registro actualizado correctamente.";
            } else {
                $message = "Error al actualizar el registro: " . mysqli_error($conn);
            }
        } else {
            $message = "No se han proporcionado datos para actualizar.";
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
    <title>Actualizar Registro</title>
    <link rel="stylesheet" href="./css/update.css">
</head>
<body>
    <h1>Actualizar Registro</h1>

    <!-- Mostrar mensaje de éxito o error -->
    <?php if (!empty($message)): ?>
        <p><?php echo $message; ?></p>
    <?php endif; ?>

    <!-- Formulario para buscar un registro por ID -->
    <form action="update.php" method="POST">
        <label for="id">Introduzca el ID del usuario:</label>
        <input type="text" id="id" name="id" required>
        <input type="submit" name="buscar" value="Buscar Usuario">
    </form>

    <?php if ($user): ?>
        <!-- Formulario para actualizar el registro -->
        <h2>Datos del Usuario con ID: <?php echo $user['id']; ?></h2>
        <form action="update.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $user['id']; ?>">

            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($user['name']); ?>"><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>"><br><br>

            <input type="submit" name="update" value="Actualizar Registro">
        </form>
    <?php endif; ?>

    <br>
    <a href="index.html"><button>Regresar</button></a>
</body>
</html>
