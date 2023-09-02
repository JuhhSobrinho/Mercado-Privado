import { seTLocarStorage, geTLocalStorage } from "../model/model";


////////// (??) operador de coalescência nula, caso GetLocalStorage seja nulo/sla primeir vez que abre o site, se sim ele ira executar como {}
const idsProdutoCarrinhoComQuantidade = geTLocalStorage("carrinho") ?? {};

export function meuCarrinho(bd) {
    const abrirCarrinho = document.querySelector('#abrirCarrinho');
    const closeCarrinho = document.querySelector('#closeCarrinho');

    const carrinho = document.querySelector('#carrinho');


    abrirCarrinho.addEventListener('click', () => {
        carrinho.style.transition = '1s';
        carrinho.style.background = '#24103c';
        carrinho.style.right = '0';

    })

    closeCarrinho.addEventListener('click', () => {
        carrinho.style.transition = '2s';
        carrinho.style.background = 'transparent';
        carrinho.style.right = '-380px';
    })

    console.log("botão do carrinho");
    renderizarCarrinho(bd) 

}

/////////////////////// Aumenta numero no ***carrinho***, ***diminui*** e ***atualiza*** o nuemro que mostra no card
function removerDoCarrinho(idProduto, bd) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    console.log("bdRemove", bd);
    atualizarPrecoCarrinho(idProduto, bd);
    renderizarCarrinho(bd);
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}

function incrementarQuantidadeProduto(idProduto, bd) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    console.log("Incrementa", bd);
    atualizarPrecoCarrinho(idProduto, bd);
    atualizarInfoQuantidade(idProduto);
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
};

function decrementarQuantidadeProduto(idProduto, bd) {
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    console.log("Decrementa", bd);
    atualizarPrecoCarrinho(idProduto, bd);
    atualizarInfoQuantidade(idProduto);
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
};

function atualizarInfoQuantidade(idProduto) {
    const quantidadeDeTalItem = document.querySelector(`#numbPecas${idProduto}`);
    console.log("isso", idsProdutoCarrinhoComQuantidade[idProduto]);
    console.log("documento",document);
    console.log("id", idProduto);
    console.log("o html", quantidadeDeTalItem);
    quantidadeDeTalItem.innerHTML = idsProdutoCarrinhoComQuantidade[idProduto];
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}
/////////////////////// 




function desenharProdutoCarrinho(idProduto, bd) {
    function tipo(tipo) {
        if (tipo) {
            return 'feminino';
        } else {
            return 'masculino';
        }
    }
    console.log("bdDesenhar");
    console.log(bd);

    // find(percorre o banco e verifica se o idProduto, cujo é enviado pelo main, é igual a algum id dentro de BD)
    const produto = bd.find((produto) => produto.id === idProduto);
    const containerProdutosCarrinho = document.querySelector('#produtosCarrinho');

    ///////////////////     CRIANDO HTML no js ao invez de tacar texto no html e o baguio precisar desmontar e montar
    const elementoArticleHTML = document.createElement("article");  //<artcle></article>
    elementoArticleHTML.classList.add("carrProduto");
    ////////////////// o conteudo dentro do cartão não precisa mudar para html, texto já funfa
    const cartaoProdutoCarrinho = `
        <div class="imgComDescricao">
            <img src="./assets/img/${produto.imagem}.jpg" class="carrImg" alt="Image">
            <button id="removeItem${produto.id}">
                <img src="./assets/logo/removeItem.svg" alt="Image">
            </button>
            <div class="carrDescricao">
                <p class="carrDados" id="carrNome">${produto.nome}</p>
                <p class="carrDados" id="carrPreco">R$: ${produto.preco}</p>
                <p class="carrDados" id="carrTipo">Tipo: ${tipo(produto.tipo)}</p>
                <p class="carrDados" id="carrMarca">Marca: ${produto.marca}</p>
            </div>
        </div>
        <div class="numbProdutos">
            <button class="numbDados" id="botaoMenos${produto.id}"> - </button>
            <p class="numbDados" id="numbPecas${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
            <button class="numbDados" id="adicionarMaisItem${produto.id}"> + </button>
        
        </div>`;

    elementoArticleHTML.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticleHTML);

    const botaoRemoveItem = document.querySelector(`#removeItem${produto.id}`);
    const botaoAdicionar = document.querySelector(`#adicionarMaisItem${produto.id}`);
    const botaoMenos = document.querySelector(`#botaoMenos${produto.id}`);

    botaoRemoveItem.addEventListener("click", () => {
        removerDoCarrinho(idProduto, bd);
    });

    botaoAdicionar.addEventListener("click", () => {
        incrementarQuantidadeProduto(idProduto, bd);
    });

    botaoMenos.addEventListener("click", () => {
        decrementarQuantidadeProduto(idProduto, bd);

        if (idsProdutoCarrinhoComQuantidade[idProduto] === 0) {
            removerDoCarrinho(idProduto, bd);
            return;
        }
        console.log(idsProdutoCarrinhoComQuantidade[idProduto]);
    });

    return;

}


export function renderizarCarrinho(bd) {
    const containerProdutosCarrinho = document.querySelector('#produtosCarrinho');
    containerProdutosCarrinho.innerHTML = ``;
    console.log("renderiza");
    console.log(bd);

    console.log(idsProdutoCarrinhoComQuantidade);


    for (const ids in idsProdutoCarrinhoComQuantidade) {
        console.log(idsProdutoCarrinhoComQuantidade);
        desenharProdutoCarrinho(ids, bd);
    }


}

function atualizarPrecoCarrinho(idProduto, bd){
    const precoCarrinho = document.querySelector('#desPrecoTotal');
    let precoTotal = 0;
    console.log("id", idProduto);
    console.log("banquinho", bd);
    console.log("idsProdutoCarrinhoComQuantidade",idsProdutoCarrinhoComQuantidade);

    for (const ads in idsProdutoCarrinhoComQuantidade) {
        precoTotal += bd.find((p) => p.id === ads).preco *  idsProdutoCarrinhoComQuantidade[ads];
    }

    precoCarrinho.innerHTML =` R$: ${precoTotal}`;
}




export function adicionarAoCarrinho(idProduto, bd) {
    renderizarCarrinho(bd)
    if (idProduto in idsProdutoCarrinhoComQuantidade) {
        incrementarQuantidadeProduto(idProduto, bd);

        return; // finaliza o processo e stop a função, assim não executando o codigo fora do if
    }



    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    atualizarPrecoCarrinho(idProduto, bd);
    desenharProdutoCarrinho(idProduto, bd); // Obtém o botão do objeto retornado
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}
