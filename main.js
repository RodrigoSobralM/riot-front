document.getElementById("modal").style.setProperty('display', 'none', 'important')
document.getElementById("modal404").style.setProperty('display', 'none', 'important')


const spinner = document.getElementById("spinner");

function showLoadingScreen() {
    document.getElementById("cardInvocador").style.setProperty('display', 'none', 'important')
    document.getElementById("modal2").style.setProperty('display', 'none', 'important')
    document.getElementById("line").style.setProperty('display', 'none', 'important')
    spinner.style.display = "block";
}

function hideLoadingScreen() {
    document.getElementById("cardInvocador").style.setProperty('display', 'flex', 'important')
    document.getElementById("modal2").style.setProperty('display', 'flex', 'important')
    document.getElementById("line").style.setProperty('display', 'flex', 'important')
    spinner.style.display = "none";
}

function procurar() {
    document.getElementById("modal404").style.setProperty('display', 'none', 'important')
    document.getElementById('modal').style.setProperty('display', 'flex', 'important')
    if(invocador.value =='') {
        document.getElementById("modal").style.setProperty('display', 'none', 'important')
        document.getElementById("modal404").style.setProperty('display', 'flex', 'important')
    } else {
        showLoadingScreen();
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
                hideLoadingScreen();
                console.log(data)
                let name = document.getElementById("name")
                let lvl = document.getElementById("lvl")
                let imgProf =document.getElementById("imgProf")
                let champ = document.querySelectorAll(".champImg img")
                let nameChamp = document.querySelectorAll("#nameChamp")
                let maestria = document.querySelectorAll("#maestria")
                let lvlmaestria = document.querySelectorAll("#lvlMaestria")
                let rankName = document.querySelector("#rankName")
                let rankTier = document.querySelector("#rankTier")
                let championMasteries = data.champion_masteries


                imgProf.src = data.profile_image
                name.innerHTML = data.name
                lvl.innerHTML =`Lvl: ${data.summonerLevel}`
                rankName.innerHTML = data.tiers.length ? data.tiers[0].tier : "unranked"
                rankTier.innerHTML = data.tiers.length ? data.tiers[0].rank : ""

                for(let i = 0; i < championMasteries.length; i++) { 
                    champ[i].src = championMasteries[i].champion_icon
                    nameChamp[i].innerHTML = championMasteries[i].champion_name
                    maestria[i].innerHTML = championMasteries[i].champion_mastery_points
                    lvlmaestria[i].innerHTML = championMasteries[i].champion_level_mastery
                }
            
            })
            .catch(error => {
                document.getElementById("modal").style.setProperty('display', 'none', 'important')
                if (error.message.includes("404")) {
                    document.getElementById("modal404").style.setProperty('display', 'flex', 'important')
                } else {
                    document.getElementById("modal404").style.setProperty('display', 'none', 'important')
                }
            });
    }
}
    

