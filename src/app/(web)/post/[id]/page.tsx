'use client'
import { useCallback, useEffect,use, useState } from "react";
import { Post } from "@/types";
import MDEditor from '@uiw/react-md-editor';
import request from "@/lib/axios";


const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null)

  const fetchPost = useCallback(async() => {
    const res = await request({
      url: `/post/${id}`,
      method: 'GET'
    })
    if (res.data.status === 200) {
      setPost(res.data.data)
    } else {
      return <p>Not Found</p>
    }
  },[id])

  useEffect(() => {
    fetchPost()
  },[fetchPost])
  
  return (
    <div className="flex justify-center flex-col items-center mt-4">
    <h1 className="font-bold text-xl md:text-3xl">{post?.title}</h1>
     <MDEditor.Markdown source={post?.content}  className="mt-4"/>
    </div>
  )

}
export default Page;