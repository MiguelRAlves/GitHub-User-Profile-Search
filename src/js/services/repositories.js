async function buscarRepositoriosDoUsuario(users) {
    const resposta = await (await fetch(`https://api.github.com/users/${users}/repos`)).json()
    return await resposta
}

export { buscarRepositoriosDoUsuario }