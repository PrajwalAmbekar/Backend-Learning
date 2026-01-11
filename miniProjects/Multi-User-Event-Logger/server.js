const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  fs.writeFileSync(
    "./miniProjects/Multi-User-Event-Logger/logs.txt",
    "",
    { flag: "a" }
  ); //this is used to create the file if it does not exist already
  switch (path) {
    case "/":
      res.end("Welcome to the Multi-User Event Logger!");
      break;
    case "/log":
      let userId = parsedUrl.query.userId;
      if (!userId) {
        res.statusCode = 400;
        res.end("User ID is required");
        return;
      } 
      else if (req.method === "POST") {
        //logEntry must consist timestamp,userId, whatever he enters in broswer
        let data = "";
        req.on("data", (chunk) => {
          // this req.on is used to collect data sent in the request body which is sent in chunks i.e objects of data
          data += chunk;
        });
        console.log('Data received:', data);
        req.on("end", () => {
          // this event is triggered when all the data has been received and this req.on here is used to process the complete data and log it to the file
          let logEntry = `UserId : ${userId}, Timestamp: ${new Date().toISOString()}, Details: ${data}\n`;
          fs.appendFile(
            "./miniProjects/Multi-User-Event-Logger/logs.txt",
            logEntry,
            (err) => { 
              if (err) {
                res.statusCode = 500;
                res.end("Error logging event");
              } else {
                res.end("Event logged successfully");
              }
            }
          );
        });
      } else if (req.method === "GET" && userId) {
        fs.readFile(
          "./miniProjects/Multi-User-Event-Logger/logs.txt",
          "utf8",
          (err,fileLogs) => {
            if (err) {
              res.statusCode = 500;
              res.end("Error reading logs");
            } else {
              //filtering the logs for the specific user and only userlogs contain the userid hich is equal to userid sent in params
              const userLogs = fileLogs
                .split("\n")
                .filter((line) => line.includes(userId));
              if (userLogs.length > 0) res.end(userLogs);
              else res.end("No logs found for this user");
            }
          }
        );
      } else if (req.method === "DELETE" && userId) {
        fs.readFile(
          "./miniProjects/Multi-User-Event-Logger/logs.txt",
          "utf8",
          (err, data) => {
            if (err) {
              res.statusCode = 500;
              res.end("Error reading logs");
            } else {
              //here we filter out the logs for the specific user and write back the remaining logs like overwriting the file without specific user's logs
              const remainingLogs = data
                .split("\n")
                .filter((line) => !line.includes(userId))
                .join("\n");
              fs.writeFile(
                "./miniProjects/Multi-User-Event-Logger/logs.txt",
                remainingLogs,
                (err) => {
                  if (err) {
                    res.statusCode = 500;
                    res.end("Error deleting logs");
                  } else {
                    res.end("Logs deleted successfully for user " + userId);
                  }
                }
              );
            }
          }
        );
      } else {
        res.statusCode = 405;
        res.end("Method Not Allowed");
      }
      break;
    default:
      res.statusCode = 404;
      res.end("Not Found");
  }
});

server.listen(8000, (err) => {
  if (err) throw err;
  console.log("Server is listening on port 8000");
});
