function detail() {

    let token = localStorage.getItem('token')

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`http://${iPort}/items/AD_DNS_DHCP?filter[ID_AD_DNS][_eq]=${sessionStorage.getItem('id_equip_venant_serveur')}`, requestOptions)
        .then(response => response.text())
        .then(result => {

            let resp = JSON.parse(result).data[0]

            construction_detail(resp)
        })
        .catch(error => console.log('error', error));

}

function construction_detail(resp) {

    let compteur = 0

    let tableau = Object.values(resp)//tableau des éléments à mettre dans le html

    delete tableau[14]//enlève l'id du DNS
    delete tableau[15]//enlève l'id du serveur


    tableau.forEach(element => {

        let detail = document.getElementById(compteur)

        switch (element) {

            case null:
                detail.textContent = "Non renseigné"
                break

            case true:
                detail.textContent = "OUI"
                break

            case false:
                detail.textContent = "NON"
                break

            default:
                detail.textContent = element
                break


        }
        compteur = compteur + 1
    }
    )
}


/*------------Exécution lors du chargement du js-------------*/

detail()
