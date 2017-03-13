// Array of topics to be made into buttons
var topics = [
'Biker Mice from Mars',
'Ninja Turtles',
'He Man',
'She Ra',
'DuckTales',
'ThunderCats',
'Rescue Rangers',
'Alvin and the Chipmunks',
'GI Joe',
'Voltron',
'Silverhawks',
'Jem and the Holograms',
'Tiny Toons',
'Inspector Gadget',
'Smurfs',
'Darkwing Duck',
'Gargoyles',
'Rugrats',
'Bobby\'s World',
'Captain Planet',
'Doug',
'Pokemon'
];

for (i=0; i<topics.length; i++) {
	var $btn = $('<button>');

	$btn.text(topics[i])
	.addClass('btn btn-info')
	.attr('data-topic', topics[i])
	.appendTo($('.buttons'))
};

$('.btn').on('click', function() {
	$('.gifs').empty();

	var APIkey = 'dc6zaTOxFJmzC';

	var searchTerm = $(this).attr('data-topic').trim();

	var limit = 10;

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=" + limit + "&api_key=" + APIkey;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		for (i=0; i<response.data.length; i++) {

//Accessing response data for animations, stills, and ratings.
			var animation = response.data[i].images.fixed_height.url;

			var still = response.data[i].images.fixed_height_still.url;

			var rating = response.data[i].rating;

//Providing attributes to use on click events.
			var $div = $('<div>');

			$div.append('<img src="' + still + '">')
			.addClass('gifDiv')
			.append('Rating: ' + rating)
			.prependTo('.gifs');
			
			$div.children()
			.addClass('gifClick')
			.attr('state', 'still')
			.attr('animated-gif', animation)
			.attr('still-gif', still)			
		}

		$('.gifClick').on('click', function() {

			var animatedGif = $(this).attr('animated-gif');

			var stillGif = $(this).attr('still-gif');

			var gifState = $(this).attr('state');


			// Changes state and src if still or animated
			if (gifState === 'still') {
				$(this).attr('src', animatedGif);
				$(this).attr('state', 'animated')
			} else {
				$(this).attr('src', stillGif);
				$(this).attr('state', 'still')
			};
		});
	});
});