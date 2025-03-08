import { errorResponse, successResponse } from "@/types/response";
import { NextRequest } from "next/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return errorResponse({ message: "No file uploaded" });
  }
  const originalName = file.name;
  const ext = originalName.split('.').pop()?.toLowerCase();
  console.log(ext);
  // 允许的图片格式后缀列表
  const allowedExt = ["jpg", "jpeg", "png","webp"];
  if (!ext || !allowedExt.includes(ext)) {
    return errorResponse({ message: "文件后缀名不符合要求" });
  }
  try {
    const timestamp = Date.now();
    const newFileName = `${timestamp}.png`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("/", "tmp", newFileName);
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);
    return successResponse({ message: "上传成功",data: newFileName });
  } catch {
    return errorResponse({ message: "系统错误" });
  }
}
