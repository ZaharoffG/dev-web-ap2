if(sessionStorage.getItem('login') == 0){
    alert("login nao autorizado")
} else {
    let dados;

    const banner = document.createElement('div');
    banner.className = 'banner';

    const titulo = document.createElement('p');
    titulo.className = 'titulo';
    titulo.innerHTML = '<p>Atletas Botafogo 2024.1</p>';

    const sair = document.createElement('button');
    sair.className = 'sair';
    sair.id = 'sair';
    sair.innerHTML = 'sair';
    sair.id = "sair";

    banner.appendChild(titulo)
    banner.appendChild(sair)
    document.body.appendChild(banner)

    document.getElementById('sair').onclick = () => {
        sessionStorage.setItem('login', 0);
        window.location.href='index.html';
    }

    const divBtns = document.createElement('div');
    divBtns.className = 'divBtns';

    const btnMasc = document.createElement('button');
    btnMasc.id = 'masculino';
    btnMasc.innerHTML = 'Masculino';

    const btnTodos = document.createElement('button');
    btnTodos.id = 'todos';
    btnTodos.innerHTML = 'Todos';

    const btnFem = document.createElement('button');
    btnFem.id = 'feminino';
    btnFem.innerHTML = 'Feminino';

    const dropdown = document.createElement('select');
    dropdown.id = 'dropdown';
    dropdown.innerHTML = `
    <option value="" disabled selected>Escolha o elenco</option>
    <option value="masculino">Masculino</option>
    <option value="feminino">Feminino</option>
    <option value="completo">Elenco Completo</option>
    `

    divBtns.appendChild(btnTodos);
    divBtns.appendChild(btnMasc);
    divBtns.appendChild(btnFem);
    document.body.appendChild(divBtns);
    document.body.appendChild(dropdown)

    const divPesquisa = document.createElement('div');
    divPesquisa.className = 'pesquisa'

    const inputPesquisa = document.createElement('input');
    inputPesquisa.type = 'text';

    divPesquisa.appendChild(inputPesquisa);
    document.body.appendChild(divPesquisa);

    const container = document.createElement('div');
    container.className = 'container';

    document.body.appendChild(container);


    const achaCookie = ( chave ) => {
        const arrayCookies = document.cookie.split("; ");
        const procurado = arrayCookies.find(
            ( e ) => e.startsWith(`${chave}=`)
        ) 
        return procurado?.split('=')[1];
    }

    const montaCard = (entrada) => {
        const card = document.createElement('div');
        card.className = "card";

        card.dataset.id = entrada.id;
        card.dataset.nome = entrada.nome;
        card.dataset.nomeCompleto = entrada.nome_completo;
        card.dataset.descricao = entrada.detalhes;
        card.dataset.elenco = entrada.elenco;
        card.dataset.posicao = entrada.posicao;
        card.dataset.nascimento = entrada.nascimento;
        card.dataset.altura = entrada.altura;
        card.dataset.imagem = entrada.imagem;
        card.dataset.numJogos = entrada.n_jogos;
        card.dataset.naturalidade = entrada.naturalidade;

        card.onclick = handleClick;

        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `Foto de ${entrada.nome}`;
        imagem.className = 'foto';

        const info = document.createElement('div');
        info.className = 'info';

        const btn_saiba = document.createElement('button');
        btn_saiba.className = 'saiba';
        btn_saiba.innerHTML = 'Saiba mais';


        const pNome = document.createElement('p');
        pNome.className = 'nome';
        pNome.innerHTML = entrada.nome;

        info.appendChild(btn_saiba);
        info.appendChild(pNome)
        card.appendChild(imagem);
        card.appendChild(info)

        return card;
    }

    const handleClick = (e) => {
        const dados = e.currentTarget.dataset;
        for (const propriedade in dados){
            //cookies
            document.cookie = `${propriedade}=${dados[propriedade]}`
            //localStorage item a item
            localStorage.setItem(propriedade, dados[propriedade]);
            //localStorage objeto
            localStorage.setItem('atleta', JSON.stringify(dados))
        }
        window.location.href = `detalhes.html?id=${dados.id}`;
    }

    /*dados.forEach(
        (atleta) => {
            container.appendChild(montaCard(atleta));
        }
    )*/


    inputPesquisa.onkeyup = ( ev ) => {

        if (ev.target.value.length > 2 || ev.target.value.length == 0){
            const filtrado = dados.filter(
                (ele) => {
                    const noNome = ele.nome.toLowerCase().includes(ev.target.value.toLowerCase());
                    const naPosicao = ele.posicao.toLowerCase().includes(ev.target.value.toLowerCase());
                    return noNome || naPosicao;
                }
            )
        
            container.innerHTML = '';
            
            filtrado.forEach(
                (atleta) => {
                    container.appendChild(montaCard(atleta));
                }
            )
        }

    }


    const pegaDados = async (caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }

    document.getElementById('dropdown').onchange = (e) => {
        const selecionado = e.target.value;
        switch(selecionado){
            case 'masculino':
                sessionStorage.setItem('genero', 1);
                location.reload(true);
                break;
            case 'feminino':
                sessionStorage.setItem('genero', 2);
                location.reload(true);
                break;
            case 'completo':
                sessionStorage.setItem('genero', 0);
                location.reload(true);
        }
    }

    document.getElementById('masculino').onclick = () => {
        sessionStorage.setItem('genero', 1);
        location.reload(true);
    }
    document.getElementById('feminino').onclick = () => {
        sessionStorage.setItem('genero', 2);
        location.reload(true);
    }
    document.getElementById('todos').onclick = () => {
        sessionStorage.setItem('genero', 0);
        location.reload(true);
    }
    if(sessionStorage.getItem('genero') == 0){
        pegaDados("https://botafogo-atletas.mange.li/2024-1/all").then(
        (entrada) => {
        console.log(entrada);
        dados = entrada;
        entrada.forEach(
            (atleta) => {
                container.appendChild(montaCard(atleta));
            }
            )
        }
        )
    } else if(sessionStorage.getItem('genero') == 1){
        pegaDados("https://botafogo-atletas.mange.li/2024-1/masculino").then(
        (entrada) => {
        console.log(entrada);
        dados = entrada;
        entrada.forEach(
            (atleta) => {
                container.appendChild(montaCard(atleta));
            }
            )
        }
        )
    } else if (sessionStorage.getItem('genero')){
        pegaDados("https://botafogo-atletas.mange.li/2024-1/feminino").then(
        (entrada) => {
        console.log(entrada);
        dados = entrada;
        entrada.forEach(
            (atleta) => {
                container.appendChild(montaCard(atleta));
            }
            )
        }
        )
    }

}
