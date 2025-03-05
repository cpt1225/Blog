'use client'
import { Post } from '@/types'
import { useEffect, useState } from "react"
import request from '@/lib/axios'
import BlogCard from '@/components/Card/BlogCard'
import { toast,ToastContainer } from 'react-toastify'


const Page = () => {
  const [isloading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await request({ url: '/post' })
        if (res.data.status !== 200) {
          toast.error(res.data.message)
        }
        setPosts(res.data.data || [])
      } catch  {
        toast.error('网络错误')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className=' mx-10 mt-10 md:mx-20'>
        <h1 className='text-2xl text-nowrap'>最新文章</h1>
        <ToastContainer />
        {isloading ? (
          <div>加载中...</div>
        ) : (
          posts.length > 0 ?
            (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-20">
                {posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                )
                )}
              </div>
            ) : (
              <div>系统故障</div>
            )
        )}
      </div>
    </>
  )
}

export default Page
