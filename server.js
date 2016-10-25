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

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test', function (err,result) {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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

var articleOne = {
    title:'Article One | Nishant Rai',
    heading:'Article One',
    date:'Sep5, 2016',
    content:'<div><p> Hey my name is Nishant</p></div>'
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


app.get('/article-one',function(req,res){
    res.send(createTemplate(articleOne));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});