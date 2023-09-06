import { carregarBancoDeDados } from './public/model/model';
import { meuCarrinho, adicionarAoCarrinho , finalizaComp} from './src/meuCarrinho';
import { meuHistorico } from './src/meuHistorico';
import { pesquisaResultado } from './src/pesquisa';

//      declarando a onde vou colocar as informações, que no caso é roupas vendendo e a roupa em destaque
const sectionRoupa = document.querySelector('.itens');
const sectionDestaque = document.querySelector('.destaque');
const mainIndex = document.querySelector('#main');
// /////////////////////////// nome já diz carrega o banco
carregarBancoDeDados()
  .then(bd => {
    main(bd);
    meuCarrinho(bd);
    meuHistorico(bd);
  });


//      aqui seria a main da para sacou ? onde tem o processo dos dados e onde são usados e puxados os dados do banco
export function main(bd) {
  console.log(sectionRoupa);
  mainIndex.style.transition = '0.3s';
  mainIndex.style.opacity = '1';


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
      <button class="botao" id="comprar${itemDestaque.id}">Comprar</button>
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
        <button class="botao" id="comprar${element.id}">Comprar</button>
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

    const compra = document.querySelector(`#comprar${element.id}`);
    compra.addEventListener('click', () => {
      adicionarAoCarrinho(element.id, bd);
      finalizaComp();
    });
  }



  meuCarrinho(bd);
  meuHistorico(bd);
  pesquisaResultado(bd);

}
