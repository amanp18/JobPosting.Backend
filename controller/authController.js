import userModel from "../model/userModel.js";
import JWT from "jsonwebtoken";
import { comparepassword, Hashedpassword } from "../utils/authutils.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !password || !role)
      res.send("dekh bhai sab mandatory h chup chap bhar de");
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res
        .status(201)
        .send({ success: false, message: "user already exist,try login!" });
    }
    const hashedpassword = await Hashedpassword(password);
    const User = new userModel({
      name,
      email,
      role,
      password: hashedpassword,
    }).save();
    res
      .status(201)
      .send({ success: true, message: "user created succesfully!", User });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in registration", error });
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.send("both are required");
    const existinguser = await userModel.findOne({ email });
 
    if (!existinguser) {
      return res
        .status(404)
        .send({ success: false, message: "user not registered!" });
    }
    const hashedpassword = existinguser.password;
    const login = await comparepassword(password, hashedpassword);
    if (!login) {
      return res.status(400).send({
        success: false,
        message: "enter correct password",
      });
    }
    const token =  JWT.sign(
      { _id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "6d" }
    );
    res.status(200).send({
      success: true,
      message: "user logged-in successfully",
      User: {
        name: existinguser.name,
        email: existinguser.email,
        role: existinguser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error: error.message,
    });
  }
};
