function onClick(){
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var counter = xhhtp.reponseText;
                document.getElementById("count").innerHTML = counter;
        }
    };
}