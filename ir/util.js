var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'trace'
});

// client.indices.delete({
// 	index: 'tgsearcher'
// });


// client.count({
//   index: 'tgsearcher',
//   type: 'publications_default'
// }, function (error, response) {
//   console.log(response);
// });

// client.create({
//   index: 'tgsearcher',
//   type: 'publication_stop',
//   id: 'testando2',
//   body: {
//     title: 'teste',
//     author: 'teste',
//     content: 'teste'
//   }
// }, function (error, response) {
// 	if(error) return console.log("Error indexind document " + error);
// 	console.log(response);
// }); 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2

client.indices.delete({
	index: 'news'
}, function(){

client.indices.create({
	index: "news",
	body: {
	"mappings" : {
		"news_default" : {
            "properties" : {
            	count: {"type" : "integer", "store": true},
	            title: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "default",
				          "search_analyzer": "default"},
	            content: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "default",
				          "search_analyzer": "default"},
	            link: {"type": "string"}
            }
        },
        "news_stoplist" : {
            "properties" : {
            	count: {"type" : "integer", "store": true},
	            title: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "stoplist",
				          "search_analyzer": "stoplist"},
	            content: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "stoplist",
				          "search_analyzer": "stoplist"},
	            link: {"type": "string"}
            }
        },
        "news_stemmer" : {
            "properties" : {
            	count: {"type" : "integer", "store": true},
	            title: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "stemmer",
				          "search_analyzer": "stemmer"},
	            content: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "stemmer",
				          "search_analyzer": "stemmer"},
	            link: {"type": "string"}
            }
        },
        "news_full" : {
            "properties" : {
            	count: {"type" : "integer", "store": true},
	            title: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "full",
				          "search_analyzer": "full"},
	            content: {"type" : "string", "store": true,"index": "analyzed",
				          "index_analyzer": "full",
				          "search_analyzer": "full"},
	            link: {"type": "string"}
            }
        }
    },
		"settings": {
		    "analysis": {
			    "char_filter" : {
	                "replacer" : {
	                    "type" : "mapping",
	                    "mappings" : ["-=>"]
	                }
	            },
		    	"filter": {
			        "pt_stopwords": {
			          "type":       "stop",
			          "stopwords":  ["a","à","agora","ainda","alguém","algum","alguma","algumas","alguns","ampla","amplas","amplo","amplos","ante","antes","ao","aos","após","aquela","aquelas","aquele","aqueles","aquilo","as","até","através","cada","coisa","coisas","com","como","contra","contudo","da","daquele","daqueles","das","de","dela","delas","dele","deles","depois","dessa","dessas","desse","desses","desta","destas","deste","deste","destes","deve","devem","devendo","dever","deverá","deverão","deveria","deveriam","devia","deviam","disse","disso","disto","dito","diz","dizem","do","dos","e","é","e'","ela","elas","ele","eles","em","enquanto","entre","era","essa","essas","esse","esses","esta","está","estamos","estão","estas","estava","estavam","estávamos","este","estes","estou","eu","fazendo","fazer","feita","feitas","feito","feitos","foi","for","foram","fosse","fossem","grande","grandes","há","isso","isto","já","la","la","lá","lhe","lhes","lo","mas","me","mesma","mesmas","mesmo","mesmos","meu","meus","minha","minhas","muita","muitas","muito","muitos","na","não","nas","nem","nenhum","nessa","nessas","nesta","nestas","ninguém","no","nos","nós","nossa","nossas","nosso","nossos","num","numa","nunca","o","os","ou","outra","outras","outro","outros","para","pela","pelas","pelo","pelos","pequena","pequenas","pequeno","pequenos","per","perante","pode","pôde","podendo","poder","poderia","poderiam","podia","podiam","pois","por","porém","porque","posso","pouca","poucas","pouco","poucos","primeiro","primeiros","própria","próprias","próprio","próprios","quais","qual","quando","quanto","quantos","que","quem","são","se","seja","sejam","sem","sempre","sendo","será","serão","seu","seus","si","sido","só","sob","sobre","sua","suas","talvez","também","tampouco","te","tem","tendo","tenha","ter","teu","teus","ti","tido","tinha","tinham","toda","todas","todavia","todo","todos","tu","tua","tuas","tudo","última","últimas","último","últimos","um","uma","umas","uns","vendo","ver","vez","vindo","vir","vos","vós"]
			        },
			        "pt_stemmer": {
			          "type":       "stemmer",
			          "language":   "minimal_portuguese" 
			        }
			  },
		      "analyzer": {

		        "full": {
		        	"type" : "custom",
		          "tokenizer": "standard",
		          "filter":  [ "lowercase", "asciifolding", "pt_stopwords", "pt_stemmer" ],
		          "char_filter" : ['replacer']
		        },
		        "default": {
		          "type" : "custom",
		          "tokenizer": "standard",
		          "filter":  [  "lowercase", "asciifolding"  ],
		          "char_filter" : ['replacer']
		        },
		        "stoplist": {
		        	"type" : "custom",
		          "tokenizer": "standard",
		          "filter":  [ "lowercase", "asciifolding", "pt_stopwords"  ],
		          "char_filter" : ['replacer']
		        },
		        "stemmer": {
		        	"type" : "custom",
		          "tokenizer": "standard",
		          "filter":  ["lowercase", "asciifolding", "pt_stemmer"  ],
		          "char_filter" : ['replacer']
		        }
		      }
		    }
		}
	  	}
	}, function(err, res){
		console.log(err);
	});

});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2

