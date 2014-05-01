google.load("visualization", "1", {packages:["corechart"]});

function individual_graph(student) {
	
	line_graph = [['Name', 'Actual', 'Predicted', 'Target']];
	
	student_terms = student_hash[student];
	
	for (term_index in student_terms) {
		actual = student_terms[term_index][0];
		predicted = student_terms[term_index][1];
		target = student_terms[term_index][2];
		line_graph.push(["Term " + term_index, grade_map_db[actual], grade_map_db[predicted], grade_map_db[target]]);
	}
	
	var data = google.visualization.arrayToDataTable(line_graph);

        var options = {
          title: student + " performance",
          dataOpacity : 0.5
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      
}


