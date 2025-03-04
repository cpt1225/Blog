import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { id: 'desc' },
      include: { author: true },
    });
    
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({message: 'error'}, {status: 500});
  }
}

export async function POST(req:NextRequest) {
  const { title, content } = await req.json();
  const session = await auth();
    if(!session || !session.user || !session.user.name || !session.user.id) {
      return NextResponse.json({message: '还没有登录'}, {status: 401});
    }
  try{
    if(!content || !content.trim() || !title || !title.trim()){
      return NextResponse.json({message: '参数不完整'})
    }
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(session.user.id),
      }
    });
    return NextResponse.json({message: '保存成功'});
  } catch {
    return NextResponse.json({message: 'error'}, {status: 500});
  }
}
