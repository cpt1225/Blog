'use client';
import Form from "@/components/Form/Form";
// import { signIn } from "next-auth/react";

const Page = () => {
  


  return (
    <div className='flex w-full h-screen bg-[#f1f1f1]'>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Form />
      </div>
      <div className="bg-gray-200 relative hidden w-1/2 lg:flex h-full items-center justify-center ">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin"></div>
        <div className="w-full h-1/2 bg-white/10  bottom-0 absolute backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default Page;