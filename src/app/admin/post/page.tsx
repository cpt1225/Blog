'use client'
import { Post } from '@/types'
import { useEffect, useState } from "react"
import request from '@/lib/axios'
import { dateChange } from '@/utils/dateChange'
import TopTitle from '@/components/admin/TopTitle'

const Page = () => {
  const [isloading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await request({ url: '/post' })
        if (res.status !== 200) {
          throw new Error('未获取到博客')
        }
        setPosts(res.data.data || [])
        console.log(res.data.data)
      } catch (error) {
        console.log('error', error)
        setError('网络错误')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = (id: number) => async () => {
    try {
      const res = await request({ url: `/post/${id}`, method: 'DELETE' })
      console.log(res)
    } catch (_) {
      console.log(_)
    }
  }
  return (
    <div>
      <TopTitle title='标题' />
      {isloading ? (
        <div>加载中...</div>
      ) : (
        posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <div className='flex justify-between'>
                  <div>{post.author?.username}</div>
                  <div>{post.title}</div>
                  <div>{dateChange(post.createTime)}</div>
                  <button onClick={handleSubmit(post.id)} className='ml-10 bg-slate-500'>删除</button>
                </div>
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
