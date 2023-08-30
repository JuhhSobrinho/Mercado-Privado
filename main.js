import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


// conexão com o banco de dados, cujo não é banco e sim um json, mas é sobre

let bd; // Declaração da variável fora do escopo do .then
fetch('./model/bd.json')
  .then(response => response.json())
  .then(data => {
    bd = data; // Atribuição dos dados à variável bd
    // Chamar funções ou realizar operações que dependem de bd aqui
    processBDData();
  })
  .catch(error => {
    console.error('Erro ao carregar o arquivo JSON:', error);
  });




//      declarando a onde vou colocar as informações, que no caso é roupas vendendo e a roupa em destaque
const sectionRoupa = document.querySelector('.itens');
const sectionDestaque = document.querySelector('.destaque');

//      pelo fato de no banco estar o tipo de roupa no valor booleano, necessita de verificação
function tipo(tipo) {
  if (tipo) {
    var tipoRoupa = 'feminino';
  } else {
    var tipoRoupa = 'masculino';
  }
  return tipoRoupa;
}




//      aqui seria a main da para sacou ? onde tem o processo dos dados e onde são usados e puxados os dados do banco
function processBDData() {
  console.log(bd);

  const destaque = Math.floor(Math.random() * bd.length);
  const itemDestaque = bd[destaque];
  let itemDestaquehtml = '';

  itemDestaquehtml += `
  <div class="roupaDestaque">
    <img src="./assets/img/${itemDestaque.imagem}.jpg"," class="roupaImgDestaque" alt="${itemDestaque.nome}">
    <div class="desDestaque">
      <p class="destaDados" id="destaNome">${itemDestaque.nome}</p>
      <p class="destaDados" id="destaPreco">R$:${itemDestaque.preco}</p>
      <p class="destaDados">Marca: ${itemDestaque.marca}</p>
      <p class="destaDados">Tipo: ${tipo(itemDestaque.feminino)}</p>
      <div class="botaoCarr">
      <button class="botao">Comprar</button>
      <img src="./assets/logo/compras.png" class="carUser" alt="adicionar ao carrinho">
      </div>   
    </div>    
  </div>`;

  sectionDestaque.innerHTML = itemDestaquehtml;


  let itensRoupahtml = '';
  for (let i = 0; i < bd.length; i++) {
    const element = bd[i];

    itensRoupahtml += `
    <div class="roupa">
      <img src="./assets/img/${element.imagem}.jpg"," class="roupaImg" alt="${element.nome}">
      <div class="descricao">
        <p class="desDados" id="desNome">${element.nome}</p>
        <p class="desDados" id="desPreco">R$:${element.preco}</p>
        <p class="desDados">Marca: ${element.marca}</p>
        <p class="desDados">Tipo: ${tipo(element.feminino)}</p>
        <div class="botaoCarr">
        <button class="botao">Comprar</button>
        <img src="./assets/logo/compras.png" class="carUser" alt="adicionar ao carrinho">
        </div>   
      </div>
      </div>`;
  }


  console.log(document);
  sectionRoupa.innerHTML = itensRoupahtml;

}
