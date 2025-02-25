'use client'
import  request  from "@/lib/axios"
import { use, useState } from "react"

const Page = ( { params }: { params: Promise<{ id: string }>}) => {
  const {id} = use(params)
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  const handleSubmit = async () => {
    try{
      if(!title || !content || !title.trim() || !content.trim()){
        alert('参数不完整')
      }
      const res = await request({
        url: `/post/${id}`,
        method: 'PUT',
        data: {title,content}
      })
      console.log(res)
    }catch(_){
      console.log(_)
    }
  }
  return (
    <div>
      <h1>修改文章</h1>
      <form>
        <label>
          标题
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-green-300"/>
        </label>
        <label>
          内容
          <textarea value={content} onChange={(e) => setContent(e.target.value)}  className="bg-slate-500"/>
        </label>
        <button type="submit" onClick={handleSubmit}>保存</button>
      </form>
    </div>
  )
}

export default Page