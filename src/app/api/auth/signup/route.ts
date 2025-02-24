import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import redis from "@/lib/redis";

export  async function POST(request: NextRequest) {
  try{
    const {username,password,email,code} = await request.json();
    if(!username || !password || !email || !code){
      return NextResponse.json({message: '参数不完整'})
    }
    if(await prisma.user.findUnique({where: {username}})){
      return NextResponse.json({message: '用户名已存在'})
    }
    if(await prisma.user.findUnique({where: {email}})){
      return NextResponse.json({message: '邮箱已存在'})
    }
    if(!(await redis.get(email))){
      return NextResponse.json({message: '验证码已过期或未发送验证码'})
    }
    if(await redis.get(email) !== code){
      return NextResponse.json({message: '验证码错误'})
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
    return NextResponse.json({message: '注册成功'})
  }catch (_){
    console.log('注册失败',_)
    return NextResponse.json({message: 'error'},{status:500})
  }
}