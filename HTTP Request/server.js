const http = require('http');


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const now = new Date().toLocaleDateString;
    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: 'Hello, World!',
                    date: now,
                })
            );
            break;
        case '/about':
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: 'This is the about page.',
                    date: now,
                })
            );
            break;
        case '/contact':
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: 'This is the contact page.',
                    date: now,
                })
            );
            break;  
        default:
            res.statusCode = 404;
            res.end(
                JSON.stringify({
                    message: '404 Not Found',
                    date: now,
                })
            );
    }
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});