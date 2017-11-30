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
	this.addToCart = function (produto, quantidade) {
		if (Produtos.indexOf(produto) >= 0) {
			Produtos[Produtos.indexOf(produto)].quantidade += quantidade;
		}

		else{
			Produtos[Produtos.length] = [produto, quantidade];
		}
    };
}


var carrinhos = [];

$(document).ready(function(){
    carrinhos[carrinhos.length] = new Carrinho("");

    $(".badge").text("0");
});


function search(){
	var term = $('#busca').val();

	$('.productTitle').each(function (e) {
		var texto = $(this).text();


		if (texto.toLowerCase().indexOf(term.toLowerCase()) == -1) {
			$(this).parent().parent().css('display','none');				
		}

		else{
			$(this).parent().parent().css('display','block');	
		}
	});
}


function addToCart(qnt){
	value = parseInt($('.badge').text());

	value += parseInt(document.getElementById('qnt' + qnt).value);

	$(".badge").text(value);

	document.getElementById('qnt' + qnt).value = 1;
}

function price(price){

	var str = (document.getElementById('cardPrice'+price).innerHTML);
	var res = str.replace("R$ ", "");

	initialPrice = parseInt(res);

	document.getElementById('price'+price).innerHTML = "R$ " + (initialPrice * document.getElementById('qnt' + price).value);
}
