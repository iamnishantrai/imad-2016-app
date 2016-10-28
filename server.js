var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'iamnishantrai',
    database:'iamnishantrai',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/test',function(req,res){
  res.sendFile(path.join(__dirname,'ui','test.html'));
});

app.get('/write-articles.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'write-articles.html'));
  function onSubmitArticles(){
    var title = document.getElementById("title-articles").value;
    title = JSON.parse(title);
    var list = '';
        pool.query("INSERT INTO title VALUES(1, '"+title+"');", function(err, result){
            if(err)
                console.log(err);
            document.getElementById("submit-articles").innerHTML = "yolo";
        });
    }
    
});

var counter = 0;

app.get('/counter',function(req,res){
    counter = counter+1;
    res.send(counter.toString());
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM article', function (err,result) {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows) +"<br><hr>"+ JSON.stringify(result));
        }
    });
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/twitter',function(req,res){
    res.sendFile(path.join(__dirname,'ui','twitter.html'));
});

app.get('/fb',function(req,res){
    res.sendFile(path.join(__dirname,'ui','facebook.html'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/1.jpg', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', '1.jpg'));
});

app.get('/picture.html', function (req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'picture.html'));
});

var articles = {
    'article-one':{
        title:'Article One | Nishant Rai',
        heading:'Article One',
        date:'Sep5, 2016',
        content:'<div><p> Hey my name is Nishant</p></div>'
    },
    'article-two':{
        title:'Article Two | Nishant Rai',
        heading:'Article Two',
        date:'Sep 10, 2016',
        content:'<div><p> Hey this is my Second Article</p></div>'
    }
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    
    var htmlTemplate = 
`<html>
    <head>
    <title> ${title}
    </title>
    <meta name="viewport" content="width=device-width, intial-scale=1" />
    <link href=/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div>
            <div>
                <a href="/">Home</a>
            </div>
            <br />
            <h2>
                ${heading}
            </h2>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
<html>
`;

return htmlTemplate;
}

var names = [];

app.get('/submitname/:name', function(req,res){
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
});

app.get('/submitname', function(req,res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName',function(req,res){
    
    pool.query("SELECT * FROM article WHERE title='"+ req.params.articleName + "';", function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0){
                res.status(404).send('Article Not Found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
