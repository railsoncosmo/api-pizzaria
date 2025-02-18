import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        if(!email){
            throw new Error('Email incorrect');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: { //Dados cadastrados no banco
                name: name,
                email: email,
                password: passwordHash,
            },
            select: { //Quais informações serão retornadas
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService };