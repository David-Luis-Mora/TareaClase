<?php

$conn = mysqli_connect('localhost', 'root', '', 'prueba');

if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Consulta para seleccionar todos los registros de la tabla 'users'
$sql = "SELECT id, name, email, created FROM users";

$result = mysqli_query($conn, $sql);

if (!$result) {
    die("Error en la consulta: " . mysqli_error($conn));
}

// Comienza a construir la tabla HTML
echo '<table border="1" cellpadding="10" cellspacing="0">';
echo '<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Created</th>
      </tr>';

// Fetch los registros y llenar la tabla
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    echo '<tr>';
    echo '<td>' . htmlspecialchars($row['id']) . '</td>';
    echo '<td>' . htmlspecialchars($row['name']) . '</td>';
    echo '<td>' . htmlspecialchars($row['email']) . '</td>';
    echo '<td>' . htmlspecialchars($row['created']) . '</td>';
    echo '</tr>';
}

echo '</table>';

echo '<a href="index.html"><button>Regresar</button></a>';


mysqli_close($conn);
?>



