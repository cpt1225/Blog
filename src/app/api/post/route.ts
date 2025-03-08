import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { errorResponse, successResponse } from '@/types/response';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { id: 'desc' },
      include: { author: true },
    });
    
    return successResponse({data:posts,message:'获取成功'});
  } catch {
    return errorResponse({message: 'error',status: 500});
  }
}

export async function POST(req:NextRequest) {
  const { title, content } = await req.json();
  const session = await auth();
    if(!session || !session.user || !session.user.name || !session.user.id) {
      return errorResponse({message: '还没有登录',status: 401});
    }
  try{
    if( !title || !title.trim()){
      return errorResponse({message: '未输入标题'})
    }
    console.log('Raw Content:', content);
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(session.user.id),
      }
    });
    return successResponse({message: '保存成功'});
  } catch {
    return errorResponse({message: 'error',status: 500});
  }
}
