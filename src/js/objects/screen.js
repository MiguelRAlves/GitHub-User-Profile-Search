const screen = {
    userProfile: document.querySelector(".profile-data"),
    screenRender(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Avatar do Usuário" />
            <div class="data">
                <h1>${user.name ?? "Não possui usuário cadastrado"}</h1>
                <p class="login"> ${user.login ?? "Não possui login cadastrado"}</p>
                <p class="bio">${user.bio ?? "Não possui bio cadastrada"}</p>
                <p class="followers">Followers:👥  <span>${user.followers}</span></p>
                <p class="following">Following:✔️  <span>${user.following}</span></p>
            </div>
        </div>`

        let infoRepositories = ""
        user.repositories.forEach((repo) => {
            infoRepositories += `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}
                    <div class="information">
                        <p> 🍴${repo.forks} </p>
                        <p> ⭐${repo.stargazers_count} </p> 
                        <p> 👀${repo.watchers} </p>
                        <p> 👨‍🏫${repo.language ?? "indefinido"} </p>
                    </div>
                </a>
            </li>`
        })
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${infoRepositories}</ul>
            </div>`
        }

        let infoEvents = ""
        user.events.forEach((event) => {

            const eventName = event.repo.name
            const eventCommits = event.payload.commits

            if(event.type === "PushEvent") {
                eventCommits.forEach((commit) => {
                    const commitMessage = commit.message
                    infoEvents += `
                    <li>
                        <a href="${event.repo.url}" target="_blank">${eventName}</a>
                        <p> - ${commitMessage}</p>
                    </li>`
                })
            }else if(event.type === "CreateEvent"){
                infoEvents += `
                <li><p>Sem mensagem de commit</p></li>
                `
            }
        })
        if(user.events.length > 0){
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos</h2>
                <ul>${infoEvents}</ul>
            </div>`
        }
    }
}

export {screen}