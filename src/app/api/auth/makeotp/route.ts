import {NextRequest , NextResponse} from "next/server";
import { sendOTPEmail } from "@/lib/mailer";
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
  try{
    const { email } = await request.json();
    if(!email){
      return NextResponse.json({message: '请输入你的邮箱'})
    }
    if(await redis.get(email)){
      return NextResponse.json({message: '请勿频繁发送验证码'})
    }
    const otp = Math.random().toString().slice(-6);
    await redis.set(email,otp,'EX',300);
    await sendOTPEmail(email,otp);
    return NextResponse.json({message: '发送验证码成功'},{status:200})
  }catch {
    return NextResponse.json({message: 'error'},{status:500})
  }
}

