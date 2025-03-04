'use client'
import { useState } from 'react'
import request from '@/lib/axios'

const Page = () => {
  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [code,setCode] = useState('')

  const handleSubmit = async () => {
    try{
      if(!email || !newPassword || !confirmPassword || !code){
        alert('参数不完整')
      }
      if(newPassword !== confirmPassword){
        alert('两次密码不一致')
      }
      const res = await request({
        url: '/auth/reset',
        method: 'POST',
        data: {email,newPassword,code}
      })
      console.log(res)
    } catch(_){
      console.log(_)
    }
  }
  const handleSet = async () => {
    try{
      if(!email){
        alert('请输入邮箱')
      }
      const res = await request({
        url: '/auth/makeotp',
        method: 'POST',
        data: {email}
      })
      console.log(res)
    }catch(_){
      console.log(_)
    }
  }
  return (
    <div>
      <h1>Reset Password</h1>
      
        <label>
          Email
          <input value={email}  onChange={(e) => setEmail(e.target.value)} className="bg-green-300"/>
        </label>
        <label>
          New Password
          <input value={newPassword}  onChange={(e) => setNewPassword(e.target.value)} className="bg-green-300"/>
        </label>
        <label>
          re-enter Password
          <input value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} className="bg-green-300"/>
        </label>
        <label>
          Code
          <input value={code}  onChange={(e) => setCode(e.target.value)} className="bg-green-300"/>
          <button onClick={handleSet}>Send Code</button>
        </label>
        <br/>
        <button type="submit" onClick={handleSubmit} className='bg-red-400'>Reset</button>
    </div>
  )
}

export default Page