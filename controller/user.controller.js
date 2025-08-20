import User from "../model/User.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer"

const registerUser= async (req , res) => {
    // get data
    // validate data
    // check if user already exist
    // if not then create user in db
    // create verification token
    // save token in db
    // send token as email to user
    // send success status to user

    const { name, email, password }= req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required",
        })
    }
    console.log(email)
    
    try {
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exist"
            })
        }

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

        const token= crypto.randomBytes(32).toString("hex")
        console.log(token)

        user.verificationToken = token
        await user.save()

        // send email
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
            // ${process.env.BASE_URL}/api/v1/users/verify/${token}
            // `,
            html: `
                <p>Please click on the following link to verify your email:</p>
                <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">
                Verify Email
                </a>
            `
        }

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

    const {token} = req.params

    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    const user= await User.findOne({verificationToken : token})

    if(!user){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    user.isVerified= true
    user.verificationToken= undefined

    await user.save()


}

export {registerUser, verifyUser}