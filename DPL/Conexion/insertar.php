<?php

$conn = mysqli_connect('localhost','root','v[ptz6XOM[6l(7G9','prueba');

echo '<pre>';
print_r($conn);

$insert = "insert into users(name, email) values('alex','alex@dominio.es')";

$return = mysqli_query( $conn,$insert);

print_r($return);

mysqli_close($conn);