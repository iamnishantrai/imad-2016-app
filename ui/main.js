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
    
    request.open("GET", "http://iamnishantrai.imad.hasura-app.io/counter", true);
    request.send(null);
}

var nameInput = document.getElementById("name");
var name = nameInput.value;

function onClickSubmit(){
    
    var response = new XMLHttpRequest();
    
    response.onreadystatechange = function(){
        if(respnse.readyState == XMLHttpRequest.DONE){
            if(response.status==200){
                var names = xhttp.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById("namelist");
                ul.innerHTML = list;
            }
        }
    };
    
    request.open("GET", "http://iamnishantrai.imad.hasura-app.io/submitname>name="+name,true);
    request.send(null);
    
    /*var names = ['name1', 'name2', 'name 3'];
    
    var list = '';
    for( var i=0; i<names.length; i++){
        list += '<li>' + names[i] + '</li>';
    }
    
    var ul = document.getElementById("namelist");
    ul.innerHTML = list;
    */
}