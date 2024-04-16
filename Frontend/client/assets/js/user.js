var web_url = "127.0.0.1/api";
var parseObject = function (array) {
    let arr = {};
    let dat = [...array].map(elt => {
        let name = elt.name.split('-')[1];
        let value = elt.value;
        arr[name] = value;
    });
    return arr;
};
var toJSON = function (array) {
    return JSON.stringify(parseObject(array));
};
function getCookie(name) {
    let cookieValue = null;
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
class User {
    constructor(id, username, email, telephone, cni, location) {
        this.id = Number.parseInt(id);
        this.username = username;
        this.email = email;
        this.telephone = telephone;
        this.cni = cni;
        this.location = location;
        this.code = "";
        this.marker = markerU;
        if (location != null) {
            let loc = location.coordinates;
            let newLatLng = new L.LatLng(loc[0], loc[1]);
            this.marker.setLatLng(newLatLng);
        }
        this.render();
    }
    static fromJson(data) {
        let tel = data.phone_No == '' ? "000000000" : data.phone_No;
        let no_cni = data.no_cni == null ? "202012345678" : data.no_cni;
        let user = new User(data.id, data.username, data.email, tel, no_cni, data.location);
        user.code = data.code;
        return user;
    }
    render() {
        $('#profile-name').val(this.username);
        $('#profile-email').val(this.email);
        $('#profile-tel').val(this.telephone);
        $('#profile-cni').val(this.cni);
    }
    getCode() {
        let codep = "";
        [...$('.c-1')].forEach((elt) => {
            codep += $(elt).val();
        });
        return codep;
    }
    passwordReset() {
        let data = {};
        data["username"] = username;
        data["email"] = email;
        let href = window.location.href;
        $.ajax({
            url: `http://${web_url}/accounts/password-reset/`,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                //"Authorization": "Token " + window.localStorage.getItem("Token"),
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
            },
            success: (data) => {
                console.log({ "Données": data });
                $("#ok-btn").on("click", (e) => {
                    e.preventDefault();
                    alert("OK!");
                    let coder = this.getCode().trim();
                    if (coder.length == 8 && href == `http://${web_url}/reset-password.html`) {
                        if (coder == data.code) {
                            alert("pass");
                            $('#password-container').empty();
                            $('#password-container').append(`
                 <div class="input-group mt-3">
                 <label for="new-pass" class="mr-3">New Password </label>
                 <input type="password"
                                  placeholder="Entrer le nouveau mot de passe" id="new-pass"/>
                 <button class="btn btn-primary" id="valid-pass">valider</button>
                                  <div/>`);
                            $('#valid-pass').on('click', () => {
                                let val = {};
                                val["code"] = data.code;
                                val["password"] = $('#new-pass').val();
                                if (val["password"] != "") {
                                    $.ajax({
                                        url: `http://${web_url}/accounts/password-reset-success/`,
                                        type: "POST",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                        data: JSON.stringify(val),
                                        headers: {
                                            "X-Requested-With": "XMLHttpRequest",
                                            //"Authorization": "Token " + window.localStorage.getItem("Token"),
                                            "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                                        },
                                        success: (data) => {
                                            console.log(data);
                                            alert("Mot de passe reinitialiser avec success !!");
                                            window.location.href = `http://${web_url}/profil.html`;
                                        },
                                        error: (error) => {
                                            console.log(error);
                                        },
                                    });
                                }
                            });
                        }
                    }
                });
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    update() {
        let data = {};
        data["username"] = $('#profile-name').val();
        data["email"] = $('#profile-email').val();
        data["no_cni"] = $('#profile-cni').val();
        data["phone_No"] = $('#profile-tel').val();
        data["location"] = {};
        data["location"]["type"] = "Point";
        let latlng = markerU.getLatLng();
        data["location"]["coordinates"] = [latlng.lat, latlng.lng];
        let user = this;
        let url = 'http://' + web_url + '/accounts/clients/' + id + '/';
        $.ajax({
            url: url,
            type: "PATCH",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Token " + window.localStorage.getItem("Token"),
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
            },
            success: (data) => {
                alert("Successfully updated !!!");
                console.log(data);
                user = User.fromJson(data);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    static login() {
        $("#login-btn").on("click", function (event) {
            event.preventDefault();
            $("#login-btn").attr("disabled", "");
            let data = JSON.stringify({
                "username": $("#login-username").val(),
                "password": $("#login-password").val()
            });
            console.log({ "Données": data });
            $.ajax({
                url: `http://${web_url}/accounts/login/`,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: data,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRFToken": getCookie("csrftoken"),
                    "access-control-allow-origin": "*",
                    "vary": "Origin",
                },
                success: (data) => {
                    window.localStorage.clear();
                    console.log(data);
                    window.localStorage.setItem("Token", data.data.token);
                    window.localStorage.setItem("UserId", data.data.userId);
                    window.localStorage.setItem("Username", data.data.username);
                    window.localStorage.setItem("Email", data.data.email);
                    window.localStorage.setItem("Admin", data.data.admin);
                    $("#login-btn").removeAttr("disabled");
                    $("#login-modal").modal("hide");
                    console.log({ "Données": data });
                },
                error: (error) => {
                    $("#login-btn").removeAttr("disabled");
                    console.log(error);
                }
            });
        });
    }
    static signup() {
        $("#signup-btn").on("click", function (event) {
            event.preventDefault();
            $("#signup-btn").attr("disabled", "");
            let data = JSON.stringify({
                "username": $("#signup-username").val(),
                "email": $("#signup-email").val(),
                "no_cni": $("#signup-cni").val(),
                "phone_No": $("#signup-tel").val(),
                "password": $("#signup-password").val()
            });
            console.log({ "Données": data });
            $.ajax({
                url: `http://${web_url}/accounts/signup/`,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: data,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRFToken": getCookie("csrftoken"),
                    "access-control-allow-origin": "*",
                    "vary": "Origin",
                },
                success: (data) => {
                    window.localStorage.clear();
                    console.log(data);
                    window.localStorage.setItem("Token", data.data.Token);
                    window.localStorage.setItem("UserId", data.data.userId);
                    window.localStorage.setItem("Username", data.data.username);
                    window.localStorage.setItem("Email", data.data.email);
                    window.localStorage.setItem("Admin", data.data.admin);
                    $("#signup-btn").removeAttr("disabled");
                    $("#signup-modal").modal("hide");
                    console.log({ "Données": data });
                },
                error: (error) => {
                    $("#signup-btn").removeAttr("disabled");
                    console.log(error);
                }
            });
        });
    }
    fetchUser() {
        let chatThis = this;
        console.log("Fetching messages...");
        $.ajax({
            url: `http://${web_url}/accounts/clients/${chatThis.id}/`,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Token " + window.localStorage.getItem("Token"),
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
            },
            success: (data) => {
                console.log(data);
                this.username = data.username;
                this.cni = data.no_cni;
                this.telephone = data.phone_No;
                this.location = data.location;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
    logout() {
    }
}
User.login();
User.signup();
let id = window.localStorage.getItem('UserId') || '1';
let username = window.localStorage.getItem("Username");
let email = window.localStorage.getItem("Email");
let user = new User(id, username, email, null, null, null);
user.fetchUser();
$('#update-info').on('click', user.update);
if (location.href == `http://${web_url}/reset-password.html`) {
    setTimeout(() => {
        user.passwordReset();
    }, 200);
    ;
}
