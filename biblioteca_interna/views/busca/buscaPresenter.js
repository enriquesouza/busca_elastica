var BuscaPresenter =  Class.create(PresenterAbstract,{
	initialize : function(){},
	carregarBiblioteca:function($super,nome){
		$super(nome);
	},
	executarBusca:function(buscaBE){
		var bo = new BuscaBO();
		bo.executarBusca(buscaBE);
	},
	definirEventos:function(){
		$jq("#btnBusca").click(function() {
			var buscaBe = new BuscaBE;
			buscaBe.palavraChave = $jq("#txtBusca").val();

			var presenter = new BuscaPresenter;
			presenter.executarBusca(buscaBe);
		});
	}
});
$jq(function() {
  	var presenter = new BuscaPresenter();
  	presenter.carregarBiblioteca("busca");
  	presenter.definirEventos();
});