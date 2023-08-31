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

export function adicionarAoCarrinho(idProduto, bd) {
    function tipo(tipo) {
        if (tipo) {
            return 'feminino';
        } else {
            return 'masculino';
        }
    }

    // find(percorre o banco e verifica se o idProduto, cujo é enviado pelo main, é igual a algum id dentro de BD)
    const produto = bd.find((produto) => produto.id === idProduto);

    console.log(produto.nome);
    const containerProdutosCarrinho = document.querySelector('#produtosCarrinho');
    const cartaoProdutoCarrinho = `<article class="carrProduto">


    <img src="./assets/img/${produto.imagem}.jpg" class="carrImg" alt="Image">
    <button id="removeItem">
        <img src="./assets/logo/removeItem.svg" alt="Image">
    </button>
    <div class="carrDescricao">
      <p class="carrDados" id="carrNome">${produto.nome}</p>
      <p class="carrDados" id="carrPreco">R$: ${produto.preco}</p>
      <p class="carrDados" id="carrTipo">Tipo: ${tipo(produto.tipo)}</p>
      <p class="carrDados" id="carrMarca">Marca: ${produto.marca}</p>
    </div>
  </article>`;

    console.log(bd);

    containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
}
