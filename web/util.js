function getCurrentTerm(data){
	
	var terms = data[0][1];
	for (var index=0; index<terms.length; index++){
		if(terms[index][2]==true){
			return index;
		}
	}
	return 0;
}