<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Indexador</title>
    <?php include_once('_includes/bibliotecas_javascript.php'); ?>
    <script src="/biblioteca_interna/index.js"></script>
</head>
<body>
<span class="carregando"></span>

<label for="selectNomeJson">Arquivo Json de exemplo:
    <select id="selectNomeJson">
        <option value="http://localhost:10119/json_files/livros.json">Exemplo complexo</option>
        <option value="http://localhost:10119/json_files/nike-producao.json">Nike</option>
        <option value="http://localhost:10119/json_files/exemplo_complexo.json">Exemplo complexo</option>
    </select>
</label>
<input type="button" id="btnParsearAquivoJson" value="Parsear Json"/>
<input type="button" id="btnGerarIndiceJson" value="Gerar índice"/>

<input type="hidden" id="hddJsonParseado"/>

<div>
    <fieldset>
        <legend>Mapear objeto para criar os índices</legend>
        <table>
            <thead>
            <tr>
                <th>Propriedade</th>
                <th>Deve ser indexado?</th>
                <th>É um índice armazenado?</th>
                <th>Relevância no resultado de busca</th>
                <th>Deve ser buscável?</th>
                <th>Tipo de dado</th>
                <th>Deve retornar no resultado de busca?</th>
            </tr>
            </thead>
            <tbody id="tabelaChavesObjeto">
            </tbody>
            <tfoot>
            <tr>
                <td colspan="7">final</td>
            </tr>
            </tfoot>
        </table>
    </fieldset>
</div>


<script id="tmplChavesObjeto" type="text/x-jquery-tmpl">
            <tr>
                <td>${NomeChave}</td>
                <td>
                    <select>
                        <option value="no">Não indexado</option>
                        <option value="analyzed">Indexado com análise</option>
                        <option value="not_analyzed">Indexado sem análise</option>
                    </select>
                </td>
                <td>
                    <select id="selectIndiceArmazenado">
                        <option value="yes">Sim</option>
                        <option value="no">Não</option>
                    </select>
                </td>
                <td>
                    <input type="text" id="txtRelevancia" />
                </td>
                <td>
                    <select id="selectHabilitado">
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </td>
                <td>
                    <select id="selectHabilitado">
                        <option value="string">string</option>
                        <option value="integer">integer</option>
                        <option value="long">long</option>
                        <option value="float">float</option>
                        <option value="double">double</option>
                        <option value="boolean">boolean</option>
                        <option value="date">date</option>
                        <option value="datetime">datetime</option>
                        <option value="binary">binary</option>
                    </select>
                </td>
                <td>
                    <select id="selectCampoRetornavelQuery">
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </td>
            </tr>

</script>
</body>
</html>
