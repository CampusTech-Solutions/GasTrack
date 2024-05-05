declare var $: any;
declare var L : any;
declare var depotListMap : any;

var web_url: string = window.location.host+"/api";

function getCookie(name:any):string {

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

 

class Depot{

    public name: any;
    public location: any;
    public image: URL;
    public status: Boolean;
    public info: string;
    public created_at: Date;
    public marker;
    
    constructor(name:string){
        this.name = name;

    }


    static fromJson(data:any):Depot{

        let depot = new Depot(data.name);
        depot.image = new URL(data.image);
        depot.location = data.location;
        depot.info = data.info;
        depot.status = data.store_status;
        depot.created_at = new Date(data.created_at);
        let loc = depot.location.coordinates;
                        let newLatLng = new L.LatLng(loc[0], loc[1]);
                        var markerOptions = {
                            title: depot.name,
                            clickable: true,
                            draggable: true
                         }
                
         depot.marker = new L.Marker(newLatLng,markerOptions);
              

        return depot;

    }

    render():string{

      let stat = this.status ? "Ouvert " : "Fermer";
      let color = this.status ? "text-success": "text-danger";
      //alert(this.status);
      return ` <div class="card" >
        <div class="card-img-top">
          <img src="${this.image}" class="img-fluid rounded-start" alt="...">
        </div>
          <div class="card-body">
            <h5 class="card-title ">${this.name}</h5>
            <p class="card-text ${color}">${stat}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
    </div>`;

    }

    static fetchDepots(url:string){

        $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
     
                headers: {
                  "X-Requested-With": "XMLHttpRequest",
                  Authorization: "Token " + window.localStorage.getItem("Token"),
                  "X-CSRFToken": getCookie("csrftoken"), // don't forget to include the 'getCookie' function
                },
                success: (data:any) => {
                    
                    console.log("depots : ",data);
                    let markers = <any>[];
                    let depots: Depot[] = [];

                    data.results.forEach((depot:any) => {
                       
                        let dp:Depot = Depot.fromJson(depot);
                        depots.push(dp);
                        
                  
                        //alert(depot.image);
                        var marker = dp.marker.bindPopup(dp.render());
                        marker.addTo(depotListMap).on("mouseover",()=>{
                          
                          $("#depot-list").empty();
                          //alert(dp.render);
                          $("#depot-list").append(dp.render());
                       });
                        markers.push(marker);
                       
                    });

                   

                  
                },
                error: (error:any) => {
                  console.log(error);
                },
              });
     
     
          
     
     
     }

}


Depot.fetchDepots(`http://${web_url}/gasmanagement/gasstore`);