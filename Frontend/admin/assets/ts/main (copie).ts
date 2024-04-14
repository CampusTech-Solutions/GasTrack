/* URL */
const web_url = location.host;

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
class Store
{
    public id:any;
    public name:string;
    public gesStore:GesStore;
    public location:object;

    public constructor(id:any, name:string, gesStore:GesStore, location:object)
    {
        this.id = id;
        this.name = name;
        this.gesStore = gesStore;
        this.location = location;
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

interface EditManager extends WritingManager
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

/* Controllers du dépôt */

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
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    delete(id:any) {
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
            },
            error: function (error) {
                console.log({ "errors" : error });
            },
        });
    }

    read(id: any) {
        throw new Error("Method not implemented.");
    }

    readAll() {
        $.ajax({
            url: `http://${web_url}/accounts/geststores`,
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

// Create gesStore
function createGesStore()
{

    $("#add-ges-form").on("submit", (e) => {
        e.preventDefault();

        var registrationNumber = Math.floor(Date.now() % 1000000000);
        
        let form = $("#add-ges-form")[0];

        let gesStore = new GesStore(form["username"].value, form["email"].value, form["no_cni"].value, form["phone_no"].value, form["password"].value, registrationNumber.toString());

        gesStoreManager.create(gesStore);

        loadGesStores();
    });
}

// GesStore rendering
function displayGesStore(dt:any)
{
    let gesStore = new GesStore(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.matricule, dt.id);
    
    let gesStoreRenderer = new GesStoreRenderer(gesStore);
    
    $(".datatable tbody").append(gesStoreRenderer.render());
}

// Load GesStores
function loadGesStores(search = false)
{
    $(".datatable tbody").empty();
    gesStoreManager.readAll();

    let datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));

    $("#gesStore-search-box").on("input", (e) => {
        $(".datatable tbody").empty();

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
            for(let i = 0; i < datas.length; i++)
            {
                let dt = datas[i];

                displayGesStore(dt);
            }
        }
    });

    for(let i = 0; i < datas.length; i++)
    {
        let dt = datas[i];

        displayGesStore(dt);
    }
}

// delete GesStores
function deleteGesStore(id:any)
{
    gesStoreManager.delete(id);
    setTimeout(() => {
        loadGesStores();
    }, 500);
}






// Create Pagination
var currentPage = 1; // Page actuelle

function Pagination()
{
    var table = document.querySelector(".datatable tbody");
    // Données de la table (exemple)
    let datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));

    var nblines = document.getElementById("data-size");
    var pageSize = nblines?.value; // Nombre d'éléments par page
    currentPage = 1; // Page actuelle

    // Initialiser la table et la pagination
    loadTableData(currentPage, pageSize, datas);
    loadPagination(datas, pageSize);
    highlightCurrentPageButton();
}


function loadTableData(page, pageSize, tableData) {
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize;

    for (var i = startIndex; i < endIndex && i < tableData.length; i++) {
        var dt = tableData[i];
        displayGesStore(dt);
    }
}

function loadPagination(tableData, pageSize) {
    var totalPages = Math.ceil(tableData.length / pageSize);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (var i = 1; i <= totalPages; i++) {
        var button = "<button onclick='changePage(" + i + ", " + pageSize + ", " + tableData + ")'>" + i + "</button>";
        pagination.innerHTML += button;
    }
}

function changePage(page, pageSize, tableData) {
    currentPage = page;
    loadTableData(currentPage, pageSize, tableData);
    highlightCurrentPageButton();
}

function highlightCurrentPageButton() {
    var buttons = document.querySelectorAll("#pagination button");
    buttons.forEach(function(button) {
        button.classList.remove("active");
    });
    var currentPageButton = document.querySelector("#pagination button:nth-child(" + currentPage + ")");
    currentPageButton?.classList.add("active");
}






createGesStore();
loadGesStores();



Pagination();