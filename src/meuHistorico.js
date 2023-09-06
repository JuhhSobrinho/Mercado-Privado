import { seTLocarStorage, geTLocalStorage } from "../public/model/model.js";


////////// (??) operador de coalescência nula, caso GetLocalStorage seja nulo/sla primeir vez que abre o site, se sim ele ira executar como {}
const idsProdutoCarrinhoComQuantidade = geTLocalStorage("historico");


const abrirHistorico = document.querySelector('#botaoHistorico');
const closeHistorico = document.querySelector('#closeHistorico');
const main = document.querySelector('#main');
const historico = document.querySelector('#sectionHistorico');

export function meuHistorico(bd) {

    console.log("lozaoooooo", geTLocalStorage("historico"));


    abrirHistorico.addEventListener('click', () => {
        historico.style.transition = '1s';
        historico.style.background = '#24103c';
        historico.style.right = '0';

    })

    closeHistorico.addEventListener('click', () => {
        facharHis()
    })


    renderizarCarrinho(bd);

}

export function finalizaComp() {
    facharHis()
    main.style.transition = '0.3s';
    main.style.opacity = '0';

    setTimeout(() => {
        window.location.href = "./checkout.html";
        main.style.opacity = '1';
    }, 1500);

}

function facharHis() {
    historico.style.transition = '1s';
    historico.style.background = 'transparent';
    historico.style.right = '-380px';
}



/////////////////////// Aumenta numero no ***carrinho***, ***diminui*** e ***atualiza*** o nuemro que mostra no card

export function atualizarInfoQuantidade(idProduto) {
    const quantidadeDeTalItem = document.querySelector(`#numbPecas${idProduto}`);
    quantidadeDeTalItem.innerHTML = idsProdutoCarrinhoComQuantidade[idProduto];
    seTLocarStorage("historico", idsProdutoCarrinhoComQuantidade);
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
    const containerProdutosCarrinho = document.querySelector('#produtosHistorico');

    ///////////////////     CRIANDO HTML no js ao invez de tacar texto no html e o baguio precisar desmontar e montar
    const elementoArticleHTML = document.createElement("article");  //<artcle></article>
    elementoArticleHTML.classList.add("carrProduto");
    ////////////////// o conteudo dentro do cartão não precisa mudar para html, texto já funfa
    const cartaoProdutoCarrinho = `
        <div class="imgComDescricao">
            <img src="./assets/img/${produto.imagem}.jpg" class="carrImg" alt="Image">
            <div class="carrDescricao">
                <p class="carrDados" id="carrNome">${produto.nome}</p>
                <p class="carrDados" id="carrPreco">R$: ${produto.preco}</p>
                <p class="carrDados" id="carrTipo">Tipo: ${tipo(produto.tipo)}</p>
                <p class="carrDados" id="carrMarca">Marca: ${produto.marca}</p>
            </div>
        </div>
        <div class="numbProdutos">
            <p class="numbDados" id="numbPecas${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>       
        </div>`;

    elementoArticleHTML.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticleHTML);

    return;

}


export function renderizarCarrinho(bd) {
    const containerProdutosCarrinho = document.querySelector('#produtosHistorico');
    containerProdutosCarrinho.innerHTML = ``;

    for (const ids in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoCarrinho(ids, bd);
        atualizarPrecoCarrinho(ids, bd)
    }


}

export function atualizarPrecoCarrinho(idProduto, bd) {
    const precoCarrinho = document.querySelector('#desPrecoTotalHistorico');
    let precoTotal = 0;

    for (const ads in idsProdutoCarrinhoComQuantidade) {
        precoTotal += bd.find((p) => p.id === ads).preco * idsProdutoCarrinhoComQuantidade[ads];
    }

    precoCarrinho.innerHTML = ` R$: ${precoTotal}`;
}