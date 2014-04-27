var PresenterAbstract = Class.create({
	carregarBiblioteca:function(nome){
		Util.carregarJavascript("biblioteca_interna/views/" + nome + "/" + nome + "BE.js");
		Util.carregarJavascript("biblioteca_interna/views/" + nome + "/" + nome + "BO.js");
	}
});