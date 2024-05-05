/* URL */
const web_url = location.host + ":8000/api";
let datas = JSON.parse(window.localStorage.getItem("client-datas"));

/**************************************************************************/
/* LES ENTITES */
// Modèle pour le gestionnaire de dépôt
class GesStore
{
    public id:any;
    public name:string;
    public email:string;
    public cni:string;
    public tel:string;
    public password:string;
    public registrationNumber:string;

    public constructor(name:string, email:string, cni:string, tel:string, password:string = "", registrationNumber:string = "", id:any = null)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cni = cni;
        this.tel = tel;
        this.password = password;
        this.registrationNumber = registrationNumber;
    }

}

// Modèle pour le dépôt
class GasStore
{
    public id:any;
    public name:string;
    public gesStore:GesStore|null;
    public location:string|null;
    public image:any;
    public store_status:boolean;

    public constructor(name:string, gesStore:GesStore|null, location:string|null, image:any, store_status:boolean = true, id:any = null)
    {
        this.id = id;
        this.name = name;
        this.gesStore = gesStore;
        this.location = location;
        this.image = image;
        this.store_status = store_status;
    }

}

// Modèle pour les clients
class Client
{
    public id:any;
    public name:string;
    public email:string;
    public cni:string;
    public tel:string;
    public password:string;

    public constructor(name:string, email:string, cni:string, tel:string, password:string = "", id:any = null)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cni = cni;
        this.tel = tel;
        this.password = password;
    }

}

class Admin
{
    public id:any;
    public name:string;
    public email:string;
    public cni:string;
    public tel:string;
    public password:string;

    public constructor(name:string, email:string, cni:string, tel:string, password:string = "", id:any = null)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cni = cni;
        this.tel = tel;
        this.password = password;
    }

}

/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* LES MANAGERS */
/* interfaces manager */
interface ReadingManager
{
    read(id:any):any;
    readAll():any;
}

interface WritingManager
{
    create(entity:any):any;
    delete(entity:any):any;
}

interface EditManager
{
    update(entity:any):any;
}

/* Fonctions utiles */
function getCookie(name):string {

    let cookieValue:any  = null;

    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  
  }

