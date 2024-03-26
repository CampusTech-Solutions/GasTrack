"use strict";
// import { SettingCard} from "./classes";
window.addEventListener("load", function (e) {
    var table = [];
    var card1 = new SettingCard("Stock", "Nouveau Stock", "Créer Un Nouveau Stock Dans Votre Dépôt", "icon-lg mdi mdi-plus text-success ms-auto");
    card1.render();
    // table.push(card1);
    var card2 = new SettingCard("Stock", "Mise à Jour", "Mettez à jour un stock existant dans votre Dépôt", "icon-lg mdi mdi-update text-secondary ms-auto");
    card2.render();
    // table.push(card2);
    var card3 = new SettingCard("Ventes", "Nouvelle Entrée", "Avez-vous fait un nouvel achat ? Enregistrez-le", "icon-lg mdi mdi-door-open text-primary ms-auto");
    card3.render();
    // table.push(card3);
    var card4 = new SettingCard("Ventes", "Nouvelle Sortie", "Enregistrez chaque vente ici", "icon-lg mdi mdi-walk text-warning ms-auto");
    card4.render();
    // table.push(card4);
    var card6 = new SettingCard("Mon Dépôt", "Mes Informations", "Voir/Modifiez les Informations sur Vous ou Votre Dépôt", "icon-lg mdi mdi-eye text-success ms-auto");
    card6.render();
    // table.push(card6);
    var card7 = new SettingCard("Livraison", "Service de Livraison", "À propos du Service de Livraison", "icon-lg mdi mdi-car text-primary ms-auto");
    card7.render();
    // table.push(card4);
    var card8 = new SettingCard("Admin", "Administration GasTrack", "Contacter un administrateur de GasTrack", "icon-lg mdi mdi-phone text-warning ms-auto");
    card8.render();
    // table.push(card4);
    var card9 = new SettingCard("Quitter", "Supprimer GasTrack", "Contacter un administrateur de GasTrack", "icon-lg mdi mdi-delete text-danger ms-auto");
    card9.render();
    // table.push(card4);
    for (var card of table) {
        card.render();
    }
});
function onClick(id, title) {
    var scrol = document.getElementById('tkt');
    if (scrol !== null)
        scrol.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    var newTitle = document.getElementById("new-card-title");
    if (newTitle !== null) {
        newTitle.innerHTML = title;
    }
    var container_id = document.getElementById("main-data-container");
    if (container_id) {
        if (id == "info-1")
            container_id.innerHTML = stockFormsRender();
        else
            container_id.innerHTML = '';
    }
}
function stockFormsRender() {
    return `<div class="form-containers" id="form-stock-container">
        <form action="" class="data-forms" id="stock-form">
        <div class="form-title" id="" style="margin: 1em 1% 2em 2%;">Créer Un Stock</div>
        <div class="form-stock-labels" for="stock-name">
          <input type="text" id="stock-name" name="stock-name" placeholder="Nom du Stock">
          <span class="form-stock-labels"></span>
        </div>
        <div class="form-stock-labels" for="stock-label">
          <input type="text" id="stock-label" name="stock-label" placeholder="Libelé">
          <span class="form-stock-labels"></span>
        </div>
        <div class="form-stock-labels" for="stock-submit">
          <input type="submit" id="stock-submit" name="stock-submit" value="Enregistrer">
        </div>
      </form>
      <form action="" class="data-forms" id="stock-form-2" >
        <div class="form-title" id="">Stock Enregistrés</div>
        <div class="" id="stock-list-container">
          <div class="col-sm-7 d-flex" id="stock-list-1" onclick="">
            <div class="col-5 col-sm-3 col-xl-5 my-auto d-flex" style="width: 100%;">
              <div class="" id="" style=" width: 67%; height: max-content;">
                <div class="">
                  <h4 class="" width="100%">Nom stock</h4>
                </div>
                <h6 class="text-muted font-weight-normal" width="100%">Libelé</h6>
              </div>
              <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right d-flex" style=" width: 33%;">
                <i class="icon-lg mdi mdi-pencil text-primary text-big ms-auto stock-icons"></i>
                <i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons"></i>
                </div>
            </div>
          </div>
          <div class="col-sm-7 d-flex" id="stock-list-1" onclick="">
            <div class="col-5 col-sm-3 col-xl-5 my-auto d-flex" style="width: 100%;">
              <div class="" id="" style=" width: 67%; height: max-content;">
                <div class="">
                  <h4 class="" width="100%">Nom stock</h4>
                </div>
                <h6 class="text-muted font-weight-normal" width="100%">Libelé</h6>
              </div>
              <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right d-flex" style=" width: 33%;">
                <i class="icon-lg mdi mdi-pencil text-primary text-big ms-auto stock-icons"></i>
                <i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons"></i>
              </div>
            </div>
          </div>
          <div class="col-sm-7 d-flex" id="stock-list-1" onclick="">
            <div class="col-5 col-sm-3 col-xl-5 my-auto d-flex" style="width: 100%;">
              <div class="" id="" style=" width: 67%; height: max-content;">
                <div class="">
                  <h4 class="" width="100%">Nom stock</h4>
                </div>
                <h6 class="text-muted font-weight-normal" width="100%">Libelé</h6>
              </div>
              <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right d-flex" style=" width: 33%;">
                <i class="icon-lg mdi mdi-pencil text-primary text-big ms-auto stock-icons"></i>
                <i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons"></i>
              </div>
            </div>
          </div>
          <div class="col-sm-7 d-flex" id="stock-list-1" onclick="">
            <div class="col-5 col-sm-3 col-xl-5 my-auto d-flex" style="width: 100%;">
              <div class="" id="" style=" width: 67%; height: max-content;">
                <div class="">
                  <h4 class="" width="100%">Nom stock</h4>
                </div>
                <h6 class="text-muted font-weight-normal" width="100%">Libelé</h6>
              </div>
              <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right d-flex" style=" width: 33%;">
                <i class="icon-lg mdi mdi-pencil text-primary text-big ms-auto stock-icons"></i>
                <i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons"></i>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>`;
}
