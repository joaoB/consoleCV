	
window.onload = function(e){
	$('#input').focus();	
	$('#input').keyup(function(e){
		var k = e.which;
		switch(k){
			case 13:
				var command = $('#input').val(); 
				handleEnter(command);
				break;
			case 38: //key up
				handleKeyUp();
				break;
			case 40: //key down
				handleKeyDown();
				break;
			default:
				fillFake($('#input').val());
		}
    });
}

$('#cmd').click(function(){
	$('#input').focus();
});

var handleEnter = function(command){
	addToHistory(command);
	index = commandHistory.length;
	var o = $('#container').html();
	$('#container').html( o + '> ' + command + '<br>');
	cleanInput();
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