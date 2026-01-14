const userDetails = require('./db');
const routes =async (req,res,pathname,parseUrl) => {
    switch(pathname){
        case '/' :
            res.end('Welcome to multi-user site');
        break;
        case '/log' :
            const userId = parseUrl.query.userId;
            if(!userId){
                res.end("userId is required as  param");
                break;
            }
            const user = userDetails.userExist(userId);
            console.log(user)
            switch(req.method){
                case 'POST' :
                    if(!user){
                        const newUserLog =await userDetails.createNewLogs(req,res,userId);
                        console.log('new user log: ', newUserLog);
                        res.end('new user log is succesfully created');
                    }
                    else{
                        const newUserLog =await userDetails.createNewLogs(req,res,userId);
                        const updateUserLog = await userDetails.updateExistingUserLog(userId,newUserLog);
                        console.log('updated user log: ', updateUserLog);
                        res.end(' user log is updated succesfully created');
                    }
                break;
            }
        break;
    }

}
module.exports = routes;