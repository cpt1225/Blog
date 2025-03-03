'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';


const scrollButton = {
  opacity: 0,
  y: 10,
  transition: {
    duration: 2,
    repeat: Infinity,
  }
}

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-200 pt-10">
      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900  sm:text-6xl">
            Welcome to <span className="text-blue-600 dark:text-blue-400">AC</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            一个简单的个人博客，记录我的学习和生活
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/about"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              了解我
            </Link>
            <Link href="/post" className="text-sm font-semibold leading-6 text-gray-900 ">
              去看看我的博客 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className='flex items-center justify-center mt-5'>
            <motion.img src="/scroll.png" alt="scroll" width={50} height={50} className='items-center' animate={scrollButton} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero