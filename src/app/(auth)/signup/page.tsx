'use client';
import { useState } from "react";
import request from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const route = useRouter();

  const register = async () => {
    try {
      const res = await request({
        url: '/auth/signup',
        method: 'POST',
        data: { username, password, email, code },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          route.push('/signin');
        }, 1000);
      } else {
        toast.warn(res.data.message);
      }
    } catch {
      toast.error('系统错误')
    }
  }
  const sendCode = async () => {
    try {
      const res = await request({
        url: '/auth/makeotp',
        method: 'POST',
        data: { email },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    } catch {
      toast.error('发送失败');
    }
  }
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center">
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
        <Input label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text" variant="flat" className="mt-4" />
        <Input label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" variant="flat" className="mt-4" />
        <Input label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" variant="flat" className="mt-4" />
        <div className="flex w-full relative">
          <Input label="Code" onChange={(e) => setCode(e.target.value)} type="text" variant="flat" className="mt-4" value={code} />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendCode}
            className="text-blue-500 absolute right-2 top-8">
            <Mail />
          </motion.button>
        </div>
        <div className="flex justify-between  w-full mt-2">
          <Link href='/' className="text-sm text-gray-600  text-nowrap">返回首页</Link>
          <Link href="/signin" className="text-sm text-gray-600 text-nowrap">登录</Link>
        </div>
        <Button onPress={register} className="bg-blue-500 mt-2">Submit</Button>
        <ToastContainer
          position="top-center" />
      </motion.div>
    </div>
  );
}
export default Page;


