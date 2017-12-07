/* Objeto do tipo Produto */
function Produto(_codigo, _foto, _nome, _descricao, _preco, _peso, _quantidade) {
	this.codigo = _codigo;
	this.foto = _foto;
	this.nome = _nome;
	this.descricao = _descricao; 
	this.preco = _preco;
	this.peso = _peso;
	this.quantidade = _quantidade;
}



var produtosName = ["Obama: An Intimate Portrait",
					"Milk and Vine: Inspirational Quotes From Classic Vines",
					"Giraffes Can't Dance",
					"First 100 Words",
					"The Getaway (Diary of a Wimpy Kid Book 12)",
					"Goodnight Moon",
					"The Very Hungry Caterpillar",
					"The Midnight Line: A Jack Reacher Novel",
					"The Good Samaritan",
					"The Unremembered Girl: A Novel",
					"The Silver Music Box",
					"Two Kinds of Truth (A Harry Bosch Novel)",
					"The Rooster Bar",
					"What Remains True: A Novel",
					"The Good Girl",
					"Animal Farm and 1984",
					"Evelyn, After: A Novel",
					"Angel Falls: A Novel"
				]

/* Objeto do tipo Carrinho */
function Carrinho(_dono) {
	this.dono = _dono;
	this.qntProdutos = 0;
	this.Produtos  = [];

	/* Função que faz a escolha do PC */
	this.add = function (produto) {
		if (IndexOfProdutos(this.Produtos,produto) >= 0) {
			this.Produtos[IndexOfProdutos(this.Produtos,produto)].quantidade += produto.quantidade;
		}

		else{
			this.Produtos[this.Produtos.length] = produto;
		}

		this.qntProdutos += produto.quantidade;
    };
}

function IndexOfProdutos(array, _produto){
	if (typeof array[0] !== 'undefined' && array[0] !== null) {
		for (var i = array.length - 1; i >= 0; i--) {
			if (array[i].codigo == _produto.codigo) {
				return i;
			}
		}

		return -1;
	}

	return -1;
}


var carrinhos = [];
var currentProduct;
var haveProduct = false;

function IndexOfCarrinhos(_user){
	if (typeof carrinhos[0] !== 'undefined' && carrinhos[0] !== null) {
		for (var i = carrinhos.length - 1; i >= 0; i--) {
			if (carrinhos[i].dono == _user) {
				return i;
			}
		}

		return -1;
	}

	return -1;
}


