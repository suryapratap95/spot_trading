const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
      res.status(200).json({ 'token': token,
        message: 'User login successful'
       });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  signup: async (req, res ) =>{
    try{
        const {firstName, lastName, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({firstName, lastName, email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: "User created Successfully"})
    }
    catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
  }
};


