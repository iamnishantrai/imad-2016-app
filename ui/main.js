//var button = document.getElementById("counter");

var counter = 0;

/*button.onclick = function(){
    counter = counter + 1;
    var span = document.getElementById("count");
    a.innerHTML = counter.toString();
};*/


function onClick(){
    counter = counter + 1;
    document.getElementById("count").innerHTML = counter;
}