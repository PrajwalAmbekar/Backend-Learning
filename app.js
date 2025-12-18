


app.get('/',(req,res)=> {
    res.send("The server is on");
    alert("u have refreshed");
});

app.listen('port : 3000', ()=>{
    console.log("the app is running in port number http://localhost:3000");
});

export default app;