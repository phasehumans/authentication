import User from "../model/User.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const registerUser= async (req , res) => {
    // get data
    // validate data
    // check if user already exist
    // if not then create user in db
    // create verification token
    // save token in db
    // send token as email to user
    // send success status to user

    // get data
    const { name, email, password }= req.body;

    // validate data
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required",
        })
    }
    console.log(email)
    
    try {
        // check if user already exist
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        // create user(instance) in User(class)
        const user= await User.create({
            name,
            email,
            password
        })
        console.log(user);
        

        if (!user){
            return res.status(400).json({
                message: "User not registered"
            })
        }

        // generate verification token (crypto: gibbrish string)
        const token= crypto.randomBytes(32).toString("hex")
        console.log(token)

        // save token
        user.verificationToken = token
        await user.save()

        // nodemailer setup
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOption= {
            from: process.env.MAILTRAP_SENDERMAIL,
            to: user.email,
            subject: "Verify your email",
            // text: `please click on the following link:

            // passing the verify route link her, w/ token
            // ${process.env.BASE_URL}/api/v1/users/verify/${token}
            // `,
            html: `
                <p>Please click on the following link to verify your email:</p>
                <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">
                Verify Email
                </a>
            `
        }

        // send email
        await transporter.sendMail(mailOption)

        res.status(201).json({
            message: "User register successfully",
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: "User not register",
            error,
            success: false
        })
    }

}

const verifyUser= async (req, res) => {
    // get token from url
    // validate
    // find user based on token
    // if find then isVerified = true
    // remove verification token
    // save and return res

    // get data from URL
    const {token} = req.params

    // validate token
    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    // find user based on token
    const user= await User.findOne({verificationToken : token})

    if(!user){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    // verified true and remove token
    user.isVerified= true
    user.verificationToken= undefined

    // save user in db
    await user.save()


}

const login= async ( req, res) =>{
    // get data
    // validate
    // compare userentered password and db password
    // generate jwt token
    // send token to user w/ cookies

    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required",
        })
    }

    try {

        const user= await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password",
            })
        }

        // compare passwords
        const isMatch= await bcrypt.compare(password, user.password)
        console.log(isMatch);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password",
            })
        }
        
        // jwt
        const token= jwt.sign({id: user._id, role: user.role},

            // secret key in .env
            process.env.JWT_SECRET , {
                expiresIn: '24h'
            }
        )

        const cookieOptions= {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        }

        // send cookies w/ jwt token
        res.cookie("token", token, cookieOptions)

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                role: user.role
            }
        })

        
    } catch (error) {
        res.status(400).json({
            message: "Login failed",
            error,
            success: false
        })
    }

}

const getMe= async (req, res) => {
    // find user based on id in cookies
    // res user w/o password

    try {
        const user= await User.findById(req.user.id).select('-password')
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        
    }

}

const logoutUser= async (req, res) => {
    // clear auth cookie by overide ""
    try {
        res.cookie('token', '', {
            expires: new Date(0)
            // date(0)-> 1970
            // this is just a trick to force the cookie to disappear immediately
        })
        
        res.status(200).json({
            success: true,
            message: "Logged Out successfully"
        })
    } catch (error) {
        
    }
}

const forgotPassword= async (req, res) => {
    // get email - res.body
    // find user based on email
    // set resetpassword token and expiry token
    // save user
    // send email of route of reset password

    const {email} = req.body

    if(!email){
        return res.status(400).json({
            message: "email required"
        })
    }

    const user= await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "email not found"
        })
    }

    

    
}

const resetPassword= async (req, res) => {
    // get token - params
    // get password - body
    // validation
    // find user based
    // set password in user
    // resettoken, resetexpiry reset -> empty
    // save


    const {token}= req.params
    const {password}= req.body

    try {
        const user= await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt:Date.now()}})


    } catch (error) {
        
    }
}

export {registerUser, verifyUser, login, getMe, logoutUser, resetPassword, forgotPassword}