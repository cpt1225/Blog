'use client';
import { signIn } from "next-auth/react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";


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
      
    } else {
      route.push('/');
    }
  };


  return (
    <div className='flex w-full h-screen bg-[#f1f1f1]'>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <motion.div initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{
            duration: 1.1,
            type: "spring",
            damping: 15,  // 临界阻尼
            stiffness: 120
          }}
          className="w-1/2 border-1 border-gray-400 p-10 flex-col rounded-lg flex justify-center  items-center">
          <h1 className="text-xl font-semibold text-blue-500 text-nowrap">Welcome back</h1>
          <Input label="Email" onChange={(e) => setEmail(e.target.value)}type="email" variant="flat" className="mt-4" value={email}/>
          <Input label="Password" value={password} onChange= {(e) => setPassword(e.target.value)}type="password" variant="flat" className="mt-4" />
          <div className="flex justify-between  w-full mt-2">
            <Link href='/' className="text-sm text-gray-600  text-nowrap">返回首页</Link>
            <Link href="/reset" className="text-sm text-gray-600 text-nowrap">忘记密码</Link>
          </div>

          <Button onClick={handleSubmit} className="bg-violet-500 mt-4">
            Submit
          </Button>
        </motion.div>
      </div>
      <div className="bg-gray-200 relative hidden w-1/2 lg:flex h-full items-center justify-center ">
        <motion.div initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          whileHover={{ scale: 1.1 }}
          className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full">
        </motion.div>
        <div className="w-full h-1/2 bg-white/10  bottom-0 absolute backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default Page;