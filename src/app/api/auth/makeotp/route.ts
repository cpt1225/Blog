import {NextRequest } from "next/server";
import { sendOTPEmail } from "@/lib/mailer";
import redis from "@/lib/redis";
import { errorResponse, successResponse } from "@/types/response";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if(!email){
      return errorResponse({message: '请输入你的邮箱'})
    }
    if(await redis.get(email)){
      return errorResponse({message: '请勿频繁发送验证码'})
    }
    const otp = Math.random().toString().slice(-6);
    await redis.set(email,otp,'EX',300);
    await sendOTPEmail(email,otp);
    return successResponse({message: '发送验证码成功'})
  }catch {
    return errorResponse({message: 'error'})
  }
}

