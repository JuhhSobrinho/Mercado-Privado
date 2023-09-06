import { seTLocarStorage, geTLocalStorage, carregarBancoDeDados } from "../public/model/model.js";

const idsProdutoCarrinhoComQuantidade = geTLocalStorage("carrinho") ?? {};

carregarBancoDeDados()
    .then(bd => {
        compraFinal(bd);
    });


function compraFinal(bd) {


    console.log("bd da compra", bd);

    const header = document.querySelector('#paginaInicial');
    header.addEventListener("click", () => {
        window.location.href = "./index.html";
    })


    const compraHistorico = document.querySelector('#compradoHistorico');
    const main = document.querySelector('#main');

    main.style.transition = "0.2s";
    main.style.opacity = "1";

    compraHistorico.addEventListener('click', () => {
        console.log("comprado");

        
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho"));
        seTLocarStorage("historico", carrinhoAtual);


        for (const ads in idsProdutoCarrinhoComQuantidade) {
            console.log(ads, idsProdutoCarrinhoComQuantidade);
            delete idsProdutoCarrinhoComQuantidade[ads];
        }
        seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    
        main.style.transition = "0.5s";
        main.style.opacity = "0";
        setTimeout(() => {

            window.location.href = "../index.html";
        }, 1500);
    })

    renderizarCarrinho(bd);
}


/////////////////////// Aumenta numero no ***carrinho***, ***diminui*** e ***atualiza*** o nuemro que mostra no card

function removerDoCarrinho(idProduto, bd) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    console.log("bdRemove", bd);
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    renderizarCarrinho(bd);
    atualizarPrecoCarrinho(idProduto, bd);
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



////////////////////////////////////////////////////////////
function atualizarInfoQuantidade(idProduto) {
    const quantidadeDeTalItem = document.querySelector(`#numbPecas${idProduto}`);
    console.log("isso", idsProdutoCarrinhoComQuantidade[idProduto]);
    console.log("documento", document);
    console.log("id", idProduto);
    console.log("o html", quantidadeDeTalItem);
    quantidadeDeTalItem.innerHTML = idsProdutoCarrinhoComQuantidade[idProduto];
    seTLocarStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}

function atualizarPrecoCarrinho(idProduto, bd) {
    const precoCarrinho = document.querySelector('#desPrecoTotal');
    let precoTotal = 0;
    console.log("id", idProduto);
    console.log("banquinho", bd);
    console.log("idsProdutoCarrinhoComQuantidade", idsProdutoCarrinhoComQuantidade);

    for (const ads in idsProdutoCarrinhoComQuantidade) {
        precoTotal += bd.find((p) => p.id === ads).preco * idsProdutoCarrinhoComQuantidade[ads];
    }

    precoCarrinho.innerHTML = ` R$: ${precoTotal}`;
}

function renderizarCarrinho(bd) {
    const containerProdutosCarrinho = document.querySelector('#itensDoCarrinho');
    containerProdutosCarrinho.innerHTML = ``;
    console.log("renderiza");
    console.log(bd);

    console.log(idsProdutoCarrinhoComQuantidade);


    for (const ids in idsProdutoCarrinhoComQuantidade) {
        console.log(idsProdutoCarrinhoComQuantidade);
        desenharProdutoCarrinho(ids, bd);
        atualizarPrecoCarrinho(ids, bd);
    }


}




//////////////////////////////////////////////////////////
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
    const containerProdutosCarrinho = document.querySelector('#itensDoCarrinho');

    ///////////////////     CRIANDO HTML no js ao invez de tacar texto no html e o baguio precisar desmontar e montar
    const elementoArticleHTML = document.createElement("article");  //<artcle></article>
    elementoArticleHTML.classList.add("carrProduto");
    ////////////////// o conteudo dentro do cartão não precisa mudar para html, texto já funfa
    const cartaoProdutoCarrinho = `
        <div class="imgComDescricao">
            <img src="./assets/img/${produto.imagem}.jpg" class="carrImg" alt="Image">
            <button id="removeItem${produto.id}">
                <img src="./assets/logo/removeItemBlack.svg" alt="Image">
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