// client.indices.close({
// 	index: "tgsearcher"
// }, function(){
// 	client.indices.putSettings({
// 		index: "tgsearcher",
// 		"mappings" : {
// 	        "publication" : {
// 	            "properties" : {
// 	                author: {"type" : "string", "store": true},
// 		            title: {"type" : "string", "store": true},
// 		            content: {"type" : "string", "store": true}
// 	            }
// 	        }
// 	    },
// 		"settings": {
// 		    "analysis": {
// 		    	"filter": {
// 			        "pt_stopwords": {
// 			          "type":       "stop",
// 			          "stopwords":  ["o", "a", "no", "na", "de", "da","as", "os"]
// 			        },
// 			        "pt_stemmer": {
// 			          "type":       "stemmer",
// 			          "language":   "brazilian" 
// 			        }
// 			  },
// 		      "analyzer": {
// 		        "default": {
// 		          "type" : "custom",
// 		          "tokenizer": "standard",
// 		          "filter":  [  "lowercase", "asciifolding"  ]
// 		        },
// 		        "stoplist": {
// 		        	"type" : "custom",
// 		          "tokenizer": "standard",
// 		          "filter":  [ "lowercase", "asciifolding", "pt_stopwords"  ]
// 		        },
// 		        "stemmer": {
// 		        	"type" : "custom",
// 		          "tokenizer": "standard",
// 		          "filter":  ["lowercase", "asciifolding", "pt_stemmer"  ]
// 		        },
// 		        "full": {
// 		        	"type" : "custom",
// 		          "tokenizer": "standard",
// 		          "filter":  [ "lowercase", "asciifolding", "pt_stopwords", "pt_stemmer" ]
// 		        },
// 		      }
// 		    }
// 	  	}
// 	}, function(err, respo){
// 		console.log(err);
// 		client.indices.open({
// 			index: "tgsearcher"
// 		})
// 	});

// });


// client.search({
// 		index: 'tgsearcher',
// 		type: "publications_full",
// 		analyzer: "full",
// 		size: 1000,
// 	  	body: {
// 		    query: {
// 		      match: {
// 		        _all: {
// 		        	query: "mineração de dados",
// 		        	operator: "or"
// 		        }
// 		      }
// 		    },
// 		    highlight: {
// 	            pre_tags: ['<strong class="highlight">'],
// 	            post_tags: ["</strong>"],
// 	            fields: {
// 	                "content": {"number_of_fragments": 3, "force_source" : true},
// 	                "title": {"number_of_fragments": 1, "force_source" : true}
// 	            }
// 	        }
// 		}
// 	}).then(function (body) {
// 	  	var hits = body.hits.hits;
// 	  	console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
// 		hits.forEach(function(hit){
// 			if(hit.highlight.title)
// 			console.log(hit._source.title);
// 		})
// 	}, function (error) {
// 	  console.trace(error.message);
// 	});

// client.indices.analyze({
// 	index: 'news',
// 	text: "O aplicativo do Rock in Rio 2015 traz informações importantes para quem vai ao evento, como mapa do local, programação dos shows e até onde estão as redes Wi-Fi.",
// 	tokenizer: "standard",
// 	analyzer: "full",
// 	format: "text"
// }, function(err, response, status ){
// 	//console.log(err)
// 	console.log(response)
// 	var str = "";
// 	for(var i in response.tokens){
// 		str += response.tokens[i].token + " ";
// 	}
// 	console.log(str);
// });
