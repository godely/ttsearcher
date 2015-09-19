var osmosis = require('osmosis');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200'
});

var count = 0;

function create(result){
	var types = ['news_default', 'news_stoplist', 'news_stemmer', 'news_full'];
	for(var i in types){
		client.create({
		  index: 'news',
		  type: types[i],
		  id: result.link,
		  body: {
		    title: result.title,
		    link: result.link,
		    content: result.content
		  }
		}, function (error, response) {
		  if(error) return console.log("Error indexing document for " + result.author + " " + error);
		  console.log(response);
		});
	}
}

function crawl(page){
	osmosis
		.get('http://www.techtudo.com.br/plantao/'+page+'.html') 
		.find('.snippet-plantao-item')
		.set({
			'title': '@title',
			'link': '@href'
		})
		.follow('@href')
		.find('.corpo-conteudo')
		.set('content')
	.data(function(result){

		if(count < 220){
			create(result);

			count++;
		}

		
	})
	.error(function(error){
		console.log(error);
	})
	.done(function(){
		if(count < 220)
			crawl(page+1);
	})

}

crawl(1);