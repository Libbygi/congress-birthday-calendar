//	$("#date").html();
	

	
	
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



	var today = new moment().tz("America/New_York");	
	$("#date").html(today.format("MMM YYYY"));


	$.getJSON("data.json", function(data){
		
		console.log("Got data!");		
		
		data.forEach(function(legislator){
			
			var legislator_birthday = new moment(legislator.DOB);
			
			if( legislator_birthday.month() == today.month() && legislator_birthday.date() == today.date() ){
				console.log(legislator.Name);
			}
			
		});
		
		
		// Print the first dude's name
		// $("#date").html(data[0].Name);
		
	});
	