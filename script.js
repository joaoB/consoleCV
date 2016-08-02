	
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

$('#close').click(function(){
	quit();
});

var maxed = false;
$('#maximize').click(function(){
	if(!maxed){
		$("#header, #cmd").css("width", "100%"); 
		$("#cmd").css("height", $(document).height() - 60); 
		$("#header").css("height", $(document).height() - 40);
	} else{
		cleanAttrs();
	}
	maxed = !maxed;
	
});

var mined = false;
$('#minimize').click(function(){
	if(!mined){
		$("#header").css("height", "20"); 
		$("#cmd").css("height", 0);
	} else{
		$("#cmd").css("height", maxed ? $(document).height() - 60 : ''); 
		$("#header").css("height", '');
	}
	mined = !mined;
	
});

var cleanAttrs = function(){
	$("#header").removeAttr( 'style' );
	$("#cmd").removeAttr( 'style' );
}

$('#containerSmall, #cmd').click(function(){
	$('#input').focus();
});

var bot;
var handleEnter = function(command){
	if (command.toLowerCase() == 'quit'){
		return quit();
	}
	addToHistory(command);
	index = commandHistory.length;
	var o = $('#container').html();
	$('#container').html( o + '> ' + command + '<br>');
	cleanInput();
	generateRespose(command);
	$('#cmd').scrollTop($('#cmd')[0].scrollHeight); //scroll down
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


var help = '<br>help -> shows this information <br>\
			about -> shows information about me <br>\
			quit -> closes the console <br>\
			anything else -> chat with an amazing bot!';
			
			
var about = 'Hi, I am Bruno! A software engineer with a passion for full stack development. <br> \
			I consider myself a self motivated person who is a fast learner with a passionate attitude and the desire to keep moving things forward. <br> \
			I\'ve worked with: <br> \
			Node JS, TypeScript, MongoDB, nginx, CSS <br>\
			Scala, PlayFramework, Slick, AWS, PostgreSQL <br>\
			Version control: GitHub, Bitbucket, SVN <br> \
			Some fun projects using: <br>\
			RoR, Symfony2<br>\
			<br>\
			Contact me: silva.joaobruno@gmail.com';


var quit = function(){
	cleanInput();
	brunoSays('Goodbye!');
	setTimeout(() => {
		$('#message').show();
		$('#header').hide(); }
	, 750);
}
			
var knownCommands = {help : help, about : about};
var generateRespose = function(command){
	if (knownCommands[command]){
		//inject predefined answer
		brunoSays(knownCommands[command]);
	}
	else {
		//call bot
		getBot().ask(command, function (err, response) {
			brunoSays(response);
			$('#cmd').scrollTop($('#cmd')[0].scrollHeight); //scroll down
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