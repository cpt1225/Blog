'use client';
import  { useState } from 'react'
import request from '@/lib/axios';
import ReactMarkdown from 'react-markdown';

const Page = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await request({
        url: '/post',
        method: 'POST',
        data: { title, content },
      });
      console.log('res', res);
    } catch(error) {
      console.log('error', error);
      console.log('hello')
    }
  }
  return (
    <>
      <input type="text" value={title} 
      onChange={(e) => setTitle(e.target.value)} placeholder='标题' required></input>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
        className="w-full h-full p-2 border rounded text-gray-800 bg-white resize-none"
        required
      />
      <button  className='bg-red-400' onClick={handleSubmit}>提交</button>
      <div className="border rounded p-4 bg-white prose overflow-y-auto h-full">
            <h2 className="text-xl font-bold mb-4">预览</h2>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
    </>
  )
}

export default Page