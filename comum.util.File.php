<?php
namespace comum\util {
    class Arquivo
    {
        public function BuscarArquivosDoDiretorio($caminho_diretorio)
        {
            $arquivos_encontrados = array();
            if ($handle = opendir($caminho_diretorio)) {

                $i = 0;
                /* This is the correct way to loop over the directory. */
                while (false !== ($entry = readdir($handle))) {
                    $caminho_completo = $caminho_diretorio . "/" . $entry;
                    if (is_file($caminho_completo)) {
                        $arquivos_encontrados[$i] = $caminho_completo;
                        $i++;
                    }
                }
                closedir($handle);
            }
            return $arquivos_encontrados;
        }
    }
}