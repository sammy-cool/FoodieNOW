const jwt = require("jsonwebtoken");

// 4 responsibility of a middleware funcn
//* can execute any code
//* can modify req, res objects
//* can end req, res cycle
//* call the next middleware funcn

const authenticatedUser = (req, res, next) => {
  //console.log(req.headers)
  const token = req.headers.authorization;
  if (token) {
    let tokenData;
    try {
      tokenData = jwt.verify(token, "foodieNow");
      req.userId = tokenData.id;
      next();
    } catch (e) {
      res.status("401").json({ error: e.message });
    }
  } else {
    res.status("401").json({ error: "token not provided" });
  }
};

module.exports = {
  authenticatedUser,
};
