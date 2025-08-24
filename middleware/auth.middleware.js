import jwt from "jsonwebtoken"

const isLoggedIn= async (req, res, next) => {
    try {
        console.log(req.cookies)
        let token= req.cookies?.token

        console.log("Token found: ", token ? "YES" : "NO");

        if(!token){
            console.log("No token");
            return res.status(401).json({
                success: false,
                message: "authentication failed"
            })
            
        }

        // verify(token, secret_key)
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded data: ",decoded);
        req.user= decoded

        next()
        
        
    } catch (error) {
        console.log("auth middleware failure");
        return res.status(500).json({
            success: true,
            message: "internal server error"
        })

    }
    next()
}

export {isLoggedIn}