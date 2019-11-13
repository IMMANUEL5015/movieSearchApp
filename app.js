var express = require('express');
var app = express();
var request = require('request');


app.set('view engine', 'ejs');
app.use(express.static('Public'));
//Get form to search for a movie
app.get('/', function(req, res){
    res.render('search')
});

//Search For a Movie
app.get('/search', function(req, res){
    var title = req.query.title;
    var url = 'http://www.omdbapi.com/?t=' + title + '&apikey=thewdb'
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var movie = JSON.parse(body);
            res.render('movie', {movie: movie});
        }
    });
});

//Start Server
app.listen(3000, process.env.IP, function(){
    console.log('Movie App Server Has Started');
});