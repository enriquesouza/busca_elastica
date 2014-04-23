<?php
namespace comum\util {
    class Xml
    {
        function ConverterXmlParaJson($xml_path)
        {
            return json_encode(simplexml_load_file($xml_path));
        }
    }
}?>