	
window.onload = function(e){
	$('#input').focus();	
	$('#input').keyup(function(e){
		var k = e.which;
		var command = $('#input').val(); 
				
		switch(k){
			case 13:
				handleEnter(command);
				break;
			case 38: //key up
				handleKeyUp();
				break;
			case 40: //key down
				handleKeyDown();
				break;
			default:
				fillFake(command);
		}
    });
}

$('#cmd').click(function(){
	$('#input').focus();
});

var bot;
var handleEnter = function(command){
	addToHistory(command);
	index = commandHistory.length;
	var o = $('#container').html();
	$('#container').html( o + '> ' + command + '<br>');
	cleanInput();
	generateRespose(command);
	$('#containerSmall').scrollTop($('#containerSmall')[0].scrollHeight); //scroll down
}

var commandHistory = [];
var index = 0;
var addToHistory = function(c){
	commandHistory.push(c);
}

var cleanInput = function(){
	$('#input').val('');
	fillFake('');	
}

var handleKeyUp = function(){
	index = Math.max(--index, 0);
	$('#input').val(commandHistory[index]);
	fillFake(commandHistory[index]);
}

var handleKeyDown = function(){
	index = Math.min(++index, commandHistory.length);
	$('#input').val(commandHistory[index]);
	fillFake(commandHistory[index] || '');
}

var fillFake = function(command){
	$('#fake').html('> ' + command);
}

var brunoSays = function(command){
	var o = $('#container').html();
	$('#container').html( o + ' bruno > ' + command + '<br>');
}


var help;
var about = 'Hi, I am Bruno! ';


var knownCommands = [];
var generateRespose = function(command){
	if (knownCommands[command]){
		//inject predefined answer
	}
	else {
		//call bot
		console.log('here');
		console.log(getBot());
		getBot().ask(command, function (err, response) {
			brunoSays(response);
			$('#containerSmall').scrollTop($('#containerSmall')[0].scrollHeight); //scroll down
		});
	}
}

var getBot = function(){
	if (!bot){
		//api keys are free.. you can get your own @ cleverbot.io :)
		bot = new cleverbot('8KnVGyw6d60ozKSG','XTqKEb5NxbfKl7RreSs3sOwmiuTdIXfv');
		bot.setNick("brunobot")
		bot.create(function (err, session) {});
	}
	return bot;
}