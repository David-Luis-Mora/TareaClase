<?php
echo "pagina 2";

// header ("location: pagina3.php");

print_r($_GET);

header ("location: pagina3.php? name=" . $_GET['name']);