// let socket = new WebSocket("ws://localhost:8081/socket/websocket");
//
// socket.onopen = function(e) {
//     alert("[open] Connection established");
//     alert("Sending to server");
//     socket.send("My name is John");
// };
//
// socket.onmessage = function(event) {
//     alert(`[message] Data received from server: ${event.data}`);
// };
//
// socket.onclose = function(event) {
//     if (event.wasClean) {
//         alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//     } else {
//         // e.g. server process killed or network down
//         // event.code is usually 1006 in this case
//         alert('[close] Connection died');
//     }
// };
//
// socket.onerror = function(error) {
//     alert(`[error] ${error.message}`);
// };


let stompClient = null;
connect();

function connect() {
    let socket = new WebSocket('ws://localhost:8081/socket/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("ok")
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chatroom/public', function (message) {
            console.log("anh ok")
            console.log(JSON.parse(message.body).message)
            showMessage(JSON.parse(message.body).message);

        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendMessage() {
    console.log("send ok")
        stompClient.send("/app/hello", {}, JSON.stringify({'message': $("#textMessage").val()}));
    }


function showMessage(message) {
    document.querySelector("#textAreaMessage").innerHTML += `<p>${message}</p>`;
    $("#textMessage").val("")

}
$(function () {
connect();
$("#send" ).click(function(){ sendMessage() });
});
