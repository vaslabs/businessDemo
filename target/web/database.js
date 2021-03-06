//input is students in rigneys_format
GRADES_IDX = {'actual':0, 'predicted':1, 'target':2};
student_hash = {};
function linearFormat(student_entries) {
	linear_representation = [];
	for (index in student_entries) {
	
		terms = new Array(18);
		var student = student_entries[index];
		var grades = student["grades"];
		for (gIndex in grades) {
			var grade = grades[gIndex];
			term = grade['term'];
			terms[term-1] = [grade['actual']==null?grade['predicted']:grade['actual'] , grade['target'], grade['actual']==null];
		}//for
	
		converted_entry = [student["name"], terms];
		student_hash[student["name"]] = terms;
		linear_representation.push(converted_entry);
	}//for
	return linear_representation;
}

function flatFormat(student_entries, grade_type) {
	linear_representation = linearFormat(student_entries);
	for (lIndex in linear_representation) {
		linear_representation[lIndex][1] = linear_representation[lIndex][GRADES_IDX[grade_type]];
	}//for
	return linear_representation;
}

function getTableHeaders(student_entries) {
	headers = new Array(20);
	headers[0] = "Name";
	headers[1] = "";
	for (i = 2; i < headers.length; i++) {
		headers[i] = "Term " + (i-1); 
	}
	return headers;
}

flat_db = null;
linear_db = null;
headers_db = null;

function init_database(database) {
	headers_db = getTableHeaders(database);
	linear_db = linearFormat(database);
}
