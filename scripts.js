//	$("#date").html();
	

	
	
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



	var today = new moment().tz("America/New_York");	
	$("#date").html(today.format("MMM. YYYY"));

	$(".birthdays_today span").html(today.format("MMM. Do"))

	$.getJSON("data.json", function(data){
		
		console.log("Got data!");		

		for(i=1; i<=12; i++){
			calendar = $('<div class="calendar"></div>').appendTo($(".calendars"));

			//At every month, going through member list to see who has bdays in that month

			//[] that's an empty array
		
			var birthdays = [];

			//next line that follows is going through list
			data.forEach(function(legislator){

				var leg_bday = moment(legislator.DOB).tz("America/New_York");

				if(leg_bday.month() == i-1){
					birthdays.push({
						date: today.year() + "-" + (leg_bday.month() + 1) + "-" + leg_bday.date(),
						title: legislator.Name + "'s birthday"
					});
				}
						
			});

			console.log(birthdays)

			$(calendar).clndr({
				startWithMonth: today.year() + "-" + i + "-01", 
				events: birthdays
			});

		}

		
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

				$(".birthdays_today ul").append("<li>" + chamber + " <span>" + legislator.Name + "</span>, " + legislator.Region + " <div class='party_bug_" + party_abbrev + "'>" + party_abbrev + "</div>" + " , is turning <span>" + (today.year() - legislator_birthday.year()) + "</span></li>");
			}
			
		});
		
		
		// Print the first dude's name
		// $("#date").html(data[0].Name);
		
	});
	