/* Controleur du dépôt */
class GesStoreManager implements WritingManager, ReadingManager
{
    public create(gesStore:GesStore) {
        $.ajax({
            url: `http://${web_url}/accounts/geststore/signup/`,
            type: "POST",
            processData: false,
            contentType: false,
            data: JSON.stringify({
                "username": gesStore.name,
                "email": gesStore.email,
                "no_cni": gesStore.cni,
                "phone_No": gesStore.tel,
                "password": gesStore.password,
                "matricule": gesStore.registrationNumber
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                //Authorization: "Token " + window.localStorage.getItem("Token"),
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Gestionnaire de dépôt créer avec succès");
                console.log(data);
                loadGesStores();
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    public delete(id:any) {
        $.ajax({
            url: `http://${web_url}/accounts/geststores/${id}`,
            type: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                //Authorization: "Token " + window.localStorage.getItem("Token"),
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Gestionnaire de dépôt supprimé avec succès");
                loadGesStores();
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    public read(id: any) {
        throw new Error("Method not implemented.");
    }

    public readAll() {
        $.ajax({
            url: `http://${web_url}/accounts/geststores/`,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
                "access-control-allow-origin" : "*",
                "vary" : "Origin",
            },
            success: (data) => {
                window.localStorage.setItem("gesStore-datas", JSON.stringify(data.results));
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

}

/* Controleur du depôt de gaz */
class GasStoreManager implements WritingManager, ReadingManager
{
    public create(gasStore:GasStore) {

        var formData = new FormData();
        formData.append("name", gasStore.name);
        formData.append("manager", gasStore.gesStore.id);
        formData.append("location", gasStore.location);
        formData.append("image", gasStore.image);

        $.ajax({
            url: `http://${web_url}/gasmanagement/gasstore/new/`,
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                //Authorization: "Token " + window.localStorage.getItem("Token"),
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Dépôt créer avec succès");
                console.log(data);
                loadGasStores();
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    public delete(id:any) {
        $.ajax({
            url: `http://${web_url}/gasmanagement/gasstore/delete/${id}`,
            type: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                //Authorization: "Token " + window.localStorage.getItem("Token"),
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Dépôt supprimé avec succès");
                loadGasStores();
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    public read(id: any) {
        throw new Error("Method not implemented.");
    }

    public readAll() {
        $.ajax({
            url: `http://${web_url}/gasmanagement/gasstore/`,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
                "access-control-allow-origin" : "*",
                "vary" : "Origin",
            },
            success: (data) => {
                window.localStorage.setItem("gasStore-datas", JSON.stringify(data.results));
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}

/* Controleur du client */
class ClientManager implements WritingManager, ReadingManager
{
    public create(gesStore:GesStore) {
        //...
    }

    public delete(id:any) {
        $.ajax({
            url: `http://${web_url}/accounts/clients/${id}`,
            type: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                //Authorization: "Token " + window.localStorage.getItem("Token"),
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Client supprimé avec succès");
                loadClients();
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    public read(id: any) {
        throw new Error("Method not implemented.");
    }

    public readAll() {
        $.ajax({
            url: `http://${web_url}/accounts/clients/`,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"),  // don't forget to include the 'getCookie' function
                "access-control-allow-origin" : "*",
                "vary" : "Origin",
            },
            success: (data) => {
                window.localStorage.setItem("client-datas", JSON.stringify(data.results));
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

}

/* Controleur de l'admin */
class AdminManager implements EditManager
{
    public update(admin:Admin) {
        $.ajax({
            url: `http://${web_url}/accounts/admins/${admin.id}`,
            type: "PATCH",
            processData: false,
            contentType: false,
            data: JSON.stringify({
                "username": admin.name,
                "email": admin.email,
                "no_cni": admin.cni,
                "phone_No": admin.tel,
                "password": admin.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                //Authorization: "Token " + window.localStorage.getItem("Token"),
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Admin modifié avec succès");
                loadClients();
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }
}
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* LES AFFICHEURS */
/* interfaces d'affichage */
interface Renderable
{
    render():string;
}

/* Classes d'affichage */
class GesStoreRenderer implements Renderable
{
    private gesStore:GesStore;

    public constructor(gesStore:GesStore)
    {
        this.gesStore = gesStore;
    }

    public render():string {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return `
            <tr>
                <td>${this.gesStore.name}</td>
                <td>${this.gesStore.email}</td>
                <td>${this.gesStore.tel}</td>
                <td>${this.gesStore.registrationNumber}</td>
                <td><button class="btn btn-danger" onclick="deleteGesStore(${this.gesStore.id})"><i class="mdi mdi-delete-forever"></i></button></td>
            </tr>
        `;
    }
}

class GasStoreRenderer implements Renderable
{
    private gasStore:GasStore;

    public constructor(gasStore:GasStore)
    {
        this.gasStore = gasStore;
    }

    public render():string {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return `
            <tr>
                <td>${this.gasStore.name}</td>
                <td>${this.gasStore.gesStore.name}</td>
                <td>${this.gasStore.gesStore.tel}</td>
                <td>${this.gasStore.gesStore.registrationNumber}</td>
                <td><button class="btn btn-danger" onclick="deleteGasStore(${this.gasStore.id})"><i class="mdi mdi-delete-forever"></i></button></td>
            </tr>
        `;
    }
}


class ClientRenderer implements Renderable
{
    private client:Client;

    public constructor(client:Client)
    {
        this.client = client;
    }

    public render():string {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return `
            <tr>
                <td>${this.client.name}</td>
                <td>${this.client.email}</td>
                <td>${this.client.tel}</td>
                <td>${this.client.cni}</td>
                <td><button class="btn btn-danger" onclick="deleteClient(${this.client.id})"><i class="mdi mdi-delete-forever"></i></button></td>
            </tr>
        `;
    }
}

/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* Tests */
let gesStoreManager = new GesStoreManager();
let gasStoreManager = new GasStoreManager();
let clientManager = new ClientManager();

// Variables pour la gestion des paginations
var nblines = document.getElementById("data-size");
var currentPage = 1; // Page actuelle
var min = 0, max = 3;


// **************************** GESTIONNAIRES DE DEPOT ***************************************
function getMaxId()
{
    let max = 0;
    if(datas != null)
    {
        for(let i = 0; i < datas.length; i++)
        {
            let dt = datas[i];
            if(dt.id > max) max = dt.id;
        }
    }
    return max;
}

function createGesStore()
{

    $("#add-ges-form").on("submit", (e) => {
        e.preventDefault();

        var date = new Date();
        const year = date.getFullYear();
        const idSize = getMaxId().toString().length;
        var zeros_in_reg_num = "";
        for(let i = 0; i < 4 - idSize; i++)
        {
            zeros_in_reg_num += "0";
        }
        var registrationNumber = `${year}GE${zeros_in_reg_num}${getMaxId()}`;
        
        let form = $("#add-ges-form")[0];

        let gesStore = new GesStore(form["username"].value, form["email"].value, form["no_cni"].value, form["phone_no"].value, form["password"].value, registrationNumber.toString());

        gesStoreManager.create(gesStore);

        setTimeout(() => {
            loadGesStores();
        }, 1000);
    });
}

// GesStore rendering
function displayGesStore(dt:any)
{
    let gesStore = new GesStore(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.matricule, dt.id);
    
    let gesStoreRenderer = new GesStoreRenderer(gesStore);
    
    $("#gesStore-list-table tbody").append(gesStoreRenderer.render());
}

// Load GesStores
function loadGesStores(search = false, pageSize = 10)
{
    pageSize = parseInt(nblines?.value);
    $("#gesStore-list-table tbody").empty();
    gesStoreManager.readAll();

    datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));

    $("#gesStore-search-box").on("input", (e) => {
        $("#gesStore-list-table tbody").empty();

        let value = $("#gesStore-search-box").val();

        if(value?.toString().trim() != "")
        {
            for(let i = 0; i < datas.length; i++)
            {
                let dt = datas[i];
                if(dt.username.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.email.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.no_cni.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.phone_No.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.matricule.toLowerCase().includes(value?.toString().toLowerCase()))
                {
                    displayGesStore(dt);
                }
            }
        }
        else
        {
            if(isNaN(pageSize))
            {
                for (var i = 0; i < datas.length; i++) {
                    var dt = datas[i];
                    displayGesStore(dt);
                }
            }
            else
                gesStorePagination(pageSize);
        }
    });

    if(isNaN(pageSize))
    {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            displayGesStore(dt);
        }
    }
    else
        gesStorePagination(pageSize);
}

// delete GesStores
function deleteGesStore(id:any)
{
    gesStoreManager.delete(id);
    setTimeout(() => {
        loadGesStores();
    }, 500);
}




// ********************************* CLIENT ***************************************

// GesStore rendering
function displayClient(dt:any)
{
    let client = new Client(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.id);
    
    let clientRenderer = new ClientRenderer(client);
    
    $("#client-list-table tbody").append(clientRenderer.render());
}

// Load GesStores
function loadClients(search = false, pageSize = 10)
{
    pageSize = parseInt(nblines.value);
    $("#client-list-table tbody").empty();
    clientManager.readAll();

    datas = JSON.parse(window.localStorage.getItem("client-datas"));

    $("#client-search-box").on("input", (e) => {
        $("#client-list-table tbody").empty();

        let value = $("#client-search-box").val();

        if(value?.toString().trim() != "")
        {
            for(let i = 0; i < datas.length; i++)
            {
                let dt = datas[i];
                if(dt.username.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.email.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.no_cni.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    dt.phone_No.toLowerCase().includes(value?.toString().toLowerCase()))
                {
                    displayClient(dt);
                }
            }
        }
        else
        {
            if(isNaN(pageSize))
            {
                for (var i = 0; i < datas.length; i++) {
                    var dt = datas[i];
                    displayClient(dt);
                }
            }
            else
                clientPagination(pageSize);
        }
    });

    if(isNaN(pageSize))
    {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            displayClient(dt);
        }
    }
    else
        clientPagination(pageSize);
}

// delete GesStores
function deleteClient(id:any)
{
    clientManager.delete(id);
}

// *********************************** DEPOTS ***************************************

function createGasStore()
{

    $("#add-gasStore-form").on("submit", (e) => {
        e.preventDefault();
        
        let form = $("#add-gasStore-form")[0];
        
        var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));
        let location:string|null = window.localStorage.getItem("selected_location");

        let currentGesStore:GesStore|null = null;

        for(let i = 0; i < datass.length; i++)
        {
            let dt = datass[i];
            if(dt.id == form["gesStore"].value)
            {
                currentGesStore = new GesStore(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.matricule, dt.id);
                break;
            }
        }

        let gasStore = new GasStore(form["name"].value, currentGesStore, location, form["image"].value);

        gasStoreManager.create(gasStore);

        setTimeout(() => {
            loadGasStores();
        }, 1000);
    });
}

// GasStore rendering
function displayGasStore(dt:any)
{
    var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));

    let currentGesStore:GesStore|null = null;

    for(let i = 0; i < datass.length; i++)
    {
        let dts = datass[i];
        if(dts.id == dt.manager)
        {
            currentGesStore = new GesStore(dts.username, dts.email, dts.no_cni, dts.phone_No, "", dts.matricule, dts.id);
            break;
        }
    }
    let gasStore = new GasStore(dt.name, currentGesStore, dt.location, dt.image, dt.store_status, dt.id);
    
    let gasStoreRenderer = new GasStoreRenderer(gasStore);
    
    $("#gasStore-list-table tbody").append(gasStoreRenderer.render());
}

// Load GasStores
function loadGasStores(search = false, pageSize = 1)
{
    pageSize = parseInt(nblines?.value);
    $("#gasStore-list-table tbody").empty();
    gasStoreManager.readAll();

    datas = JSON.parse(window.localStorage.getItem("gasStore-datas"));

    $("#gasStore-search-box").on("input", (e) => {
        $("#gasStore-list-table tbody").empty();

        let value = $("#gasStore-search-box").val();

        if(value?.toString().trim() != "")
        {
            for(let i = 0; i < datas.length; i++)
            {
                let dt = datas[i];

                var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));

                let currentGesStore:GesStore|null = null;

                for(let i = 0; i < datass.length; i++)
                {
                    let dts = datass[i];
                    if(dts.id == dt.manager)
                    {
                        currentGesStore = new GesStore(dts.username, dts.email, dts.no_cni, dts.phone_No, "", dts.matricule, dts.id);
                        break;
                    }
                }
                if(dt.name.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    currentGesStore?.name.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    currentGesStore?.tel.toLowerCase().includes(value?.toString().toLowerCase()) ||
                    currentGesStore?.registrationNumber.toLowerCase().includes(value?.toString().toLowerCase()))
                {
                    displayGasStore(dt);
                }
            }
        }
        else
        {
            if(isNaN(pageSize))
            {
                for (var i = 0; i < datas.length; i++) {
                    var dt = datas[i];
                    displayGasStore(dt);
                }
            }
            else
                gasStorePagination(pageSize);
        }
    });

    if(isNaN(pageSize))
    {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            displayGasStore(dt);
        }
    }
    else
        gasStorePagination(pageSize);
}

// delete GasStores
function deleteGasStore(id:any)
{
    gasStoreManager.delete(id);
    setTimeout(() => {
        loadGasStores();
    }, 500);
}

function fillGesStoreList()
{
    datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));

    let content = ``;
    for(let i = 0; i < datas.length; i++)
    {
        let dt = datas[i];
        content += `<option value="${dt.id}">${dt.username}</option>`;
    }
    $("#gesStore-list").html(content);
}


// **************************** PAGINATIONS PERSONNALISEES ***************************************
//Pagination gesStore
function gesStorePagination(pageSize) {
    // Initialiser la table et la pagination
    loadGesStoreTableData(currentPage, pageSize);
    loadGesStorePagination(pageSize);
    highlightCurrentPageButton();
}

function loadGesStoreTableData(page, pageSize) {
    $("#gesStore-list-table tbody").empty();
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    for (var i = startIndex; i < endIndex && i < datas.length; i++) {
        var dt = datas[i];
        displayGesStore(dt);
    }
}

function loadGesStorePagination(pageSize) {
    var totalPages = Math.ceil(datas.length / pageSize);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    min = currentPage - 2 < 1 ? 1 : currentPage - 2;
    max = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
    for (var i = min; i <= max; i++) {
        var button = `<button class="btn btn-default" onclick='changeGesStorePage(${i}, ${pageSize})'>${i}</button>`;
        pagination.innerHTML += button;
    }
}

function changeGesStorePage(page, pageSize) {
    currentPage = page;
    loadGesStorePagination(pageSize);
    loadGesStoreTableData(currentPage, pageSize);
    highlightCurrentPageButton();
}

//Pagination Client
function clientPagination(pageSize) {
    // Initialiser la table et la pagination
    loadClientTableData(currentPage, pageSize);
    loadClientPagination(pageSize);
    highlightCurrentPageButton();
}

function loadClientTableData(page, pageSize) {
    $("#client-list-table tbody").empty();
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    for (var i = startIndex; i < endIndex && i < datas.length; i++) {
        var dt = datas[i];
        displayClient(dt);
    }
}

function loadClientPagination(pageSize) {
    var totalPages = Math.ceil(datas.length / pageSize);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    min = currentPage - 2 < 1 ? 1 : currentPage - 2;
    max = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
    for (var i = min; i <= max; i++) {
        var button = `<button class="btn btn-default" onclick='changeClientPage(${i}, ${pageSize})'>${i}</button>`;
        pagination.innerHTML += button;
    }
}

function changeClientPage(page, pageSize) {
    currentPage = page;
    loadClientPagination(pageSize);
    loadClientTableData(currentPage, pageSize);
    highlightCurrentPageButton();
}

//Pagination gasStore
function gasStorePagination(pageSize) {
    // Initialiser la table et la pagination
    loadGasStoreTableData(currentPage, pageSize);
    loadGasStorePagination(pageSize);
    highlightCurrentPageButton();
}

function loadGasStoreTableData(page, pageSize) {
    $("#gasStore-list-table tbody").empty();
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    for (var i = startIndex; i < endIndex && i < datas.length; i++) {
        var dt = datas[i];
        displayGasStore(dt);
    }
}

function loadGasStorePagination(pageSize) {
    var totalPages = Math.ceil(datas.length / pageSize);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    min = currentPage - 2 < 1 ? 1 : currentPage - 2;
    max = currentPage + 2 > totalPages ? totalPages : currentPage + 2;
    for (var i = min; i <= max; i++) {
        var button = `<button class="btn btn-default" onclick='changeGasStorePage(${i}, ${pageSize})'>${i}</button>`;
        pagination.innerHTML += button;
    }
}

function changeGasStorePage(page, pageSize) {
    currentPage = page;
    loadGasStorePagination(pageSize);
    loadGasStoreTableData(currentPage, pageSize);
    highlightCurrentPageButton();
}

// Fonction communes à toutes les paginations
function changePaginationSize()
{
    $("#data-size").on("change", (e) => {
        let pageSize  = null;
        try
        {
            pageSize = parseInt($("#data-size").val());
        }
        catch
        {
            pageSize = null;
        }
        loadGesStores(false, pageSize);
    });
}

function highlightCurrentPageButton() {
    var buttons = document.querySelectorAll("#pagination button");
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
    var currentPageButton = document.querySelector("#pagination button:nth-child(" + (currentPage - min + 1) + ")");
    currentPageButton === null || currentPageButton === void 0 ? void 0 : currentPageButton.classList.add("active");
}

// Si la carte est cliquée
function onMapClick() {
    $("#map").on("click", (e:any) => {
        var lat = (e.latlng.lat);
        var lng = (e.latlng.lng);
        
        let loc_data = {
            "location": {
                "type" : "Point",
                "coordinates": [
                lat,
                lng
                ]
            }
        }
        window.localStorage.setItem("selected_location", JSON.stringify(loc_data));
    });
}


// APPELS DE FONCTION
onMapClick();

createGesStore();
createGasStore();
fillGesStoreList();

loadClients();
loadGesStores();
loadGasStores();

changePaginationSize();