$(document).ready(function(){
    $(".badge").text("0");

    $("#cartIcon").hover(function(){
        	if ($(".badge").text() == '0') {
        		$('.tooltiptext').css("visibility", "visible");
        		$('.overlay').css("visibility", "visible");
        	}
        }, function(){
        $('.tooltiptext').css("visibility", "hidden");
        $('.overlay').css("visibility", "hidden");
    });

    $("#linkCadastro").click(function() {
    	haveProduct = false;
        $('#userModal').modal('show');
    })

    $("#sair").click(function() {
        sair();
    })

    $("#cadastro").submit(function(e){
    	cadastrar();
	    return false;
	});

    for (var i = 1; i <= produtosName.length; i++) {
    	$('#mainContent').append('<div class="col-sm-2 col-xs-12">'+ 
				'<div class="card-product" data-toggle="modal" data-target="#myModal'+i+'">'+ 
					'<img class="img-responsive" src="img/'+i+'.jpg">'+ 
					'<p class="productTitle text-center">'+produtosName[i-1]+'</p>'+ 
					'<p class="text-center" id="cardPrice'+i+'">R$ 35,00</p>'+ 
				'</div>'+ 
			'</div>'+ 

			'<!-- Modal -->'+ 
				'<div class="modal fade" id="myModal'+i+'">'+ 
					'<div class="modal-dialog modal-lg">'+ 
					  '<div class="modal-content">'+ 
					    '<div class="modal-header">'+ 
					      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+ 
					      '<h4 class="modal-title">'+produtosName[i-1]+'</h4>'+ 
					    '</div>'+ 
					    '<div class="modal-body">'+ 
					      '<table  class="table">'+ 
					          '<thead>'+
					          	'<th></th>'+ 
					          	'<th>código</th>'+
					          	'<th>peso</th>'+
					          	'<th>Quantidade</th>'+ 
					          	'<th>Preço</th>'+
					          	'<th>Total</th>'+
					          '</thead>'+ 
					          '<tbody>'+ 
					              '<tr>'+ 
					                  '<td><img src="img/'+i+'.jpg" style="max-width: 50%;"></td>'+
					                  '<td><p">isbn'+i+'</p></td>'+
					                  '<td><p">300g</p></td>'+ 
					                  '<td>'+ 
					                  	'<select class="form-control" onchange="price('+i+')" id="qnt'+i+'">'+ 
										  '<option value="1">1</option>'+ 
										  '<option value="2">2</option>'+ 
										  '<option value="3">3</option>'+ 
										  '<option value="4">4</option>'+ 
										  '<option value="5">5</option>'+ 
										  '<option value="6">6</option>'+ 
										  '<option value="7">7</option>'+ 
										  '<option value="8">8</option>'+ 
										  '<option value="9">9</option>'+ 
										  '<option value="10">10</option>'+ 
										'</select>'+ 
									  '</td>'+
									  '<td><p">R$ 35,00</p></td>'+ 
								      '<td><p id="price'+i+'">R$ 35,00</p></td>'+ 
					              '</tr>'+ 
					          '</tbody>'+ 
					      '</table>'+ 
					    '</div>'+ 
					    '<div class="modal-footer">'+ 
					    	'<button type="button" class="btn btn-primary" onclick="addToCart('+i+')" data-dismiss="modal">Adicionar ao carrinho</button>'+ 
					    '</div>'+ 
					  '</div><!-- /.modal-content -->'+ 
					'</div><!-- /.modal-dialog -->'+ 
				'</div><!-- /.modal -->'
		);
    }
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

	productQnt = parseInt(document.getElementById('qnt' + qnt).value);

	value += parseInt(document.getElementById('qnt' + qnt).value);

	$(".badge").text(value);

	document.getElementById('qnt' + qnt).value = 1;

	currentProduct = new Produto(("isbn"+qnt), ("img/"+qnt+".jpg"), produtosName[qnt-1], "", document.getElementById('cardPrice'+qnt).innerHTML, "300g", productQnt);

	haveProduct = true;

	/* Verifica se há carrinhos */
	if (typeof carrinhos[0] !== 'undefined' && carrinhos[0] !== null) {
		var ok = false;

		for (var i = carrinhos.length - 1; i >= 0; i--) {
			if (carrinhos[i].dono == document.getElementById('userNameLink').innerHTML) {
				carrinhos[i].add(currentProduct);
				ok = true;

				$('#cartModalTableBody').empty();

				var str;
				var res;

				var total = 0;

				for (var j = 0; j < carrinhos[i].Produtos.length; j++) {

					str = carrinhos[i].Produtos[j].preco;
					res = str.replace("R$ ", "");

					$('#cartModalTableBody').append('<tr>'+ 
								                  '<td><img src="'+carrinhos[i].Produtos[j].foto+'" style="max-width: 50%;"></td>'+
								                  '<td><p">'+carrinhos[i].Produtos[j].codigo+'</p></td>'+
								                  '<td><p">'+carrinhos[i].Produtos[j].nome+'</p></td>'+ 
								                  '<td><p">'+carrinhos[i].Produtos[j].descricao+'</p></td>'+ 
								                  '<td><p">'+carrinhos[i].Produtos[j].peso+'</p></td>'+
								                  '<td><p">'+carrinhos[i].Produtos[j].preco+'</p></td>'+
								                  '<td><p">'+carrinhos[i].Produtos[j].quantidade+'</p></td>'+
								                  '<td><p">R$'+(parseInt(carrinhos[i].Produtos[j].quantidade) * parseInt(res))+',00</p></td>'+  
								              '</tr>'
								    );

					total += (parseInt(carrinhos[i].Produtos[j].quantidade) * parseInt(res));
				}

				$('#cartModalTableBody').append('<tr>'+ 
								                  '<td></td>'+
								                  '<td></td>'+
								                  '<td></td>'+ 
								                  '<td></td>'+ 
								                  '<td></td>'+
								                  '<td></td>'+
								                  '<td></td>'+
								                  '<td><p">Total a pagar: R$'+total+',00</p></td>'+  
								              '</tr>'
								    );

				break;
			}
		}

		if (!ok) {
			$('#userModal').modal('show');
		}
	}else{
		$('#userModal').modal('show');
	}
}

function price(price){

	var str = (document.getElementById('cardPrice'+price).innerHTML);
	var res = str.replace("R$ ", "");

	initialPrice = parseInt(res);

	document.getElementById('price'+price).innerHTML = "R$ " + (initialPrice * document.getElementById('qnt' + price).value);
}


function cadastrar(){

	if (IndexOfCarrinhos(document.getElementById("userName").value) >= 0) {
		document.getElementById('userNameLink').innerHTML = document.getElementById("userName").value;
		 if (haveProduct) {
		 	carrinhos[IndexOfCarrinhos(document.getElementById("userName").value)].add(currentProduct);
		 }

		 var pro = carrinhos[IndexOfCarrinhos(document.getElementById("userName").value)].Produtos;
		
		$('#cartModalTableBody').empty();
				
		var total = 0;

		for (var j = 0; j < pro.length; j++) {

			var str = pro[j].preco;
			var res = str.replace("R$ ", "");

			$('#cartModalTableBody').append('<tr>'+ 
						                  '<td><img src="'+pro[j].foto+'" style="max-width: 50%;"></td>'+
						                  '<td><p">'+pro[j].codigo+'</p></td>'+
						                  '<td><p">'+pro[j].nome+'</p></td>'+ 
						                  '<td><p">'+pro[j].descricao+'</p></td>'+ 
						                  '<td><p">'+pro[j].peso+'</p></td>'+
						                  '<td><p">R$'+res+'</p></td>'+
						                  '<td><p">'+pro[j].quantidade+'</p></td>'+ 
						                  '<td><p">R$'+(parseInt(pro[j].quantidade) * parseInt(res))+',00</p></td>'+ 
						              '</tr>'
						    );
			total += (parseInt(pro[j].quantidade) * parseInt(res));
		}

		$('#cartModalTableBody').append('<tr>'+ 
							                  '<td></td>'+
							                  '<td></td>'+
							                  '<td></td>'+ 
							                  '<td></td>'+ 
							                  '<td></td>'+
							                  '<td></td>'+
							                  '<td></td>'+
							                  '<td><p">Total a pagar: R$'+total+',00</p></td>'+  
								              '</tr>'
								    );
	}else{
		cart = new Carrinho(document.getElementById("userName").value);
		document.getElementById('userNameLink').innerHTML = document.getElementById("userName").value;
		if (haveProduct) {
			cart.add(currentProduct);
		}

		carrinhos[carrinhos.length] = cart;

		var pro = carrinhos[IndexOfCarrinhos(document.getElementById("userName").value)].Produtos;
		
		$('#cartModalTableBody').empty();
		
		var total = 0;

		for (var j = 0; j < pro.length; j++) {

			var str = pro[j].preco;
			var res = str.replace("R$ ", "");

			$('#cartModalTableBody').append('<tr>'+ 
						                  '<td><img src="'+pro[j].foto+'" style="max-width: 50%;"></td>'+
						                  '<td><p">'+pro[j].codigo+'</p></td>'+
						                  '<td><p">'+pro[j].nome+'</p></td>'+ 
						                  '<td><p">'+pro[j].descricao+'</p></td>'+ 
						                  '<td><p">'+pro[j].peso+'</p></td>'+
						                  '<td><p">R$'+res+'</p></td>'+
						                  '<td><p">'+pro[j].quantidade+'</p></td>'+ 
						                  '<td><p">R$'+(parseInt(pro[j].quantidade) * parseInt(res))+',00</p></td>'+ 
						              '</tr>'
						    );
			total += (parseInt(pro[j].quantidade) * parseInt(res));
		}

		$('#cartModalTableBody').append('<tr>'+ 
						                  '<td></td>'+
						                  '<td></td>'+
						                  '<td></td>'+ 
						                  '<td></td>'+ 
						                  '<td></td>'+
						                  '<td></td>'+
						                  '<td></td>'+
						                  '<td><p">Total a pagar: R$'+total+',00</p></td>'+  
							              '</tr>'
								    );
	}

	$(".badge").text(carrinhos[IndexOfCarrinhos(document.getElementById("userName").value)].qntProdutos);

	$('#userModal').modal('toggle');

	document.getElementById("userName").value = '';	
}




function sair(){
	document.getElementById('userNameLink').innerHTML = 'Usuário';
	$(".badge").text('0');
	$('#cartModalTableBody').empty();
}


function seeCart(){
	if ($(".badge").text() != '0') {
		$('#cartModal').modal('toggle');
	}
}