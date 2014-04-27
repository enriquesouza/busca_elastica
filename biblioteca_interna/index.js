/// <reference path="..\biblioteca_externa\jquery-2.1.0-vsdoc.js" />
/// <reference path="funcoes.js" />

var Indexador =
{
    chavesEncontradas: new Array(),
    verificarSeChaveJaFoiEncontrada: function (nomeChave) {
        var existe = false;
        for (var i = 0; i <= this.chavesEncontradas.length; i++) {
            var chave = this.chavesEncontradas[i];
            if (typeof (chave) != 'undefined' && chave != null && $jq.isPlainObject(chave) && chave.NomeChave == nomeChave) {
                existe = true;
                break;
            }
        }
        return existe;
    },
    adicionarChaveEncontrada: function (objetoChave) {
        if (!this.verificarSeChaveJaFoiEncontrada(objetoChave.NomeChave)) {
            this.chavesEncontradas.push(objetoChave);
        }
    },
    buscarChavesJson: function (data, chaveAtualParametro) {

        var chaveAtual = chaveAtualParametro;
        if (Util.estaDefinidoComoObjeto(data)) {
            var chaves = Object.keys(data);
            for (var i = 0; i <= chaves.length; i++) {
                var chave = chaves[i];

                if (chave != "?xml" && Util.estaDefinido(chave)) {

                    var dadoComChave = "data['".concat(chave).concat("']");
                    var dadoComChaveJson = eval("(" + dadoComChave + ")");

                    if (Util.estaDefinido(dadoComChaveJson)) {

                        var _nomeChaveAtual = chaveAtualParametro + '.' + chave;
                        this.adicionarChaveEncontrada({ NomeChave: _nomeChaveAtual });

                        if (Util.estaDefinidoComoArray(dadoComChaveJson)) {
                            for (var n = 0; n <= dadoComChaveJson.length; n++) {
                                this.buscarChavesJson(dadoComChaveJson[n], _nomeChaveAtual);
                            }
                        }
                        else if (Util.estaDefinidoComoObjeto(dadoComChaveJson)) {
                            this.buscarChavesJson(dadoComChaveJson, _nomeChaveAtual);
                        }
                    }

                }
            }
        }
        return this.chavesEncontradas;
    }
};

$jq(document).ready(function () {
    $jq("#btnParsearAquivoJson").click(function () {

        var url = $jq("#selectNomeJson").val();

        Util.buscarAjaxComGet(url,
            function (data) {
                $jq('.carregando').html("");
                Indexador.chavesEncontradas = new Array();
                var chavesEncontradas = Indexador.buscarChavesJson(data, "");
                $jq("#tabelaChavesObjeto").empty();
                $jq("#tmplChavesObjeto").tmpl(chavesEncontradas).appendTo("#tabelaChavesObjeto");
                $jq("#hddJsonParseado").val(JSON.stringify(data));
            },
            function (XMLHttpRequest, textStatus, errorThrown) {
                $jq('.carregando').html("Erro ao carregar");
            },
            function (XMLHttpRequest) {
                $jq('.carregando').html("Buscando as chaves do objeto...");
            },
            function (XMLHttpRequest, textStatus) {
                $jq('.carregando').html("");
            }
        );

        /*
         $jq.ajax({
         type: "GET",
         url: url,
         data: {},
         async: true,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) {
         $jq('.carregando').html("");
         var chavesEncontradas = Indexador.buscarChavesJson(data, "");
         $jq("#tmplChavesObjeto").tmpl(chavesEncontradas).appendTo("#tabelaChavesObjeto");
         $jq("#hddJsonParseado").val(JSON.stringify(data));
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) {
         $jq('.carregando').html("Erro ao carregar");
         },
         beforeSend: function (XMLHttpRequest) {
         $jq('.carregando').html("Buscando as chaves do objeto...");
         },
         complete: function (XMLHttpRequest, textStatus) {
         $jq('.carregando').html("");
         }
         });*/

    });
    $jq("#btnGerarIndiceJson").click(function () {
        var urlIndice = 'http://ubuntuserver:9200/nike/busca_produto/';
        $jq.each(data.root.produto, function (index, produto) {
            Util.enviarAjaxComPut(
                urlIndice.concat(produto.id_produto),
                produto,
                function (result) {

                    $jq('.carregando').html("indexando os objetos... :  objeto ".concat(produto.id_produto).concat(" indexado com sucesso."));

                    if (result.success == true) {
                        //console.log("criou o indice para o ".concat(produto.id_produto));
                    }
                },
                function (result) {
                    console.log(result);
                }, function (XMLHttpRequest) {
                    $jq('.carregando').html("indexando os objetos...");
                },
                function (XMLHttpRequest, textStatus) {
                    $jq('.carregando').html("");
                }
            );

            /*
             $jq.ajax({
             url: urlIndice.concat(produto.id_produto),
             type: 'PUT',
             crossDomain: true,
             dataType: 'json',
             data: JSON.stringify(produto),
             async: false,
             success: function (result) {
             console.log(result);
             if (result.success == true) {
             console.log("criou o indice para o ".concat(produto.id_produto));
             }
             },
             error: function (result) {
             console.log(result);
             }
             });*/
        });
    });
});
