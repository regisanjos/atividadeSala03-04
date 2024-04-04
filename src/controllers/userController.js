const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

class UsersController {
   async create(request, response) {
       try {
           const { name, email, password } = request.body;

           // Verifica se o email já está em uso
           const existingUser = await prisma.user.findUnique({
               where: { email },
           });

           if (existingUser) {
               return response.status(409).json({ error: 'Email already in use' });
           }

           // Hash da senha antes de salvar no banco de dados
           const hashedPassword = await bcrypt.hash(password, 10);

           // Cria o usuário no banco de dados
           const newUser = await prisma.user.create({
               data: {
                   name,
                   email,
                   password: hashedPassword,
               },
           });

           // Retorna o novo usuário criado
           response.status(201).json(newUser);
       } catch (error) {
           console.error(error);
           response.status(500).json({ error: 'Internal Server Error' });
       }
   }
}

module.exports = UsersController;