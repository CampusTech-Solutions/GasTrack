"use strict";
const gasstore_socket = new WebSocket("ws://127.0.0.1:8001/ws/gasstore/");
function handleSwitchChange() {
    var switchElement = document.getElementById("toggle");
    var switchState = switchElement.checked;
    // Update the cookie with the new switch state
    alert("i'm about to send");
    gasstore_socket.send(JSON.stringify({
        "message": { "id": `${getCookie('storeid')}`, "store_status": switchState },
        "action": "update"
    }));
}
gasstore_socket.onopen = function () {
    alert("Connected!");
};
gasstore_socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    alert(event.data);
    setCookie("storestatus", data.store_status, 365);
    initializeSwitchState();
};
// Function to initialize the switch state based on the cookie value
function initializeSwitchState() {
    var switchElement = document.getElementById("toggle");
    var switchStateCookie = getCookie("storestatus");
    var oc = document.getElementById('oc');
    var switch_icon = document.getElementById('switch-mdi');
    if (switchStateCookie === "true") {
        switchElement.checked = true;
        (oc !== null) ? oc.innerHTML = "Ouvert" : "";
        (switch_icon !== null) ? switch_icon.className = "icon-lg mdi mdi-play text-small text-success ms-auto" : '';
    }
    else {
        switchElement.checked = false;
        (oc !== null) ? oc.innerHTML = "Fermé" : "";
        (switch_icon !== null) ? switch_icon.className = "icon-lg mdi mdi-stop text-small text-danger ms-auto" : "";
    }
    switchElement.addEventListener("change", handleSwitchChange);
}
//toggle button
// const toggle = document.getElementById('toggle');
// const oc = document.getElementById('oc');
// const switch_icon = document.getElementById('switch-mdi');
// if (toggle !== null) {
//     toggle.addEventListener('click', function(this:any) {
//         if (this.checked) {
//             (oc !== null) ? oc.innerHTML = "Fermé" : "";
//             (switch_icon !== null) ? switch_icon.className = "icon-lg mdi mdi-stop text-small text-danger ms-auto" : ""
//         }
//         else {
//             (oc !== null) ? oc.innerHTML = "Ouvert" : "" ;
//             (switch_icon !== null) ? switch_icon.className = "icon-lg mdi mdi-play text-small text-success ms-auto" : '';
//         }
//     });
// }
function ScrollTo(id) {
    var val = document.getElementById(id);
    if (val !== null)
        val.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
}
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
            const selector = document.querySelector(href);
            if (selector)
                selector.scrollIntoView({
                    behavior: 'smooth'
                });
        }
    });
});
document.querySelectorAll('#cards-container .grid-margin').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var scrol = document.querySelector('#tkt');
        if (scrol !== null)
            scrol.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        var title = document.querySelector(`#${anchor.id} .mb-0`);
        var newTitle = document.getElementById("new-card-title");
        if (title && newTitle) {
            newTitle.innerHTML = title.innerHTML;
        }
    });
});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
function checkCookie() {
    let user = getCookie("username");
    if (user !== null) {
        alert("Welcome again " + user);
    }
    else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path =/";
    }
}
function loadStoreData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/gasmanagement/getstore/`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server
            var data = JSON.parse(xhr.response).data;
            setCookie('storeid', data.id, 365);
            setCookie('storename', data.name, 365);
            setCookie('storelocation', data.location, 365);
            setCookie('storeimage', data.image, 365);
            setCookie('storestatus', data.store_status, 365);
        }
    };
    //{"data": {"id": 1, "name": "Norman-Mills", "manager": 2, "location": null, "image": "/ressources/gasmanagement/gasstores/default.png", "store_status": true}}
    xhr.send();
}
