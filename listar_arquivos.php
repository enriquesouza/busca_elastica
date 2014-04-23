<?php
require_once("comum.util.File.php");
$dir = $_GET["dir"];
$arquivo = new comum\util\Arquivo();
echo json_encode($arquivo->BuscarArquivosDoDiretorio($dir));
