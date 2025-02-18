import prismaClient from '../../prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        //Verifica se o usuário existe
        if(!user) {
            throw new Error("User/password incorrect");
        }

        //Verifica se a senha está correta
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("User/password incorrect");
        }

        //Gerar o token JWT

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )
        
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
         };
    }
}

export { AuthUserService };