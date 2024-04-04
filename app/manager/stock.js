"use strict";
// import { SettingCard} from "./classes";
window.addEventListener("load", function (e) {
    var table = [];
    var card1 = new SettingCard("Stock", "Nouveau Stock", "Créer Un Nouveau Stock Dans Votre Dépôt", "icon-lg mdi mdi-plus text-success ms-auto");
    card1.render();
    // table.push(card1);
    // var card2 = new SettingCard(
    //     "Stock", 
    //     "Mise à Jour", 
    //     "Mettez à jour un stock existant dans votre Dépôt",
    //     "icon-lg mdi mdi-update text-secondary ms-auto"
    // );
    // card2.render();
    // table.push(card2);
    var card3 = new SettingCard("Achats", "Nouvelle Entrée", "Avez-vous fait un nouvel achat ? Enregistrez-le", "icon-lg mdi mdi-door-open text-primary ms-auto");
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
        else if (id == "info-2")
            container_id.innerHTML = entriesRender();
        else if (id == "info-3")
            container_id.innerHTML = salesRender();
        else if (id == "info-4")
            container_id.innerHTML = personalInfosRender();
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
function entriesRender() {
    return `<div class="form-containers" id="form-stock-container" style="border-bottom: 1px solid #12151e; border-top: 1px solid #12151e;">
    <div class="sub-fsc" id="sub-fsc-1">
      <div class="" id="update-search-gas" >
        <form action="" style="width: 100%;">
          <input type="search" name="search-gas-update" id="search-gas-update" placeholder="Rechercher">
        </form>
      </div>
      <div id="search-data-container-main">
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-fsc" id="sub-fsc-2">
      <h4>BOUTEILLE</h4>
      <div class="image-container" id="">
        <img src="assets/images/b4.png" style="width: 100%; height: 200px" alt="bottle">
      </div>
      <form action="" class="data-forms-update" id="stock-update-form" style="margin-top: 2.5em;">
        <div class="d-flex">
        <div class="info-display" id="info-display-1" style="margin-right: 7em;">
          <label class="stock-update-data" for="stock">
            <span class="update-name" id="">Stock</span>
            <select class="" id="stock" name="stock">
              <option value="1">Nouveau Stock</option>
              <option value="2">Ancien Stock</option>
            </select>
          </label>
          <div class="stock-update-data d-flex">
            <div class="update-name" id="">Marque</div>
            <div class="update-data" id="ud-1">OLA</div>
          </div>
          
          <label class="stock-update-data" for="">
            <span class="update-name" id="PAU">Prix d'Achat Unitaire</span>
            <input type="text" name="PAU" id="PAU" placeholder="6000">
          </label>
        </div>
        <div class="info-display" id="info-display-2">
          <label class="stock-update-data" for="PVU">
            <span class="update-name" id="PVU">Prix de Vente Unitaire</span>
            <input type="text" name="PVU" id="PVU" placeholder="6500">
          </label>
          <div class="stock-update-data d-flex">
            <div class="update-name" id="">Poids</div>
            <div class="update-data" id="ud-1">12.5</div>
          </div>
          <label class="stock-update-data" for="">
            <span class="update-name" id="quantity">Quantité</span>
            <input type="number" name="quantity" id="quantity" placeholder="250">
          </label>
        </div>
        </div>
        <div class="" id="" style="padding-left: 12em;">
          <input type="submit" class="save-here" id="btn-update-sgb" value="Enregistrer"></input>
        </div>
      </form>
    </div>
  </div>
  <div class="form-foot-container">
    <div class="" style="padding: 1em;">
      <h4>Entrées Enregistrées</h4>
      <div class="entries-list-container">
        <div class="entries-list">
          <table>
            <tr>
              <th>Date</th>
              <th>Bouteille</th>
              <th>Poids (KG)</th>
              <th>Quantité</th>
              <th>Prix Unitaire (FCFA)</th>
              <th>Prix Total (FCFA)</th>
              <th>Stock</th>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}
function salesRender() {
    return `<div class="form-containers" id="form-stock-container" style="border-bottom: 1px solid #12151e; border-top: 1px solid #12151e;">
    <div class="sub-fsc" id="sub-fsc-1">
      <div class="" id="update-search-gas" >
        <form action="" style="width: 100%;">
          <input type="search" name="search-gas-update" id="search-gas-update" placeholder="Rechercher">
        </form>
      </div>
      <div id="search-data-container-main">
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
            Entrées </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
        <div class="search-data-container d-flex" id="">
          <div class="image-container" id="">
            <img src="assets/images/b4.png" style="width: 100%; height: 100px;" alt="bottle">
          </div>
          <div class="" id="">
            <ul id="search-side-infos">
              <li><span style="color: gray;">Marque: </span>OLA</li>
              <li><span style="color: gray;">Poids: </span>12.5kg</li>
              <li><span style="color: gray;">PU: </span>6500F</li>
              <li><span style="color: gray;">Qté: </span>45</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-fsc" id="sub-fsc-2">
      <h4>BOUTEILLE</h4>
      <div class="image-container" id="">
        <img src="assets/images/b4.png" style="width: 100%; height: 200px" alt="bottle">
      </div>
      <form action="" class="data-forms-update" id="stock-update-form" style="margin-top: 2.5em;">
        <div class="d-flex">
        <div class="info-display" id="info-display-1" style="margin-right: 7em;">
          <label class="stock-update-data" for="stock">
            <span class="update-name" id="">Stock</span>
            <select class="" id="stock" name="stock">
              <option value="1">Nouveau Stock</option>
              <option value="2">Ancien Stock</option>
            </select>
          </label>
          <div class="stock-update-data d-flex">
            <div class="update-name" id="">Marque</div>
            <div class="update-data" id="ud-1">OLA</div>
          </div>
          
        </div>
        <div class="info-display" id="info-display-2">
          <div class="stock-update-data d-flex">
            <div class="update-name" id="">Poids</div>
            <div class="update-data" id="ud-1">12.5</div>
          </div>
          <label class="stock-update-data" for="">
            <span class="update-name" id="quantity">Quantité</span>
            <input type="number" name="quantity" id="quantity" placeholder="250">
          </label>
        </div>
        </div>
        <div class="" id="" style="padding-left: 12em;">
          <input type="submit" class="save-here" id="btn-update-sgb" value="Enregistrer"></input>
        </div>
      </form>
    </div>
  </div>
  <div class="form-foot-container">
    <div class="" style="padding: 1em;">
      <h4>Ventes Enregistrées</h4>
      <div class="entries-list-container">
        <div class="entries-list">
          <table>
            <tr>
              <th>Date</th>
              <th>Bouteille</th>
              <th>Poids (KG)</th>
              <th>Quantité</th>
              <th>Prix Unitaire (FCFA)</th>
              <th>Prix Total (FCFA)</th>
              <th>Stock</th>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
            <tr>
              <td>24/03/2024</td>
              <td>Total Gas</td>
              <td>12.5</td>
              <td>100</td>
              <td>5850</td>
              <td>585000</td>
              <td>Nouveau Stock</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}
function personalInfosRender() {
    return `<div class="infos-data-container">
  <div class="info-block" id="storeinfo">
    <h2>Store</h2>
    <div class="" id="">
      <img src="../../app/resources/gasmanagement/gasstores/default.png" alt="#store picture" >
      <div class="sub-infos">
        <h4>Store Name</h4>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
      <div class="sub-infos">
        <p><em>date de création : </em>12/12/2023 - 17:50:24</p>
      </div>
      <div class="sub-infos">
        <p><em>address : </em> <i class="icon-lg mdi mdi-map-marker text-danger text-small ms-auto"></i> Mvog-Beti, Yaoundé - Cameroun</p>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
      <div class="sub-infos">
        <p><em>Infos supplémentaire : </em> Additional Informations here...</p>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
    </div>
  </div>
  <div class="info-block" id="managerinfo">
    <h2>Manager</h2>
    <div class="" id="">
      <img src="../../app/resources/gasmanagement/gasstores/default.png" alt="#store picture">
      <div class="sub-infos">
        <h4>Manager's Name</h4>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
      <div class="sub-infos">
        <p><em>matricule :</em>7846266615151</p>
      </div>
      <div class="sub-infos">
        <p><em>address :</em><i class="icon-lg mdi mdi-map-marker text-danger text-small ms-auto"></i> Mvog-Beti, Yaoundé - Cameroun</p>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
      <div class="sub-infos">
        <p><em>numéro de téléphone :</em> 698818451</p>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
      <div class="sub-infos">
        <p><em>code :</em> ************</p>
        <i class="icon-lg mdi mdi-eye text-primary text-small ms-auto"></i>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
      <div class="sub-infos">
        <p><em>cni :</em> 8451235 </p>
        <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
      </div>
    </div>
  </div>
  <div class="info-validate-button" id="">
    <button>Sauvegarder Mes Informations</button>
  </div>
</div>`;
}
