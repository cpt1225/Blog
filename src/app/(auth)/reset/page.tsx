'use client'
import { useState } from 'react'
import request from '@/lib/axios'
import { Input } from '@heroui/input'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion'
import { Button } from '@heroui/button'
import { toast, ToastContainer } from 'react-toastify'


const Page = () => {
  const route = useRouter();
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [code, setCode] = useState('')

  const handleSubmit = async () => {
    try {
      if (!email || !newPassword || !code) {
        toast.error('参数不完整')
      }
      const res = await request({
        url: '/auth/reset',
        method: 'POST',
        data: { email, newPassword, code }
      })
      if (res.data.status === 200) {
        toast.success('重置成功');
        setTimeout(() => {
          route.push('/signin')
        }, 2000);
      }
    } catch {
      toast.error('系统出错');
    }
  }
  const handleSet = async () => {
    try {
      if (!email) {
        toast.error('请输入邮箱')
        return;
      }
      const res = await request({
        url: '/auth/makeotp',
        method: 'POST',
        data: { email }
      })
      if (res.data.status === 200) {
        toast.success('发送成功');
        setTimeout(() => {
          route.push('/signin')
        }, 2000);
      } else {
        toast.error(res.data.message)
      }
    } catch {
      toast.error('系统出错')
    }
  }
  return (
    <div className='w-full lg:w-1/2 flex justify-center items-center'>
      <motion.div
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{
          duration: 1.1,
          type: "spring",
          damping: 10,
          stiffness: 120
        }}
        className="w-1/2 border-1 border-gray-400 p-10 pb-6 flex-col rounded-lg flex justify-center  items-center">
        <h1 className="text-blue-500 text-xl font-semibold text-nowrap">AC</h1>

        <Input label="Email" onChange={(e) => setEmail(e.target.value)} type="email" variant="flat" className="mt-4" value={email} />
        <Input label="newPassword" onChange={(e) => setNewPassword(e.target.value)} type="password" variant="flat" className="mt-4" value={newPassword} />

        <div className="flex w-full relative">
          <Input label="Code" onChange={(e) => setCode(e.target.value)} type="text" variant="flat" className="mt-4" value={code} />
          <motion.button
            onClick={handleSet}
            className="text-blue-500 absolute right-2 top-8">
            <Mail />
          </motion.button>
        </div>
        <div className="flex justify-between  w-full mt-2">
          <Link href='/' className="text-sm text-gray-600  text-nowrap">返回首页</Link>
          <Link href="/signin" className="text-sm text-gray-600 text-nowrap">登录</Link>
        </div>
        <Button onPress={handleSubmit} className="bg-blue-500 mt-2">Submit</Button>
        <ToastContainer
          position="top-center" />
      </motion.div>
    </div>
  )
}

export default Page