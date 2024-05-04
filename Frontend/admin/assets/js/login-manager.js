/* Importations */
import { getCookie } from './tools.js';

/* URL */
var api_url = location.host + ":8000/api";
function adminLogin() {
    $("#login-btn").on("click", function (e) {
        e.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url: "http://".concat(api_url, "/accounts/admin/login/"),
            type: "POST",
            processData: false,
            contentType: false,
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data) {
                alert("Connexion réussie");
                console.log("Connexion réussie");
                console.log(data);
            },
            error: function (error) {
                console.log({ "errors": error });
            },
        });
    });
}
adminLogin();
