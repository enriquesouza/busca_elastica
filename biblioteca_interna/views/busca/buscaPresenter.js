var BuscaPresenter =  Class.create(PresenterAbstract,{
	initialize : function(){},
	carregarBiblioteca:function($super,nome){
		$super(nome);
	}
});
$jq(function() {
  	var presenter = new BuscaPresenter();
  	presenter.carregarBiblioteca("busca");
});