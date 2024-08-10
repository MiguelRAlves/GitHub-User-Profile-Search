async function buscarUsuario(users) {
    const resposta = await (await fetch(`https://api.github.com/users/${users}`)).json()
    return await resposta
}

export { buscarUsuario }