$(function(){
    $(".view").hide();
    $("#view-main").show();
    $(this).scrollTop(0);
    function display(view){
        $(".view").hide();
        $("#" + view).show();
    }
    $(".view-btn").click(function(){
        display("view-" + this.id);
    });

    $("#submitSearch").click(enterPress);
});

var enterPress = function(){
    var e = $.Event("keypress");
    e.which = 13;
    $("#searchBox").trigger(e);
}


//Switch dropdown text
function dropdown(val) {
    var y = document.getElementsByClassName('btn btn-default dropdown-toggle');
    var aNode = y[0].innerHTML = val + ' <span class="caret"></span>';
}

function convertToString(val){
    return JSON.stringify(val, null, "\t");
}

window.onload=function(){
    //Pressed Enter key on Search bar      
    var dropVal = "City";
    var input = document.getElementById("searchBox").onkeypress = function(e){
        var event =  e || window.event;
        var code = event.which || event.keyCode;
        if(code == '13'){   
            dropVal = document.getElementById("searchBtn").textContent; 
            var ourRequest = new XMLHttpRequest();
            ourRequest.open('GET',"http://api.citybik.es/v2/networks/");
            ourRequest.onload = function(){
                var ourData = JSON.parse(ourRequest.responseText);
                renderHTML(ourData);
            };
            ourRequest.send();
        }
    }
    //Show search result output
    var output = document.getElementById("output");
    function renderHTML(data){
        var returnString = "";
        var curJSON = {};
        var curString ="";
        for(i=0; i<data.networks.length; i++){
            curJSON = data.networks[i];
            if(dropVal.trim() == "City"){
                curString = JSON.stringify(curJSON.location.city, null, "\t");
            }
            else if(dropVal.trim() == "Country"){
                curString = JSON.stringify(curJSON.location.country, null, "\t");
            }
            else if(dropVal.trim() == "Company"){
                if (curJSON.company == null){
                    continue;
                }
                for (j=0; j<curJSON.company.length; j++){
                    curString += curJSON.company[j];
                }
            }
            else{
                if (curString.indexOf(document.getElementById("searchBox").value) != -1){
                    returnString += "<p>" + JSON.stringify(data.networks[i].location, null, "\t") + "</p>";
                }
                returnString += "<p>" + JSON.stringify(data.networks[i].location, null, "\t") + "</p>";
            }
            if (curString.indexOf(document.getElementById("searchBox").value) != -1){
                returnString += "<p>" + "Name: " + convertToString(curJSON.name) + 
                    " City: " + convertToString(curJSON.location.city) + " Country: " 
                    + convertToString(curJSON.location.country) + "</p>";
            }
        }
        //returnString = JSON.stringify(data.networks.company);
        output.innerHTML(returnString);
    }
}
