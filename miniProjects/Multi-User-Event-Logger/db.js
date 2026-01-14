const fs = require('fs');
const readline = require('readline');

exports.createLogsFile = () => {
    fs.writeFile('./miniProjects/Multi-User-Event-Logger/logs.txt', '', (err) => {
        if (err) throw err;
        console.log('Logs file created');
    });
};

exports.userExist = async (userId) => {
    const fileStream = fs.createReadStream('./miniProjects/Multi-User-Event-Logger/logs.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let foundLine = null; // Use let instead of const
    for await (const line of rl) {
        if (line.startsWith(userId)) {
            foundLine = line;
            rl.close();
            break;
        }
    }
    return foundLine;
};

exports.createNewLogs = (req, res, userId) => {
    const date = new Date().toISOString();
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString(); 
    });
    
    req.on('end', () => {
        const logDetails = `${userId} -> logged at ${date} -> user details -> ${body}\n`;
        fs.appendFile('./miniProjects/Multi-User-Event-Logger/logs.txt', logDetails, 'utf8', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error appending file');
            }
            res.end('New user log created');
        });
    });
};

exports.updateExistingUserLog = async (userId, newDetails) => {
    const date = new Date().toISOString();
    const filePath = './miniProjects/Multi-User-Event-Logger/logs.txt';
    const tempPath = filePath + '.tmp';

    const fileStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(tempPath);
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.startsWith(userId)) {
            writeStream.write(`${userId} -> logged at ${date} -> user details -> ${newDetails}\n`);
        } else {
            writeStream.write(line + '\n');
        }
    }

    // End the write stream after the loop finishes
    writeStream.end();

    return new Promise((resolve, reject) => {
        // 1. Listen for the 'finish' event of the writing process
        writeStream.on('finish', () => {
            // 2. Force close the read stream (release the lock on logs.txt)
            rl.close();
            fileStream.destroy(); 
        });

        // 3. CRITICAL: Wait for the 'close' event from the read stream
        // This ensures Windows has truly released the file lock
        fileStream.on('close', () => {
            // 4. Use asynchronous rename (safer than Sync here)
            fs.rename(tempPath, filePath, (err) => {
                if (err) return reject(err);
                console.log('User log updated successfully');
                resolve('User log updated');
            });
        });

        // Handle errors
        writeStream.on('error', reject);
        fileStream.on('error', reject);
    });
};
