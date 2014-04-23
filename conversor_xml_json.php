<?php
require_once("comum.util.Xml.php");
$xml_path = $_GET["xml_path"];
$xml = new comum\util\Xml();
echo $xml->ConverterXmlParaJson("xml_files/" . $xml_path);
