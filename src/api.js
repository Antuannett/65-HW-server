import {createServer} from 'node:http';

const port = Number(process.env.PORT ?? 5000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Port must be a valid TCP port");
}

const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/api/status') {
        if (request.method === 'GET') {
            const data = {
                status: 'running',
                nodeVersion: process.version
            };
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(data));
            return
        } else {
            response.writeHead(405, {
                'Content-Type': 'text/plain',
                'Allow': 'GET'
            });
            response.end('Method Not Allowed');
            return;
        }
    }
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not Found');
})


server.listen(port, "127.0.0.1", () => {
    console.log("Server running on port: " + port);
});