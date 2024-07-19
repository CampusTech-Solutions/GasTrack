$(function(){
    'use strict';
    $(".own-floating-btn").on("mouseover", (e) => {
        let elt = $(this).find(".own-floating-btn-content");
        if(elt.width() == 0)
        {
            elt.animate({width: 150}, 500);
        }
    });

    $(".own-floating-btn").on("mouseleave", (e) => {
        let elt = $(this).find(".own-floating-btn-content");
        if(elt.width() >= 150)
        {
            elt.animate({width: 0}, 500);
        } 
    });

    for(let i = 0; i < 5; i++)
    {
        displayAttachedItem(i);
    }
})();

function displayAttachedItem(i)
{
    /*$(".own-floating-btn").click((e) => {
        let attachIndex = $(this).attr("id").split("own-floating-btn")[0];

        $(`#own-attach-elem${attachIndex}`).slideToggle();
        $("html, body").animate({
            scrollTop: $(`#own-attach-elem${attachIndex}`).offset().top
        });
    })*/
    $(`#own-floating-btn${i}`).click((e) => {
        e.preventDefault();
        $(`#own-attach-elem${i}`).slideToggle();
        $("html, body").animate({
            scrollTop: $(`#own-attach-elem${i}`).offset().top - 100
        });
    });
}