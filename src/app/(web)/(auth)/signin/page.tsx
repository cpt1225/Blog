'use client';
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from "framer-motion";

const Page = () => {
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      route.push('/');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  return (
    <div className={' flex items-center justify-center mt-20  '}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 border-gray-200"
      >
        <h1 className="text-3xl font-lora  mb-6 text-center text-blue-600">AC</h1>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mb-4 font-bold text-center bg-red-100 p-2 rounded"
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
              whileHover={{ scale: 1.01 }}
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="请输入邮箱"
              className="mt-1 w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
              whileHover={{ scale: 1.01 }}
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="请输入密码"
              className="mt-1 w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, background: 'linear-gradient(to right, #3b82f6, #60a5fa)' }}
            whileTap={{ scale: 0.98, rotate: -2 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '正在登录...' : '登录'}
          </motion.button>
        </form>
        <p className="mt-5 text-center text-gray-600">
          没有账号？{' '}
          <Link href="/auth/signup" className="text-blue-500 hover:underline transition-colors duration-200">
            立即注册
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Page;