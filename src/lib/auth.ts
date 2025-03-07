import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
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
          return null;
        }
        // 验证密码
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }

        // 返回用户信息
        return { id: user.id.toString(), email: user.email, name: user.role , image:user.avatar };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      // 用户登录成功后，将用户角色注入 JWT
      if (user) { 
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 JWT 中的角色信息传递到会话（Session）
      if(token.id && token.name) {
      session.user.name = token.name;
      session.user.id = token.id as string;
      }
      return session;
    }
  }
})