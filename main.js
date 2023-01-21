document.getElementById("modal").style.setProperty('display', 'none', 'important')

function procurar() {
    document.getElementById('modal').style.setProperty('display', 'flex', 'important')
    let invocador = document.getElementById("invocador").value
    let finalURL = `https://riotapiproject.brunodi.repl.co/riot/${invocador}`
    
    fetch(finalURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(function(data){

            
            let name = document.getElementById("name")
            let lvl = document.getElementById("lvl")
            let imgProf =document.getElementById("imgProf")
            let champ = document.querySelectorAll(".champImg img")
            let nameChamp = document.querySelectorAll("#nameChamp")
            let maestria = document.querySelectorAll("#maestria")
            let lvlmaestria = document.querySelectorAll("#lvlMaestria")
            let championMasteries = data.champion_masteries

            imgProf.src = data.profile_image
            name.innerHTML = data.name
            lvl.innerHTML =`Lvl: ${data.summonerLevel}`

            for(let i = 0; i < championMasteries.length; i++) { 
                champ[i].src = championMasteries[i].champion_icon
                nameChamp[i].innerHTML = championMasteries[i].champion_name
                maestria[i].innerHTML = championMasteries[i].champion_mastery_points
                lvlmaestria[i].innerHTML = championMasteries[i].champion_level_mastery
            }
        })
        .catch(error => {
            let modal404 = document.querySelector("#modal404")
            if (error.message.includes("500")) {
                modal404.innerHTML = `
                <div id="card-modal404">
                    <div id="modalContent">
                        <h1>Nenhum jogador com esse nick foi encontrado...</h1>
                        <img src="img/404.svg" alt="">
                    </div>
                </div>`
                modal404.style.visibility = 'visible'
            } else {
                
            }
        });
}

