'use client'
import { Post } from '@/types'
import { useEffect, useState } from "react"
import request from '@/lib/axios'

const Page = () => {
  const [isloading,setIsLoading] = useState(false)
  const [posts,setPosts] = useState<Post[]>([])
  const [error,setError] = useState('')
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try{
        const res = await request({url: '/post'})
        if(res.status !== 200) {
          throw new Error('未获取到博客')
        }
        setPosts(res.data.data || [])
      } catch(error) {
        console.log('error', error)
        setError('网络错误')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = (id: number) => async () => {
    try{
      const res = await request({url: `/post/${id}`, method: 'DELETE'})
      console.log(res)
    }catch(_){
      console.log(_)
    }
  }
  return (
    <div>
      <h1>博客列表</h1>
      {isloading ? (
        <div>加载中...</div>
      ) : (
        posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                {post.title}
                <button onClick={handleSubmit(post.id)} className='ml-10 bg-slate-500'>删除</button>
              </li>
              ))}
          </ul> 
        ) : (
          <div>{error || 'hello'}</div>
        )
      )}
    </div>
  )
}

export default Page
