import {createServer} from 'node:http';

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Port must be a valid TCP port");
}

const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/hello') {
        const name = url.searchParams.get('name') || 'guest';
        console.log(name);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(`Hello, ${name}!`);
        return;
    }
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not Found');
})

server.listen(port, "127.0.0.1", ()=>{
    console.log("Server running on port: " + port);
});