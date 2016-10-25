//Counter Examples
//var counter = 0;

function onClick(){

    //counter = counter +1;
    //document.getElementById("count").innerHTML = counter.toString();
    
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status==200){
                var counter = request.responseText;
                document.getElementById("count").innerHTML = counter.toString();
            }
        }
    };
    
    
    
    
    /*request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var counter = xhhtp.reponseText;
            document.getElementById("count").innerHTML = counter;
        }
    };*/
    
    request.open("GET", "http://iamnishantrai.imad.hasura-app.io/counter", true);
    request.send(null);
}

var namex = document.getElementById("name").value;

var submit = document.getElementById("submit_btn");

submit.onclick = function () {
    
    var names = ["name1", "name2", "name 3"];
    
    var list = '';
    for( var i=0; i<names.length; i++){
        list += '<li>' + names[i] + '</i>';
    }
    
    var ul = document.getElementById("namelist");
    ul.innerHTML = list;
    
};