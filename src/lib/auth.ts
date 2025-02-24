import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import  prisma  from "@/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
       if(!credentials.email || !credentials.password) {
         return null
       }
        const email = String(credentials.email)
        const password = String(credentials.password)

        const user = await prisma.user.findFirst({
          where: { email },
        })

        if(!user) {
          throw new Error('用户不存在')
        }
        // 验证密码
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('密码错误');
        }

        // 返回用户信息
        return { id: user.id.toString(), email: user.email, name: user.role };
      }
    })
  ],
})