const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
exports.getAllUsers = async (req, res) => {
    const users = await userModel.find({});
    return res.status(200).send({
        userCount: users.length,
        success: true,
        message: "all users data",
        users,
    })
};

exports.registerController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //validation
      if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }
      //exisiting user
      const exisitingUser = await userModel.findOne({ email });
      if (exisitingUser) {
        return res.status(401).send({
          success: false,
          message: "user already exisits",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
    //   save new user
      const user = new userModel({ username, email, password: hashedPassword}); 
      await user.save();
      return res.status(201).send({
        success: true,
        message: "New User Created",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        error,
      });
    }
  };

exports.loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please provide email or password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(500).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
              success: false,
              message: "Invalid username or password",
            });
          }
          return res.status(200).send({
            success: true,
            message: "Login successful",
            user,
          });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login Callback",
            error
        })
        
    }
};