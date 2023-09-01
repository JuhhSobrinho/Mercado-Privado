import { carregarBancoDeDados } from '../model/model';

carregarBancoDeDados()
  .then(bd => {
    renderizarCarrinho(bd);
  });

const idsProdutoCarrinhoComQuantidade = {};

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

}

/////////////////////// Aumenta numero no ***carrinho***, ***diminui*** e ***atualiza*** o nuemro que mostra no card
function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    renderizarCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    atualizarInfoQuantidade(idProduto);
};

function decrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    atualizarInfoQuantidade(idProduto);
};

function atualizarInfoQuantidade(idProduto) {
    const quantidadeDeTalItem = document.querySelector(`#numbPecas${idProduto}`);
    quantidadeDeTalItem.innerHTML = idsProdutoCarrinhoComQuantidade[idProduto];
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
        removerDoCarrinho(idProduto);
    });

    botaoAdicionar.addEventListener("click", () => {
        incrementarQuantidadeProduto(`${produto.id}`);
    });

    botaoMenos.addEventListener("click", () => {
        decrementarQuantidadeProduto(`${produto.id}`);

        if (idsProdutoCarrinhoComQuantidade[idProduto] === 0) {
            removerDoCarrinho(idProduto);
            return;
        }
        console.log(idsProdutoCarrinhoComQuantidade[idProduto]);
    });

    return;

}


function renderizarCarrinho(bd) {
    const containerProdutosCarrinho = document.querySelector('#produtosCarrinho');
    containerProdutosCarrinho.innerHTML = ``;

    console.log(idsProdutoCarrinhoComQuantidade);


    for (const ids in idsProdutoCarrinhoComQuantidade) {
        console.log(idsProdutoCarrinhoComQuantidade);
        desenharProdutoCarrinho(ids, bd);
    }


}


export function adicionarAoCarrinho(idProduto, bd) {
    if (idProduto in idsProdutoCarrinhoComQuantidade) {
        incrementarQuantidadeProduto(idProduto);

        return; // finaliza o processo e stop a função, assim não executando o codigo fora do if
    }



    idsProdutoCarrinhoComQuantidade[idProduto] = 1;

    desenharProdutoCarrinho(idProduto, bd); // Obtém o botão do objeto retornado

}
