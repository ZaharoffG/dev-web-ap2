const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);
let dados;



if(sessionStorage.getItem('login') == 0) {
    container.innerHTML = '<p>Login não autorizado</p>';
} else {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if(id > 60){
        alert('atleta inexistente')
    } else{
        const pegaDados = async (caminho) => {
            const resposta = await fetch(caminho);
            const dados = await resposta.json();
            return dados;
        }
        
        pegaDados(`https://botafogo-atletas.mange.li/2024-1/${id}/`).then(
            (entrada) => {
            dados = entrada;
            for(const propriedade in dados){
                    localStorage.setItem(propriedade, dados[propriedade]);
            }
        })
    
    
        
        const divImagem = document.createElement('div');
        divImagem.className = 'imagem';
        container.appendChild(divImagem);
    
        const imagem = document.createElement('img');
        imagem.src = localStorage.getItem('imagem');
        imagem.alt = `Foto de ${localStorage.getItem('nome')}`;
        imagem.className = 'foto';
        divImagem.appendChild(imagem);
    
        const nome = document.createElement('div');
        nome.className = 'nome';
        nome.innerHTML = `<p>${localStorage.getItem('nome')}</p>`;
        divImagem.appendChild(nome);
    
        const divDetalhes = document.createElement('div');
        divDetalhes.className = 'detalhes';
        divDetalhes.innerHTML = `
        <p id="descri"> ${localStorage.getItem('descricao')}</p>
        <p><strong>Jogos pelo Botafogo:</strong> ${localStorage.getItem('numJogos')}<br>
                   <strong>Nascimento:</strong> ${localStorage.getItem('nascimento')}<br>
                   <strong>Altura:</strong> ${localStorage.getItem('altura')}<br>
                   <strong>Naturalidade:</strong> ${localStorage.getItem('naturalidade')}
        </p>
        `;
    
        const voltar = document.createElement('button');
        voltar.className = 'voltar';
        voltar.id = 'voltar'
        voltar.innerHTML = 'Voltar';
        divDetalhes.appendChild(voltar);
    
        container.appendChild(divDetalhes);
    
        document.getElementById('voltar').onclick = () => {
            history.back();
        }
    
    }

    
}