/* URL */
var web_url = location.host + ":8000/api";
var datas = JSON.parse(window.localStorage.getItem("client-datas"));
/**************************************************************************/
/* LES ENTITES */
// Modèle pour le gestionnaire de dépôt
var GesStore = /** @class */ (function () {
    function GesStore(name, email, cni, tel, password, registrationNumber, id) {
        if (password === void 0) { password = ""; }
        if (registrationNumber === void 0) { registrationNumber = ""; }
        if (id === void 0) { id = null; }
        this.id = id;
        this.name = name;
        this.email = email;
        this.cni = cni;
        this.tel = tel;
        this.password = password;
        this.registrationNumber = registrationNumber;
    }
    return GesStore;
}());
// Modèle pour le dépôt
var GasStore = /** @class */ (function () {
    function GasStore(name, gesStore, location, image, store_status, id) {
        if (store_status === void 0) { store_status = true; }
        if (id === void 0) { id = null; }
        this.id = id;
        this.name = name;
        this.gesStore = gesStore;
        this.location = location;
        this.image = image;
        this.store_status = store_status;
    }
    return GasStore;
}());
// Modèle pour les clients
var Client = /** @class */ (function () {
    function Client(name, email, cni, tel, password, id) {
        if (password === void 0) { password = ""; }
        if (id === void 0) { id = null; }
        this.id = id;
        this.name = name;
        this.email = email;
        this.cni = cni;
        this.tel = tel;
        this.password = password;
    }
    return Client;
}());
var Admin = /** @class */ (function () {
    function Admin(name, email, cni, tel, password, id) {
        if (password === void 0) { password = ""; }
        if (id === void 0) { id = null; }
        this.id = id;
        this.name = name;
        this.email = email;
        this.cni = cni;
        this.tel = tel;
        this.password = password;
    }
    return Admin;
}());
/* Fonctions utiles */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
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
var GesStoreManager = /** @class */ (function () {
    function GesStoreManager() {
    }
    GesStoreManager.prototype.create = function (gesStore) {
        $.ajax({
            url: "http://".concat(web_url, "/accounts/geststore/signup/"),
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
                console.log({ "errors": error });
            },
        });
    };
    GesStoreManager.prototype.delete = function (id) {
        $.ajax({
            url: "http://".concat(web_url, "/accounts/geststores/").concat(id),
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
                console.log({ "errors": error });
            },
        });
    };
    GesStoreManager.prototype.read = function (id) {
        throw new Error("Method not implemented.");
    };
    GesStoreManager.prototype.readAll = function () {
        $.ajax({
            url: "http://".concat(web_url, "/accounts/geststores/"),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "access-control-allow-origin": "*",
                "vary": "Origin",
            },
            success: function (data) {
                window.localStorage.setItem("gesStore-datas", JSON.stringify(data.results));
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    return GesStoreManager;
}());
/* Controleur du depôt de gaz */
var GasStoreManager = /** @class */ (function () {
    function GasStoreManager() {
    }
    GasStoreManager.prototype.create = function (gasStore) {
        var formData = new FormData();
        formData.append("name", gasStore.name);
        formData.append("manager", gasStore.gesStore.id);
        formData.append("location", gasStore.location);
        formData.append("image", gasStore.image);
        $.ajax({
            url: "http://".concat(web_url, "/gasmanagement/gasstore/new/"),
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
                console.log({ "errors": error });
            },
        });
    };
    GasStoreManager.prototype.delete = function (id) {
        $.ajax({
            url: "http://".concat(web_url, "/gasmanagement/gasstore/delete/").concat(id),
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
                console.log({ "errors": error });
            },
        });
    };
    GasStoreManager.prototype.read = function (id) {
        throw new Error("Method not implemented.");
    };
    GasStoreManager.prototype.readAll = function () {
        $.ajax({
            url: "http://".concat(web_url, "/gasmanagement/gasstore/"),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "access-control-allow-origin": "*",
                "vary": "Origin",
            },
            success: function (data) {
                window.localStorage.setItem("gasStore-datas", JSON.stringify(data.results));
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    return GasStoreManager;
}());
/* Controleur du client */
var ClientManager = /** @class */ (function () {
    function ClientManager() {
    }
    ClientManager.prototype.create = function (gesStore) {
        //...
    };
    ClientManager.prototype.delete = function (id) {
        $.ajax({
            url: "http://".concat(web_url, "/accounts/clients/").concat(id),
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
                console.log({ "errors": error });
            },
        });
    };
    ClientManager.prototype.read = function (id) {
        throw new Error("Method not implemented.");
    };
    ClientManager.prototype.readAll = function () {
        $.ajax({
            url: "http://".concat(web_url, "/accounts/clients/"),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "access-control-allow-origin": "*",
                "vary": "Origin",
            },
            success: function (data) {
                window.localStorage.setItem("client-datas", JSON.stringify(data.results));
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    return ClientManager;
}());
/* Controleur de l'admin */
var AdminManager = /** @class */ (function () {
    function AdminManager() {
    }
    AdminManager.prototype.update = function (admin) {
        $.ajax({
            url: "http://".concat(web_url, "/accounts/admins/").concat(admin.id),
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
                console.log({ "errors": error });
            },
        });
    };
    return AdminManager;
}());
/* Classes d'affichage */
var GesStoreRenderer = /** @class */ (function () {
    function GesStoreRenderer(gesStore) {
        this.gesStore = gesStore;
    }
    GesStoreRenderer.prototype.render = function () {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return "\n            <tr>\n                <td>".concat(this.gesStore.name, "</td>\n                <td>").concat(this.gesStore.email, "</td>\n                <td>").concat(this.gesStore.tel, "</td>\n                <td>").concat(this.gesStore.registrationNumber, "</td>\n                <td><button class=\"btn btn-danger\" onclick=\"deleteGesStore(").concat(this.gesStore.id, ")\"><i class=\"mdi mdi-delete-forever\"></i></button></td>\n            </tr>\n        ");
    };
    return GesStoreRenderer;
}());
var GasStoreRenderer = /** @class */ (function () {
    function GasStoreRenderer(gasStore) {
        this.gasStore = gasStore;
    }
    GasStoreRenderer.prototype.render = function () {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return "\n            <tr>\n                <td>".concat(this.gasStore.name, "</td>\n                <td>").concat(this.gasStore.gesStore.name, "</td>\n                <td>").concat(this.gasStore.gesStore.tel, "</td>\n                <td>").concat(this.gasStore.gesStore.registrationNumber, "</td>\n                <td><button class=\"btn btn-danger\" onclick=\"deleteGasStore(").concat(this.gasStore.id, ")\"><i class=\"mdi mdi-delete-forever\"></i></button></td>\n            </tr>\n        ");
    };
    return GasStoreRenderer;
}());
var ClientRenderer = /** @class */ (function () {
    function ClientRenderer(client) {
        this.client = client;
    }
    ClientRenderer.prototype.render = function () {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return "\n            <tr>\n                <td>".concat(this.client.name, "</td>\n                <td>").concat(this.client.email, "</td>\n                <td>").concat(this.client.tel, "</td>\n                <td>").concat(this.client.cni, "</td>\n                <td><button class=\"btn btn-danger\" onclick=\"deleteClient(").concat(this.client.id, ")\"><i class=\"mdi mdi-delete-forever\"></i></button></td>\n            </tr>\n        ");
    };
    return ClientRenderer;
}());
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
var gesStoreManager = new GesStoreManager();
var gasStoreManager = new GasStoreManager();
var clientManager = new ClientManager();
// Variables pour la gestion des paginations
var nblines = document.getElementById("data-size");
var currentPage = 1; // Page actuelle
var min = 0, max = 3;
// **************************** GESTIONNAIRES DE DEPOT ***************************************
function getMaxId() {
    var max = 0;
    if (datas != null) {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            if (dt.id > max)
                max = dt.id;
        }
    }
    return max;
}
function createGesStore() {
    $("#add-ges-form").on("submit", function (e) {
        e.preventDefault();
        var date = new Date();
        var year = date.getFullYear();
        var idSize = getMaxId().toString().length;
        var zeros_in_reg_num = "";
        for (var i = 0; i < 4 - idSize; i++) {
            zeros_in_reg_num += "0";
        }
        var registrationNumber = "".concat(year, "GE").concat(zeros_in_reg_num).concat(getMaxId());
        var form = $("#add-ges-form")[0];
        var gesStore = new GesStore(form["username"].value, form["email"].value, form["no_cni"].value, form["phone_no"].value, form["password"].value, registrationNumber.toString());
        gesStoreManager.create(gesStore);
        setTimeout(function () {
            loadGesStores();
        }, 1000);
    });
}
// GesStore rendering
function displayGesStore(dt) {
    var gesStore = new GesStore(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.matricule, dt.id);
    var gesStoreRenderer = new GesStoreRenderer(gesStore);
    $("#gesStore-list-table tbody").append(gesStoreRenderer.render());
}
// Load GesStores
function loadGesStores(search, pageSize) {
    if (search === void 0) { search = false; }
    if (pageSize === void 0) { pageSize = 10; }
    pageSize = parseInt(nblines === null || nblines === void 0 ? void 0 : nblines.value);
    $("#gesStore-list-table tbody").empty();
    gesStoreManager.readAll();
    datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));
    $("#gesStore-search-box").on("input", function (e) {
        $("#gesStore-list-table tbody").empty();
        var value = $("#gesStore-search-box").val();
        if ((value === null || value === void 0 ? void 0 : value.toString().trim()) != "") {
            for (var i_1 = 0; i_1 < datas.length; i_1++) {
                var dt_1 = datas[i_1];
                if (dt_1.username.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_1.email.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_1.no_cni.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_1.phone_No.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_1.matricule.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) {
                    displayGesStore(dt_1);
                }
            }
        }
        else {
            if (isNaN(pageSize)) {
                for (var i = 0; i < datas.length; i++) {
                    var dt = datas[i];
                    displayGesStore(dt);
                }
            }
            else
                gesStorePagination(pageSize);
        }
    });
    if (isNaN(pageSize)) {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            displayGesStore(dt);
        }
    }
    else
        gesStorePagination(pageSize);
}
// delete GesStores
function deleteGesStore(id) {
    gesStoreManager.delete(id);
    setTimeout(function () {
        loadGesStores();
    }, 500);
}
// ********************************* CLIENT ***************************************
// GesStore rendering
function displayClient(dt) {
    var client = new Client(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.id);
    var clientRenderer = new ClientRenderer(client);
    $("#client-list-table tbody").append(clientRenderer.render());
}
// Load GesStores
function loadClients(search, pageSize) {
    if (search === void 0) { search = false; }
    if (pageSize === void 0) { pageSize = 10; }
    pageSize = parseInt(nblines.value);
    $("#client-list-table tbody").empty();
    clientManager.readAll();
    datas = JSON.parse(window.localStorage.getItem("client-datas"));
    $("#client-search-box").on("input", function (e) {
        $("#client-list-table tbody").empty();
        var value = $("#client-search-box").val();
        if ((value === null || value === void 0 ? void 0 : value.toString().trim()) != "") {
            for (var i_2 = 0; i_2 < datas.length; i_2++) {
                var dt_2 = datas[i_2];
                if (dt_2.username.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_2.email.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_2.no_cni.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    dt_2.phone_No.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) {
                    displayClient(dt_2);
                }
            }
        }
        else {
            if (isNaN(pageSize)) {
                for (var i = 0; i < datas.length; i++) {
                    var dt = datas[i];
                    displayClient(dt);
                }
            }
            else
                clientPagination(pageSize);
        }
    });
    if (isNaN(pageSize)) {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            displayClient(dt);
        }
    }
    else
        clientPagination(pageSize);
}
// delete GesStores
function deleteClient(id) {
    clientManager.delete(id);
}
// *********************************** DEPOTS ***************************************
function createGasStore() {
    $("#add-gasStore-form").on("submit", function (e) {
        e.preventDefault();
        var form = $("#add-gasStore-form")[0];
        var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));
        var location = window.localStorage.getItem("selected_location");
        var currentGesStore = null;
        for (var i = 0; i < datass.length; i++) {
            var dt = datass[i];
            if (dt.id == form["gesStore"].value) {
                currentGesStore = new GesStore(dt.username, dt.email, dt.no_cni, dt.phone_No, "", dt.matricule, dt.id);
                break;
            }
        }
        var gasStore = new GasStore(form["name"].value, currentGesStore, location, form["image"].value);
        gasStoreManager.create(gasStore);
        setTimeout(function () {
            loadGasStores();
        }, 1000);
    });
}
// GasStore rendering
function displayGasStore(dt) {
    var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));
    var currentGesStore = null;
    for (var i = 0; i < datass.length; i++) {
        var dts = datass[i];
        if (dts.id == dt.manager) {
            currentGesStore = new GesStore(dts.username, dts.email, dts.no_cni, dts.phone_No, "", dts.matricule, dts.id);
            break;
        }
    }
    var gasStore = new GasStore(dt.name, currentGesStore, dt.location, dt.image, dt.store_status, dt.id);
    var gasStoreRenderer = new GasStoreRenderer(gasStore);
    $("#gasStore-list-table tbody").append(gasStoreRenderer.render());
}
// Load GasStores
function loadGasStores(search, pageSize) {
    if (search === void 0) { search = false; }
    if (pageSize === void 0) { pageSize = 1; }
    pageSize = parseInt(nblines === null || nblines === void 0 ? void 0 : nblines.value);
    $("#gasStore-list-table tbody").empty();
    gasStoreManager.readAll();
    datas = JSON.parse(window.localStorage.getItem("gasStore-datas"));
    $("#gasStore-search-box").on("input", function (e) {
        $("#gasStore-list-table tbody").empty();
        var value = $("#gasStore-search-box").val();
        if ((value === null || value === void 0 ? void 0 : value.toString().trim()) != "") {
            for (var i_3 = 0; i_3 < datas.length; i_3++) {
                var dt_3 = datas[i_3];
                var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));
                var currentGesStore = null;
                for (var i_4 = 0; i_4 < datass.length; i_4++) {
                    var dts = datass[i_4];
                    if (dts.id == dt_3.manager) {
                        currentGesStore = new GesStore(dts.username, dts.email, dts.no_cni, dts.phone_No, "", dts.matricule, dts.id);
                        break;
                    }
                }
                if (dt_3.name.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()) ||
                    (currentGesStore === null || currentGesStore === void 0 ? void 0 : currentGesStore.name.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    (currentGesStore === null || currentGesStore === void 0 ? void 0 : currentGesStore.tel.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    (currentGesStore === null || currentGesStore === void 0 ? void 0 : currentGesStore.registrationNumber.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()))) {
                    displayGasStore(dt_3);
                }
            }
        }
        else {
            if (isNaN(pageSize)) {
                for (var i = 0; i < datas.length; i++) {
                    var dt = datas[i];
                    displayGasStore(dt);
                }
            }
            else
                gasStorePagination(pageSize);
        }
    });
    if (isNaN(pageSize)) {
        for (var i = 0; i < datas.length; i++) {
            var dt = datas[i];
            displayGasStore(dt);
        }
    }
    else
        gasStorePagination(pageSize);
}
// delete GasStores
function deleteGasStore(id) {
    gasStoreManager.delete(id);
    setTimeout(function () {
        loadGasStores();
    }, 500);
}
function fillGesStoreList() {
    datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));
    var content = "";
    for (var i = 0; i < datas.length; i++) {
        var dt = datas[i];
        content += "<option value=\"".concat(dt.id, "\">").concat(dt.username, "</option>");
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
        var button = "<button class=\"btn btn-default\" onclick='changeGesStorePage(".concat(i, ", ").concat(pageSize, ")'>").concat(i, "</button>");
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
        var button = "<button class=\"btn btn-default\" onclick='changeClientPage(".concat(i, ", ").concat(pageSize, ")'>").concat(i, "</button>");
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
        var button = "<button class=\"btn btn-default\" onclick='changeGasStorePage(".concat(i, ", ").concat(pageSize, ")'>").concat(i, "</button>");
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
function changePaginationSize() {
    $("#data-size").on("change", function (e) {
        var pageSize = null;
        try {
            pageSize = parseInt($("#data-size").val());
        }
        catch (_a) {
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
    $("#map").on("click", function (e) {
        var lat = (e.latlng.lat);
        var lng = (e.latlng.lng);
        var loc_data = {
            "location": {
                "type": "Point",
                "coordinates": [
                    lat,
                    lng
                ]
            }
        };
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
