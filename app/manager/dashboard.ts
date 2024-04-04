window.addEventListener('load', function(e){
    var token = getCookie("csrftoken");
    if (token === null){
      window.location.href = "login.html";
    }
    else{
      loadStoreData();
    }
  
  
    //toggle button
    
    initializeSwitchState()
  });