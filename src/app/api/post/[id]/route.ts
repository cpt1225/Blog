import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import session from '@/utils/session';
import { errorResponse, successResponse } from '@/types/response';


export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
      return errorResponse({ message:'找不到该博客'});
    }

    return successResponse({ data:post, message:'获取成功' });
  } catch {
    return errorResponse({ message:'系统错误'});
  }
}

const checkblog = async (userid: string, role: string, id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return errorResponse({ message: "博客不存在" });
    }
    if (post.authorId !== Number(userid) && role === 'user') {
      return post;
    }
    return null;
  } catch {
    return errorResponse({ message: "找不到该博客" });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { title, content } = await request.json();

    if (!title || !content || !title.trim() || !title.trim()) {
      return errorResponse({ message: "参数不完整" });
    }
    const { userid, role } = await session();
    if (!userid) {
      return errorResponse({ message: "请登录" });
    }
    const message = await checkblog(userid, role, id);
    if (message) {
      return errorResponse({ message: "权限不足" });
    }
    await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title,
        content: content,
      },
    });
    return successResponse({ message: "更新成功" });
  } catch {
    return errorResponse({ message: "系统错误" });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { userid, role } = await session();
    if (!userid) {
      return errorResponse({ message: "权限不足" });
    }
    const message = await checkblog(userid, role, id);
    if (message) {
      return errorResponse({ message: "权限不足" });
    }
    const post = await prisma.post.delete(
      { where: { id: Number(id) }, }
    );
    if (post) {
      return successResponse({ message: "删除成功" });
    }
    return errorResponse({ message: "删除失败" });
  } catch {
    return errorResponse({ message: "系统错误" });
  }
}