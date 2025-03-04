'use client';
import { useState } from "react";
import request from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const route = useRouter();

  const register = async () => {
    try {
      const response = await request({
        url: '/auth/signup',
        method: 'POST',
        data: { username, password, email, code },
      });
      const data = await response.data;
      if(data.code === 200) {
        toast.success(data.message);
        route.push('/signin');
      } else{
        toast.warn(data.message);
      }
    } catch  {
      toast.error('系统错误')
    }
  }
  const sendCode = async () => {
    try {
      const response = await request({
        url: '/auth/makeotp',
        method: 'POST',
        data: { email },
      });
      const data = await response.data;
      if (data.code === 200) {
        toast.success(data.message);
      } else {
        toast.warn(data.message);
      }
    } catch  {
      toast.error('发送失败');
    }
  }
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <div
        className="w-1/2 border-1 border-gray-400 p-10 pb-6 flex-col rounded-lg flex justify-center  items-center">
        <h1 className="text-blue-500 text-xl font-semibold text-nowrap">AC</h1>
        <Input label="Username" onChange={(e) => setUsername(e.target.value)} type="text" variant="flat" className="mt-4" value={username} />
        <Input label="Email" onChange={(e) => setEmail(e.target.value)} type="email" variant="flat" className="mt-4" value={email} />
        <Input label="Password" onChange={(e) => setPassword(e.target.value)} type="password" variant="flat" className="mt-4" value={password} />
        <div className="flex w-full relative">
          <Input label="Code" onChange={(e) => setCode(e.target.value)} type="text" variant="flat" className="mt-4" value={code} />
          <motion.button onClick={sendCode} className="text-blue-500 absolute right-2 top-8"><Mail /></motion.button>
        </div>
        <Button onPress={register} className="bg-blue-500 mt-2">Submit</Button>
        <ToastContainer
          position="top-center" />
      </div>
    </div>
  );
}
export default Page;


