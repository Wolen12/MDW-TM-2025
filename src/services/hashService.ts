import bcrypt from "bcrypt";

export class HashService 
{
    static async hash(password: string): Promise<string>
    {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT || "10"));
        return bcrypt.hash(password, salt);
    }

    static async compare (password: string, hash:string): Promise<boolean>
    {
        return bcrypt.compare(password, hash);
    }
}