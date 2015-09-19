tgsearcherApp.service('Publications', ['$http', function ($http) {

	var serverHost = 'http://127.0.0.1:3000';

    this.booleanSearch = function (terms, analyzer, op) {

    	return $http.post(serverHost + '/boolean', {terms: terms, analyzer: analyzer, operator: op});

    };

    this.fuzzySearch = function(terms, analyzer, op){
    	return $http.post(serverHost + '/fuzzy', {terms: terms, analyzer: analyzer, operator: op});
    }

}]);