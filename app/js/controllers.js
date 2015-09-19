tgsearcherApp.controller('IndexCtrl', ['$scope', 'Publications',
	function($scope, Publications){

		$scope.loading=false;

		$scope.terms = "";
		$scope.results = [];
		$scope.mode = "boolean_or";
		$scope.stoplist = "yes";
		$scope.stemming = "yes";
		$scope.page = 0;
		$scope.pageResults = [];

		function filter(response){
			console.log("Found " + response.data.length + " results");
			$scope.results = [];
			console.log(response.data);
			for(var i in response.data){
				if(response.data[i].highlight)
					$scope.results.push(response.data[i]);
			}
			console.log($scope.results);
			$scope.page = 0;
			$scope.updatePaging();
			$scope.loading = false;
		}

		$scope.search = function search(){

			$scope.loading = true;

			var analyzer = "default";

			if($scope.stoplist == "yes" && $scope.stemming == "yes"){
				analyzer = "full";
			}else if($scope.stoplist == "yes"){
				analyzer = "stoplist";
			}else{
				analyzer = "stemmer";
			}

			console.log("Searching for " + $scope.terms + " with " + analyzer + " analyzer");

			if($scope.mode == 'boolean_or'){
				Publications.booleanSearch($scope.terms, analyzer, 'or').then(filter);
			}else if($scope.mode == 'boolean_and'){
				Publications.booleanSearch($scope.terms, analyzer, 'and').then(filter);
			}else if($scope.mode == 'fuzzy_or'){
				Publications.fuzzySearch($scope.terms, analyzer, 'or').then(filter);
			}else if($scope.mode == 'fuzzy_and'){
				Publications.fuzzySearch($scope.terms, analyzer, 'and').then(filter);
			}

			
			
		}

		$scope.updatePaging = function updatePaging(){
			if($scope.page < 0){
				$scope.page = 0;
				return;
			}
			$scope.pageResults = $scope.results.slice($scope.page*20, ($scope.page+1)*20);
		}

		$scope.$watch('page', $scope.updatePaging);
	}
]);
