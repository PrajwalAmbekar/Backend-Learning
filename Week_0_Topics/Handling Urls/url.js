const http = require('http');
const url = require('url');


const server = http.createServer((req,res) => 
{
    console.log("Request URL: " + req.url);
    const myUrl =url.parse(req.url,true);
    console.log("Parsed URL Object: ", myUrl);
   

    switch(myUrl.pathname)
    {
        case '/home':
            res.end("Welcome to the Home Page");
            break;
        case '/about':
            userName = myUrl.query.myname || "Guest";
            res.end(`About Page. Hello, ${userName}`);
            break;
        default:
            res.end("404 Page Not Found");
    }

});

server.listen(8000,(err) =>
{
    if(err) throw err;
    console.log("Server is listening on port 8000");
});