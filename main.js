var socket = io.connect();

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("What's your name?"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, message) {
	var usernameDiv = '<div class="username">' + username + '</div';
	var messageBodyDiv = '<div class="messageBody">' + message + '</div';
	var messageDiv = '<div class="message">' + usernameDiv + messageBodyDiv + '</div>';
	$('#messages').append(messageDiv);
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
	$('#users').empty();
	$.each(data, function(key, value) {
		$('#users').append('<div>' + key + '</div>');
	});
});

// on load of page
$(function(){
	// when the client clicks SEND
	$('#datasend').click( function() {
		var message = $('#data').val();
		$('#data').val('');
		// tell server to execute 'sendchat' and send along one parameter
		socket.emit('sendchat', message);
	});

	// when the client hits ENTER on their keyboard
	$('#data').keypress(function(e) {
		if(e.which == 13) {
			$(this).blur();
			$('#datasend').focus().click();
		}
	});
});