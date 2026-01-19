const userDetails = require("./db");
const routes = async (req, res, pathname, parseUrl) => {
  switch (pathname) {
    case "/":
      res.end("Welcome to multi-user site");
      break;
    case "/log":
      const userId = parseUrl.query.userId;
      if (!userId) {
        res.end("userId required");
        break;
      }
      switch (req.method) {
        case "GET":
          const userFound = await userDetails.retrieveUserLog(userId);

          if (!userFound) {
            res.end("User is not logged");
            break;
          }
          res.end(`user details are: ${userFound}`);
          break;
        case "DELETE":
            const deleteUserLog = await userDetails.deleteUserLog(userId);
          break;
        case "POST":
          const result = await userDetails.writeUserLog(req, userId);
          res.end(`User log ${result} successfully`);
      }
      break;
  }
};
module.exports = routes;
