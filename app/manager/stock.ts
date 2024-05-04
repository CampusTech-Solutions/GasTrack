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

    // var card2 = new SettingCard(
    //     "Stock", 
    //     "Mise à Jour", 
    //     "Mettez à jour un stock existant dans votre Dépôt",
    //     "icon-lg mdi mdi-update text-secondary ms-auto"
    // );
    // card2.render();
    // table.push(card2);

    var card3 = new SettingCard(
        "Achats", 
        "Nouvel Achat", 
        "Avez-vous fait un nouvel achat ? Enregistrez-le",
        "icon-lg mdi mdi-door-open text-primary ms-auto"
    );
    card3.render();
    // table.push(card3);

    var card4 = new SettingCard(
        "Ventes", 
        "Nouvelle Vente", 
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


function onClick(id:any, title:string):void{
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
    
    var container_id = document.getElementById("main-data-container");
    if (container_id) {
        if (id == "info-1") container_id.innerHTML = stockFormsRender();
        else if (id == "info-2") container_id.innerHTML = entriesRender();
        else if (id == "info-3") container_id.innerHTML = salesRender();
        else if (id == "info-4") container_id.innerHTML = personalInfosRender();
        else container_id.innerHTML = '';
    }
}
function loadStocks(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/gasmanagement/stock/${getCookie('storeid')}/`, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.response).data;
      localStorage.setItem('stockTypes', JSON.stringify(data));
      var container = document.getElementById("stock-list-container");
      if (container) {
        container.innerHTML = '';
        for (var d of data){
          container.innerHTML += `<div class="col-sm-7 d-flex" id="stock-list-1" onclick="">
          <div class="col-5 col-sm-3 col-xl-5 my-auto d-flex" style="width: 100%;">
            <div class="" id="stock-item-${d.id}" style=" width: 67%; height: max-content;">
              <div class="">
                <h4 class="" width="100%">${d.name}</h4>
              </div>
              <h6 class="text-muted font-weight-normal" width="100%">${d.label}</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right d-flex" style=" width: 33%;">
              <i class="icon-lg mdi mdi-pencil text-primary text-big ms-auto stock-icons" onclick="updateStock(${d.id})"></i>
              <i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons" onclick="deleteStock(${d.id})"></i>
            </div>
          </div>`
        }
      }

    }
  };
  xhr.send();
}
function loadBottles(type:any){
  var xhr = new XMLHttpRequest();
  if (type == "entries"){
    xhr.open("GET", `/gasmanagement/gasbottle/`, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.response).results;
        var container = document.getElementById("search-data-container-main");
        if (container) {
          container.innerHTML = '';
          for (var d of data){
            var brand_name:string = d.brand.name.replace(/ /g, '-');
            // onclick="${ type==="entries" ? entriesForm(d.image, d.brand.name, d.weight, d.unit_selling_price, d.unit_cost_price): salesForm(d.image, d.brand.name, d.weight)}"
            container.innerHTML += `<div class="search-data-container d-flex" id="bottle-${d.id}" style="cursor: pointer" onclick=${type=="entries"? `entriesForm('${d.id}','${d.image}','${brand_name}',${d.weight})`:`salesForm('${d.id}','${d.image}','${brand_name}',${d.weight})`}>
              <div class="image-container" id="">
                <img src=${d.image} style="width: 90%; height: 100px;" alt="bottle">
              </div>
              <div class="" id="">
                <ul id="search-side-infos">
                  <li><span style="color: gray;">Marque: </span>${d.brand.name}</li>
                  <li><span style="color: gray;">Poids: </span>${d.weight}kg</li>
                </ul>
              </div>
            </div>`
          }
        }
  
      }
    };
  }
  else{
    xhr.open("GET", `/gasmanagement/stockgasbottle/${getCookie('storeid')}/`, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.response).results;
        var container = document.getElementById("search-data-container-main");
        if (container) {
          container.innerHTML = '';
          for (var d of data){
            var brand_name:string = d.bottle.brand.name.replace(/ /g, '-');
            container.innerHTML += `<div class="search-data-container d-flex" id="stockgasbottle-${d.id}" style="cursor: pointer" onclick="salesForm('${d.id}','${d.bottle.image}','${brand_name}',${d.bottle.weight},${d.stock.id},'${d.stock.name}',${d.unit_cost_price})">
              <div class="image-container" id="">
                <img src=${d.bottle.image} style="width: 90%; height: 100px;" alt="bottle">
              </div>
              <div class="" id="">
                <ul id="search-side-infos">
                  <li><span style="color: gray;">Marque: </span>${d.bottle.brand.name}</li>
                  <li><span style="color: gray;">Poids: </span>${d.bottle.weight} kg</li>
                  <li><span style="color: gray;">PU: </span>${d.unit_cost_price} FCFA</li>
                  <li><span style="color: gray;">Stock: </span>${d.stock.name}</li>
                  <li><span style="color: gray;">Quantité: </span>${d.quantity}</li>
                </ul>
              </div>
            </div>`
          }
        }
  
      }
    };
  }
  xhr.send();
}
function loadEntries(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/gasmanagement/entries/store/${getCookie('storeid')}/`, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.response).results;
      var container = document.getElementById("entries-table");
      if (container) {
        container.innerHTML = `<tr>
        <th>Date</th>
        <th>Bouteille</th>
        <th>Poids (KG)</th>
        <th>Quantité</th>
        <th>PU (FCFA)</th>
        <th>Prix Total (FCFA)</th>
        <th>Stock</th>
        <th><pre></pre></th>
        </tr>`;
        for (var d of data){
          container.innerHTML += `
          <tr id="entry-data-${d.id}">
            <td>${d.date}</td>
            <td>${d.bottle.brand.name}</td>
            <td>${d.bottle.weight}</td>
            <td>${d.quantity}</td>
            <td>${d.unit_cost_price}</td>
            <td>${Number(d.quantity)*Number(d.unit_cost_price)}</td>
            <td>${d.stock.name}</td>
            <td><i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons" onclick="deleteEntry(${d.id})"></i></td>
          </tr>`
        }
      }

    }
  };
  xhr.send();
}
function loadSales(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/gasmanagement/sales/store/${getCookie('storeid')}/`, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.response).results;
      var container = document.getElementById("entries-table");
      if (container) {
        container.innerHTML = `<tr>
        <th>Date</th>
        <th>Bouteille</th>
        <th>Poids (KG)</th>
        <th>PU (FCFA)</th>
        <th>Quantité</th>
        <th>Stock</th>
        <th><pre></pre></th>
        </tr>`;
        for (var d of data){
          container.innerHTML += `
          <tr id="sales-data-${d.id}">
            <td>${d.date}</td>
            <td>${d.stockgasbottle.bottle.brand.name}</td>
            <td>${d.stockgasbottle.bottle.weight}</td>
            <td>${d.unit_selling_price}</td>
            <td>${d.quantity}</td>
            <td>${d.stockgasbottle.stock.name}</td>
            <td><i class="icon-lg mdi mdi-delete text-danger text-big ms-auto stock-icons" onclick="deleteSale(${d.id})"></i></td>
          </tr>`
        }
      }

    }
  };
  xhr.send();
}
function loadPersonalInfo(){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/accounts/geststores/${getCookie('userid')}/`, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var d = JSON.parse(xhr.response);
      var container:any = document.getElementById("managerinfo");
      container.innerHTML = '';
      container.innerHTML += `<h2>Manager</h2>
      <div class="" id="">
        <div class="sub-infos">
          <h4 id="username" class="manager-data">${d.username}</h4>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="personalDataUpdate('username')"></i>
        </div>
        <div class="sub-infos">
          <p><em>matricule :</em>${d.matricule}</p>
        </div>
        <div class="sub-infos">
          <p><em>email :</em><span class="manager-data" id="email">${d.email}</span></p>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="personalDataUpdate('email')"></i>
        </div>
        <div class="sub-infos">
          <p><em>address :</em><i class="icon-lg mdi mdi-map-marker text-danger text-small ms-auto"></i><span class="manager-data" id="manager-location">${d.location? d.location:"Aucune"}</span></p>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="personalDataUpdate('manager-location')"></i>
        </div>
        <div class="sub-infos">
          <p><em>numéro de téléphone :</em><span class="manager-data" id="phone_No">${d.phone_No}</span></p>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="personalDataUpdate('phone_No')"></i>
        </div>
        <div class="sub-infos">
          <p><em>password :</em>*********</p>
          <i class="icon-lg mdi mdi-eye text-primary text-small ms-auto"></i>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto"></i>
        </div>
        <div class="sub-infos">
          <p><em>cni :</em><span class="manager-data" id="cni">${d.no_cni}</span></p>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="personalDataUpdate('cni')"></i>
        </div>
      </div>`
      
    }
  };
  xhr.send();

  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", `/gasmanagement/gasstore/${getCookie('storeid')}/`, true);
  xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
      var d = JSON.parse(xhr2.response);
      var container2:any = document.getElementById("storeinfo");
      container2.innerHTML = '';
      container2.innerHTML += `<h2>Store</h2>
      <div class="" id="">
        <img src=${d.image} alt="#store picture" >
        <div class="sub-infos">
          <h4><span class="store-data" id="store-name">${d.name}</span></h4>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="storeDataUpdate('store-name')"></i>
        </div>
        <div class="sub-infos">
          <p><em>date de création : </em>${d.created_at}</p>
        </div>
        <div class="sub-infos">
          <p><em>address : </em> <i class="icon-lg mdi mdi-map-marker text-danger text-small ms-auto"></i><span class="store-data" id="store-location">${d.location? d.location:"Aucune"}</span></p>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="storeDataUpdate('store-location')"></i>
        </div>
        <div class="sub-infos">
          <p><em>Infos supplémentaire : </em><span class="store-data" id="store-infos">${d.infos}</span></p>
          <i class="icon-lg mdi mdi-pencil text-danger text-small ms-auto" onclick="storeDataUpdate('store-infos')"></i>
        </div>
        <div class="sub-infos">
          <p><em>statut : </em> ${d.store_status? "OUVERT":"FERMÉ"}</p>
        </div>
      </div>
      <script>
      
      </script>`
      
    }
  };
  xhr2.send();
}
function entriesForm(bottle_id:any, image:any, brand:any, weight:any){
  var stockTypes:any = localStorage.getItem('stockTypes');
  var stocks:string ;
  var container:any = document.querySelector('#sub-fsc-2');
  brand = brand.replace(/-/g, ' ');
  stockTypes = JSON.parse(stockTypes)
  stocks = '';
  for (var item of stockTypes){
    stocks += `<option value="${item.id}">${item.name}</option>`
  }
  container.innerHTML = `<h4>BOUTEILLE</h4>
    <div class="image-container" id="">
      <img src=${image} style="width: 100%; height: 200px" alt="bottle">
    </div>
    <form action="" class="data-forms-update" id="new-entries-form" style="margin-top: 2.5em;" onsubmit="createEntry(event)">
      <div class="d-flex">
      <div class="info-display" id="info-display-1" style="margin-right: 7em;">
        <label class="new-entries-data" for="stock">
          <span class="update-name" id="">Stock</span>
          <select class="" id="stocks" name="stocks">`+stocks+`
          </select>
        </label>
        <div class="new-entries-data d-flex">
          <div class="update-name" id="">Marque</div>
          <div class="update-data" id="ud-1">${brand}</div>
        </div>
        <div id="bottle-id" style="display:none">${bottle_id}</div>
        <label class="new-entries-data" for="">
          <span class="update-name" >Prix d'Achat Unitaire</span>
          <input type="number" name="PAU" id="PAU">
        </label>
      </div>
      <div class="info-display" id="info-display-2">
        <div class="new-entries-data d-flex">
          <div class="update-name" id="">Poids</div>
          <div class="update-data" id="weight">${weight}</div>
        </div>
        <label class="new-entries-data" for="">
          <span class="update-name" >Quantité</span>
          <input type="number" name="quantity" id="quantity">
        </label>
      </div>
      </div>
      <div class="" id="button-container" style="padding-left: 12em;">
        <input type="submit" class="save-here" id="btn-update-sgb" value="Enregistrer"></input>
      </div>
    </form>`

}
function salesForm(stockbottle_id:any, image:any, brand:any, weight:any, stockid:any, stockname:any, ucp:any){
  var container:any = document.querySelector('#sub-fsc-2');
  brand = brand.replace(/-/g, ' ');

  container.innerHTML = `<h4>BOUTEILLE</h4>
    <div class="image-container" id="">
      <img src=${image} style="width: 100%; height: 200px" alt="bottle">
    </div>
    <form action="" class="data-forms-update" id="new-entries-form" style="margin-top: 2.5em;" onsubmit="createSale(event)">
      <div class="d-flex">
      <div class="info-display" id="info-display-1" style="margin-right: 7em;">
        <div class="new-entries-data">
          <span class="update-name" id="">Stock</span>
          <select class="" id="stocks" name="stock"><option value="${stockid}">${stockname}</option></select>
        </div>
        <div class="new-entries-data d-flex">
          <div class="update-name" id="">Poids</div>
          <div class="update-data" id="ud-1">${weight}</div>
        </div>
        <label class="new-entries-data" for="">
          <span class="update-name" >Prix de Vente (Unité)</span>
          <input type="number" name="usp" id="usp" >
        </label>
        <div id="stockbottle-id" style="display:none">${stockbottle_id}</div>
      </div>
      <div class="info-display" id="info-display-2">
        <div class="new-entries-data d-flex">
          <div class="update-name" id="">Marque</div>
          <div class="update-data" id="brand">${brand}</div>
        </div>
        <div class="new-entries-data d-flex">
          <div class="update-name" id="">Prix d'Achat (unité)</div>
          <div class="update-data" id="ucp">${ucp}</div>
        </div>
        <label class="new-entries-data" for="">
          <span class="update-name" id="">Quantité</span>
          <input type="number" name="quantity" id="quantity" >
        </label>
      </div>
      </div>
      <div class="" id="button-container" style="padding-left: 12em;">
        <input type="submit" class="save-here" id="btn-update-sgb" value="Enregistrer"></input>
      </div>
    </form>`

}
function stockFormsRender():string{
    var display =  `<div class="form-containers" id="form-stock-container">
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
            <input type="submit" id="stock-submit" name="stock-submit" value="Enregistrer" onclick="createStock()">
          </div>
        </form>
        <form action="" class="data-forms" id="stock-form-2" >
          <div class="form-title" id="">Stock Enregistrés</div>
          <div class="" id="stock-list-container"></div>
        </form>
        </div>`
    loadStocks();
    return display;
}
function entriesRender():string{
  loadStocks();
  loadBottles("entries");
  loadEntries();
    return  `<div class="form-containers" id="form-stock-container" style="border-bottom: 1px solid #12151e; border-top: 1px solid #12151e;">
      <div class="sub-fsc" id="sub-fsc-1">
        <div class="" id="update-search-gas" >
          <form action="" style="width: 100%;">
            <input type="search" name="search-gas-update" id="search-gas-update" placeholder="Rechercher">
          </form>
        </div>
        <div id="search-data-container-main"></div>
      </div>
      <div class="sub-fsc" id="sub-fsc-2">
        <h3 style="padding:1em; border: 1px dashed gray; margin:0.5em; text-align:center"><i class="icon-lg mdi mdi-arrow-left text-primary ms-auto stock-icons"></i> Selectionner la bouteille <i class="icon-lg mdi mdi-arrow-up text-primary ms-auto stock-icons"></i> </h3>
      </div>
    </div>
    <div class="form-foot-container">
      <div class="" style="padding: .5em;">
        <h4>Achats Enregistrés</h4>
        <div class="entries-list-container">
          <div class="entries-list">
            <table id="entries-table">
              
            </table>
          </div>
        </div>
      </div>
    </div>`
}
function salesRender():string{
  loadStocks();
  loadBottles("sales");
  loadSales();
    return  `<div class="form-containers" id="form-stock-container" style="border-bottom: 1px solid #12151e; border-top: 1px solid #12151e;">
    <div class="sub-fsc" id="sub-fsc-1">
      <div class="" id="update-search-gas" >
        <form action="" style="width: 100%;">
          <input type="search" name="search-gas-update" id="search-gas-update" placeholder="Rechercher">
        </form>
      </div>
      <div id="search-data-container-main"></div>
    </div>
    <div class="sub-fsc" id="sub-fsc-2">
      <h3 style="padding:1em; border: 1px dashed gray; margin:0.5em; text-align:center"><i class="icon-lg mdi mdi-arrow-left text-primary ms-auto stock-icons"></i> Selectionner la bouteille <i class="icon-lg mdi mdi-arrow-up text-primary ms-auto stock-icons"></i> </h3>
    </div>
  </div>
  <div class="form-foot-container">
    <div class="" style="padding: 1em;">
      <h4>Ventes Enregistrées</h4>
      <div class="entries-list-container">
        <div class="entries-list">
          <table id="entries-table">
            
          </table>
        </div>
      </div>
    </div>
  </div>`
}
function personalInfosRender():string{
  loadPersonalInfo();
  return `<div class="infos-data-container">
  <div class="info-block" id="storeinfo">
    
  </div>
  <div class="info-block" id="managerinfo">
    
  </div>
  <div class="info-validate-button" id="">
    <button >Sauvegarder Mes Informations</button>
  </div>
</div>`
  
}
function createStock(){
    var stock_form = document.getElementById("stock-form");
    var stock_name:any = document.getElementById("stock-name");
    var stock_label:any = document.getElementById("stock-label");

    if (stock_form) stock_form.addEventListener("submit", function(event){ event.preventDefault();})
    if (stock_name) stock_name = stock_name.value
    if (stock_label) stock_label = stock_label.value

    stock_socket.send(
      JSON.stringify({
        "message": {"name": stock_name, "label": stock_label, "store": getCookie('storeid')},
        "action": "create"
      })
    );

    stockFormsRender();
}
function updateStock(id:any){
  var new_name = window.prompt("Nouveau Nom de Stock:");
  var new_label = window.prompt("label:");

  stock_socket.send(
    JSON.stringify({
      "message": {"id": Number(id), "name": new_name, "label": new_label},
      "action": "update"
    })
  );

  stockFormsRender();
}
function deleteStock(id:any){
  if (window.confirm("Êtes-vous vraiment sûr de vouloir supprimer ce stock ? Tous les enregistrements et données dans ce stock seront également supprimés!")){
    stock_socket.send(
      JSON.stringify({
        "message": Number(id),
        "action": "delete"
      })
    );
  }
  stockFormsRender();
}
function createEntry(event:any){
  event.preventDefault();
  var bottle:any = document.getElementById('bottle-id');
  var stock:any = document.getElementById('stocks');
  var pau:any = document.getElementById('PAU');
  var quantity:any = document.getElementById('quantity');

  entries_socket.send(JSON.stringify({
    "message": {
      "bottle_id": bottle.innerHTML, 
      "stock_id": stock.value, 
      "quantity": quantity.value,
      "unit_cost_price": pau.value
    },
    "action": "create"
  }))
  
  loadBottles("entries");
  loadEntries();
}
function createSale(event:any){
  event.preventDefault();
  var bottle:any = document.getElementById('stockbottle-id');
  var pvu:any = document.getElementById('usp');
  var quantity:any = document.getElementById('quantity');

  sales_socket.send(JSON.stringify({
    "message": {
      "stockgasbottle_id": bottle.innerHTML,
      "quantity": quantity.value,
      "unit_selling_price": pvu.value
    },
    "action": "create"
  }))
  
  loadBottles("sales");
  loadSales();
}
function deleteEntry(id:any) {
  if (window.confirm("Êtes-vous vraiment sûr de vouloir annuler cet achat ?")){
    entries_socket.send(
      JSON.stringify({
        "message": Number(id),
        "action": "delete"
      })
    );
  }
  loadBottles("entries");
  loadSales();
}
function deleteSale(id:any) {
  if (window.confirm("Êtes-vous vraiment sûr de vouloir annuler cette vente ?")){
    sales_socket.send(
      JSON.stringify({
        "message": Number(id),
        "action": "delete"
      })
    );
  }
  loadBottles("sales");
  loadSales();
}
function personalDataUpdate(id:any){
  var submit_button:HTMLElement|null = document.querySelector('.info-validate-button button');
  var element:any = document.getElementById(id);
  var new_value = window.prompt("Entrez la nouvelle valeur:");
  if (new_value && submit_button){
    element.textContent = new_value;
    submit_button.style.backgroundColor = "rgb(0, 255, 26)";
    submit_button.style.color = "#12151e";
    submit_button.addEventListener("click", updatePD);
  }
}
function storeDataUpdate(id:any){
  var submit_button:HTMLElement|null = document.querySelector('.info-validate-button button');
  var element:any = document.getElementById(id);
  var new_value = window.prompt("Entrez la nouvelle valeur:");
  if (new_value && submit_button){
    element.textContent = new_value;
    submit_button.style.backgroundColor = "rgb(0, 255, 26)";
    submit_button.style.color = "#12151e";
    submit_button.addEventListener("click", updateSD);
  }
}

