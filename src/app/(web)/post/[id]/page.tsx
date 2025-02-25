
import prisma from '@/lib/prisma';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  const postId = Number(id);

  const post = await prisma.post.findUnique({
    where: { id:postId },
    include: { author: true }, // 包含作者信息
  });

  if (!post) {
    return <p className="text-red-500">文章不存在</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 prose">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <h3>{post.content}</h3>
    </div>
  );
}