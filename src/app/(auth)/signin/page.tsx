'use client';
import { signIn } from "next-auth/react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';


const Page = () => {
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.warn('邮箱或密码错误');
    } else {
      route.push('/');
    }
  };
  return (
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <motion.div initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{
            duration: 1.1,
            type: "spring",
            damping: 10,  
            stiffness: 120
          }}
          className="w-1/2 border-1 border-gray-400 p-10 pb-6 flex-col rounded-lg flex justify-center  items-center">
          <h1 className="text-xl font-semibold text-blue-500 text-nowrap">Welcome back</h1>
          <Input label="Email" onChange={(e) => setEmail(e.target.value)}type="email" variant="flat" className="mt-4" value={email}/>
          <Input label="Password" value={password} onChange= {(e) => setPassword(e.target.value)}type="password" variant="flat" className="mt-4" />
          <div className="flex justify-between  w-full mt-2">
            <Link href='/' className="text-sm text-gray-600  text-nowrap">返回首页</Link>
            <Link href="/reset" className="text-sm text-gray-600 text-nowrap">忘记密码</Link>
          </div>

          <Button onPress={handleSubmit} className="bg-blue-500 mt-2">
            Submit
          </Button>
          <ToastContainer 
          position="top-center"/>
          <span className="mt-4 text-sm">还没有账号？</span>
          <button className='text-sm underline text-blue-500' onClick={() => route.push('/signup')}>注册</button>
        </motion.div>
      </div>
  );
};

export default Page;