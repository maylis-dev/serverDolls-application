const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

  try {
    
    const token = req.headers.authorization.split(" ")[1]//
  

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)// reject if it doesnt recive 

    // console.log(payload)
   
    req.payload = payload

    next() // continue with the route what ahappen after the excution
  } catch (error) {
    // console.log(error)
    
    res.status(401).json({errorMessage: "There is no token. Or token is invalid or expired."})
  }

}

function verifyAdmin(req, res, next) {
  // this is a protection middleware that checks if the user is of type admin and ALWAYS BE USED AFTER verifyToken

  if (req.payload.role === "admin") {
    next() // you are an admin, continue with the route.
  } else {
    res.status(401).json({errorMessage: "Route only for admins, you are not an admin, get out"})
  }
}

module.exports = {
  verifyToken,
  verifyAdmin
}