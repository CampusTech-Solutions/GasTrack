/* URL */
var web_url = location.host + "/api";
var datas = JSON.parse(window.localStorage.getItem("gesStore-datas"));
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
        this.user_token = JSON.parse(window.localStorage.getItem("user"))["token"];
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
                "Authorization": "Token " + this.user_token,
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Gestionnaire de dépôt créer avec succès");
                console.log(data);
                loadGesStores();
                $("#form-success").css('display', 'block');
                setTimeout(function () {
                    $("#form-success").css('display', 'none');
                }, 5000);
                $("#add-ges-form")[0].reset();
            },
            error: function (error) {
                console.log({ "errors": error });
                $("#form-error").css('display', 'block');
                setTimeout(function () {
                    $("#form-error").css('display', 'none');
                }, 5000);
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
                "Authorization": "Token " + this.user_token,
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
                "Authorization": "Token " + this.user_token,
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
/* Classes d'affichage */
var GesStoreRenderer = /** @class */ (function () {
    function GesStoreRenderer(gesStore) {
        this.gesStore = gesStore;
    }
    GesStoreRenderer.prototype.render = function () {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return "\n            <tr>\n                <td>".concat(this.gesStore.name, "</td>\n                <td>").concat(this.gesStore.email, "</td>\n                <td>").concat(this.gesStore.tel, "</td>\n                <td>").concat(this.gesStore.registrationNumber, "</td>\n                <td><button class=\"btn btn-danger\" onclick=\"deleteGesStore(").concat(this.gesStore.id, ", event)\"><i class=\"mdi mdi-delete-forever\"></i></button></td>\n            </tr>\n        ");
    };
    return GesStoreRenderer;
}());
var gesStoreManager = new GesStoreManager();
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
        var _a, _b, _c, _d, _e;
        $("#gesStore-list-table tbody").empty();
        var value = $("#gesStore-search-box").val();
        if ((value === null || value === void 0 ? void 0 : value.toString().trim()) != "") {
            for (var i_1 = 0; i_1 < datas.length; i_1++) {
                var dt_1 = datas[i_1];
                if (((_a = dt_1.username) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_b = dt_1.email) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_c = dt_1.no_cni) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_d = dt_1.phone_No) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_e = dt_1.matricule) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()))) {
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
function deleteGesStore(id, e) {
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
        gesStoreManager.delete(id);
        setTimeout(function () {
            loadGesStores();
            confirm_panel.hide();
        }, 500);
    });
    $("#cancel-delete").on("click", function (e) {
        confirm_panel.hide();
    });
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
// APPELS DE FONCTION
createGesStore();
loadGesStores();
changePaginationSize();
