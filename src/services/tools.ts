import bcrypt from "bcrypt";
import "dotenv/config";

export function hashPassword(password: string){
    const SALTS = Number(process.env.SALTS);
    const newPassword = bcrypt.hashSync(password, SALTS)    
    return newPassword;
}

export function comparePassword(password: string, hash: string | undefined){
    if(hash){
        return bcrypt.compareSync(password, hash)
    }
    
    return false
}