//	$("#date").html();
	
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	today = new Date();
	
	$("#date").html(days[today.getDay()]);

	
