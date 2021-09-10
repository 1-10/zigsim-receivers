const {webSocketServer, udpServer} = require('./servers')
const wsServer = new webSocketServer()
new udpServer(wsServer)