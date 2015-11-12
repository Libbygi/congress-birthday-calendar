//	$("#date").html();
	
	if(getParameterByName("date") == "")
		var today = new moment().tz("America/New_York");	
	else 
		var today = new moment(new Date(getParameterByName("date") + "T05:00:00")).tz("America/New_York");	

	$("#date").html(today.format("MMM. YYYY"));

	$(".birthdays_today span").html(today.format("MMM. Do"))

	$(".today_button").click(function(){
			window.location = "/"
	})

	$("h1").click(function(){
			window.location = "/"
	})

	$("#cake img").click(function(){
			window.location = "/"
	})

	if(getParameterByName("date") == "")
		$(".today_button").addClass("hide");

	$.getJSON("data.json", function(data){
		
		console.log("Got data!");		
		
		var are_birthdays = false;

		// This adds legislator birthdays to the opening greeting
		data.forEach(function(legislator){
			
			var legislator_birthday = new moment(new Date(legislator.DOB + "T05:00:00")).tz("America/New_York");
			
			if( legislator_birthday.month() == today.month() && legislator_birthday.date() == today.date() ){
				are_birthdays = true;
				
			if (legislator.Party == "Democratic")
					var party_abbrev = "D";
				else if (legislator.Party == "Republican")
					var party_abbrev = "R";
				else var party_abbrev = "I";

			if(legislator.Chamber == "Senate")
				var chamber = "Sen.";
			else var chamber = "Rep.";

				$(".birthdays_today ul").append("<li>" + chamber + " <span>" + legislator.Name + "</span> (" + legislator.Region + " <div class='party_bug_" + party_abbrev + "'>" + party_abbrev + "</div>" + " ) is turning <span>" + (today.year() - legislator_birthday.year()) + "</span></li>");
			}
		});
		
		if (are_birthdays == false)
			$(".birthdays_today ul").append("No birthdays on this day")


		// Print the first dude's name
		// $("#date").html(data[0].Name);
		

		for(i=1; i<=12; i++){
			calendar = $('<div class="calendar"></div>').appendTo($(".calendars"));

			//At every month, going through member list to see who has bdays in that month

			//[] that's an empty array
		
			var birthdays = [];

			//next line that follows is going through list
			data.forEach(function(legislator){

				var leg_bday = moment(new Date(legislator.DOB + "T05:00:00")).tz("America/New_York");

				if(leg_bday.month() == i-1){
					
					if(leg_bday.month() + 1 >= 10)
						var month = leg_bday.month() + 1;
					else
						var month = "0" + (leg_bday.month() + 1);
		
					birthdays.push({
						date: today.year() + "-" + month + "-" + leg_bday.date(),
						title: legislator.Name + "'s birthday"
					});
				}
						
			});

			if(i >= 10)
				var month = i;
			else
				var month = "0" + i;
			
			$(calendar).clndr({
				startWithMonth: (today.year() + "-" + month + "-01"), 
				events: birthdays,
				clickEvents: {
					click: function(target){
						console.log(target);
						window.location = "/?date=" + target.date.format("YYYY-MM-DD")
					}
				}
			});

		}

		
	});

//get parameter from URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
	