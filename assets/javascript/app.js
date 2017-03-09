var topics = ["Anthony Davis", "Kevin Durant", "John Wall", "Steph Curry", "Demarcus Cousins", "Klay Thompson"];

// var player = "";
//replace spaces with underscores so the url will work


//always display the default player buttons on screen load
displayPlayers();

function displayPlayers() {

	//ensure that the buttons aren't repeated
	$('#playerButtons').empty();

	//for every string in the array, make a button
	//with data-name equal to string value of the item in the array
	for (var i = 0; i < topics.length; i++) {
		var button = $('<button>');
		button.addClass("player");
		button.attr("data-name", topics[i]);
		button.text(topics[i]);
		$('#playerButtons').append(button);
	}
}

//when submit button is clicked, add new button with contents of input box
$('#add-player').on("click", function(event) {
	event.preventDefault();
	//player var gets value of input box
	var playerName = $('#player-input').val();
	console.log(playerName);
	if (playerName !== ""){
	//push to the array
	topics.push(playerName);
	}
	console.log(topics);
	//clear the input box
	$('#player-input').val('');
	//display the player buttons including newly added player from on click event
	displayPlayers();


});

//when a player name button is clicked, clear the div with id of players
$('.player').on("click", function() {
	$('#players').empty();
	//var to hold value of data-name of the button clicked
	var player = $(this).attr("data-name");
	console.log("new button");
	//replace space with _ so the queryURL will be valid
	var noSpace = player.replace(" ", "_");
	//build queryURL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + noSpace + "&limit=10&api_key=dc6zaTOxFJmzC";
	console.log(player);
	console.log(noSpace);
	console.log(queryURL);
	//make the call
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		for (var i = 0; i < 10; i++) {
		var stillURL = response.data[i].images.fixed_height_still.url;
		console.log(stillURL);
		var rating = response.data[i].rating;
		console.log(rating);  
		$('#players').append('Rated: ' + rating + '<br>' + '<img src="' + stillURL + '"width="400"><br>');
	}
	});
});

$('#players').on("click", "img", function() {

});
