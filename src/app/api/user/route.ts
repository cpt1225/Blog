import { NextRequest, NextResponse } from 'next/server';
import session from '@/utils/session';
import prisma from '@/lib/prisma';


export async function GET() {
  try {
    const {userid,role} = await session();
    if(!userid || role ==='user') {
      return NextResponse.json({message: "权限不足" });
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      }
    })
    if(!users){
      return NextResponse.json({message: "未获取用户" });
    }
    return NextResponse.json({users});
  } catch {

    return NextResponse.json({message: "系统错误" });
  }
}

export const PUT = async (request:NextRequest) => {
  try {
    const {userid,role} = await session();
    if (!userid || role !== 'root') {
      return NextResponse.json({message: '权限不足'});
    }
    const {id,action} = await request.json();
    const user = await prisma.user.findUnique({
      where:{id}
    });
    if(!user){
      return NextResponse.json({message:'用户不存在'});
    }
    if(user.role === 'root'){
      return NextResponse.json({message:'权限不足'});
    }
    switch(action){
      case 'down':
        await prisma.user.update({
          where:{id:id},
          data:{role:'user'}
        });
        return NextResponse.json({message:'操作成功'});
      case 'up':
        await prisma.user.update({
          where:{id:id},
          data:{role:'admin'}
        });
        return NextResponse.json({message:'操作成功'});
      default:
        return NextResponse.json({message:'操作失败'});
    }
  }catch {
    return NextResponse.json({message:'系统错误'});
  }
}