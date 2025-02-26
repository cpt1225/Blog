import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import redis from "@/lib/redis";

export  async function POST(request: NextRequest) {
  try{
    const {email,newPassword,code} = await request.json();
    if(!newPassword || !email || !code){
      return NextResponse.json({message: '参数不完整'})
    }
    if (!await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json({message:'邮箱未注册'})
    }
    if(!(await redis.get(email))){
      return NextResponse.json({message: '验证码已过期或未发送验证码'})
    }
    if(await redis.get(email) !== code){
      return NextResponse.json({message: '验证码错误'})
    }
    const password = await bcrypt.hash(newPassword, 4);
    await prisma.user.update({
      where: { email },
      data: { password }
    })
    return NextResponse.json({message: '更新成功'})
  }catch (_){
    console.log('密码修改失败',_)
    return NextResponse.json({message: 'error'},{status:500})
  }
}