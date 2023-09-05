
export function carregarBancoDeDados() {
    return fetch('./model/bd.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}



////////////// utilizando a emmoria cache do navegador, ou seja, tipo um banco de dados provisorio

///////////// como costume de POO, set armazena e get puxa/mostra
export function seTLocarStorage(chave, info){
    localStorage.setItem(chave, JSON.stringify(info)); ///O json pega a parada muda pra string e salva nele. ////salva a ids
}

export function geTLocalStorage(chave){
    return  JSON.parse(localStorage.getItem(chave)); ///nesse caso é o contrario, json pega e transforma em objeto oq era texto/string
}