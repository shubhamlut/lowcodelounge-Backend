const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhamissmartboy";

fetchUser = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ error: "Please authenticate using valid token" });
    }
    const data = jwt.verify(token, JWT_SECRET);
    //We are twicking the req here by adding the user in it
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;