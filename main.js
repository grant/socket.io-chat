var socket = io.connect();

var $messages = $('.messages');

// on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
	// call the server-side function 'adduser' and send one parameter (value of prompt)
	socket.emit('adduser', prompt("What's your name?"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, message) {
	var usernameDiv = '<div class="username">' + username + '</div>';
	var messageBodyDiv = '<div class="messageBody">' + message + '</div>';
	var messageDiv = '<div class="message">' + usernameDiv + messageBodyDiv + '</div>';
	$messages.append(messageDiv);
	$messages[0].scrollTop = $messages[0].scrollHeight;
});

// on load of page
$(function(){
	// when the client clicks SEND
	$('.sendMessage').click( function() {
		var message = $('.inputMessage').val();
		// If there is a non-empty message
		if (message) {
			$('.inputMessage').val('');
			// tell server to execute 'sendchat' and send along one parameter
			socket.emit('sendchat', message);
		}
	});

	// when the client hits ENTER on their keyboard
	$(window).keypress(function(e) {
		if(e.which == 13) {
			$('.sendMessage').click();
		}
	});
});
