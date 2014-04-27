var graphs = angular.module("graphs",[]);
graphs.controller("tableCtrl",function($scope,$http){
	$scope.query='';
	
	$http.get('http://localhost:8081/rigneys_format.json').
    success(function(data, status, headers, config) {
    	
      $scope.students = data;
      alert(data);
    }).
    error(function(data, status, headers, config) {
    });
	
	$scope.isFailing= function(data){
		return data.grade < data.target
	}
	
	$scope.convert = function(grade){
		
	}
	$scope.studentStatus= function(student){
		
		var diff;
		if(student.actual==null){
			diff = convert(student.target) - convert(student.predicted)
		}
		else{
			diff = convert(student.target) - convert(student.actual)
		}
		
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
		$scope.query=$scope.isFailing;
	}
	
	$scope.showAll= function(){
		$scope.query='';
	}

});