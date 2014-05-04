var graphs = angular.module("graphs",[]);
graphs.config(function($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});
graphs.controller("tableCtrl",function($scope,$http){
	
	$scope.query='';
	$scope.gradeMapDB;
	
	$http.get('/betterGradeMap.json').
    success(function(data, status, headers, config) {
    
    	$scope.gradeMapDB = data;
    	$scope.reverseGradeMapDB = new Array();
    	angular.forEach($scope.gradeMapDB,function(grade,key){
    		alert(key);
    		$scope.reverseGradeMapDB.push(key);
    	});
    
    }).
    error(function(data, status, headers, config) {
    });
	
	$http.get('/rigneys_format.json').
    success(function(data, status, headers, config) {
    	
        $scope.students = data;
        init_database(data);
        $scope.linear_db = linear_db;
        $scope.headers_db = headers_db;
	    database = data;
	    $scope.filterTerm=getCurrentTerm(linear_db);
    }).
    error(function(data, status, headers, config) {
    });
	
	$http.get('/gradeMap.json').
    success(function(data, status, headers, config) {
    	
      $scope.grades = data;

    }).
    error(function(data, status, headers, config) {
    });
	
	
	
	
	
	$scope.convertToGrade = function(studentGrade){

		var toReturn = studentGrade;
		if($scope.gradeMapDB[studentGrade]!=null){
			toReturn= $scope.gradeMapDB[studentGrade];
		}
		return toReturn;
	}
	
	$scope.studentStatus= function(grade,target){
		
		var diff=0;
		if(grade==null || target==null){
			return "";
		}
		var targetScore = $scope.convertToGrade(target);
		var gradeScore = $scope.convertToGrade(grade);
		
		diff = targetScore - gradeScore;
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
	
	$scope.isFailing = function(student){
		var status = $scope.studentStatus(student[1][7][0], student[1][7][1]);
		return status=="failing-3" || status=="failing-1";
		
	}
	
	var showAll=true;
	$scope.filterFailingStatus="Show Failing"
	$scope.setFilter = function(){
		if(showAll){
			showAll=false;
			$scope.query = $scope.isFailing;
			$scope.filterFailingStatus="Show All";
		}
		else{
			showAll=true;
			$scope.query ='';
			$scope.filterFailingStatus="Show Failing";
		}
		
	}
	$scope.showAsScores=false;
	$scope.scoresStatus="Show as Scores"
	$scope.toScores = function(){
		
		if(!$scope.showAsScores){
			$scope.showAsScores=true;
			$scope.scoresStatus="Show as Grades"
			angular.forEach($scope.linear_db, function(student,key){
				angular.forEach(student[1], function(term, key){
					term[0] = $scope.convertToGrade(term[0]);
					term[1] = $scope.convertToGrade(term[1]);
				
				});
			});
		}
		else{
			$scope.showAsScores=false;
			$scope.scoresStatus="Show as Scores"
			alert( $scope.gradeMapDB[1]);
			angular.forEach($scope.linear_db, function(student,key){
				angular.forEach(student[1], function(term, key){
					alert($scope.reverseGradeMapDB[1])
					term[0] = $scope.reverseGradeMapDB[term[0]+3];
					term[1] = $scope.reverseGradeMapDB[term[1]+3];
				
				});
			});
		}
	}

});

	