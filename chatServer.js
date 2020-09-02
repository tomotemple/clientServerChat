const net = require('net');
//const { Stream } = require('stream');
const fs = require('fs');
const printer = fs.createWriteStream('chat.log');
let users = [];
let counter = 0;
const server = net.createServer((socket) =>{

    socket.id = ++counter;
    socket.write('Welcome new person');
    let connectMessage = `Person number ${socket.id} has joined`;
    printer.write(connectMessage);
    for (let i in users) {
        users[i].write(connectMessage);
    }
    users.push(socket);

    socket.on('data', (data) => {
        users.filter(user => {
            if (user.id !== socket.id) {
                user.write(`message from user ${socket.id}: ${data}`);
            }
        })
        printer.write(`message from user ${socket.id}: ${data}`);
    })
    socket.on('end', () => {
        console.log('outa here')
        users.filter(user => {
            if (user.id !== socket.id) {
                user.write(`User number ${socket.id} logged out.`);
            }
        printer.write(`User number ${socket.id} logged out.`);
    })
});
})
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    if(data.toLowerCase().trim() === 'exit') {
        console.log('thank you')

        process.exit()
    }
    })
server.listen(6000, () => console.log('Listen on port 6000'))