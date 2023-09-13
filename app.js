let stompClient = null;

function connect() {
    let nameU = document.getElementById("nameU").value;
    let socket = new WebSocket('ws://localhost:8080/connect-socket/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/'+nameU, function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function sendMessage() {
        let message = document.getElementById("textMessage").value;
        let nameU = document.getElementById("nameU").value;
        let nameF = document.getElementById("nameF").value;
        stompClient.send("/gkz/chat", {},JSON.stringify({nameU,nameF,message}));
}


function showMessage(message) {
   let str = document.getElementById("textAreaMessage").innerHTML;
   str += `<p>${message.nameU} - ${message.message}</p>`
    document.getElementById("textAreaMessage").innerHTML = str;

}

