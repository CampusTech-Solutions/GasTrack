/* URL */
var web_url = location.host + "/api";
var datas = JSON.parse(window.localStorage.getItem("gasStore-datas"));
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
/* Controleur du depôt de gaz */
let ldFormData = null;
var GasStoreManager = /** @class */ (function () {
    function GasStoreManager() {
        this.user_token = JSON.parse(window.localStorage.getItem("user"))["token"];
    }
    //GasStoreManager.prototype.create = function (gasStore) {
    GasStoreManager.prototype.create = function (gasStore) {
        var _a;
        $("#interm-name").val(gasStore.name);
        $("#interm-manager").val((_a = gasStore.gesStore) === null || _a === void 0 ? void 0 : _a.id);
        $("#interm-location").val(gasStore.location);

        let interm_form = $("#interm-form")[0];
        ldFormData = new FormData(interm_form);
        ldFormData.append("image", gasStore.image);
        $.ajax({
            url: "http://".concat(web_url, "/gasmanagement/gasstore/new/"),
            type: "POST",
            processData: false,
            contentType: false,
            data: ldFormData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Token " + this.user_token,
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                console.log("Dépôt créer avec succès");
                console.log(data);
                loadGasStores();
                $("#form-success").css('display', 'block');
                setTimeout(function () {
                    $("#form-success").css('display', 'none');
                }, 5000);
                $("#add-gasStore-form")[0].reset();
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
    GasStoreManager.prototype.delete = function (id) {
        $.ajax({
            url: "http://".concat(web_url, "/gasmanagement/gasstore/delete/").concat(id),
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
                "Authorization": "Token " + this.user_token,
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
var GasStoreRenderer = /** @class */ (function () {
    function GasStoreRenderer(gasStore) {
        this.gasStore = gasStore;
    }
    GasStoreRenderer.prototype.render = function () {
        // ADD IN TABLE FOR EDITING
        //<td><button class="btn btn-warning"><i class="mdi mdi-border-color"></i></button></td>
        return "\n            <tr>\n                <td>".concat(this.gasStore.name, "</td>\n                <td>").concat(this.gasStore.gesStore.name, "</td>\n                <td>").concat(this.gasStore.gesStore.tel, "</td>\n                <td>").concat(this.gasStore.gesStore.registrationNumber, "</td>\n                <td><button class=\"btn btn-danger\" onclick=\"deleteGasStore(").concat(this.gasStore.id, ", event)\"><i class=\"mdi mdi-delete-forever\"></i></button></td>\n            </tr>\n        ");
    };
    return GasStoreRenderer;
}());
/* Tests */
var gasStoreManager = new GasStoreManager();
// Variables pour la gestion des paginations
var nblines = document.getElementById("data-size");
var currentPage = 1; // Page actuelle
var min = 0, max = 3;
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
        var gasStore = new GasStore(form["name"].value, currentGesStore, location, form.image.files[0]);
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
        var _a, _b, _c, _d;
        $("#gasStore-list-table tbody").empty();
        var value = $("#gasStore-search-box").val();
        if ((value === null || value === void 0 ? void 0 : value.toString().trim()) != "") {
            for (var i_1 = 0; i_1 < datas.length; i_1++) {
                var dt_1 = datas[i_1];
                var datass = JSON.parse(window.localStorage.getItem("gesStore-datas"));
                var currentGesStore = null;
                for (var i_2 = 0; i_2 < datass.length; i_2++) {
                    var dts = datass[i_2];
                    if (dts.id == dt_1.manager) {
                        currentGesStore = new GesStore(dts.username, dts.email, dts.no_cni, dts.phone_No, "", dts.matricule, dts.id);
                        break;
                    }
                }
                if (((_a = dt_1.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_b = currentGesStore === null || currentGesStore === void 0 ? void 0 : currentGesStore.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_c = currentGesStore === null || currentGesStore === void 0 ? void 0 : currentGesStore.tel) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase())) ||
                    ((_d = currentGesStore === null || currentGesStore === void 0 ? void 0 : currentGesStore.registrationNumber) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(value === null || value === void 0 ? void 0 : value.toString().toLowerCase()))) {
                    displayGasStore(dt_1);
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
function deleteGasStore(id, e) {
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
        gasStoreManager.delete(id);
        setTimeout(function () {
            loadGasStores();
            confirm_panel.hide();
        }, 500);
    });
    $("#cancel-delete").on("click", function (e) {
        confirm_panel.hide();
    });
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
        loadGasStores(false, pageSize);
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
createGasStore();
fillGesStoreList();
loadGasStores();
changePaginationSize();
