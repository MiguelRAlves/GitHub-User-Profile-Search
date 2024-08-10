async function buscarRepositoriosDoUsuario(users) {
    const resposta = await (await fetch(`https://api.github.com/users/${users}/repos?per_page=10`)).json()
    return await resposta
}

export { buscarRepositoriosDoUsuario }