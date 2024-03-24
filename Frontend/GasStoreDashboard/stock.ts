// import { SettingCard} from "./classes";

window.addEventListener("load", function (e) {
    var table:SettingCard[] = [];

    var card1 = new SettingCard(
        "Stock", 
        "Nouveau Stock", 
        "Créer Un Nouveau Stock Dans Votre Dépôt",
        "icon-lg mdi mdi-plus text-success ms-auto"
    );
    card1.render();
    // table.push(card1);

    var card2 = new SettingCard(
        "Stock", 
        "Mise à Jour", 
        "Mettez à jour un stock existant dans votre Dépôt",
        "icon-lg mdi mdi-update text-secondary ms-auto"
    );
    card2.render();
    // table.push(card2);

    var card3 = new SettingCard(
        "Ventes", 
        "Nouvelle Entrée", 
        "Avez-vous fait un nouvel achat ? Enregistrez-le",
        "icon-lg mdi mdi-door-open text-primary ms-auto"
    );
    card3.render();
    // table.push(card3);

    var card4 = new SettingCard(
        "Ventes", 
        "Nouvelle Sortie", 
        "Enregistrez chaque vente ici",
        "icon-lg mdi mdi-walk text-warning ms-auto"
    );
    card4.render();
    // table.push(card4);

    var card6 = new SettingCard(
        "Mon Dépôt", 
        "Mes Informations", 
        "Voir/Modifiez les Informations sur Vous ou Votre Dépôt",
        "icon-lg mdi mdi-eye text-success ms-auto"
    );
    card6.render();
    // table.push(card6);

    var card7 = new SettingCard(
        "Livraison", 
        "Service de Livraison", 
        "À propos du Service de Livraison",
        "icon-lg mdi mdi-car text-primary ms-auto"
    );
    card7.render();
    // table.push(card4);

    var card8 = new SettingCard(
        "Admin", 
        "Administration GasTrack", 
        "Contacter un administrateur de GasTrack",
        "icon-lg mdi mdi-phone text-warning ms-auto"
    );
    card8.render();
    // table.push(card4);

    var card9 = new SettingCard(
        "Quitter", 
        "Supprimer GasTrack", 
        "Contacter un administrateur de GasTrack",
        "icon-lg mdi mdi-delete text-danger ms-auto"
    );
    card9.render();
    // table.push(card4);

    for (var card of table){
        card.render()
    }

});

function onClick(id:any, title:string){
    var scrol = document.getElementById('tkt')
    if (scrol !== null) scrol.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });

    var newTitle = document.getElementById("new-card-title")

    if (newTitle !== null) {
        newTitle.innerHTML = title
    }
    
}