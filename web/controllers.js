var graphs = angular.module("graphs",[]);
graphs.controller("tableCtrl",function($scope,$http){
	$scope.query='';
	
	$http.get('/rigneys_format.json').
    success(function(data, status, headers, config) {
    	
      $scope.students = data;
      init_database(data);
      $scope.linear_db = linear_db;
      $scope.headers_db = headers_db;

    }).
    error(function(data, status, headers, config) {
    });
	
	$http.get('/gradeMap.json').
    success(function(data, status, headers, config) {
    	
      $scope.grades = data;

    }).
    error(function(data, status, headers, config) {
    });
	
	
	
	//$scope.isFailing= function(data){
		//return data.grade < data.target
	//}
	
	$scope.convert = function(studentGrade){
		
		var score = -1;
		angular.forEach($scope.grades,function(grade,x){
			if(grade.name==studentGrade){
				score= grade.score;
			}
		});
		return score;
	}
	
	$scope.studentStatus= function(grade,target){
		
		var diff;
		if(grade==null || target==null){
			return "";
		}
		var targetScore = $scope.convert(target);
		var gradeScore = $scope.convert(grade);
		
		diff = targetScore - gradeScore;
		alert(targetScore);
		if(diff >= 3){
			return "failing-3";
		}
		else if(diff >= 1){
			return "failing-1"
		}
		else if(diff == 0){
			return "onTarget"
		}
		else{
			return "aboveTarget"
		}
	}
	
	$scope.showFailing= function(){
		//$scope.query=$scope.isFailing;
	}
	
	$scope.showAll= function(){
		$scope.query='';
	}

});

	