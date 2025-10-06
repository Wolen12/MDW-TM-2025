import { error } from "console";
import jwt from "jsonwebtoken";


export class JwtService 
{
    static sign (payload : object) : string{
        return jwt.sign(payload, process.env.JWT_SECRET as string,
        {
            expiresIn : process.env.JWT_EXPIRES_IN || "10m",
        })
    };
    static verify (token : string): any
    {
        try{
            return jwt.verify(token, process.env.JWT_SECRET as string);
        }catch
        {
            throw new Error ("Token no valido");
        }
    }
}