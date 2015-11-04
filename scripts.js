//	$("#date").html();
	

	
	
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



	var today = new moment().tz("America/New_York");	
	$("#date").html(today.format("MMM. YYYY"));

	$(".birthdays_today span").html(today.format("MMM. Do"))

	$.getJSON("data.json", function(data){
		
		console.log("Got data!");		
		
		data.forEach(function(legislator){
			
			var legislator_birthday = new moment(legislator.DOB);
			
			if( legislator_birthday.month() == today.month() && legislator_birthday.date() == today.date() ){
				
			if (legislator.Party == "Democratic")
					var party_abbrev = "D";
				else if (legislator.Party == "Republican")
					var party_abbrev = "R";
				else var party_abbrev = "I";

			if(legislator.Chamber == "Senate")
				var chamber = "Sen.";
			else var chamber = "Rep.";

				$(".birthdays_today ul").append("<li>" + chamber + " <span>" + legislator.Name + "</span> (" + legislator.Region + ") <div class='party_bug_" + party_abbrev + "'>" + party_abbrev + "</div>" + " is turning " + (today.year() - legislator_birthday.year()) + "</li>");
			}
			
		});
		
		
		// Print the first dude's name
		// $("#date").html(data[0].Name);
		
	});
	