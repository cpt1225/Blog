'use client';

import {useState} from "react";
import request from "@/lib/axios";
import {useRouter} from "next/navigation";

const Page = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const route = useRouter();

  const register = async () => {
    try {
      const response = await request( {
        url: '/auth/signup',
        method: 'POST',
        data:{ username, password, email, code },
      });
        const data = await response.data;
        console.log(data.message);
        alert(data.message);
        route.push('/signin');
    }catch(_){
      console.log('注册失败',_);
  }}
  const sendCode = async () => {
    try {
      const response = await request({
        url: '/auth/makeotp',
        method: 'POST',
        data: {email},
      });
        const data = await response.data;
        alert(data.message);
    } catch (_) {
      console.log('发送验证码失败', _);
    }
  }
  return (
    <div>
      <form>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-center">注册</h1>


            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <input
              type="text"
              placeholder="验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <button onClick={sendCode} type="button"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
              发送验证码
            </button>

            <button
              onClick={register}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              注册
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Page;


