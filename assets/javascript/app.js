//this isn't as pretty as the example, but I believe i have it 100% functional

//declare original array of player names
var topics = ["Anthony Davis", "Kevin Durant", "John Wall", "Steph Curry", "Demarcus Cousins", "Klay Thompson", "Shaquille O'neal", "Allen Iverson", "Blake Griffin", "James Harden"];

//always display the default player buttons on screen load
displayButtons();

//function to write the player buttons across the top of the screen
//each player added to the array will also get a button
function displayButtons() {

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
	displayButtons();
});

//when a player name button is clicked, clear the div with id of players
$(document).on("click", ".player", function() {
	//clear the players div
	$('#players').empty();
	//var to hold value of data-name of the button clicked
	var player = $(this).attr("data-name");
	console.log(this);
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
		//make ten <img>'s with src, data-name, data-still/animate and size
		for (var i = 0; i < 10; i++) {
			//store the rating for each gif
			var rating = response.data[i].rating;
			var img = $("<img>");
				//add multiple attributes to the newly created <img> at one time
				img.attr({
					'src': response.data[i].images.fixed_height_still.url,
					'data-name': 'still',
					'data-still': response.data[i].images.fixed_height_still.url,
					'data-animate': response.data[i].images.fixed_height.url,
					'width': 300,
					'height': 300
				});
		//add gifs to the #players div
		$('#players').append(img);
		$('#players').append("<br>Rated: " + rating + "<br><br>");
		}
	});
});

//when a still gif is clicked
$(document).on("click", 'img', function(){
	//if the gif is still, change to animate
	if($(this).attr('data-name') === 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-name', 'animate');
	}
	//if the gif is animated, change to still
	else {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-name', 'still');
	}
});