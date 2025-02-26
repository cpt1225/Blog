'use client'
import { useEffect, useState } from 'react'
import { User } from '@/types'
import request from '@/lib/axios'

const Page = () => {
  const [users,setUsers] = useState<User[]>([])
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState('')

  const fetchUsers = async () => {
    setIsLoading(true)
    try{
      const res = await request({
        url: '/user',
        method: 'GET'
      })
      if(res.status !== 200){
        setError('未获取到用户')
        throw new Error('未获取到用户')
      }
      console.log(res)
      setUsers(res.data.users || [])
    } catch(_){
      console.log(_)
      setError('网络错误')
    }finally{
      setIsLoading(false)
    }
  }

  const handleSubmit = (id: number,action: string) => async () => {
    try{
      const res = await request({
        url: 'user',
        method: 'PUT',
        data: { id, action }
      })
      console.log(res)
    }catch(_){
      console.log(_)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>
      <h1>Admin User Page</h1>
      {isLoading ? <p>Loading...</p> : (
        users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
                <button onClick={handleSubmit(user.id,'up')}>提升权限</button>
                <button onClick={handleSubmit(user.id,'down')}>降低权限</button>
              </li>
            ))}
          </ul>
        ) : (
          <div>{error || 'Hello'}</div>
        )
      ) }
    </div>
  )
}

export default Page