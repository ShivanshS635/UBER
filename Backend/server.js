const http = require('http');
const app = require('./App');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000 ;

const server = http.createServer(app);

initializeSocket(server); // Initialize Socket.IO

server.listen(port , ()=>{
    console.log(`server is running at port ${port}`);
});