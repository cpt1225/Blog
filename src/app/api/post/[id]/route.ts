import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import  session  from '@/utils/session';


export async function GET(_request: NextRequest,  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

const checkblog = async (userid:string,role:string,id:string) => {
  try{
    const post = await prisma.post.findUnique({
      where: { id : Number(id) },
    });
    if(!post){
      return NextResponse.json({message: "博客不存在" });
    }
    if(post.authorId!== Number(userid) && role === 'user'){
      return post;
    }
    return null;
  }catch (_){
    console.log(_)
  }
}

export async function PUT(request: NextRequest, { params }:   { params: Promise<{ id: string }>}) {
  const { id } = await params;
  try{
    const {title, content} = await request.json();

    if(!title || !content || !title.trim() || !title.trim()){
      return NextResponse.json({message: "参数不完整" });
    }
    const {userid,role} = await session();
    if(!userid ){
      return NextResponse.json({message: "请登录" });
    }
    const message = await checkblog(userid,role,id);
    if(message){
      return NextResponse.json({message: "权限不足" });
    }
    const res = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title:title,
        content:content,
      },
    });
    console.log(res);
    return NextResponse.json({message: "更新成功" });
  }catch(_){
    console.log(_);
  }
}

export async function DELETE(request: NextRequest,  { params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  try {
    const {userid,role} = await session();
    if(!userid){
      return NextResponse.json({message: "权限不足" });
    }
    const message = await checkblog(userid,role,id);
    if(message){
      return NextResponse.json({message: "权限不足" });
    }
    const post =await prisma.post.delete(
      {where: { id: Number(id) },}
    )
    console.log(post)
    if(post){
      return NextResponse.json({message: "删除成功" });
    }
    return NextResponse.json({message: "删除失败" });
  }catch(_){
    console.log(_)
  }
}