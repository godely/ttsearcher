var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'trace'
});

var types = ['news_default', 'news_stoplist', 'news_stemmer', 'news_full'];
for(var i in types){
	client.count({
	  index: 'news',
	  type: types[i]
	}, function (error, response) {
	  console.log(response);
	});
}