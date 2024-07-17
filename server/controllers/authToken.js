import jwt from "jsonwebtoken";

export const authToken = (req,res,next)=>{
    const token = req.cookies.token;
    console.log();
}
const decode = jwt.verify(token,'secret_key');
