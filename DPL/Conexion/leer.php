<?php

$conn = mysqli_connect('localhost','root','','prueba');
// v[ptz6XOM[6l(7G9
echo '<pre>';
print_r($conn);


$sql = "Select id , name, email,created From users";

$leer = "select * users(name, email) values('alex','alex@dominio.es')";

$result = mysqli_query( $conn,$sql);
$rows = mysqli_fetch_array($result , MYSQLI_NUM);

print_r($rows);

do{
    $data[] = $rows;
}while ( $rows = mysqli_fetch_array( 
    $result, MYSQLI_NUM ));

print_r( $data);

mysqli_close($conn);

