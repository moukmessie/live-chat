let socket = io();
let form = document.getElementById('form');
let input = document.getElementById('input');
let message = document.getElementById('messages');


while(!name){
    var name = prompt('quel est votre nom ?');
}
/**
 * EVENTS -> server
 *
 * */
//send name to server
socket.emit('name',name);
document.title = name + ' - ' + document.title;



//Send message to server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (input.value){
        socket.emit('chat message', input.value);
        input.value='';
    }

});
//Writing caption
function writing(){
    socket.emit('writing');
    // socket.emit('writing',name);//for team conversation
}
//not writing
function notWriting(){
    socket.emit('notWriting');
}




/**
 *
 * EVENTS -> client
 *
 * */
// connection notification
socket.on('newUser',(name)=>{
    let notif = document.createElement('i');
    notif.textContent=name + " vient de se connecter !";
    message.appendChild(notif);
});
//disconnection notification
socket.on('quitUser',(name)=>{
    let disconotif = document.createElement('i');
    disconotif.textContent=name + " vient de se déconnecter !";
    message.appendChild(disconotif);
});

//writing caption //give parameter name if team chat
socket.on('writing',()=>{
    document.getElementById('write').textContent=" écrit....";
    // let write= document.createElement('i');
    // write.textContent= " écrit....";
    // message.appendChild(write);

});
//not writing caption
socket.on('notWriting',()=>{
    document.getElementById('write').textContent=" ";

});

//receive message sending by server
socket.on('chat message', (msg)=>{
    let item = document.createElement('li');
    item.textContent=msg;
    message.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
});


/**
 * Function
 */
function  createElementFun(elem, content){
    const newElement =  document.createElement('div');

    switch (elem){
        case 'newUser':
            newElement.textContent=content + " s'est connecté(e)";
            message.appendChild(newElement);
            break;
    }
}
