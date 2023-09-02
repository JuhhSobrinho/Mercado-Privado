import { adicionarAoCarrinho } from '../src/meuCarrinho';

export function pesquisaResultado(bd) {
    const pesquisa = document.querySelector('.lupaText');
    const resultadoPesquisa = document.querySelector('.itens');
    const sectionDestaque = document.querySelector('.destaque');

    function tipo(feminino) {
        return feminino ? "Feminino" : "Masculino";
    }

    pesquisa.addEventListener('input', () => {
        const valorPesquisa = pesquisa.value.toLowerCase();
        
        sectionDestaque.style.transition = '2s';
        sectionDestaque.style.height = '150px';
        sectionDestaque.addEventListener('mouseenter', () => {
            sectionDestaque.style.transition = '2s'; // Adicione a transição
            sectionDestaque.style.height = '450px'; // Altere a altura no hover
          });
        // Limpe o conteúdo atual antes de exibir os novos resultados
        resultadoPesquisa.innerHTML = '';

        for (let i = 0; i < bd.length; i++) {
            const element = bd[i];
            const nomeProduto = element.nome.toLowerCase();

            if (nomeProduto.includes(valorPesquisa)) {
                const itensRoupahtml = `
                    <div class="roupa" id="card-produto${element.id}">
                      <img src="./assets/img/${element.imagem}.jpg" class="roupaImg" alt="${element.nome}">
                      <div class="descricaoBotao">
                        <div class="descricao">
                          <p class="desDados" id="desNome">${element.nome}</p>
                          <p class="desDados" id="desPreco">R$:${element.preco}</p>
                          <p class="desDados">Marca: ${element.marca}</p>
                          <p class="desDados">Tipo: ${tipo(element.feminino)}</p>
                        </div>
                        <div class="botaoCarr">
                          <button class="botao">Comprar</button>
                          <button id="addCarrinho${element.id}" class="botaoAddCarrinho">
                            <img src="./assets/logo/addCarrinho.svg" class="carUser" alt="adicionar ao carrinho">
                          </button>
                        </div>   
                      </div>
                    </div>`;

                resultadoPesquisa.innerHTML += itensRoupahtml;
            }
        }

        // Adicione ouvintes de eventos aos botões "Adicionar ao Carrinho"
        const botoesAddCarrinho = document.querySelectorAll('.botaoAddCarrinho');
        botoesAddCarrinho.forEach(botao => {
            botao.addEventListener('click', () => {
                const idProduto = botao.id.replace('addCarrinho', ''); // Obtenha o ID do produto
                adicionarAoCarrinho(idProduto, bd);
                console.log("Produto adicionado ao carrinho.");
            });
        });
    });

    sectionDestaque.style.transition = '2s';
    sectionDestaque.style.background = '#ccdcff;'
}
