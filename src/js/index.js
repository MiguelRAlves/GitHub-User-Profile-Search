import { buscarUsuario } from "./services/user.js"
import { buscarRepositoriosDoUsuario } from "./services/repositories.js"

const btnBuscarUsuario = document.getElementById("btn-search")
const buscador = document.getElementById("input-search")
const divProfileData = document.getElementById("profile-data")

buscador.addEventListener('keyup', (e) => {
    const key = e.which || e.keyCode
    if (key === 13) {
        if(validarBuscadorVazio()) return
        buscarInformacoesUsuario()
        mostrarRepositoriosDoUsuario()
    }
})

btnBuscarUsuario.addEventListener("click", () => {
    if(validarBuscadorVazio()) return
    buscarInformacoesUsuario()
    mostrarRepositoriosDoUsuario()
})

async function buscarInformacoesUsuario() {
    buscarUsuario(buscador.value).then((usuario) => {
        if(usuario.message === "Not Found"){
            divProfileData.innerHTML = `<h2>Usuário não Encontrado</h2>`
            return
        }

        let informacoesUsuario =`
        <div class="info">
            <img src="${usuario.avatar_url}" alt="Avatar do Usuário" />
            <div class="data">
                <h1>${usuario.name ?? "Não possui usuário cadastrado"}</h1>
                <p>${usuario.bio ?? "Não possui bio cadastrada"}</p>
             </div>
        </div>`
        divProfileData.innerHTML = informacoesUsuario
    })
}

async function mostrarRepositoriosDoUsuario() {
    buscarRepositoriosDoUsuario(buscador.value).then((repositoriosUsuario) => {
        let informacoesRepositorios = ""
        repositoriosUsuario.forEach(repo => {
            informacoesRepositorios += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        });
        divProfileData.innerHTML += `
        <div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${informacoesRepositorios}</ul>
        </div>`
    })
}

function validarBuscadorVazio(){
    if(buscador.value.length === 0){
        alert("Preencha o campo com o nome do usuário do GitHub")
        return true
    }
}