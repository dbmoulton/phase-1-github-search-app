document.addEventListener("DOMContentLoaded", function(event) { 
    const searchBarEl = document.getElementById('search');
    const searchBtnEl = document.getElementsByName('submit');
    const userListEl = document.getElementById('user-list')
    const userRepoEl = document.getElementById('repos-list')
    const subForm = document.getElementById('github-form')
    

    subForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let searchInput = searchBarEl.value;
        fetch(`https://api.github.com/search/users?q=${searchInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'             
            }
        }).then(res => res.json())
            .then((user) => {
                console.log(user)
                userListEl.textContent = '';
                let userResult = document.createElement("li");
                let h2 = document.createElement("h2");
                let img = document.createElement("img")
                let br = document.createElement("br")
                h2.textContent = user.items[0].login;
                img.src = user.items[0].avatar_url;
                img.addEventListener('click', () => {
                    fetch(`https://api.github.com/users/${searchInput}/repos`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/vnd.github.v3+json'             
                        }
                    }).then(res => res.json())
                        .then((repos) => {
                            console.log(repos)
                            userRepoEl.innerHTML = '';
                            repos.forEach((repo) => {
                                let repoResult = document.createElement("li")
                                repoResult.textContent = repo.name
                                userRepoEl.append(repoResult)
                            })
                        })
                })
                
                userResult.append(h2, br, img)
                userListEl.append(userResult)
            })
    })
})