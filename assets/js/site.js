
// Configuração da paginação
var page = 1;
var max_pages = 0;

// Separarando a página atual do resto do array
function paginacao(array, reg_per_page, page_number){
  --page_number;
  return array.slice(page_number * reg_per_page, (page_number + 1) * reg_per_page);
}

function reloadPages(){

	// Localizando a div dentro do HTML
	var div = document.getElementById('texto');
	var div2 = document.getElementById('visto');

	// Número total de paginas
	max_pages = Math.ceil((jsonData.recommendation.length) / 4);

	// Registros por pagina
	reg_per_page = 4;

	// Número total de registros
	total_reg = jsonData.recommendation.length;

	// Separando a página atual do resto da array
	array_paginada = paginacao(jsonData.recommendation, 4, page);

	// Limpando o conteúdo para uma nova pagina
	div.innerHTML = "";
	div2.innerHTML = `<div class='bloco'>
						<img src="${jsonData.reference.item.imageName}">
						<div class="descricao">
							<a href="${jsonData.reference.item.detailUrl}" target="_blank">
								${jsonData.reference.item.name.substr(0,60)}...
							</a>
							<span class='preco_antigo'>
								${jsonData.reference.item.oldPrice}
							</span>
							<span class='valores'>
								Por: 
								<span class='preco_maior'>
									${jsonData.reference.item.price}
								</span> 
								${jsonData.reference.item.productInfo.paymentConditions}
							</span>
						</div>
					</div>`;
	
	var toAdd = document.createDocumentFragment();

	// Rodando o loop para os itens
    for(var block in array_paginada){
    	
    	block_business_id = array_paginada[block].businessId;
       	block_name = array_paginada[block].name.substr(0,60)+"...";
       	block_img = array_paginada[block].imageName;
       	block_detail_link = array_paginada[block].detailUrl;
       	block_price = array_paginada[block].price;
       	block_old_price = array_paginada[block].oldPrice;
       	block_old_price = (block_old_price == null) ? "" : "De: " + block_old_price;
       	block_payment = array_paginada[block].productInfo.paymentConditions;
       	var bloco = document.createElement("DIV"); 
       	bloco.className = "bloco";
		bloco.innerHTML = `<img src="${block_img}">
								<div class="descricao">
							   		<a href="${block_detail_link}" target="_blank">
							   			${block_name}
									</a>
									<span class="preco_antigo">
										${block_old_price}
									</span>
									<span class="valores">
										Por: 
										<span class="preco maior">
											${block_price}
										</span>
											 ou 
										<span class="preco">
											${block_payment}
										</span>
										 sem juros
									</span> 
								</div>`;
       	toAdd.appendChild(bloco);
    }
    div.appendChild(toAdd);			
}

// Lidando com o click para a paginação anterior
function previousPage(){
	if(page > 1) page--;
	reloadPages();
}

// Lidando com o click para a paginação seguinte
function nextPage(){
	if(page < max_pages) page++;
	reloadPages();
}

// Fazendo fetch do json (Arquivo local)
let jsonUrl = './assets/js/dados.json';
let jsonData;

fetch(jsonUrl)
	.then(res => res.json())
	.then(data => {
		jsonData = data.data;
		reloadPages();
	})
	.catch(function (err) {
        return err;
    });
