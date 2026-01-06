const http = require('http');

const server = http.createServer((req,res) => {
    console.log("HTTP Method: " + req.method);

    switch(req.url)
    {
        case '/':
            if(req.method === 'GET') {
                res.end("You made a GET request");    
            }
            break;
        case '/about':
            if(req.method === 'GET') {
                res.end("You made a GET request");
              
            }
              break;
        case '/signup':
            if(req.method === 'GET') {
                res.end('This is the signup page');
            }
            else if(req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    console.log("Received signup data: ", body);
                    res.end(`Signup data received: ${body}`);
                }
                );
            }
            break;       
    }
    res.end();
});

server.listen(8000,(err) =>{
    if(err) throw err;
    console.log("Server is listening on port 8000");
});