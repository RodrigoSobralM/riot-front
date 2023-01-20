document.getElementById("modal").style.setProperty('display', 'none', 'important')

function procurar() {
    document.getElementById('modal').style.setProperty('display', 'flex', 'important')
    let invocador = document.getElementById("invocador").value
    let finalURL = `https://riotapiproject.brunodi.repl.co/riot/${invocador}`
    console.log(finalURL)
    fetch(finalURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(function(data){
            console.log(data)
            let name = document.getElementById("name")
            let lvl = document.getElementById("lvl")
            let imgProf =document.getElementById("imgProf")
            let champ = document.querySelectorAll(".champImg img")
            let nameChamp = document.querySelectorAll("#nameChamp")
            let maestria = document.querySelectorAll("#maestria")
            let lvlmaestria = document.querySelectorAll("#lvlMaestria")
            let championMasteries = data.champion_masteries

            champ = Array.from(champ)
            nameChamp = Array.from(nameChamp)
            maestria = Array.from(maestria)
            lvlmaestria = Array.from(lvlmaestria)

            imgProf.src = data.profile_image
            name.innerHTML = invocador
            lvl.innerHTML =`Lvl: ${data.summonerLevel}`
            for(let i = 0; i < championMasteries.length; i++) { 
                champ[i].src = championMasteries[i].champion_icon
                nameChamp[i].innerHTML = championMasteries[i].champion_name
                maestria[i].innerHTML = championMasteries[i].champion_mastery_points
                lvlmaestria[i].innerHTML = championMasteries[i].champion_level_mastery
            }
        })
        .catch(error => {
            if (error.message.includes("500")) {
                console.log("404 error occurred. Resource not found.");
            } else {
                console.log("Error occurred: ", error);
            }
        });
}