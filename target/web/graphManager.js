google.load("visualization", "1", {packages:["corechart"]} );

function individual_graph(student,gradeMapDB,isScore) {
	
	line_graph = [['Name', 'Grade', 'Target']];
	
	student_terms = student_hash[student];
	
	for (term_index in student_terms) {
		grade = student_terms[term_index][0];
		target = student_terms[term_index][1];
		if(isScore){
			line_graph.push(["Term " + term_index, grade, target]);
		}
		else{
			line_graph.push(["Term " + term_index, gradeMapDB[grade], gradeMapDB[target]]);
		}
	}
	
	var data = google.visualization.arrayToDataTable(line_graph);

        var options = {
          title: student + " performance",
          dataOpacity : 0.5
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      
}


