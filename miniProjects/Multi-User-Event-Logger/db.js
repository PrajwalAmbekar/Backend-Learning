const fs = require("fs");
const readline = require("readline");

exports.createLogsFile = () => {
  fs.writeFile("./miniProjects/Multi-User-Event-Logger/logs.txt", "", (err) => {
    if (err) throw err;
    console.log("Logs file created");
  });
};
exports.writeUserLog = async (req, userId) => {
  const date = new Date().toISOString();
  const filePath = "./miniProjects/Multi-User-Event-Logger/logs.txt";
  const tempPath = filePath + ".tmp";

  let body = "";
  for await (const chunk of req) body += chunk.toString();

  const newLog = `${userId} -> logged at ${date} -> user details -> ${body}`;

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(tempPath);
  const rl = readline.createInterface({ input: readStream });

  let found = false;

  for await (const line of rl) {
    if (line.startsWith(userId)) {
      writeStream.write(newLog + "\n");
      found = true;
    } else {
      writeStream.write(line + "\n");
    }
  }

  // If user never existed → append once
  if (!found) {
    writeStream.write(newLog + "\n");
  }

  writeStream.end();

  await new Promise((resolve) => writeStream.on("finish", resolve));

  rl.close();
  readStream.destroy();

  await new Promise((resolve) => fs.rename(tempPath, filePath, resolve));

  return found ? "updated" : "created";
};

exports.retrieveUserLog = async ( userId) => {
  const filePath = "./miniProjects/Multi-User-Event-Logger/logs.txt";
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: readStream });
  let foundLine = null;
  for await (const line of rl) {
    if (line.startsWith(userId)) {
      return foundLine = line;
    }
  }

  rl.close();
  readStream.destroy();
};
