/// <reference path="..\biblioteca_externa\jquery-2.1.0-vsdoc.js" />
var Util = {
    estaDefinido: function (objeto) {
        return (typeof (objeto) != 'undefined' && objeto != null);
    },
    estaDefinidoComoObjeto: function (objeto) {
        return (this.estaDefinido(objeto) && $.isPlainObject(objeto));
    },
    estaDefinidoComoArray: function (objeto) {
        return (this.estaDefinido(objeto) && $.isArray(objeto));
    },
    estaDefinidoComoFuncao: function (objeto) {
        return (this.estaDefinido(objeto) && $.isFunction(objeto));
    },
    estaVazio: function (objeto) {
        return (this.estaDefinido(objeto) && objeto == '');
    },
    estaNulo: function (objeto) {
        return (typeof (objeto) != 'undefined' && objeto == null);
    },
    estaVazioOuNulo: function (objeto) {
        return (this.estaVazio(objeto) || this.estaNulo(objeto));
    },
    adicionarTagAoHeader: function (tag) {
        if (this.estaDefinido(tag)) {
            $("head").append(tag);
        }
    },
    carregarJavascript: function (src) {
        this.adicionarTagAoHeader($("<script />", { 'type': 'text/javascript', 'src': src }));
    },
    carregarCss: function (src) {
        this.adicionarTagAoHeader($("<link />", { 'rel': 'stylesheet', 'href': src, 'type': "text/css" }));
    },
    buscarAjaxComGet: function (url, funcaoSucesso, funcaoErro, funcaoAntesChamada, funcaoChamadaCompleta) {

        if (!this.estaDefinidoComoFuncao(funcaoSucesso)) throw "O parâmetro funcaoSucesso não está definido como função.";
        if (!this.estaDefinidoComoFuncao(funcaoErro)) throw "O parâmetro funcaoErro não está definido como função.";
        if (!this.estaDefinidoComoFuncao(funcaoAntesChamada)) throw "O parâmetro funcaoAntesChamada não está definido como função.";
        if (!this.estaDefinidoComoFuncao(funcaoChamadaCompleta)) throw "O parâmetro funcaoChamadaCompleta não está definido como função.";

        $.ajax({
            type: "GET",
            url: url,
            data: {},
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: funcaoSucesso,
            error: funcaoErro,
            beforeSend: funcaoAntesChamada,
            complete: funcaoChamadaCompleta
        });
    },
    enviarAjaxComPut: function (url, dadoJson, funcaoSucesso, funcaoErro, funcaoAntesChamada, funcaoChamadaCompleta) {

        if (!this.estaDefinidoComoFuncao(funcaoSucesso)) throw "O parâmetro funcaoSucesso não está definido como função.";
        if (!this.estaDefinidoComoFuncao(funcaoErro)) throw "O parâmetro funcaoErro não está definido como função.";
        if (!this.estaDefinidoComoFuncao(funcaoAntesChamada)) throw "O parâmetro funcaoAntesChamada não está definido como função.";
        if (!this.estaDefinidoComoFuncao(funcaoChamadaCompleta)) throw "O parâmetro funcaoChamadaCompleta não está definido como função.";
        if (!this.estaDefinidoComoObjeto(dadoJson)) throw "O parâmetro dadoJson não está definido como objeto JSON.";

        $.ajax({
            url: url,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: JSON.stringify(dadoJson),
            async: false,
            success: funcaoSucesso,
            error: funcaoErro,
            beforeSend: funcaoAntesChamada,
            complete: funcaoChamadaCompleta
        });
    }
};