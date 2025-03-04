import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import redis from "@/lib/redis";
import { errorResponse, successResponse } from "@/types/response";

export  async function POST(request: NextRequest) {
  try{
    const {username,password,email,code} = await request.json();
    if(!username || !password || !email || !code){
      return errorResponse({message: '参数不完整'})
    }
    if(await prisma.user.findUnique({where: {username}})){
      return errorResponse({message: '用户名已存在'})
    }
    if(await prisma.user.findUnique({where: {email}})){
      return errorResponse({message: '邮箱已存在'})
    }
    if(!(await redis.get(email))){
      return errorResponse({message: '验证码已过期或未发送验证码'})
    }
    if(await redis.get(email) !== code){
      return errorResponse({message: '验证码错误'})
    }
    const passwordHash = await bcrypt.hash(password, 4);
    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        username,
        role: 'user',
      },
    });
    return successResponse({message: '注册成功'})
  }catch {
    return errorResponse({message: 'error',status:500 })
  }
}