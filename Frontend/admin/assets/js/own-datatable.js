var table = document.querySelector(".datatable tbody");
// Données de la table (exemple)
var tableData = table.children;/*[
    { col1: "Donnée 1", col2: "Donnée 2" },
    { col1: "Donnée 3", col2: "Donnée 4" },
    // Ajouter d'autres données au besoin
];*/

var nblines = document.getElementById("data-size");
var pageSize = nblines.value; // Nombre d'éléments par page
var currentPage = 1; // Page actuelle

function loadTableData(page) {
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var tableBody = document.querySelector(".datatable tbody");
    tableBody.innerHTML = "";

    for (var i = startIndex; i < endIndex && i < tableData.length; i++) {
        var rowData = tableData[i];
        var row = "<tr><td>" + rowData.col1 + "</td><td>" + rowData.col2 + "</td></tr>";
        tableBody.innerHTML += row;
    }
}

function loadPagination() {
    var totalPages = Math.ceil(tableData.length / pageSize);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (var i = 1; i <= totalPages; i++) {
        var button = "<button onclick='changePage(" + i + ")'>" + i + "</button>";
        pagination.innerHTML += button;
    }
}

function changePage(page) {
    currentPage = page;
    loadTableData(currentPage);
    highlightCurrentPageButton();
}

function highlightCurrentPageButton() {
    var buttons = document.querySelectorAll("#pagination button");
    buttons.forEach(function(button) {
        button.classList.remove("active");
    });
    var currentPageButton = document.querySelector("#pagination button:nth-child(" + currentPage + ")");
    currentPageButton.classList.add("active");
}

// Initialiser la table et la pagination
loadTableData(currentPage);
loadPagination();
highlightCurrentPageButton();