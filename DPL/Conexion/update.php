<?php

echo "<pre>";

$conn = mysqli_connect('localhost','root','','prueba');

$update = "update users set name = 'alex22', email = 'alex22@dominio.com'
Where id=0";

$delete = "delete from users where id = 0";

// $return = mysqli_query($conn , $update);
$return = mysqli_query($conn , $delete);

print_r($return);

mysqli_close($conn);

