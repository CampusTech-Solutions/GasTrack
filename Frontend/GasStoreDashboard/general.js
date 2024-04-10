"use strict";
// switches
const toggle = document.getElementById('toggle');
const oc = document.getElementById('oc');
const switch_icon = document.getElementById('switch-mdi');
if (toggle !== null) {
    toggle.addEventListener('click', function () {
        if (this.checked) {
            (oc !== null) ? oc.innerHTML = "Fermé" : "";
            (switch_icon !== null) ? switch_icon.className = "icon-lg mdi mdi-stop text-small text-danger ms-auto" : "";
        }
        else {
            (oc !== null) ? oc.innerHTML = "Ouvert" : "";
            (switch_icon !== null) ? switch_icon.className = "icon-lg mdi mdi-play text-small text-success ms-auto" : '';
        }
    });
}
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
