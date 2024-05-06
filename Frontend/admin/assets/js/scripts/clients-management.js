/* URL */
var web_url = location.host + "/api";
var datas = JSON.parse(window.localStorage.getItem("client-datas"));
/**************************************************************************/
/* LES ENTITES */
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
/* Controleur du client */
var ClientManager = /** @class */ (function () {
    function ClientManager() {
        this.user_token = JSON.parse(window.localStorage.getItem("user"))["token"];
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
                "Authorization": "Token " + this.user_token,
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
                "Authorization": "Token " + this.user_token,
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
        this.user_token = JSON.parse(window.localStorage.getItem("user"))["token"];
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
                "Authorization": "Token " + this.user_token,
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
var ClientRenderer = /** @class */ (function () {
    function ClientRenderer(client) {
        this.client = client;
    }
    ClientRenderer.prototype.render = function () {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return "\n            <tr>\n                <td>".concat(this.client.name, "</td>\n                <td>").concat(this.client.email, "</td>\n                <td>").concat(this.client.tel, "</td>\n                <td>").concat(this.client.cni, "</td>\n                <td><button class=\"btn btn-danger\" onclick=\"deleteClient(").concat(this.client.id, ", event)\"><i class=\"mdi mdi-delete-forever\"></i></button></td>\n            </tr>\n        ");
    };
    return ClientRenderer;
}());
var clientManager = new ClientManager();
// Variables pour la gestion des paginations
var nblines = document.getElementById("data-size");
var currentPage = 1; // Page actuelle
var min = 0, max = 3;
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
        var _a, _b, _c, _d;
        $("#client-list-table tbody").empty();
        var value = $("#client-search-box").val();
        if ((value === null || value === void 0 ? void 0 : value.toString().trim()) != "") {
            for (var i_1 = 0; i_1 < datas.length; i_1++) {
                var dt_1 = datas[i_1];
                if (((_a = dt_1.username) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_b = dt_1.email) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_c = dt_1.no_cni) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_d = dt_1.phone_No) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()))) {
                    displayClient(dt_1);
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
function deleteClient(id, e) {
    var confirm_panel = $("#confirm-panel");
    var pan_width = confirm_panel.width();
    var pan_height = confirm_panel.height();
    var win_width = $(window).width();
    var win_height = $(window).height();
    var clientX = e.clientX;
    var clientY = e.clientY;
    var pan_x = (clientX + pan_width > win_width) ? win_width - pan_width - 20 : clientX - 20;
    var pan_y = (clientY + pan_height > win_height) ? win_height - pan_height - 20 : clientY - 20;
    confirm_panel.css("left", "".concat(pan_x, "px"));
    confirm_panel.css("top", "".concat(pan_y, "px"));
    $("#confirm-panel").show();
    $("#confirm-delete").on("click", function (e) {
        clientManager.delete(id);
        setTimeout(function () {
            loadClients();
            confirm_panel.hide();
        }, 500);
    });
    $("#cancel-delete").on("click", function (e) {
        confirm_panel.hide();
    });
}
// **************************** PAGINATIONS PERSONNALISEES ***************************************
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
        loadClients(false, pageSize);
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
// APPELS DE FONCTION
loadClients();
changePaginationSize();
