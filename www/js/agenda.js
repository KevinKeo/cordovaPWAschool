
function getAllSchedule(){
    checkUpdateData().then(function(){
        var store3 = localforage.createInstance({storeName: "schedules"});
        var container = document.getElementById("schedule");
        return store3.iterate(function(value, key, iterationNumber) {
            day = value ;            
            var table = document.createElement("table");
            table.setAttribute("class", "table table-striped");

            var thead = document.createElement("thead");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.innerHTML = day.dateReadable ;
            tr.appendChild(th);
            thead.appendChild(tr);
            table.appendChild(thead);
            
            var tbody = document.createElement("tbody");
            for(var keyTime in day.timeslots){
                var timeslot = day.timeslots[keyTime];

                var ligne = document.createElement("tr");
                var heure = document.createElement("th");
                heure.setAttribute("scope","row");
                heure.innerHTML = timeslot.startTime + "-" + timeslot.endTime ;
                ligne.appendChild(heure);
                
                for(var keySession in timeslot.sessions){
                    var session = timeslot.sessions[keySession];
                    var td = document.createElement("td");
                    td.setAttribute("id",session[0]);
                    td.setAttribute("class","session");
                    ligne.appendChild(td);
                }
                tbody.appendChild(ligne);
            }
            table.appendChild(tbody);
            container.appendChild(table);
        }).then(function() {
            console.log("ITS OKAY");
            getSessions();
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    })
}

function getSessions(){
    checkUpdateData().then(function(){
        var store = localforage.createInstance({storeName: "sessions"});
        var containers = document.getElementsByClassName("session");
        for(var i = 0; i < containers.length ; i++){
            var idSession = containers.item(i).getAttribute("id");
            store.getItem(idSession)
            .then(function(session){
                var td = document.getElementById(session.id);
                td.innerHTML = "<a href=conference.html?sessionid="+session.id+">" + session.title + '</a>';
            })
        }
    }).then(function() {
        console.log("Sessions OK");
    }).catch(function(err) {
        console.log(err);
    });       
}