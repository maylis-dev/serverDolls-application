const router = require("express").Router();
const { response } = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.middlewares")

//post sign up route  api/auth/signup
//already start with api and auth so dont add it
//req request
//res is repsond pass to the client 
router.post("/signup", async (req, res, next) => {
  console.log(req.body);//afiche les parametre et les responde dans le terminal 
//add the body when you when to add the information 

  //verificator that the data that the user enter is in the standart , if nothin gis miisng
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ errorMessage: "All fields are required" });
    return; //stop the route from contuining
  }
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "Password must follow this pattern (min 8 characters, max 20 characters, include lowercase, include uppercase, include number)",
    });
    return; // now stop the route from continuing.
  }

  

  // create a new user
  try {
    // does the mail exisst already
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "email exist already" });
      return; // now stop the route from continuing.
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const response = await User.create({
      email: email,
      password: hashPassword,
      username: username,
    });

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// post api/auth/login

router.post("/login", async (req, res, next) => {
   
   
   
   // valid password ?
   // cre

     const {email, password} = req.body
  
  // validate fields
  if (!email || !password) {
    res.status(400).json({ errorMessage: "All fields are required (email, password)" })
    return // now stop the route from continuing.
  }
   
   
  
    try {
         // user exist ?
         const foundUser = await User.findOne({ email: email });
         console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({ errorMessage: "user not registered withthat " });
      return; // now stop the route from continuing.
    }

    //validate password 
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
      if (isPasswordCorrect === false) {
      res.status(400).json({ errorMessage: "Password not correct!" })
      return // now stop the route from continuing.
    }

    
    // create a loveley token 
    // creta a payload information token about user 
    // its where you supposed to add roles

    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role

    }
// !never expose it on github 
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm:"HS256",
        expiresIn: "7d"
    })

      res.status(200).json({ authToken: authToken, payload: payload })

    } catch (error) {
        next(error)
    }
})




// get /api /auth/verify
// this is a protected route to verify that the token is valid and the user is authenticated
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({payload: req.payload})
})

module.exports = router;
