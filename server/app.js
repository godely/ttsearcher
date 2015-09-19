var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var elasticsearch = require('elasticsearch');

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

app.use(cors());
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/boolean', function (req, res) {

	var type = "news_default";
	if(req.body.analyzer == "full"){
		type = "news_full"
	}else if(req.body.analyzer == "stoplist"){
		type = "news_stoplist";
	}else if(req.body.analyzer == "stemmer"){
		type = "news_stemmer";
	}

	console.log("Searching " + req.body.terms + " - " + type + " with " + req.body.analyzer);

	client.search({
		index: 'news',
		type: type,
		size: 1000,
	  	body: {
		    query: {
		      "multi_match":{
                    "query":req.body.terms,
                    "fields":[
                       "title^2",
                       "content"
                    ],
                    "operator": req.body.operator
                 }
		    },
		    highlight: {
	            pre_tags: ['<strong class="highlight">'],
	            post_tags: ["</strong>"],
	            fields: {
	                "content": {"number_of_fragments": 6, "force_source" : true},
	                "title": {"number_of_fragments": 1, "force_source" : true}
	            }
	        }
		}
	}).then(function (body) {
	  	var hits = body.hits.hits;
		res.send(hits);
	}, function (error) {
	  console.trace(error.message);
	});
});

app.post('/fuzzy', function (req, res) {

	var type = "news_default";
	if(req.body.analyzer == "full"){
		type = "news_full"
	}else if(req.body.analyzer == "stoplist"){
		type = "news_stoplist";
	}else if(req.body.analyzer == "stemmer"){
		type = "news_stemmer";
	}

	console.log("Searching " + req.body.terms + " - " + type + " with " + req.body.analyzer);

	client.search({
		index: 'news',
		type: type,
		size: 1000,
	  	body: {
		    query: {
		      "multi_match":{
                    "query":req.body.terms,
                    "fields":[
                       "title^2",
                       "content"
                    ],
                    "fuzziness": "auto",
                    "operator": req.body.operator
                 }
		    },
		    highlight: {
	            pre_tags: ['<strong class="highlight">'],
	            post_tags: ["</strong>"],
	            fields: {
	                "content": {"number_of_fragments": 6, "force_source" : true},
	                "title": {"number_of_fragments": 1, "force_source" : true}
	            }
	        }
		}
	}).then(function (body) {
	  	var hits = body.hits.hits;
		res.send(hits);
	}, function (error) {
	  console.trace(error.message);
	});
  
});