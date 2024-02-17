import jwt from "jsonwebtoken"

 const validateToken = (req,res,next) => {
    if (req.headers?.authorization?.split(" ")[1]) {
        const token = req.headers?.authorization?.split(" ")[1];
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.decodedEmail = verified.email  
        next();
    }catch(err){
        return res.status(501).json({success: false})
    }
    } else {
        return res.status(401).json({success: false})
    }
}
export default validateToken
