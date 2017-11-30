/* Objeto do tipo Produto */
function Produto(_codigo, _foto, _nome, _descricao, _preco, _peso) {
	this.codigo = _codigo;
	this.foto = _foto;
	this.nome = _nome;
	this.descricao = _descricao; 
	this.preco = _preco;
	this.peso = _peso;
}

/* Objeto do tipo Carrinho */
function Carrinho(_dono) {
	this.dono = _dono;
	Produtos  = [];

	/* Função que faz a escolha do PC */
	this.addToCar = function (produto, quantidade) {
		if (Produtos.indexOf(produto) >= 0) {
			Produtos[Produtos.indexOf(produto)].quantidade += quantidade;
		}

		else{
			Produtos[Produtos.length] = [produto, quantidade];
		}
    };
}