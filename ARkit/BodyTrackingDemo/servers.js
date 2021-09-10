class WebSocketServer {
    server = null

    constructor() {
        const wsServer = require('ws').Server
        const port = 5000
        this.server = new wsServer({port: port})
    }
}

class UdpServer {

    constructor(ws) {
        const dgram = require('dgram')
        const port = 10000
        const udpServer = dgram.createSocket("udp4")
        
        udpServer.on("message", function(msg) {
            try {
                const jsonObj = JSON.parse(msg)
                ws.server.clients.forEach( client =>  {
                    client.send(JSON.stringify(jsonObj))
                })
            } catch {
                console.log("send error!")
            }
        })

        udpServer.on("error", function(err) {
            console.log("server error: \n" + err.stack)
        })
          
        udpServer.on("close", function() {
            console.log("closed.")
        })

        udpServer.bind(port)
    }
}

module.exports = {
    webSocketServer: WebSocketServer,
    udpServer: UdpServer
}