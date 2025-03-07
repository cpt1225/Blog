import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import redis from "@/lib/redis";
import { errorResponse, successResponse } from "@/types/response";

export  async function POST(request: NextRequest) {
  try{
    const {email,newPassword,code} = await request.json();
    if(!newPassword || !email || !code){
      return errorResponse({message: '参数不完整'})
    }
    if (!await prisma.user.findUnique({ where: { email } })) {
      return errorResponse({message:'邮箱未注册'})
    }
    if(!(await redis.get(email))){
      return errorResponse({message: '验证码已过期或未发送验证码'})
    }
    if(await redis.get(email) !== code){
      return errorResponse({message: '验证码错误'})
    }
    const password = await bcrypt.hash(newPassword, 4);
    await prisma.user.update({
      where: { email },
      data: { password }
    })
    return successResponse({message: '更新成功'})
  }catch {
    return errorResponse({message: 'error'})
  }
}