function updatePD(){
  var manager_data = document.querySelectorAll('.manager-data');
  var data_array = new Array();
  manager_data.forEach(element => {
    data_array.push(element.textContent)
  });

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `/accounts/geststores/${getCookie('userid')}/`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Token '+getCookie('token'));
  xhr.setRequestHeader('csrftoken', ''+getCookie('csrftoken'));
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var d = JSON.parse(xhr.response);
      loadPersonalInfo();
      alert("MIS À JOUR EFFECTUÈE !");
    }
    else{
      console.error(xhr.response)
    }
  }
  xhr.send(
    JSON.stringify({
      "username": data_array[0],
      "email": data_array[1],
      "location": data_array[2]=="Aucune"?null:data_array[2],
      "phone_No": data_array[3],
      "no_cni": data_array[4]
    })
  );
    
  // gasstore_socket.send(
  //   JSON.stringify({
  //       "message": {
  //         "id": `${getCookie('userid')}`,
  //         "username": data_array[0],
  //         "email": data_array[1],
  //         "location": data_array[2]=="Aucune"?null:data_array[2],
  //         "phone_No": data_array[3],
  //         "no_cni": data_array[4]
  //       },
  //       "action": "update"
  //   })
  // );
}
function updateSD(){
  var manager_data = document.querySelectorAll('.store-data');
  var data_array = new Array();
  manager_data.forEach(element => {
    data_array.push(element.textContent)
  });

  gasstore_socket.send(
    JSON.stringify({
        "message": {
          "id": `${getCookie('storeid')}`,
          "name": data_array[0],
          "location": data_array[1]=="Aucune"?null:data_array[1],
          "infos": data_array[2]
        },
        "action": "update"
    })
  );
}


const stock_socket = new WebSocket("ws://127.0.0.1:8000/ws/stock/");
const entries_socket = new WebSocket("ws://127.0.0.1:8000/ws/entries/");
const sales_socket = new WebSocket("ws://127.0.0.1:8000/ws/sales/");

entries_socket.onmessage = function(message){
  console.log(message);
}
sales_socket.onmessage = function(message){
  console.log(message);
}



// window.addEventListener('DOMContentLoaded', ()=>{
//   var update_icons = document.querySelectorAll('.sub-infos i');
//   var manager_data = document.querySelectorAll('.manager-data');
//   var submit_button:any = document.querySelector('.info-validate-button button');

// manager_data.forEach(element => {
//   element.addEventListener('change', ()=>{
//     submit_button.style.backgroundColor = "rgb(0, 255, 26)";
//     submit_button.style.color = "#12151e";
//   });
// });

// for (var element of update_icons) {
//   element.addEventListener('click', ()=>{
//     var new_value = window.prompt("Nouvelle Valeur:")
//     element.textContent = new_value;
//   });
// };

// submit_button.addEventListener("click", function(){
//   var data_array = new Array();
//   manager_data.forEach(element => {
//     data_array.push(element.textContent)
//   });
//   console.log(data_array);
// });});