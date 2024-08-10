async function buscarEventosDoUsuario(users) {
    const resposta = await (await fetch(`https://api.github.com/users/${users}/events?per_page=10`)).json()
    return await resposta
}

export { buscarEventosDoUsuario }
