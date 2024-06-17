import { hex_sha256 } from "./sha256.mjs";

const alvo_sha256 = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
let login;
//Senha é abc


document.getElementById('btn_login').onclick = () => {
    let entrada = document.getElementById('senha').value;
    if (hex_sha256(entrada) === alvo_sha256){
        login = 1;
        sessionStorage.setItem('login', login);
        window.location.href='pagina2.html';
    } else {
        alert('Senha Incorreta!');
        login = 0;
        sessionStorage.setItem('login', login);
    }
}