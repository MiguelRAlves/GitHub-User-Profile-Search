import { buscarUsuario } from "./services/user.js"
import { buscarRepositoriosDoUsuario } from "./services/repositories.js"
import { buscarEventosDoUsuario } from "./services/events.js"
import { user } from "./objects/object.js"
import { screen } from "./objects/screen.js"

const btnBuscarUsuario = document.getElementById("btn-search")
const buscador = document.getElementById("input-search")
const divProfileData = document.getElementById("profile-data")

buscador.addEventListener('keyup', (e) => {
    const key = e.which || e.keyCode
    if (key === 13) {
        if(validarBuscadorVazio()) return
        buscarInformacoesUsuario()
    }
})

btnBuscarUsuario.addEventListener("click", () => {
    if(validarBuscadorVazio()) return
    buscarInformacoesUsuario()
})

async function buscarInformacoesUsuario() {
    const userResponse = await buscarUsuario(buscador.value)
    const repositoriesResponse = await buscarRepositoriosDoUsuario(buscador.value)
    const eventsResponse = await buscarEventosDoUsuario(buscador.value)

    if(userResponse.message === "Not Found"){
        divProfileData.innerHTML = `<h2>Usuário não Encontrado</h2>`
        return
    }
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    screen.screenRender(user)
}

function validarBuscadorVazio(){
    if(buscador.value.length === 0){
        alert("Preencha o campo com o nome do usuário do GitHub")
        return true
    }
}