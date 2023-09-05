import './style.css';
import { carregarBancoDeDados } from './model/model';
import { meuCarrinho } from './src/meuCarrinho';
import { adicionarAoCarrinho } from './src/meuCarrinho';
import { pesquisaResultado } from './src/pesquisa';
import { renderizarCarrinho } from './src/meuCarrinho';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

//      declarando a onde vou colocar as informações, que no caso é roupas vendendo e a roupa em destaque
const sectionRoupa = document.querySelector('.itens');
const sectionDestaque = document.querySelector('.destaque');

// /////////////////////////// nome já diz carrega o banco
carregarBancoDeDados()
  .then(bd => {
    processBDData(bd);
    meuCarrinho(bd);
  });


//      aqui seria a main da para sacou ? onde tem o processo dos dados e onde são usados e puxados os dados do banco
export function processBDData(bd) {
  console.log(bd);

  //      pelo fato de no banco estar o tipo de roupa no valor booleano, necessita de verificação

  function tipo(tipo) {
    if (tipo) {
      return 'feminino';
    } else {
      return 'masculino';
    }
  }

  const destaque = Math.floor(Math.random() * bd.length);
  const itemDestaque = bd[destaque];
  let itemDestaquehtml = '';

  itemDestaquehtml += `
  <div class="roupaDestaque" id="card-destaque${itemDestaque.id}">
    <img src="./assets/img/${itemDestaque.imagem}.jpg"," class="roupaImgDestaque" alt="${itemDestaque.nome}">
    <div class="desDestaque">
      <p class="destaDados" id="destaNome">${itemDestaque.nome}</p>
      <p class="destaDados" id="destaPreco">R$:${itemDestaque.preco}</p>
      <p class="destaDados">Marca: ${itemDestaque.marca}</p>
      <p class="destaDados">Tipo: ${tipo(itemDestaque.feminino)}</p>
      <div class="botaoCarr" id="botaoCarDestaque">
      <button class="botao">Comprar</button>
      <button id="addCarrinho${itemDestaque.id}">
        <img src="./assets/logo/addCarrinho.svg" class="carUser" alt="adicionar ao carrinho">
      </button>
      </div>   
    </div>    
  </div>`;

  sectionDestaque.innerHTML = itemDestaquehtml;


  let itensRoupahtml = '';
  for (let i = 0; i < bd.length; i++) {
    const element = bd[i];

    itensRoupahtml = `
    <div class="roupa" id="card-produto${element.id}">
      <img src="./assets/img/${element.imagem}.jpg"," class="roupaImg" alt="${element.nome}">
      <div class="descricaoBotao">
      <div class="descricao">
          <p class="desDados" id="desNome">${element.nome}</p>
          <p class="desDados" id="desPreco">R$:${element.preco}</p>
          <p class="desDados">Marca: ${element.marca}</p>
          <p class="desDados">Tipo: ${tipo(element.feminino)}</p>
        </div>
        <div class="botaoCarr">
        <button class="botao">Comprar</button>
        <button id="addCarrinho${element.id}">
          <img src="./assets/logo/addCarrinho.svg" class="carUser" alt="adicionar ao carrinho">
        </button>
        </div>   
      </div>
      </div>`;

    sectionRoupa.innerHTML += itensRoupahtml;
  }

  for (let i = 0; i < bd.length; i++) {
    const element = bd[i];

    const botaoAddCar = document.querySelector(`#addCarrinho${element.id}`);
    botaoAddCar.addEventListener('click', () => {
      adicionarAoCarrinho(element.id, bd);
    });
  }

  meuCarrinho(bd);
  pesquisaResultado(bd);

}
