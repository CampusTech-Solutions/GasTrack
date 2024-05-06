function getCookie(name):string {

    let cookieValue:any  = null;

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

/* URL */
const api_url = window.location.host + "/api";

declare var $: any;

function adminLogin()
{

    $("#login-btn").on("click", (e:any) => {
        e.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url: `http://${api_url}/accounts/admin/login/`,
            type: "POST",
            processData: false,
            contentType: false,
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                'Access-Control-Allow-Origin': '*',
                "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                "vary": "Origin",
            },
            success: function (data:any) {
                window.localStorage.setItem("user", JSON.stringify(data));

                $(`#login-form-container`).slideUp();
                setTimeout(() => {
                    $(`#login-form-back`).hide();
                }, 500);

                $(".no-auth").hide();   
                $(".auth").show();
            },
            error: function (error:any) {
                console.log({ "errors" : error });
                $(`#form-error`).css('display', 'block');
                setTimeout(() => {
                    $(`#form-error`).css('display', 'none');
                }, 3000);
            },
        });
    });
}

function adminLogout()
{
    $("#logout-btn").on("click", (e:any) => {
        window.localStorage.clear();
        window.location.href = `${window.location.protocol}//${window.location.host}/admin/`;
    });
}

adminLogin();
adminLogout();